import  React  from "react";
import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questios";

const LIMITED_QUESTIONS = 10 

export const Start = () => {
    
    const setQuestions = useQuestionsStore(state => state.setQuestions)
    const handleStart = () => {
        setQuestions(LIMITED_QUESTIONS)
    }

    return (
        <Button onClick={()=>{handleStart()}}variant="contained" color="primary">
            EMPEZAR
        </Button>
    )
}