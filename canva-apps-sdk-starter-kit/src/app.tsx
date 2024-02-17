import {
  Button,
  FormField,
  MultilineInput,
  Rows,
  Text,
  Title,
} from "@canva/app-ui-kit";
import { auth } from "@canva/user";
import React, { useState, useEffect } from "react";
import styles from "styles/components.css";


const BACKEND_URL = `${BACKEND_HOST}/custom-route`;
const BACKEND_HOST_OPENAI = `${BACKEND_HOST}/openai`; // Change 3000 to your server's port

type State = "idle" | "loading" | "success" | "error";

export const App = () => {

  // const [response, setResponse] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const result = await axios.post('/openai', { prompt: 'Hello, world!' });
  //       const result = await axios.post(BACKEND_HOST_OPENAI, { prompt: 'Hello, world!' });
  //       setResponse(result.data.choices[0].text); // Assuming the response structure
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setResponse('Failed to fetch data');
  //     }
  //   };

  //   fetchData();
  // }, []);



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

  const [state, setState] = useState("idle");
  const [responseBody, setResponseBody] = useState(undefined);

  const sendOpenAIRequest = async () => {
    try {
      setState("loading");
      const token = await auth.getCanvaUserToken(); // Obtain JWT token
      const res = await fetch(BACKEND_HOST_OPENAI, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send JWT in the Authorization header
        },
        body: JSON.stringify({ prompt: "Your hardcoded prompt here" }),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const body = await res.json();
      setResponseBody(body);
      setState("success");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };



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
              onClick={sendOpenAIRequest}
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
    </div>
  );
};
