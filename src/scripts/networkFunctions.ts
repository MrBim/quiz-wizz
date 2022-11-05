export const getCategories = async () => {
  const url = `https://the-trivia-api.com/api/tags`
  const res = fetch(url);
  return await (await res).json()
}
export const getQuiz = async (quizSettings: QuizSettingsObject) => {
  const url = `https://the-trivia-api.com/api/questions?limit=${quizSettings.numQuestions}&tags=${quizSettings.cat}`;
  const res = fetch(url);
  return await (await res).json()
}
