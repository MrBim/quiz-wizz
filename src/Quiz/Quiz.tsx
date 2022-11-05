import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { getQuiz } from "../scripts/networkFunctions";
import { useQuery } from "react-query";
import { shuffle } from "../scripts/shuffle";
import Answer from "../Answer/Answer";

type Props = {
  quizSettings: QuizSettingsObject;
  setShowQuizSettings: Dispatch<SetStateAction<boolean>>;
};
const Quiz = ({ quizSettings, setShowQuizSettings }: Props) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const resetQuiz = () => {
    setQuestionNum(0)
    setScore(0)
    setShowEndScreen(false)
    setShowQuizSettings(true)
  }
  const { data, error } = useQuery(["quiz", quizSettings.cat], () =>
    getQuiz(quizSettings)
  );

  const formattedQuestions = useMemo(() => {
    if (!data)
      return [{ question: "there are", answers: [" no formattedQuestions,"] }];
    const munge = data.map((it: any) => {
      const answers = it.incorrectAnswers.map((it: unknown, i: number) => ({
        answer: it,
        isCorrect: false,
        num: i,
      }));
      const correctAnswer = {
        answer: it.correctAnswer,
        isCorrect: true,
        num: answers.length,
      };
      return {
        question: it.question,
        answers: shuffle([...answers, correctAnswer]),
      };
    });
    return munge;
  }, [data]);

  const handleAnswer = (isCorrectAnswer: boolean) => {
    console.log("questionNum: ", questionNum);
    if (questionNum === formattedQuestions.length - 1) {
      setShowEndScreen(true);
    }
    if (isCorrectAnswer) setScore(score + 1);
    setQuestionNum(questionNum + 1);
  };
  if (error) return <h1>everything is wrong and bad</h1>;
  return (
    <div>
      <h1>this is the Quiz</h1>
      {formattedQuestions && formattedQuestions.length && showEndScreen ? (
        <>
          <div>you have scored {`${score}/${formattedQuestions.length}`}</div>
          <button onClick={resetQuiz}>take another quiz</button>
        </>
      ) : null}
      {!showEndScreen ? (
        <>
          <div>
            question {questionNum + 1}/{formattedQuestions.length}:{" "}
            {formattedQuestions[questionNum].question}
          </div>
          {formattedQuestions && formattedQuestions.length
            ? formattedQuestions[questionNum].answers.map((it: question) => (
                <Answer
                  key={it.answer}
                  answerObj={it}
                  handleAnswer={handleAnswer}
                />
              ))
            : null}
        </>
      ) : null}
    </div>
  );
};

export default Quiz;
