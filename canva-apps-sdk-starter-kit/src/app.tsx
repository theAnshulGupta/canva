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

export const App = () => {
  const [link, setLink] = useState("");
  const [responseContent, setResponseContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseContent(JSON.stringify(data, null, 2));
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
