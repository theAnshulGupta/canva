import React from "react";
import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement, addPage } from "@canva/design";
import styles from "styles/components.css";
import { getDefaultPageDimensions } from "@canva/design";

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
              children: ["Deep diving into our data with clear direction"], // Center align -- run calculations to find center of page - content offset
              top: 100,
              left: 50,
              width: 600,
              fontWeight: "bold",
              fontSize: 50,
            },
            {
              type: "TEXT",
              children: ["Deep diving into our data with clear direction"], // Center align -- run calculations to find center of page - content offset
              top: 270,
              left: 50,
              width: 600,
              fontSize: 16,
            },
          ],
          top: 150,
          left: 50,
          width: 700,
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
