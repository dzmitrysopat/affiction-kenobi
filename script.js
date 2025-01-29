setTimeout(function(){
	document.body.classList.add('body_visible');
}, 0);

function onEntry(entry) {
	entry.forEach(change => {
	  if (change.isIntersecting) {
		change.target.classList.add('element-show');
	  }
	});
  }
  let options = { threshold: [0.2] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  for (let elm of elements) {
	observer.observe(elm);
  }

function startBtn(){
    document.getElementById("description").classList.add("hide");
    document.querySelector("img").classList.add("hide");
    document.querySelector("main div a").classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");
}

const questions = [
    {
        question:"С какой ручкой Муха проходил несколько лет?",
        answers:["Гелевой","Бирюзовой", "Марвел", "В виде светового меча"],
        correct: 3,
    },
    {
        question:"В древние времена, божественная Нимфа напоила Муху. Чем?",
        answers:["Охота крепкое","Кофе", "Кола", "Саниковка"],
        correct: 4,
    },
    {
        question:"Тони Хоук от мира собак - ",
        answers:["Молли", "Полли", "Долли", "Рыбка Дори"],
        correct: 1,
    },
    {
        question:"Кличка твоего тюбика",
        answers:["Тюбик","Хоббит", "Витябля", "Викторович"],
        correct: 2,
    },
    {
        question:"Как звали твою белку?",
        answers:["Мандэй","Сандэй", "Вэнсдей", "Фрайдэй"],
        correct: 3,
    },
    {
        question:"Алла сыграла в серии фильмов Гарри Поттер этого персонажа:",
        answers:["Букля","Нагайна","Хагрид","Тот вредный, у которого Гарри жил под лестницей"],
        correct: 3,
    },
    {
        question:"Любимые стихи Валерьевны про ...",
        answers:["Огонь","Зарплату","Олю","Wildberries"],
        correct: 1,
    },
    {
        question:"Ради кого ты обновила ноутбук?",
        answers:["Учеба","Работа","OnlyFans","Геральда"],
        correct: 4,
    },
    {
        question:"Песню чей группы пел Дима сидя у тебя на паре",
        answers:["Киркоров","Jane Air", "Madonna", "Queen"],
        correct: 2,
    },
    {
        question:"Кто реинкорнировал в Глеба",
        answers:["Юрий Гагарин","Владимир Ленин", "Фредди Меркури", "Рами Малек"],
        correct: 3,
    }
];

const headerContainer = document.querySelector('#quiz-header');
const bodyContainer = document.querySelector('#test-body');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const backBtn = document.querySelector('#back');
const progressContainer = document.querySelector('#progress');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();

submitBtn.onclick = checkAnswer;

const openInNewTab = (url) => {
    window.open(url, target="_self");
}
const btn = document.getElementById("submit");

//   btn.addEventListener("click", () => {
//     openInNewTab("../../tests.html");
//   });

function clearPage(){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion(){    
    // Question
    const headerTemplate = `<h2 class="question">%question%</h2>`;

    const title = headerTemplate.replace('%question%', questions[questionIndex]['question']);

    headerContainer.innerHTML = title;

    // questionnumber
    const bodyTemplate = `<p class="number result">%number%</p>`;
    let number = `Вопрос ${questionIndex+1} из ${questions.length}`;
    // console.log(number);

    const questionNumber = bodyTemplate.replace('%number%', number);

    bodyContainer.innerHTML = questionNumber;

    // progressBar
    let step = questionIndex+1;
    const progressTemplate = 
    `<progress max="%max%" value="%step%" id="progress"></progress>`;
    console.log(step);
    // console.log(questions.length);

    progressContainer.value = step;
    progressContainer.max = questions.length;

    // Answers
    let answerNumber = 1;

    for (answerText of questions[questionIndex]['answers']){
        // console.log(answerNumber, answerText);
        const questionTemplate = 
            `
                <label class="label__input answer-item">
                    <input value="%number%" type="radio" class="answer" name="answer">
                    <span class="answer-description">%answer%</span>
                </label>
            `;

        // let answerHTML = questionTemplate.replace('%answer%', answerText);
        //    listContainer.innerHTML = listContainer.innerHTML + answerHTML;
        // or

        const answerHTML = questionTemplate
                                    .replace('%answer%', answerText)
                                    .replace('%number%', answerNumber);
        
        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }
} 

function checkAnswer(){   
    // Находим выбранную радио кнопку
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
    
    // Если ответ не выбран - ничего не делаем, выходим из функции
    if (!checkedRadio){
        submitBtn.blur();
        return;
    }

    // узнаем номер ответа пользователя

    const userAnswer = parseInt(checkedRadio.value);

    // Если ответ верный - увеличиваем счет
    questions[questionIndex]['correct']
    if (userAnswer === questions[questionIndex]['correct']){
        score++;
    } else {
        alert("Даша ептвою дивизию, подумай");
        submitBtn.blur();
        return;
    };


    // console.log('score = ', score);

    if (questionIndex !== questions.length - 1){
        // console.log('Это не последний вопрос');
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        // console.log('Это последний вопрос');
        clearPage();
        showResults();
    }
}

function showResults (){
    // console.log('showResults start');
    // console.log(score);

    const resultsTemplate = `
            <div class="results">
            <div class="result-comntainer">
            <h2 class="title">%title%</h2>
            <p class="result">%result%</p>
            </div>
            <h3 class="summary">%message%</h3>
            </div>
    `;

    let resultTitle, message;

    if (score === 7 || score === 8 || score === 9 || score === questions.length ){
        resultTitle = 'Ваш результат:';
        message = 'Вы истинная скуфиня. Загляни в календарь. Там не только твой возраст, там и ответы';
    }

    // Result
    let result = `${score} из ${questions.length}`;

    const finalMessage = resultsTemplate
                        .replace('%title%', resultTitle)
                        .replace('%message%', message)
                        .replace('%result%', result);

    listContainer.innerHTML = finalMessage;
    bodyContainer.innerHTML = '';
    progressContainer.hidden = true;


    submitBtn.blur();
    submitBtn.innerText = 'Попробовать еще раз'
    submitBtn.onclick = () => history.go();
}


