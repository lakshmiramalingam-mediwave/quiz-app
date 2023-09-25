const state = {
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
  ],
  questions: [
    {
      id: 301,
      question: "What are the major languages spoken in Andhra Pradesh?",
      options: [
        { id: 10, text: "Odia", isCorrect: false },
        { id: 11, text: "tamil", isCorrect: false },
        { id: 12, text: "telugu", isCorrect: true },
        { id: 13, text: "kannada ", isCorrect: false },
      ],
      category: 2345,
    },
    {
      id: 333,
      question: "Which state has the longest coastal line in India?",
      options: [
        { id: 10, text: "gujart", isCorrect: false },
        { id: 11, text: "", isCorrect: false },
        { id: 12, text: "", isCorrect: true },
        { id: 13, text: " ", isCorrect: false },
      ],
      category: 2345,
    },

    {
      id: 302,
      question: "Where is the headquarters of ISRO located?",
      options: [
        { id: 18, text: "bihar", isCorrect: false },
        { id: 19, text: "madhya pradesh", isCorrect: false },
        { id: 20, text: "rajasthan", isCorrect: true },
        { id: 21, text: "utter Pradesh", isCorrect: false },
      ],
      category: 2345,
    },
    {
      id: 303,
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
      id: 311,
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
      id: 313,
      question: "Which is the longest river in the world?",
      options: [
        { id: 14, text: "Great Ganga", isCorrect: false },
        { id: 15, text: "Nile", isCorrect: false },
        { id: 16, text: "Amazon", isCorrect: true },
        { id: 17, text: "Niger", isCorrect: false },
      ],
      category: 1234,
    },
  ],
};

const selectElement = document.getElementById("category");
let selectedValue = "";
const quiz = document.querySelector("#quiz");
quiz.style.display = "none";

for (let sub of state.categories) {
  const option = document.createElement("option");
  option.id = sub.id;
  option.value = sub.value;
  option.textContent = sub.name;

  selectElement.appendChild(option);
}
// Get  selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function () {
  //procced data get
  selectedValue = selectElement.value;
  // container hide
  const categoryIndex = state.categories.findIndex((item) => {
    return item.value === selectedValue;
  });
  const getId = state.categories[categoryIndex].id;
  console.log(getId);
  const container = document.querySelector(".container");
  container.style.display = "none";
  const quiz = document.querySelector("#quiz");
  quiz.style.display = "block";
  // calling loacl storage
  setLocalStorageItem("selectedCategory", selectedValue);



  
  clearContent();
  appendToContent();
  appendToButton();
  updateUiList(getId);
});

function updateUiList(value) {
  const question = state.questions.filter((item) => {
    return item.category === value;
  });
  //  const getcategory=state.categories[categoryIndex].id;

  const app = document.querySelector("#app");
  for (let mcq of question) {
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
    inputRadio.setAttribute("id", `${mcq["options"][i]["id"]}`);
    inputRadio.setAttribute("name", `answer-${mcq["id"]}`);
    inputRadio.value = mcq.options[i].text;

    label.appendChild(inputRadio);
    label.appendChild(document.createTextNode(mcq.options[i]["text"]));

    console.log(mcq.options[i]);

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
      `input[name="answer-${mcq["id"]}"]:checked`
    );
    if (selected) {
      const userAnswer = selected.value;
      const answerIndex = mcq["options"].findIndex(
        (item) => item.text === userAnswer
      );
      const correctIndex = mcq["options"].findIndex(
        (item) => item.isCorrect === true
      );
      if (mcq["options"][answerIndex].isCorrect) {
        // const crtAns=mcq["options"][answerIndex].text
        correctAnsShow(
          mcq["options"][correctIndex].text,
          `${mcq["id"]}`,
          "green"
        );
      } else {
        correctAnsShow(
          mcq["options"][correctIndex].text,
          `${mcq["id"]}`,
          "red"
        );
      }
    } else {
      const correctIndex = mcq["options"].findIndex(
        (item) => item.isCorrect === true
      );
      correctAnsShow(
        mcq["options"][correctIndex].text,
        `${mcq["id"]}`,
        "orange"
      );
    }
  });

  // findNotAnswering(`result-${mcq["id"]}`);

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
//  local storage
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
// after refresh it will show same
window.addEventListener("load", function () {
    const storedCategory = getLocalStorageItem("selectedCategory");
    if (storedCategory) {
      selectElement.value = storedCategory;
      document.getElementById("proceed").click();
    }
  });