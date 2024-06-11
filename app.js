                            // // // // // // // 
                           //  Sign In  Part // 
                          // // // // // // // 


function signIn() {
    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
        alert('Sign in successful!');
        window.location.href = 'quiz.html';
    } else {
        alert('Invalid email or password.');
    }
}


                            // // // // // // // 
                           //  Sign Up  Part // 
                          // // // // // // // 

function signUp() {
    const name = document.getElementById('sign-up-name').value;
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;

    if (localStorage.getItem(email)) {
        alert('Email already registered.');
    } else {
        const user = { name, email, password };
        localStorage.setItem(email, JSON.stringify(user));
        alert('Sign up successful!');
        window.location.href = 'index.html';
    }
}





                            // // // // // // // 
                           //  Quiz App Part // 
                          // // // // // // // 


// let currentQuestionIndex = 0;
// let score = 0;
// let questions = [];

// async function startQuiz() {
//     currentQuestionIndex = 0;
//     score = 0;
//     questions = await fetchQuestions();
//     showScreen('quiz-screen');
//     showQuestion();
// }

// // Fetching and combining Right and Wrong Answer:

// async function fetchQuestions() {
//     try {
//         const response = await fetch('https://the-trivia-api.com/v2/questions');
//         const data = await response.json();
//         return data.map(item => ({
//             question: item.question.text,
//             correctAnswer: item.correctAnswer,
//             answers: shuffle([item.correctAnswer, ...item.incorrectAnswers])
//         }));
//     } catch (error) {
//         console.error('Error fetching questions:', error);
//         return [];
//     }
// }

// // Shuffling

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// // Rendering Question on screen

// function showQuestion() {
//     if (questions.length === 0) {
//         alert('No questions available');
//         return;
//     }
//     const question = questions[currentQuestionIndex];
//     document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
//     document.getElementById('question').innerText = question.question;
//     const answersDiv = document.getElementById('answers');
//     answersDiv.innerHTML = '';
//     question.answers.forEach(answer => {
//         const button = document.createElement('button');
//         button.innerText = answer;
//         button.onclick = () => selectAnswer(answer);
//         answersDiv.appendChild(button);
//     });
//     document.getElementById('next-button').style.display = 'none';
//     document.getElementById('submit-button').style.display = 'none';
// }



// function selectAnswer(selectedAnswer) {
//     const question = questions[currentQuestionIndex];
//     if (selectedAnswer === question.correctAnswer) {
//         score++;
//     }
//     if (currentQuestionIndex < questions.length - 1) {
//         document.getElementById('next-button').style.display = 'block';
//     } else {
//         document.getElementById('submit-button').style.display = 'block';
//     }
//     const buttons = document.getElementById('answers').getElementsByTagName('button');
//     for (let button of buttons) {
//         button.disabled = true;
//     }
// }

// function nextQuestion() {
//     currentQuestionIndex++;
//     showQuestion();
// }

// function showResult() {
//     showScreen('result-screen');
//     document.getElementById('result').innerText = `You scored ${score} out of ${questions.length}`;
// }

// function showScreen(screenId) {
//     const screens = document.querySelectorAll('.screen');
//     screens.forEach(screen => screen.classList.remove('active'));
//     document.getElementById(screenId).classList.add('active');
// }

// // quiz page initialize
// if (window.location.pathname.endsWith('quiz.html')) {
//     document.addEventListener('DOMContentLoaded', () => {
//         startQuiz();
//     });
// }

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetching and combining Right and Wrong Answer:
async function fetchQuestions() {
    try {
        const response = await fetch('https://the-trivia-api.com/v2/questions');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

// Shuffling
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Rendering Question on screen
function showQuestion() {
    const questionNumberElement = document.getElementById('question-number');
    const questionElement = document.getElementById('question');
    const answersDiv = document.getElementById('answers');

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const answerArr = [...question.incorrectAnswers, question.correctAnswer];
        questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionElement.innerText = question.question.text;
        answersDiv.innerHTML = shuffle(answerArr).map(item => `
            <button onclick="selectAnswer('${item}')">${item}</button>
        `).join('');
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('submit-button').style.display = 'none';
    } else {
        showResult();
    }
}

function selectAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correctAnswer) {
        score++;
    }
    if (currentQuestionIndex < questions.length - 1) {
        document.getElementById('next-button').style.display = 'block';
    } else {
        document.getElementById('submit-button').style.display = 'block';
    }
    const buttons = document.getElementById('answers').getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    showScreen('result-screen');
    document.getElementById('result').innerText = `You scored ${score} out of ${questions.length}`;
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

async function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questions = await fetchQuestions();
    showScreen('quiz-screen');
    showQuestion();
}

// quiz page initialize
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#next-button").addEventListener("click", nextQuestion);
    document.querySelector("#submit-button").addEventListener("click", showResult);
});

