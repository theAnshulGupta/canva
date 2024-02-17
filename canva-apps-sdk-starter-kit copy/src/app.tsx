import React, { useState } from "react";
import {
  Button,
  Rows,
  Text,
  ImageCard,
  Title,
  TextInput,
} from "@canva/app-ui-kit";
import { addPage } from "@canva/design";

import styles from "styles/components.css";

import { addNativeElement } from "@canva/design";
import { extractText } from "./extractText";

const BACKEND_URL = `${BACKEND_HOST}/custom-route`;
const BACKEND_HOST_OPENAI = `${BACKEND_HOST}/openai`; // Change 3000 to your server's port

type State = "idle" | "loading" | "success" | "error";


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
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setResponseContent("Failed to load data. Please try again.");
    }
  };

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