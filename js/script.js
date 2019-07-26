"use strict";
import quizData from "./quiz-data.js";

createQuestionnaire(quizData);
const form = document.querySelector(".quiz-form");
const resultOutput = document.querySelector(".output");
form.addEventListener("submit", handleSubmit);

function handleSubmit(moment) {
  moment.preventDefault();
  const results = {};
  const formData = new FormData(moment.currentTarget);
  formData.forEach((value, name) => {
    results[name - 1] = value - 1;
  });
  let value_true_ansewers = 0;
  for (const key of Object.keys(results)) {
    const { answer } = quizData.questions[key];
    Number(results[key]) === answer
      ? (value_true_ansewers += 1)
      : (value_true_ansewers = value_true_ansewers);
  }
  value_true_ansewers >= Math.round(quizData.questions.length * 0.8)
    ? (resultOutput.textContent = `Вы успешно прошли тест ответив на ${value_true_ansewers} вопрос(ов) из ${
        quizData.questions.length
      }`)
    : (resultOutput.textContent = `Вы не прошли тест, но ответили правильно  на ${value_true_ansewers}  вопрос(ов) из ${
        quizData.questions.length
      }`);
}
function createQuestionnaire({ title, questions }) {
  let questionsNumberCounter = 1;
  const injectedForm = document.querySelector("form");
  const injectedFormButton = document.querySelector("form>button");
  const questionnaire = document.createElement("div");
  const questionnaireHeadline = document.createElement("h2");
  
  questionnaireHeadline.classList.add("questionnaire-headline");
  questionnaireHeadline.textContent = title;
  questionnaire.appendChild(questionnaireHeadline);
  questions
    .map(item => createQuestion(item))
    .forEach(item => questionnaire.appendChild(item));
  injectedForm.insertBefore(questionnaire, injectedFormButton);
  function createQuestion(questionObj) {
    const questionSection = document.createElement("section");
    questionSection.classList.add("question-section");
    const questionText = document.createElement("h3");
    questionText.classList.add("q-headline");
    questionText.textContent = `${questionsNumberCounter}.${
      questionObj.question
    }`;

    questionSection.appendChild(questionText);
    const answersBlock = document.createElement("ol");
    answersBlock.classList.add("ol-style");
    let questionNumberCounter = 1;
    const variantsOfChoices = questionObj.choices
      .map(constructed => {
        const constructedBlock = `
        <li class="li-style">
        <label>
        <input type="radio" name="${questionsNumberCounter}" value="${questionNumberCounter}" class="radio-style"  required="required"/>
        ${constructed}
        </label>
        </li>`;
        questionNumberCounter += 1;
        return constructedBlock;
      })
      .join("");
    questionsNumberCounter += 1;
    answersBlock.insertAdjacentHTML("afterbegin", variantsOfChoices);
    questionSection.appendChild(answersBlock);
    return questionSection;
  }
}
