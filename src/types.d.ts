type QuizSettingsObject = {
    cat: string;
    numQuestions: string;
} 

type question = {
    answer:string;
    isCorrect: boolean;
    num: number;
}

type QuestionSet = question[]
