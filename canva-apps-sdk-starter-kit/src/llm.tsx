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

export async function getSlidesForText(text){
    let prompt = text + "\n\nGiven the above research paper, generate a 10 slide presentation in the following structure:\n\nIntroduction and background on topic\nKey contributions / novelties\nResults / datapoints\nImpact / contributions / caveats\n\nUse 2-3 slides per part, and present things as slideshows aimed for a presentation for the general public\n\nUse 2-3 comprehensive, clear, but insightful and value-adding full sentence bullet points per slide max, and generate a sub heading for each slide. Do not make up data and do not make up things that you do not know. Emphasize specific results and data points\n\nRefer to the document, results, and actions as 'We'\n";
    return await submitPromptAndGetResponse(prompt);

}
