import React from "react";
import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement, addPage } from "@canva/design";
import styles from "styles/components.css";

export const App = () => {
  async function handleClick() {
    await addPage({
      elements: [
        // headerElement
        {
          type: "GROUP",
          children: [
            {
              type: "TEXT",
              children: ["Conclusion TITLE TITLE TITLE"], // Center align -- run calculations to find center of page - content offset
              top: 0,
              left: 0,
              width: 1200,
              fontSize: 90,
              fontWeight: "bold",
            },
            {
              type: "TEXT",
              children: ["Islamophobia poses a significant "], // Center align -- run calculations to find center of page - content offset
              top: 0,
              left: 0,
              width: 200,
              fontSize: 36,
            },
          ],
          top: 200, //1080
          left: 300, //1920
          width: 600,
          height: "auto",
        },
      ],
    });
  }

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <Text>
          This example demonstrates how apps can create groups of elements.
        </Text>
        <Button variant="primary" onClick={handleClick} stretch>
          Add group element
        </Button>
      </Rows>
    </div>
  );
};
