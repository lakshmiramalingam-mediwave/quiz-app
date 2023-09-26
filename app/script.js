//array (content )
const state = [
  categories: [
    {
      id: 1234,
      name: "knowledge",
      value: "knowledge",
    },
    {
      id: 2345,
      name: "sports",
      value: "sports",
    },
  ];
],
  {
    id: "1",
    question: "What are the major languages spoken in Andhra Pradesh?",
    options: [
      { id: 10, text: "Odia", isCorrect: false },
      { id: 11, text: "tamil", isCorrect: false },
      { id: 12, text: "telugu", isCorrect: true },
      { id: 13, text: "kannada ", isCorrect: false },
    ],
    category: 1234,
  },
  {
    id: "2",
    question: "Which state has the largest area?",
    options: [
      { id: 14, text: "maharastra", isCorrect: false },
      { id: 15, text: "madhya pradesh", isCorrect: false },
      { id: 16, text: "rajasthan", isCorrect: true },
      { id: 17, text: "utter Pradesh", isCorrect: false },
    ],
    category: 1234,
  },
  {
    id: "3",
    question: "Where is the headquarters of ISRO located?",
    options: [
      { id: 18, text: "bihar", isCorrect: false },
      { id: 19, text: "madhya pradesh", isCorrect: false },
      { id: 20, text: "rajasthan", isCorrect: true },
      { id: 21, text: "utter Pradesh", isCorrect: false },
    ],
    category: 1234,
  },
  {
    id: "4",
    question: "How many languages does the Indian constitution recognise?",
    options: [
      { id: 22, text: "10", isCorrect: false },
      { id: 23, text: "15", isCorrect: false },
      { id: 24, text: "22", isCorrect: true },
      { id: 25, text: "31", isCorrect: false },
    ],
    category: 1234,
  },
  {
    id: "5",
    question: "How many languages does the Indian constitution recognise?",
    options: [
      { id: 26, text: "india", isCorrect: false },
      { id: 27, text: "bangladesh", isCorrect: true },
      { id: 28, text: "sri lanks", isCorrect: flase },
      { id: 29, text: "nepal", isCorrect: false },
    ],
    category: 2345,
  },
  {
    id: "6",
    question:
      "Which sportsperson was awarded the ‘Dhyan Chand Khel Ratna Award 2022’?",
    options: [
      { id: 30, text: "pv sindhu", isCorrect: false },
      { id: 31, text: " sharath kamal", isCorrect: true },
      { id: 32, text: "mary kom", isCorrect: flase },
      { id: 33, text: "virat kohli", isCorrect: false },
    ],
    category: 2345,
  },
  {
    id: "7",
    question:
      "Eliud Kipchoge, who was seen in the news, is associated with which sports",
    options: [
      { id: 34, text: "circket", isCorrect: false },
      { id: 35, text: " marathon", isCorrect: true },
      { id: 36, text: "weight-lighting", isCorrect: flase },
      { id: 37, text: "tennis", isCorrect: false },
    ],
    category: 2345,
  },
];

// script la check whether knowlege or sports
const questionCollection = {
  knowledge: knowledge,
};
//drop down
const selectElement = document.getElementById("category");
let selectedValue = "";
const quiz = document.querySelector("#quiz");
quiz.style.display = "none";
  
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
  // container hide
  const container = document.querySelector(".container");
  container.style.display = "none";
  // container hide panitu quiz show panu
  const quiz = document.querySelector("#quiz");
  quiz.style.display = "block";
  // query selector use pani clear function
  clearContent();
  // clear panatha append
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

// (questionCollection[myType]);

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
    // radio button  using same id  input using checked ans
    const inputRadio = document.createElement("input");
    inputRadio.setAttribute("type", "radio");
    inputRadio.setAttribute("id", `radio-${mcq["id"]}`);
    inputRadio.setAttribute("name", `answer-${mcq["id"]}`);
    inputRadio.value = mcq.options[i];

    label.appendChild(inputRadio);
    label.appendChild(document.createTextNode(mcq.options[i]["text"]));
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
//function for correct answert
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
// function for back and submit
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
  // click function use pani quiz back kudutha cointer ku ponum

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



















want
setLocalStorageItem("selectedCategory", selectedValue);

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return true;
}
function getLocalStorageItem(key) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error("Error retrieving data from localStorage:", error);
    return null;
  }
}




window.addEventListener("load", function () {
  const storedCategory = getLocalStorageItem("selectedCategory");
  if (storedCategory) {
    selectElement.value = storedCategory;
    document.getElementById("proceed").click();
  }
});

// selectElement.value = storedCategory;
      // document.getElementById("proceed").click();