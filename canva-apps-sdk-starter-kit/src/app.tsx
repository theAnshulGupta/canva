import {
  Button,
  Rows,
  Text,
  ImageCard,
  Columns,
  Link,
  Column,
  Title,
  Swatch,
  TextInput,
  LoadingIndicator,
} from "@canva/app-ui-kit";
import { requestOpenExternalUrl } from "@canva/platform";
import type { NativeEmbedElement } from "@canva/design";
import { auth } from "@canva/user";
import React, { useState, useEffect } from "react";
import styles from "styles/components.css";
import {
  addPage,
  getDefaultPageDimensions,
  addNativeElement,
  Dimensions,
  NativeGroupElement,
} from "@canva/design";
import { extractText } from "./extractText";
import { upload } from "@canva/asset";

const BACKEND_URL = `${BACKEND_HOST}/custom-route`;
// const BACKEND_HOST_OPENAI = `${BACKEND_HOST}/openai`; // Change 3000 to your server's port
// http://localhost:3001/openai
const BACKEND_HOST_OPENAI = `http://localhost:3001/openai`;

type State = "idle" | "loading" | "success" | "error";

const links = [
  {
    url: "https://anshulgupta.com/imgs/1.jpg",
  },
  {
    url: "https://anshulgupta.com/imgs/4.jpg",
  },
  {
    url: "https://anshulgupta.com/imgs/8.jpg",
  },
  {
    url: "https://anshulgupta.com/imgs/9.jpg",
  },
  {
    url: "https://anshulgupta.com/imgs/10.jpg",
  },
];

const colors = [
  { name: "green", hex: "#00bf63", urlIndex: 0 },
  { name: "blue", hex: "#5ce1e6", urlIndex: 1 },
  { name: "red", hex: "#ff3131", urlIndex: 2 },
  { name: "pink", hex: "#cb6ce6", urlIndex: 3 },
  { name: "black", hex: "#a6a6a6", urlIndex: 4 },
];

const defaultPageDimensions = await getDefaultPageDimensions();
if (!defaultPageDimensions) {
  throw Error("Failed to get default page dimensions");
}

let canvasWidth = defaultPageDimensions.width;
let canvasHeight = defaultPageDimensions.height;

let edgeCounter = 0;

async function githubLink() {
  const response = await requestOpenExternalUrl({
    url: "https://github.com",
  });
}

async function handleClick(colorName: string) {
  const color = colors.find((color) => color.name === colorName);
  if (!color) {
    console.error(`No color found for name "${colorName}"`);
    return;
  }

  const url = links[color.urlIndex].url;

  const result = await upload({
    type: "IMAGE",
    id: "decoration",
    mimeType: "image/jpeg",
    url: url,
    thumbnailUrl: url,
  });

  let scaledImg = Math.random() * (300 - 100) + 50;

  let rotation = Math.random() * (180 - -180) + -180;

  let edge = edgeCounter % 4;
  let left, top;

  switch (edge) {
    case 0:
      left = Math.random() * (canvasWidth - scaledImg);
      top = -scaledImg / 2;
      break;
    case 1:
      left = Math.random() * (canvasWidth - scaledImg);
      top = canvasHeight - scaledImg / 2;
      break;
    case 2:
      left = -scaledImg / 2;
      top = Math.random() * (canvasHeight - scaledImg);
      break;
    case 3:
      left = canvasWidth - scaledImg / 2;
      top = Math.random() * (canvasHeight - scaledImg);
      break;
  }

  await addNativeElement({
    type: "IMAGE",
    ref: result.ref,
    left: left,
    top: top,
    width: scaledImg,
    height: scaledImg,
    rotation: rotation,
  });

  edgeCounter++;
}
export function parseJsonFromString(text) {
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("Invalid string format for JSON parsing.");
  }
  const jsonString = text
    .substring(startIndex, endIndex + 1)
    .replace(/(\r\n|\n|\r)/gm, "");
  console.log(jsonString);

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw new Error("Failed to parse JSON.");
  }

  // const jsonString = text.substring(startIndex, endIndex + 1).replace(/(\r\n|\n|\r)/gm,"");
  // console.log(jsonString);
  // try {
  //   return JSON.parse(jsonString);
  // } catch (error) {
  //   console.error('Failed to parse JSON:', error);
  //   throw new Error('Failed to parse JSON.');
  // }
}

export const App = () => {
  const [activeColor, setActiveColor] = React.useState<string>(colors[0].name);
  const [link, setLink] = useState("");
  const [responseContent, setResponseContent] = useState("");

  const handleSubmit = async (event) => {
    event.target.parentNode.style = "background: gray;";
    event.target.style = "background: gray;";
    event.target.disabled = true;
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
          body: JSON.stringify({
            prompt:
              `Based on a the below research paper, generate a 10 slide presentation in the following structure:\n\nIntroduction and background on topic\nKey contributions / novelties\nResults / datapoints\nImpact / contributions / caveats\n\nUse 2-3 slides per part, and present things as slideshows aimed for a presentation for the general public\n\nUse 2-3 comprehensive, clear, but insightful and value-adding full sentence bullet points per slide max, and generate a sub heading for each slide. Do not make up data and do not make up things that you do not know. Emphasize specific results and data points\n\nRefer to the document, results, and actions. Return it in json format in the following json format: {"title":"<title>", "authors":"<authors", "slides": [{"heading":"<heading>", "body":"<body>"}...]}. Here is the research paper: ` +
              text,
          }),
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
        event.target.parentNode.style = "";
        event.target.style = "";
        event.target.disabled = false;
        // setResponseBody(body);
      } catch (error) {
        console.error(error);
        event.target.parentNode.style = "";
        event.target.style = "";
        event.target.disabled = false;
      }

      console.log(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      event.target.parentNode.style = "";
      event.target.style = "";
      event.target.disabled = false;
    }
    event.target.parentNode.style = "";
    event.target.style = "";
    event.target.disabled = false;
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
    addPage({
      elements: [
        // headerElement
        {
          type: "GROUP",
          children: [
            {
              type: "TEXT",
              children: [responseBody.title], // Center align -- run calculations to find center of page - content offset
              top: 0,
              left: 50,
              width: 700,
              fontSize: 50,
              fontWeight: "bold",
            },
            {
              type: "TEXT",
              children: [responseBody.authors], // Center align -- run calculations to find center of page - content offset
              top: 300,
              left: 50,
              width: 700,
              fontSize: 35,
            },
          ],
          top: 200,
          left: 50,
          width: 700,
          height: "auto",
        },
      ],
    });
    await handleClick(activeColor);
    await handleClick(activeColor);
    // Use a for...of loop to iterate over slides, allowing for await within the loop
    for (const slide of responseBody.slides) {
      addPage({
        elements: [
          {
            type: "GROUP",
            children: [
              {
                type: "TEXT",
                children: [slide.heading],
                top: 0,
                left: 0,
                width: 700,
                fontSize: 35,
                textAlign: "center",
              },
              {
                type: "TEXT",
                children: [slide.body],
                top: 150,
                left: 0,
                width: 700,
                fontSize: 25,
              },
            ],
            top: 50,
            left: 50,
            width: 700,
            height: "auto",
          },
        ],
      });
      await handleClick(activeColor);
      await handleClick(activeColor);
      await new Promise((resolve) => setTimeout(resolve, 5000));
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
            Welcome to Kanga, a software streamlining research papers into
            elegant presentations on Canva – be it slides, text, or images.
          </Text>
          <ImageCard
            alt="grass image"
            ariaLabel="Add image to design"
            borderRadius="standard"
            onClick={() => {}}
            onDragStart={() => {}}
            thumbnailUrl="https://raw.githubusercontent.com/theAnshulGupta/theanshulgupta.github.io/master/diagram.png"
          />
          <Title size="small">Select Theme</Title>
          <Columns spacing="1u">
            {colors.map((color) => (
              <Column key={color.name}>
                <Rows spacing="1u">
                  <Swatch
                    fill={[color.hex]}
                    onClick={() => setActiveColor(color.name)}
                    active={activeColor === color.name}
                  />
                </Rows>
              </Column>
            ))}
            <Column></Column>
          </Columns>

          <Title size="small">Enter Link</Title>
          <TextInput
            value={link}
            onChange={(value) => setLink(value)}
            placeholder="Research Paper URL"
          />
          <Button
            variant="primary"
            type="submit"
            stretch
            onClick={() => {
              handleSubmit(event);
              // handleClick(activeColor);
            }}
          >
            Generate Presentation
          </Button>
          {responseContent && (
            <Text>
              <pre>{responseContent}</pre>
            </Text>
          )}
          <Text size="medium">
            Link a research paper above.{" "}
            <Link
              href="https://github.com"
              requestOpenExternalUrl={githubLink}
              title="Github"
            >
              Github
            </Link>
          </Text>
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

//? random logic
// function getRandomLink(links: { url: string }[]) {
//   const randomIndex = Math.floor(Math.random() * links.length);
//   return links[randomIndex];
// }
// const randomNum = Math.floor(Math.random() * 4) + 1;
// const randomLink = getRandomLink(links).url;
// const uniqueUrl = `${randomLink}?random=${Math.random()}`;
// let start = (randomNum - 1) * 3;
// let end = randomNum === 4 ? links.length : start + 3;
// const randomLink =
//   links[Math.floor(Math.random() * (end - start)) + start].url;
