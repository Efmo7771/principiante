// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { create } from "zustand";
import { Questions } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Questions[];
  currentQuestionIndex: number;
  setQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answersIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestionIndex: 0,
        setQuestions: async (limit: number) => {
          const response = await fetch(`http://localhost:5173/data.json`);
          const data = await response.json();
          const questions = data
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ questions });
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          if (isCorrectUserAnswer) confetti();
          set({ questions: newQuestions });
        },
        goNextQuestion: () => {
          const { currentQuestionIndex, questions } = get();
          const nextQuestion = currentQuestionIndex + 1;
          if (nextQuestion <= questions.length) {
            set({ currentQuestionIndex: nextQuestion });
          }
        },
        goPrevQuestion: () => {
          const { currentQuestionIndex } = get();
          const nextQuestion = currentQuestionIndex - 1;
          if (nextQuestion >= 0) {
            set({ currentQuestionIndex: nextQuestion });
          }
        },
        reset: () => {
            set({
                currentQuestionIndex: 0, questions: []
            })
        }
      };
    },
    { name: "questions-store" }
  )
);
