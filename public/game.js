import { getData } from '/public/fetch.js';

const teamContainer = document.getElementById("teams");
const answersContainer = document.getElementById("answers");


let randQuestion, questions, teams
let timer = 0 
let index = 0
let isWaitNext = false

const questionText = document.getElementById("question-text");
(async () => {
    const difficultyText = document.getElementById("text-difficulty")

    const dataTeams = await getData("../public/data/teams.json")
    teams = dataTeams
    const dataQuestions = await getData("../public/data/questions.json");
    questions = dataQuestions
    randQuestion = questions[Math.floor(Math.random() * questions.length)];

    questionText.innerHTML = randQuestion.question;
    difficultyText.innerHTML = randQuestion.difficulty
    console.log("test");
    let correctAnswer = randQuestion.answers.find(element => element.isCorrect);

    generateTeams(teams)
    generateAnswers(randQuestion, correctAnswer)
    handleGame(teams, correctAnswer)
})();

const generateTeams = () => {
    const teamsElement = teams.map(element => {
        const team = document.createElement("div");
        const textteam = document.createElement("h2");
        const textScore = document.createElement("span")

        team.className = "team";
        textteam.innerHTML = `${element.team} : `
        textteam.className = "text-team"
        textScore.innerHTML = 0
        textScore.className = "text-score"

        team.appendChild(textteam);
        team.appendChild(textScore)
        return team;
    });
    teamContainer.append(...teamsElement);
}

const generateAnswers = (randQuestion, correctAnswer) => {
    const answerElements = randQuestion.answers.map(element => {
        const answer = document.createElement("div");
        answer.className = "answer";
        const textAnswer = document.createElement("h2");
        textAnswer.innerHTML = element.answer;
        textAnswer.className = "text-answer";
        answer.addEventListener("click", () => checkAnswers(randQuestion, correctAnswer, answer))
        answer.appendChild(textAnswer);
        return answer;
    });
    answersContainer.append(...answerElements);
}


const checkAnswers = (question, correctAnswer, clickedAnswer) => {
    console.log(index);
    if (!isWaitNext) {
        isWaitNext = true;
        const textScore = document.getElementsByClassName("text-score")[index];
        const difficultyText = document.getElementById("text-difficulty")

        if (correctAnswer.answer === clickedAnswer.textContent) {
            clickedAnswer.style.background = "green"
            let oldValue = parseInt(textScore.innerText)
            console.log(oldValue + correctAnswer.difficulty, oldValue, correctAnswer);
            textScore.innerHTML = String(oldValue + parseInt(question.difficulty))
        } else {
            clickedAnswer.style.background = "red"
        }

        setTimeout(() => {
            let elements = document.querySelectorAll('.answer');
            for (var i = 0; i < elements.length; i++) {
                elements[i].parentNode.removeChild(elements[i]);
            }
            let randQuestion = questions[Math.floor(Math.random() * questions.length)]
            const newCorectAn = randQuestion.answers.find(element => element.isCorrect);
            questionText.innerHTML = randQuestion.question;
            difficultyText.innerHTML = randQuestion.difficulty
            generateAnswers(randQuestion, newCorectAn)
            isWaitNext = false
        }, 2000)

    }
}


const handleGame = correctAnswer => {
   let interval = setInterval(() => {
        if (index < document.getElementsByClassName("text-team").length) {
            setTimeout(() => {
                clearInterval(interval)
                interval = setInterval(handleTeam(teams, correctAnswer, teams[index].team), 1000);
            }, 9000);
            handleTeam(teams, correctAnswer, teams[index].team)
            timer++
            document.querySelector(".timer").innerHTML = timer
        } 
    }, 1000);
}

const handleTeam = (correctAnswer, currentTeam) => {
    console.log(timer);
    if (timer <= 10) {
        document.getElementsByClassName("text-team")[index].style.color = "red"
    } else {
        index++
        if (index < document.getElementsByClassName("text-team").length) {
            timer = 0
            document.getElementsByClassName("text-team")[index-1].style.color = "white"
            handleGame(teams, correctAnswer)
        }
    }
}