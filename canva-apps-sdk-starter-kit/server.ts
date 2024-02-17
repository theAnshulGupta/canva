require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import { createBaseServer } from "./utils/backend/base_backend/create" //../../utils/backend/base_backend/create";
import { createJwtMiddleware } from "./utils/backend/jwt_middleware"//"../../../utils/backend/jwt_middleware";


import OpenAI from "openai";

const openai_key = process.env.OPENAI_KEY;

const open_ai = new OpenAI({apiKey: openai_key, dangerouslyAllowBrowser: true});

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

  const canva_app_id = process.env.CANVA_APP_ID?.toLowerCase();

  const corsOptions = {
    origin: `https://app-${canva_app_id}.canva-apps.com`,
    optionsSuccessStatus: 200 
  };

  router.use(cors(corsOptions));

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
  // server.start(3001);

}

main();
