require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import { createBaseServer } from "../../../utils/backend/base_backend/create";
import { createJwtMiddleware } from "../../../utils/backend/jwt_middleware";
// const { Configuration, OpenAIApi } = require("openai");

import OpenAI from "openai";

const open_ai = new OpenAI({apiKey: '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', dangerouslyAllowBrowser: true});

//   apiKey: process.env.OPENAI_API_KEY, // Ensure you have your API key stored in the environment variables
export async function submitPromptAndGetResponse(prompt) {
  try {
    const completion = await open_ai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, {
        "role": "user",
        "content": prompt
    }
    ],
      model: "gpt-4-turbo-preview",
    });
  
    return completion.choices[0];

  } catch (error) {
    console.error("Error in submitting prompt and getting response:", error);
  }
}

async function main() {
  // TODO: Set the CANVA_APP_ID environment variable in the project's .env file
  const APP_ID = process.env.CANVA_APP_ID;

  if (!APP_ID) {
    throw new Error(
      `The CANVA_APP_ID environment variable is undefined. Set the variable in the project's .env file.`
    );
  }

  const router = express.Router();



  /**
   * TODO: Configure your CORS Policy
   *
   * Cross-Origin Resource Sharing
   * ([CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS)) is an
   * [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP)-header based
   * mechanism that allows a server to indicate any
   * [origins](https://developer.mozilla.org/en-US/docs/Glossary/Origin)
   * (domain, scheme, or port) other than its own from which a browser should
   * permit loading resources.
   *
   * A basic CORS configuration would include the origin of your app in the
   * following example:
   * const corsOptions = {
   *   origin: 'https://app-abcdefg.canva-apps.com',
   *   optionsSuccessStatus: 200
   * }
   *
   * The origin of your app is https://app-${APP_ID}.canva-apps.com, and note
   * that the APP_ID should to be converted to lowercase.
   *
   * https://www.npmjs.com/package/cors#configuring-cors
   *
   * You may need to include multiple permissible origins, or dynamic origins
   * based on the environment in which the server is running. Further
   * information can be found
   * [here](https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin).
   */
  router.use(cors());

  const jwtMiddleware = createJwtMiddleware(APP_ID);
  router.use(jwtMiddleware);

  /*
   * TODO: Define your backend routes after initializing the jwt middleware.
   */
  router.get("/custom-route", async (req, res) => {
    console.log("request", req.canva);
    res.status(200).send({
      appId: req.canva.appId,
      userId: req.canva.userId,
      brandId: req.canva.brandId,
    });
  });

  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_KEY, // Ensure your API key is stored securely
  // });
  // const openai = new OpenAIApi(configuration);

  router.post("/openai", jwtMiddleware, async (req, res) => {
    if (req.body.prompt == "") {
      return res.status(400).json({ error: 'Prompt is required.' });
    }
    try {
      // const openaiResponse = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: prompt,
      //   max_tokens: 150
      // });
      const response = await submitPromptAndGetResponse(req.body.prompt);
      res.json({"response": response});
      console.log('OpenAI POST in server.ts');
    } catch (error) {
      console.error('Error calling OpenAI API:');
      res.status(500).json({ error: 'Failed to call OpenAI API.' });
    }
  });


  const server = createBaseServer(router);
  server.start(process.env.CANVA_BACKEND_PORT);
}

main();
