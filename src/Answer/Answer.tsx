import React from "react";

type Props = {
  answerObj: question;
  handleAnswer: (isCorrectAnswer: boolean) => void;
};

const Answer = ({ answerObj, handleAnswer}: Props) => {
  const { answer, isCorrect } = answerObj;
  const handleAnswerClick = () => {
    handleAnswer(isCorrect);
  };
  return <div onClick={handleAnswerClick}>{answer}</div>;
};

export default Answer;
