import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Quiz from "./Quiz/Quiz";
import QuizSettings from "./QuizSettings/QuizSettings";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const [showQuizSettings, setShowQuizSettings] = useState(true);
  const [quizSettings, setQuizSettings] = useState<QuizSettingsObject>({
    cat: "",
    numQuestions: "10",
  });
  return (
    
    <QueryClientProvider client={queryClient}>
      {showQuizSettings ? (
        <QuizSettings
          setShowQuizSettings={setShowQuizSettings}
          setQuizSettings={setQuizSettings}
          quizSettings={quizSettings}
        />
      ) : null}
      {!showQuizSettings ? <Quiz quizSettings={quizSettings} setShowQuizSettings={setShowQuizSettings} /> : null}
    </QueryClientProvider>
  );
}

export default App;
