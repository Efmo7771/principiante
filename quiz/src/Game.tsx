import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { type Questions as QuestionsType } from "./types";
import { useQuestionsStore } from "./store/questios";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionsType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  // usuario no ha seleccionado respuesta
  if (userSelectedAnswer == null) return "transparent";
  // usuario ha seleccionado respuesta pero solución es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  // usuario ha seleccionado respuesta y solución es correcta
  if (index === correctAnswer && index === userSelectedAnswer) return "green";
  // usuario ha seleccionado respuesta y solución es incorrecta
  if (index === correctAnswer && index !== userSelectedAnswer) return "red";
  // ninguna de las anteriores
  return "blue";
};

const Question = ({ info }: { info: QuestionsType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#111", p: 4, textAlign: "left", mt: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion);
  const questios = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore(
    (state) => state.currentQuestionIndex
  );
  const questionInfo = questios[currentQuestion];
  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion+1} / {questios.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >=questios.length-1 }>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer/>
    </>
  );
};
