import React from "react";
import { Stack, Container, Typography } from "@mui/material";
import "./App.css";
import { LogoJavaScript } from "./LogoJavaScript";
import { Start } from "./Start";
import { useQuestionsStore } from "./store/questios";
import { Game } from "./Game";

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <LogoJavaScript />
          <Typography variant="h2" component="h1">
            QUIZ
          </Typography>
        </Stack>
        {questions.length===0 && <Start />}
        {questions.length>0 && <Game/>}
      </Container>
    </main>
  );
}

export default App;
