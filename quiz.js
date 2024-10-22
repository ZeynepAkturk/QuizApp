
let QUESTIONS=[];
const CHOIECES=["A","B","C","D"];
let activeQuestionIndex=0;
let questionsCount=0, selectedAnswers;
totalCorrectChoice=0;
const quizModalEl=document.querySelector(".quiz_modal");
let ANSWERS=[];
let timer;


const getQuestions=()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res)=>{
        return res.json();
    })
    .then(questions=>{
    
        QUESTIONS=questions.slice(0,10);
        questionsCount=QUESTIONS.length;
        console.log(QUESTIONS);
    })
};


const updateQuizOrder= () => {
    // activeQuestionIndex++;
    let quizOrderEl = document.querySelector("#quizOrder");
    quizOrderEl.innerHTML=activeQuestionIndex+1 +"/"+ QUESTIONS.length;

    let quizProgressEl=document.querySelector(".quiz_progress");
    quizProgressEl.style.width=((activeQuestionIndex+1) / QUESTIONS.length)*100 +"%";
    
    if(activeQuestionIndex==(questionsCount-1))
    {
        document.querySelector(".quiz_next_button").innerHTML="Tamamla";
        updateAnswerTable();
        
    }
    updateQuestion();
    timer = setTimeout(nextQuestion,30000);
    
    
}

const createQuestionAnswers=(activeQuestion)=>
{
    let questionAnswerHTML="";
    let answers=activeQuestion.body.split("\n");
    // console.log(answers);
    answers.forEach((answer_, index)=> {
        // console.log("indesk",index);
        // console.log(answer_);
        questionAnswerHTML+=`<div class="question_answer" data-id="${index}" onclick="selectChoice(this)">
        <div class="choice"> ${CHOIECES[index]}  </div>
        <div class="text"> ${answer_} </div>
        </div>`;
    });
    
    return questionAnswerHTML;
};
const updateQuestion =()=>{
const activeQuestion=QUESTIONS[activeQuestionIndex];

let questionHTML=`<h2>
${activeQuestionIndex+1} - ${activeQuestion.body}
</h2>

<div class="question_answers"> ${createQuestionAnswers(activeQuestion)}
</div>`
// console.log(questionHTML);
 const questionContainerEl=document.querySelector("#questionContainer");
 questionContainerEl.innerHTML=questionHTML;

};

const selectChoice=(el)=>{


let allowClick = false; 
if (!allowClick) {
    alert("Lütfen 10 saniye bekleyin."); 
  }


// 10 saniye sonra tıklamaya izin ver
setTimeout(function() {
allowClick = true;
const questionAnswerEls=Array.from(document.querySelectorAll(".question_answer")); 
questionAnswerEls.find(el=>{if(el.classList.contains("selected")) 
 el.classList.remove("selected");
})

selectedAnswers=el.dataset.id;
el.classList.add("selected");
ANSWERS[activeQuestionIndex]=CHOIECES[selectedAnswers];
console.log("cevaplar"+ANSWERS);
}, 10000); 



  

}

//  const checkAnswer=()=>{
//  QUESTIONS[activeQuestionIndex].answers.find(a => {if(a.isCoorect==true)
//      totalCorrectChoice++;
//  })
//  };

const nexButton=document.querySelector("#quiz_next_button");
const nextButtonOnClick=()=>{
    clearTimeout(timer);
    nextQuestion();
}
const nextQuestion=()=>{
  if(true)
  { 
  if(activeQuestionIndex < questionsCount-1)
  {
    activeQuestionIndex++;
    updateAnswerTable();
    updateQuizOrder();
    
    
  }


  else
  {
    // document.querySelector("#totalCorrectChoice").innerHTML=totalCorrectChoice;
    quizModalEl.classList.add("show");
  }
  }
//   else
//   {
//     window.alert("Lüten bir seçim yapınız.");
//   }
    
}

const closeModal=()=>{
    quizModalEl.classList.remove("show");
    
    
};

const updateAnswerTable =()=>
{
    let questionAnswerTableRow2HTML="";
    ANSWERS.forEach((answer)=> {
        questionAnswerTableRow2HTML +=`<td> ${answer} </td>`
        
    });
    const answerTableRow2El=document.getElementById("answerTableRow2");
    answerTableRow2El.innerHTML=questionAnswerTableRow2HTML;

}

const repeatQuiz =()=>
{
    activeQuestionIndex=0;
    questionsCount=0;
    selectedAnswers=undefined;
    // totalCorrectChoice=0;
    ANSWERS.length=0;
    updateQuizOrder();
    closeModal();
    document.querySelector(".quiz_next_button").innerHTML="İleri";

}

getQuestions();

setTimeout(() => {
    updateQuizOrder();
}, 100);

