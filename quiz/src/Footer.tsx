import React from "react";
import { useQuestionsStore } from "./store/questios";
export const Footer = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const reset = useQuestionsStore((state) => state.reset);
  let correct = 0;
  let inCorrect = 0;
  let unAnswer = 0;

  questions.forEach((q) => {
    if (q.userSelectedAnswer == null) {
      unAnswer++;
    } else if (q.isCorrectUserAnswer) {
      correct++;
    } else {
      inCorrect++;
    }
  });

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>
        {`✅ ${correct} correctas - ❌ ${inCorrect} incorrectas - ⭕ ${unAnswer} sin responder`}
      </strong>
      <div>
        <button onClick={reset} style={{ marginTop: "10px" }}>Reiniciar</button>
      </div>
    </footer>
  );
};
