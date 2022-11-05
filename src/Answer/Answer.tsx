import React from "react";
import Styles from "./Answer.module.css";

type Props = {
  answerObj: answer;
  handleAnswer: (isCorrectAnswer: boolean) => void;
};

const Answer = ({ answerObj, handleAnswer}: Props) => {
  const { answer, isCorrect } = answerObj;
  const handleAnswerClick = () => {
    handleAnswer(isCorrect);
  };
  return <div className={Styles.main} onClick={handleAnswerClick}>{answer}</div>;
};

export default Answer;
