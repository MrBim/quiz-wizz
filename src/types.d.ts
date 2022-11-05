type QuizSettingsObject = {
    cat: string;
    numQuestions: string;
}

type answer = {
    answer: string;
    isCorrect: boolean;
    num: number;
}

type QuizApiData = {
    category: string;
    id: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    question: string;
    tags: string[];
    type: string;
    difficulty: string;
    regions: string[]
}
