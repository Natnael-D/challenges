    
    const quizData = [
      {
        question: "what is the capital city of Ethiopia?",
        options: [
          "Adama",
          "Addis Ababa",
          "Debremarkos",
          "Mekelle"
        ],
        answer: "Addis Ababa"
      },

      {
        question: "which one is the largest continent?",
        options: ["Africa", "Asia", "North America", "South America"],
        answer: "Asia"
      },
            {
        question: "who was the first american president?",
        options: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"],
        answer: "George Washington"
      },

      {
        question: "Which language is used for web interactivity?",
        options: ["C++", "JavaScript", "SQL", "PHP"],
        answer: "JavaScript"
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    const questionElement = document.getElementById("question");
    const options = document.querySelectorAll(".option");
    const nextBtn = document.getElementById("nextBtn");
    const quizContainer = document.querySelector(".quiz-container");

    function loadQuestion() {
      let currentQuiz = quizData[currentQuestion];

      questionElement.innerText = currentQuiz.question;

      options.forEach((option, index) => {
        option.innerText = currentQuiz.options[index];
        option.classList.remove("selected");
      });

      selectedOption = null; //reset selection state
    }
//to choose the answer
    options.forEach(option => {
      option.addEventListener("click", () => {

        options.forEach(opt => opt.classList.remove("selected")); //only one option looks selected at a time

        option.classList.add("selected");
        selectedOption = option.innerText; //grab the text and save it
      });
    });

    nextBtn.addEventListener("click", () => {

      if(selectedOption === null){
        alert("Please select an answer!");
        return;
      }

      if(selectedOption === quizData[currentQuestion].answer){
        score++;
      }

      currentQuestion++;

      if(currentQuestion < quizData.length){
        loadQuestion();
      } else {
        showResult();
      }
    });

    function showResult(){
      quizContainer.innerHTML = `
        <div class="result">
          <h2>Quiz Completed 🎉</h2>
          <p>Your Score: ${score} / ${quizData.length}</p>
          <button onclick="location.reload()">Restart Quiz</button>
        </div>
      `;
    }

    loadQuestion();

