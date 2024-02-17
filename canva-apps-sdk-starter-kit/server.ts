require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import { createBaseServer } from "../canva-apps-sdk-starter-kit/utils/backend/base_backend/create" //../../utils/backend/base_backend/create";
import { createJwtMiddleware } from "../canva-apps-sdk-starter-kit/utils/backend/jwt_middleware"//"../../../utils/backend/jwt_middleware";
const { Configuration, OpenAIApi } = require("openai");



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

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY, // Ensure your API key is stored securely
  });
  const openai = new OpenAIApi(configuration);

  router.post("/openai", jwtMiddleware, async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }
    try {
      const openaiResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150
      });
      res.json(openaiResponse.data);
      console.log('OpenAI POST in server.ts');
    } catch (error) {
      console.error('Error calling OpenAI API:', error.message);
      res.status(500).json({ error: 'Failed to call OpenAI API.' });
    }
  });

  // router.post("/openai", jwtMiddleware, async (req, res) => {
  //   const { prompt } = req.body;
  //   if (!prompt) {
  //     return res.status(400).json({ error: 'Prompt is required.' });
  //   }
  //   try {
  //     const response = await fetch('https://api.openai.com/v1/completions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${process.env.OPENAI_KEY}` // Make sure this is correctly set
  //       },
  //       body: JSON.stringify({
  //         model: 'text-davinci-003',
  //         prompt: prompt,
  //         max_tokens: 150
  //       })
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Failed to call OpenAI API. Status: ${response.status}`);
  //     }
  
  //     const openaiResponse = await response.json();
  //     res.json(openaiResponse);
  //     console.log('OpenAI POST in server.ts');
  
  //   } catch (error) {
  //     console.error('Error calling OpenAI API:', error);
  //     // Removed the log for OPENAI_API_KEY to prevent accidental exposure of sensitive data
  //     res.status(500).json({ error: 'Failed to call OpenAI API.' });
  //   }
  // });

  // router.post("/openai", async (req, res) => {
  //   const { prompt } = req.body;
  //   if (!prompt) {
  //     return res.status(400).json({ error: 'Prompt is required.' });
  //   }
  //   try {
  //     const openaiResponse = await axios.post(
  //       'https://api.openai.com/v1/completions',
  //       {
  //         model: 'text-davinci-003',
  //         prompt: prompt,
  //         max_tokens: 150
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${process.env.OPENAI_KEY}` // Changed to OPENAI_KEY
  //         }
  //       }
  //     );
  //     res.json(openaiResponse.data);
  //     console.log('openai post in server.ts')


  //   } catch (error) {
  //     console.error('Error calling OpenAI API:', error);
  //     console.log(process.env.OPENAI_API_KEY); // Add this for debugging purposes

  //     res.status(500).json({ error: 'Failed to call OpenAI API.' });
  //   }
  // });

  const server = createBaseServer(router);
  server.start(process.env.CANVA_BACKEND_PORT);
}

main();
