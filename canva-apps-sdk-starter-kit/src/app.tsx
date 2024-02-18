import {
  Button,
  Rows,
  Text,
  ImageCard,
  Title,
  TextInput,
} from "@canva/app-ui-kit";
import type {
  Dimensions,
  NativeEmbedElement,
  NativeGroupElement,
} from "@canva/design";

import { auth } from "@canva/user";
import React, { useState, useEffect } from "react";
import styles from "styles/components.css";
import { addNativeElement } from "@canva/design";
import { addPage } from "@canva/design";
import {extractText} from "./extractText";
import * as designer from "./designer";

const BACKEND_URL = `${BACKEND_HOST}/custom-route`;
const BACKEND_HOST_OPENAI = `${BACKEND_HOST}/openai`; // Change 3000 to your server's port

type State = "idle" | "loading" | "success" | "error";
export function parseJsonFromString(text) {
  const startIndex = text.indexOf('{');
  const endIndex = text.lastIndexOf('}');

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error('Invalid string format for JSON parsing.');
  }

  const jsonString = text.substring(startIndex, endIndex + 1).replace(/(\r\n|\n|\r)/gm,"");
  console.log(jsonString);
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Failed to parse JSON.');
  }
}

export const App = () => {
  const [link, setLink] = useState("");
  const [responseContent, setResponseContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await extractText(link);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();

      try {
        const token = await auth.getCanvaUserToken();
        const res = await fetch(BACKEND_HOST_OPENAI, {
          method: "POST",
          body: JSON.stringify({ prompt: `Based on a the below research paper, generate a 10 slide presentation in the following structure:\n\nIntroduction and background on topic\nKey contributions / novelties\nResults / datapoints\nImpact / contributions / caveats\n\nUse 2-3 slides per part, and present things as slideshows aimed for a presentation for the general public\n\nUse 2-3 comprehensive, clear, but insightful and value-adding full sentence bullet points per slide max, and generate a sub heading for each slide. Do not make up data and do not make up things that you do not know. Emphasize specific results and data points\n\nRefer to the document, results, and actions. Return it in json format in the following json format: {"title":"<title>", "authors":"<authors", "slides": [{"heading":"<heading>", "body":"<body>"}...]}. Here is the research paper: ` + text }),
          headers: new Headers({
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
        });
  
        // const body = await res.json();
        const body = await res.json();
        // const processedResponse = processResponseBody(body);
  
  
      // The content includes JSON within a string, wrapped in triple backticks.
      // We need to extract the JSON part. This might require more sophisticated parsing,
      // especially if the triple backticks can be part of the actual content.
      const jsonContentString = parseJsonFromString(body.response);
  
      // Parse the JSON string into an object
      console.log(jsonContentString);
      await handleNewClick(jsonContentString);
        // setResponseBody(body);
      } catch (error) {
        console.error(error);
      }
  
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // // Function to process and manipulate the response body
  // function processResponseBody(responseBody: any) {
  //   // Assuming responseBody contains a property with the desired text
  //   // Adjust the following line according to the actual structure of your responseBody
  //   const text = responseBody?.text || ''; // Adjust this based on your actual response structure

  //   // Process the text as needed, for example, getting the first 30 characters
  //   const processedText = text.slice(0, 30);

  //   return processedText;
  // }

  async function handleNewClick(responseBody) {

    await addPage({
      elements: [
        // headerElement
        {
          type: "GROUP",
          children: [
            {
              type: "TEXT",
              children: [responseBody.title], // Center align -- run calculations to find center of page - content offset
              top:0,
              left:0,
              width:200,
            },
            {
              type: "TEXT",
              children: [responseBody.authors], // Center align -- run calculations to find center of page - content offset
              top:0,
              left:0,
              width:200,
            },
          ],
          top:0,
          left:0,
          width: 500,
          height: "auto"
        },
      ],
    });

    // Use a for...of loop to iterate over slides, allowing for await within the loop
  for (const slide of responseBody.slides) {
    await addPage({
      elements: [
        {
          type: "GROUP",
          children: [
            {
              type: "TEXT",
              children: [slide.heading],
              top: 0,
              left: 0,
              width: 200,
            },
            {
              type: "TEXT",
              children: [slide.body],
              top: 50, 
              left: 0,
              width: 200,
            },
          ],
          top: 0,
          left: 0,
          width: 500,
          height: "auto",
        },
      ],
    });

    await new Promise(resolve => setTimeout(resolve, 5000));
  }

    // responseBody.slides.forEach( (slide) => {
    //    addPage({
    //     elements: [
    //       // headerElement
    //       {
    //         type: "GROUP",
    //         children: [
    //           {
    //             type: "TEXT",
    //             children: [slide.heading],
    //             top:0,
    //             left:0,
    //             width:200,
    //           },
    //           {
    //             type: "TEXT",
    //             children: [slide.body],
    //             top:0,
    //             left:0,
    //             width:200,
    //             // height: "auto",
    //           },
    //         ],
    //         top:0,
    //         left:0,
    //         width: 500,
    //         height: "auto"
    //       },
    //     ],
    //   });  
    //   new Promise(resolve => setTimeout(resolve, 3500));
    // });

  }

  return (
    <div className={styles.scrollContainer}>
      <form onSubmit={handleSubmit}>
        <Rows spacing="2u">
          <Title>Research to Slides</Title>
          <Text>
            Welcome to [project], a software meant to streamline research papers
            into elegant presentations on Canva – be it slides, text, or images.
          </Text>
          <ImageCard
            alt="grass image"
            ariaLabel="Add image to design"
            borderRadius="standard"
            onClick={() => {}}
            onDragStart={() => {}}
            thumbnailUrl="https://raw.githubusercontent.com/theAnshulGupta/theanshulgupta.github.io/master/diagram.png"
          />
          <Text>
            Enter a link below of a research paper listed on the web to generate
            a slideshow template.
          </Text>
          <TextInput
            value={link}
            onChange={(value) => setLink(value)}
            placeholder="Enter Link Here"
          />
          <Button variant="primary" type="submit" stretch>
            Generate Presentation
          </Button>
          {responseContent && (
            <Text>
              <pre>{responseContent}</pre>
            </Text>
          )}
        </Rows>
      </form>
    </div>
  );
};

// const [state, setState] = useState<State>("idle");
// const [responseBody, setResponseBody] = useState<unknown | undefined>(
//   undefined
// );

// const sendGetRequest = async () => {
//   try {
//     setState("loading");
//     const token = await auth.getCanvaUserToken();
//     const res = await fetch(BACKEND_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const body = await res.json();
//     setResponseBody(body);
//     setState("success");
//   } catch (error) {
//     setState("error");
//     console.error(error);
//   }
// };
