/*<!--Code Reference: https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript-->*/
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('answer-choice'));
const qTracker = document.getElementById('questionTracker');
const qScore = document.getElementById('quizScore')

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionTracker = 0;
let availableQuesions = [];
let questions = [];

fetch('https://opentdb.com/api.php?amount=25&category=9&type=multiple')
  .then((res) => {
      return res.json();
  })
  .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
              question: loadedQuestion.question,
          };

          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          answerChoices.splice(
              formattedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer
          );

          answerChoices.forEach((choice, index) => {
              formattedQuestion['choice' + (index + 1)] = choice;
          });

          return formattedQuestion;
      });
      startGame();
  })
  .catch((err) => {
      console.error(err);
  });

//CONSTANTS
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionTracker >= MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score);
      //score page
      return window.location.assign('/brainbox/submitscore.html');
  }
  questionTracker++;
  qTracker.innerText = questionTracker + "/" + MAX_QUESTIONS;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];

      const classToApply =
          selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      if (classToApply === 'correct') {
          incrementScore(SCORE_POINTS);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
      }, 600);
  });
});

incrementScore = (num) => {
  score += num;
  qScore.innerText = score;
};
