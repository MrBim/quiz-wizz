import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { getQuiz } from "../scripts/networkFunctions";
import { useQuery } from "react-query";
import { shuffle } from "../scripts/shuffle";
import Answer from "../Answer/Answer";
import Styles from "./Quiz.module.css";

type Props = {
  quizSettings: QuizSettingsObject;
  setShowQuizSettings: Dispatch<SetStateAction<boolean>>;
};
const Quiz = ({ quizSettings, setShowQuizSettings }: Props) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [score, setScore] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const resetQuiz = () => {
    setQuestionNum(0);
    setScore(0);
    setShowEndScreen(false);
    setShowQuizSettings(true);
  };
  const { data, error } = useQuery(["quiz", quizSettings.cat], () =>
    getQuiz(quizSettings)
  );

  const formattedQuestions = useMemo(() => {
    if (!data)
      return [{ question: "there are", answers: [" no formattedQuestions,"] }];
    const munge = data.map((it: QuizApiData) => {
      const wrongAnswers = it.incorrectAnswers.map((it, i) => ({
        answer: it,
        isCorrect: false,
        num: i,
      }));
      const correctAnswer: answer = {
        answer: it.correctAnswer,
        isCorrect: true,
        num: wrongAnswers.length,
      };
      const answers = shuffle([...wrongAnswers, correctAnswer]);
      return {
        question: it.question,
        answers,
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
    <div className={Styles.main}>
      <h1 className={Styles.titleText}>A Quiz about {quizSettings.cat}</h1>

      {!showEndScreen ? (
        <>
          
          <div className={Styles.questionText}>
            question {questionNum + 1}/{formattedQuestions.length}:{" "}
            {formattedQuestions[questionNum].question}
          </div>
          <div className={Styles.answerArea}>
            {formattedQuestions && formattedQuestions.length
              ? formattedQuestions[questionNum].answers.map((it: answer) => (
                  <Answer
                    key={it.answer}
                    answerObj={it}
                    handleAnswer={handleAnswer}
                  />
                ))
              : null}
          </div>
        </>
      ) : null}

      {formattedQuestions && formattedQuestions.length && showEndScreen ? (
        <>
          <div>you have scored {`${score}/${formattedQuestions.length}`}</div>
          <button onClick={resetQuiz}>take another quiz</button>
        </>
      ) : null}
      {!showEndScreen && formattedQuestions && formattedQuestions.length && (formattedQuestions.length < parseInt(quizSettings.numQuestions)) ? (
            <>
              <div>
               ( there are only {formattedQuestions.length} questions about {quizSettings.cat}
              </div>
              <div>
                you can always try a different quiz if this makes you sad )
              </div>
              <button onClick={resetQuiz}>create a different quiz</button>
            </>
          ) : null}
    </div>
  );
};

export default Quiz;
