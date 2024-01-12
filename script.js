let questions=[
    {question:'Which team won the 2023 Champions league',answers:[
        {text:'Manchester United',value:false},
        {text:'Bayern Munich',value:false},
        {text:'Real Madrid',value:false},
        {text:'Manchester City',value:true}
        ]},
    {question:'Who won the golden ball at the 2022 world cup',answers:[
        {text:'Kylian Mbappe',value:false},
        {text:'Angel D Maria',value:false},
        {text:'Lionel Messi',value:true},
        {text:'Antoine Griezmann',value:false}
        ]},
    {question:'Who was the premier league top goal scorer of 2022/23',answers:[
        {text:'Erling Haaland',value:true},
        {text:'Ivan Toney',value:false},
        {text:'Harry Kane',value:false},
        {text:'Mohamed Salah',value:false}
        ]},
    {question:'Who currently holds the record for the all time top goal scorer?',answers:[
        {text:'Lionel Messi',value:false},
        {text:'Romario',value:false},
        {text:'Chrisiano Ronaldo',value:true},
        {text:'Pele',value:false}
        ]}
    ];

let questionElement=document.getElementById('question');
let nextBtn=document.getElementById('next-btn');
let answersElement=document.getElementById('answers');
let score=0;
let currentQuestionIndex=0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML='Next';
    showQuestions();
}

function showQuestions(){
    resetState();
// get question
let currentQuestion=questions[currentQuestionIndex];
let questionNo=currentQuestionIndex+1;
questionElement.innerHTML=questionNo+'.'+currentQuestion.question;

// Display answers
currentQuestion.answers.forEach(answer => {
   let button= document.createElement('button');
   button.innerHTML=answer.text;
   button.classList.add('btn');
   answersElement.appendChild(button);
   if(answer.value){
    button.dataset.value=answer.value;
   }
   button.addEventListener('click',selectAnswer);
});
}

function resetState(){
    nextBtn.style.display='none';
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}
function selectAnswer(e){
   
    const selectedButton=e.target;
    const isCorrect=selectedButton.dataset.value==="true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
   
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answersElement.children).forEach(button=>{
        if(button.dataset.value==="true"){
            button.classList.add('correct');
        }
        button.disabled=true;
    });
    nextBtn.style.display='block';
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You have scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML='Restart Quiz';
    nextBtn.style.display='block';
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}
nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
