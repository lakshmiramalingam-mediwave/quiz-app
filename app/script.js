const knowledge = [
  {
    id: "1",
    question: "What are the major languages spoken in Andhra Pradesh?",
    options: ["Odia ", "tamil", "Telugu ", " Kannada"],
    correctAns: "Telugu",
  },
  {
    id: "2",
    question: "Which state has the largest area?",
    options: ["maharashtra", "madhya pradesh", "uttar pradesh", "rajasthan"],
    correctAns: "rajasthan",
  },
  {
    id: "3",
    question: "Where is the headquarters of ISRO located?",
    options: ["chennai", "bangalore", "mumbai", "pune"],
    correctAns: "bangalore",
  },
  {
    id: "4",
    question: "How many languages does the Indian constitution recognise?",
    options: ["22 ", "15", "10", "31"],
    correctAns: "bangalore",
  },
];

const sports = [
  {
    id: "1",
    question:
      "Which country is the winner of the SAFF Women’s Championship title in 2022?",
    options: ["india", "nepal", "bangladesh", "sri lanka"],
    correctAns: "bangladesh",
  },

  {
    id: "2",
    question: "Which country is the host of the Commonwealth Games 2026",
    options: ["India", "sri lanka", "Australia", "UAE"],
    correctAns: "Australia",
  },
  {
    id: "3",
    question:
      "Which sportsperson was awarded the ‘Dhyan Chand Khel Ratna Award 2022’?",
    options: ["P V Sindhu", "Sharath Kamal", "Mary Kom", "Virat Kohli"],
    correctAns: "Sharath Kamal",
  },
  {
    id: "4",
    question:
      "Eliud Kipchoge, who was seen in the news, is associated with which sports",
    options: [" Cricket", "Marathon", " Weight-Lifting", "tennis"],
    correctAns: "Marathon",
  },
];

const questionCollection = {
  knowledge: knowledge,
  sports: sports,
};
//drop down
const selectElement = document.getElementById("category");
let selectedValue = "";
const quiz = document.querySelector("#quiz");
quiz.style.display = "none";
const category = [
  {
    name: "knowledge",
    value: "knowledge",
  },
  {
    name: "sports",
    value: "sports",
  },
];
// option created and append into select tag
for (let sub of category) {
  const option = document.createElement("option");
  option.value = sub.value;
  option.textContent = sub.name;

  selectElement.appendChild(option);
}
// Get  selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function () {
    //procced data get
  selectedValue = selectElement.value;
  const container = document.querySelector(".container");
  container.style.display = "none";
  const quiz = document.querySelector("#quiz");
  quiz.style.display = "block";
  clearContent();
  appendToContent();
  appendToButton();
  updateUiList(selectedValue);
});
// function callQuestion(value){

function updateUiList(value) {
  const app = document.querySelector("#app");
  for (let mcq of questionCollection[value]) {
    const event = MakeQuestionList(mcq);
    app.appendChild(event);
  }
}
function clearContent() {
  const content = document.querySelector("#content");
  content.innerHTML = "";
}

// const urlParams = new URLSearchParams(window.location.search);
// const myType = urlParams.get("type");

// console.log(questionCollection[myType]);

function MakeQuestionList(mcq) {
  const div = document.createElement("div");
  div.setAttribute("class", "question-container");
  div.setAttribute("id", `question-${mcq["id"]}`);

  const questionDiv = document.createElement("div");
  questionDiv.setAttribute("class", "question");

  const questionParagraph = document.createElement("p");
  questionParagraph.textContent = mcq["question"];
  questionDiv.appendChild(questionParagraph);

  const optionDiv = document.createElement("div");
  optionDiv.setAttribute("class", "options");
  optionDiv.setAttribute("id", "options");

  for (let i = 0; i < mcq.options.length; i++) {
    const label = document.createElement("label");

    const inputRadio = document.createElement("input");
    inputRadio.setAttribute("type", "radio");
    inputRadio.setAttribute("id", `radio-${mcq["id"]}`);
    inputRadio.setAttribute("name", `answer-${mcq["id"]}`);
    inputRadio.value = mcq.options[i];

    label.appendChild(inputRadio);
    label.appendChild(document.createTextNode(mcq.options[i]));
    optionDiv.appendChild(label);
  }
  const resultdiv = document.createElement("div");
  const resultId = `result-${mcq["id"]}`;
  resultdiv.setAttribute("id", resultId);
  resultdiv.className = "ans-div";

  div.appendChild(questionDiv);
  div.appendChild(optionDiv);
  div.appendChild(resultdiv);

  const submit = document.querySelector("#submitBtn");
  submit.addEventListener("click", function () {
    const selected = document.querySelector(
      `input[name="answer-${mcq.id}"]:checked`
    );

    const checkAnswer = mcq.correctAns;
    if (selected) {
      const selectedAnswer = selected.value;
      if (checkAnswer == selectedAnswer) {
        correctAnsShow(checkAnswer, `${mcq["id"]}`, "green");
      } else {
        correctAnsShow(checkAnswer, `${mcq["id"]}`, "red");
      }
    } else {
      correctAnsShow(checkAnswer, `${mcq["id"]}`, "orange");
    }
  });

  // findwrong Answering(`result-${mcq["id"]}`);

  return div;
}
function correctAnsShow(ans, resultId, add) {
  const divId = `#question-${resultId}`;
  const divClass = "border-" + add;
  const div = document.querySelector(divId);
  div.classList.add(divClass);
  const selector = `#result-${resultId}`;
  const result = document.querySelector(selector);
  result.innerHTML = "Ans: " + ans;
  result.classList.add(add);
}

function appendToButton() {
  const app = document.querySelector("#buttons");

  const submit = document.createElement("button");
  submit.id = "submitBtn";
  submit.innerHTML = "submit";
  const back = document.createElement("button");
  back.id = "backBtn";
  back.innerHTML = "Back";

  app.appendChild(back);
  app.appendChild(submit);

  back.addEventListener("click", () => {
    const container = document.querySelector(".container");
    const quiz = document.querySelector("#quiz");
    quiz.style.display = "none";
    container.style.display = "block";
  });
}
function appendToContent() {
  const content = document.querySelector("#content");
  const appDiv = document.createElement("div");
  appDiv.id = "app";

  // Create another div with the id "buttons"
  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "buttons";

  // Append the created div elements to the document's body or another parent element
  content.appendChild(appDiv);
  content.appendChild(buttonsDiv);
}
