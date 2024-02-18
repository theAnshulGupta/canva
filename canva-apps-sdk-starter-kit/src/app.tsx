import {
  Button,
  FormField,
  MultilineInput,
  Rows,
  Text,
  Title,
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


const BACKEND_URL = `${BACKEND_HOST}/custom-route`;
const BACKEND_HOST_OPENAI = `${BACKEND_HOST}/openai`; // Change 3000 to your server's port

type State = "idle" | "loading" | "success" | "error";

export const App = () => {
  const [state, setState] = useState<State>("idle");
  const [responseBody, setResponseBody] = useState<unknown | undefined>(
    undefined
  );


  const sendGetRequest = async () => {
    try {
      setState("loading");
      const token = await auth.getCanvaUserToken();
      const res = await fetch(BACKEND_HOST_OPENAI, {
        method: "POST",
        body: JSON.stringify({ prompt: "Based on a random research paper, generate a 10 slide presentation in the following structure:\n\nIntroduction and background on topic\nKey contributions / novelties\nResults / datapoints\nImpact / contributions / caveats\n\nUse 2-3 slides per part, and present things as slideshows aimed for a presentation for the general public\n\nUse 2-3 comprehensive, clear, but insightful and value-adding full sentence bullet points per slide max, and generate a sub heading for each slide. Do not make up data and do not make up things that you do not know. Emphasize specific results and data points\n\nRefer to the document, results, and actions. Return it in json format in the following json format, it has a title and body paragraph." }),
        headers: new Headers({
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });

      // const body = await res.json();
      const body = await res.json();
      // const processedResponse = processResponseBody(body);

      const contentString = body.response.message.content;

    // The content includes JSON within a string, wrapped in triple backticks.
    // We need to extract the JSON part. This might require more sophisticated parsing,
    // especially if the triple backticks can be part of the actual content.
    const jsonContentString = contentString.split('```json')[1].split('```')[0].trim();

    // Parse the JSON string into an object
    const jsonContent = JSON.parse(jsonContentString);

    setResponseBody(jsonContent);

      // setResponseBody(body);
      setState("success");
    } catch (error) {
      setState("error");
      console.error(error);
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

  async function handleNewClick() {

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
              children: ["bob"], // Center align -- run calculations to find center of page - content offset
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
      <Rows spacing="3u">
        <Text>
          This example demonstrates how apps can securely communicate with their
          servers via the browser's Fetch API.
        </Text>

        {/* Idle and loading state */}
        {state !== "error" && (
          <>
            <Button
              variant="primary"
              onClick={sendGetRequest}
              loading={state === "loading"}
              stretch
            >
              Send GET request
            </Button>
            {state === "success" && responseBody && (
              <FormField
                label="Response"
                value={JSON.stringify(responseBody, null, 2)}
                control={(props) => (
                  <MultilineInput {...props} maxRows={5} autoGrow readOnly />
                )}
              />
            )}
          </>
        )}

        {/* Error state */}
        {state === "error" && (
          <Rows spacing="3u">
            <Rows spacing="1u">
              <Title size="small">Something went wrong</Title>
              <Text>To see the error, check the JavaScript Console.</Text>
            </Rows>
            <Button
              variant="secondary"
              onClick={() => {
                setState("idle");
              }}
              stretch
            >
              Reset
            </Button>
          </Rows>
        )}
      </Rows>

      <Button
        variant="primary"
        onClick={() => {
          // First, ensure responseBody is a string. If it's not directly a string, we convert it to string using JSON.stringify.
          const responseBodyString =
            typeof responseBody === "string"
              ? responseBody
              : JSON.stringify(responseBody);

          // Then, get the first 30 characters of the string.
          const first30Chars = responseBodyString.slice(0, 30);

          addNativeElement({
            type: "TEXT",
            children: [first30Chars],
          });
        }}
        stretch
      >
        Add element
      </Button>
      <Button variant="primary" onClick={handleNewClick} stretch>
          Add group element
        </Button>
      
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
