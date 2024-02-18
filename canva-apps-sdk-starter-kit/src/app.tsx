import {
  Button,
  Columns,
  Column,
  Rows,
  Swatch,
  Text,
  Title,
} from "@canva/app-ui-kit";
import { initAppElement } from "@canva/design";
import React from "react";
import styles from "styles/components.css";
import * as llm from "./llm";
import {
  addPage,
  getDefaultPageDimensions,
  addNativeElement,
} from "@canva/design";
import { upload } from "@canva/asset";

type FontWeight = "normal" | "bold";
type FontStyle = "normal" | "italic";
type Decoration = "none" | "underline";
type TextAlign = "start" | "center" | "end";

type AppElementData = {
  text: string;
  color: string;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  decoration: Decoration;
  textAlign: TextAlign;
  width: number;
  rotation: number;
  useCustomWidth: boolean;
};

type UIState = AppElementData;

const initialState: UIState = {
  text: "Welcome",
  color: "#00000",
  fontWeight: "normal",
  fontStyle: "normal",
  decoration: "none",
  textAlign: "start",
  width: 250,
  rotation: 0,
  useCustomWidth: false,
};

const colorToUrlIndex = {
  green: 0,
  blue: 1,
  red: 2,
  pink: 3,
  black: 4,
};

const appElementClient = initAppElement<AppElementData>({
  render: (data) => {
    return [
      {
        type: "TEXT",
        top: 0,
        left: 0,
        ...data,
        width: data.useCustomWidth ? data.width : undefined,
        children: [data.text],
      },
    ];
  },
});

const renderResponse = async () => {
  try {
    // Assume fetchData is an async function that fetches data from an API
    let extracted_text = `
    While the scientific explorations have churned out the role of micro/nano molecules and omics in psychiatry, the art of observation of an individual in its entirety, in an interaction, has gone underemphasized. The microscopic scrutiny of fractions somehow has overshadowed macroscopic study of interactions. While our classificatory systems are concerned with rise of gaming disorders and other Internet-related mental health problems, industries have been closely observing online behaviors of these users, making sense of their need/motivation, likes/dislikes, and utilizing these to promote sale and reap benefits. This concept of observing online proxies of behavior and emotions to understand human psyche has ramified into dimensions of mental health care and is called digital phenotyping.

    `;
    let data = await llm.getSlidesForText(extracted_text);
    console.log(data);
    data.forEach(async (element) => {
      const child = element.bullets.map((elm) => ({
        type: "TEXT",
        children: [elm],
        width: 200,
        height: "auto",
        top: 50,
        left: 50,
      }));
      console.log(child);
      await addPage({
        elements: [child],
      });
    });
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
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

// function getRandomLink(links: { url: string }[]) {
//   const randomIndex = Math.floor(Math.random() * links.length);
//   return links[randomIndex];
// }
// const randomNum = Math.floor(Math.random() * 4) + 1;

const defaultPageDimensions = await getDefaultPageDimensions();
if (!defaultPageDimensions) {
  throw Error("Failed to get default page dimensions");
}

let canvasWidth = defaultPageDimensions.width;
let canvasHeight = defaultPageDimensions.height;

let edgeCounter = 0;

async function handleClick(color: string) {
  // const randomLink = getRandomLink(links).url;
  // const uniqueUrl = `${randomLink}?random=${Math.random()}`;
  // let start = (randomNum - 1) * 3;
  // let end = randomNum === 4 ? links.length : start + 3;
  // const randomLink =
  //   links[Math.floor(Math.random() * (end - start)) + start].url;

  const urlIndex = colorToUrlIndex[color];
  if (urlIndex === undefined) {
    console.error(`No URL defined for color "${color}"`);
    return;
  }
  const url = links[urlIndex].url;

  const result = await upload({
    type: "IMAGE",
    id: "decoration",
    mimeType: "image/jpeg",
    url: url,
    thumbnailUrl: url,
  });

  let scaledImg = Math.random() * (300 - 100) + 100;

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

const colors = [
  { name: "green", hex: "#00bf63" },
  { name: "blue", hex: "#5ce1e6" },
  { name: "red", hex: "#ff3131" },
  { name: "pink", hex: "#cb6ce6" },
  { name: "black", hex: "#a6a6a6" },
];

export const App = () => {
  const [state] = React.useState<UIState>(initialState);
  const [activeColor, setActiveColor] = React.useState<string>(colors[0].name);

  const { text, color } = state;

  const disabled = text.trim().length < 1 || color.trim().length < 1;

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Title>Research to Slides</Title>
        <Text>
          Welcome to [project], a software meant to streamline research papers
          into elegant presentations on Canva – be it slides, text, or images.
        </Text>

        <Title size="small">Colors</Title>
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

        <Button
          onClick={() => {
            appElementClient.addOrUpdateElement(state);
            handleClick(activeColor);
          }}
          disabled={disabled}
          stretch
          variant="primary"
        >
          Generate Presentation
        </Button>
      </Rows>
    </div>
  );
};
