import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { getCategories } from "../scripts/networkFunctions";
type Props = {
  setShowQuizSettings: Dispatch<SetStateAction<boolean>>;
  setQuizSettings: Dispatch<SetStateAction<QuizSettingsObject>>;
  quizSettings: QuizSettingsObject;
};

const QuizSettings = ({
  setShowQuizSettings,
  setQuizSettings,
  quizSettings,
}: Props) => {
  const [numQuestions, setNumQuestions] = useState("10");
  const [quizCat, setQuizCat] = useState({ label: "", value: "" });
  const handleStartQuiz = () => {
    setShowQuizSettings(false);
    setQuizSettings({
      cat: quizCat.value,
      numQuestions,
    });
  };

  const { data, error } = useQuery("categories", getCategories);
  
  const allCats = useMemo(() => {
    if (!data) return [];
    return data.map((it: string) => ({ value: it, label: it }));
  }, [data]);

  if (error) return <h1>everything is wrong and bad</h1>;
  return (
    <div>
      <h1>choose your quiz</h1>
      {/* select num of questions */}
      <h2>How many Questions?</h2>
      <select
        value={numQuestions}
        onChange={(e) => {
          setNumQuestions(e.target.value);
        }}
      >
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
      <h2>What Subject?</h2>
      <Select
        value={quizCat}
        name="Category"
        options={allCats}
        onChange={(e) => setQuizCat(e ? e : { label: "", value: "" })}
      />
      {/* select tag for quiz subject */}
      <button onClick={handleStartQuiz}>Play Your Quiz!</button>
    </div>
  );
};

export default QuizSettings;