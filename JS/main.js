import questions from './question.js';
// All Element
let start_btn=document.querySelector(".start_btn button");
let info_box=document.querySelector(".info_box");
let exit_btn=info_box.querySelector(".buttons .quit");
let continue_btn=info_box.querySelector(".buttons .restart");
let quiz_box=document.querySelector(".quiz_box");
let option_list=document.querySelector(".option_list");
let timeCount=quiz_box.querySelector(".timer .timer_sec")
let next_btn=quiz_box.querySelector("footer .next_btn");
let time_line=document.querySelector('.time_line');
let time_off=document.querySelector('.time_left_txt');
let result_box=document.querySelector('.result_box');
let restart_quiz=result_box.querySelector('.restart');
let quit_quiz=result_box.querySelector('.quit')

//All Variable
let que_count=0;
let counter;
let timeValue=15;
let userScore=0;

//if  start Quiz Button Clicked
start_btn.onclick=function(){
    info_box.classList.add("activeInfo");//show info box
}

//if  Exit Button Clicked
exit_btn.onclick=function(){
    info_box.classList.remove("activeInfo");//hidde info box
}

//if  Continue Button Clicked
continue_btn.onclick=function(){
    info_box.classList.remove("activeInfo");//hidde info box
    quiz_box.classList.add("activeQuiz");//show quiz box
    showQuestion(que_count);//show question
    queCounter(que_count);//Show Number of qustion
    startTimer(timeValue)//Start Timer
}





//show question Function
function showQuestion(index){
    let que_text=document.querySelector(".que_text");
    let option_list=document.querySelector(".option_list");
    let que_tag=`<span>${questions[index].numb}- ${questions[index].question}</span>`;
    let option_tag=`<div class="option">${questions[index].options[0]}<span></span></div>
    <div class="option">${questions[index].options[1]}<span></span></div>
    <div class="option">${questions[index].options[2]}<span></span></div>
    <div class="option">${questions[index].options[3]}<span></span></div>`
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    let alloptions=option_list.querySelectorAll('.option');
    alloptions.forEach((e)=>{
        e.addEventListener('click',()=>{optionSelected(e)})
    })
}

let tickIcon=`<div class="icon tick"><i class="fas fa-check"></i></div>`
let crossIcon=`<div class="icon cross"><i class="fas fa-times"></i></div>`
//Function Select Qustion
function optionSelected(answer){
    clearInterval(counter)
    let userAns=answer.textContent
    let correctAns=questions[que_count].answer;
    let alloptions=option_list.querySelectorAll('.option');
    if(userAns==correctAns){
        userScore+=1;
        answer.classList.add("correct");
        answer.innerHTML+=tickIcon;
    }else{
        answer.classList.add("incorrect");
        answer.innerHTML+=crossIcon; 
        
        //IF Answer Incorrect select answer correct automaticly;
        alloptions.forEach((e)=>{
            if(e.textContent==correctAns){
                e.classList.add('correct');
                e.innerHTML+=tickIcon;
            }
        })
    }
    //once user selected Disabled All Option
    alloptions.forEach((e)=>{
        e.classList.add('disabled')
    })
    next_btn.classList.add("show"); //show the next button if user selected any option
}

//IF Clicked on Next Botton
next_btn.addEventListener('click',()=>{
    if(que_count < questions.length-1){
        que_count++;
        showQuestion(que_count);
        queCounter(que_count)
        clearInterval(counter)
        startTimer(timeValue);
        if(que_count==questions.length-1){
            next_btn.textContent='Submit';
        }else{
            next_btn.textContent='Next Que';
        }
        next_btn.classList.remove("show"); //hide the next button
    }else{
        showResult();//Show Result Box
    }
})

//Show Number Of Qustin
function queCounter(index){
    let button_question_counter=quiz_box.querySelector(".total_que");
    let totalQustionsCountTag=`<span><p>${index+1}</p>of<p>${questions.length}</p>Questions</span>`
    button_question_counter.innerHTML=totalQustionsCountTag;
}


//Function Timer
function startTimer(time){
    let c=-1;
    counter=setInterval(()=>{
        if(time>-1){
            timeCount.textContent=time>9?time:'0'+time;
            time--;
            c++;
            time_line.style.width=`${c/15*100}%`;
        }else{
            clearInterval(counter);
            let alloptions=option_list.querySelectorAll('.option');
            let correctAns=questions[que_count].answer;
            //IF Time End Select answer correct automaticly;
            alloptions.forEach((e)=>{
                if(e.textContent==correctAns){
                    e.classList.add('correct');
                    e.innerHTML+=tickIcon;
                }
            })   
            //once user selected Disabled All Option
            alloptions.forEach((e)=>{
                e.classList.add('disabled')
            })
            time_off.textContent='Time Off';
            next_btn.classList.add("show"); //show the next button if user selected any option                   
        }
    },1000)
}

//Function Result
function showResult(){
    info_box.classList.remove('activeInfo');//hiden info box
    quiz_box.classList.remove('activeQuiz');//hiden quiz box
    result_box.classList.add('activeResult');//Show box Result
    const text_score=result_box.querySelector('.score_text');
    if(userScore>(questions.length/2)){
        text_score.innerHTML=`<span>and Congrats!, you got only <p>${userScore}</p> out of <p>${questions.length}</p> </span>`
    }else{
        text_score.innerHTML=`<span>and nice, you got only <p>${userScore}</p> out of <p>${questions.length}</p> </span>`
    }
}



restart_quiz.addEventListener('click',()=>{
    info_box.classList.remove('activeInfo');//hiden info box
    quiz_box.classList.add('activeQuiz');//show quiz box
    result_box.classList.remove('activeResult');//hiden box Result
    que_count=0;
    timeValue=15;
    userScore=0;
    showQuestion(que_count);
    queCounter(que_count)
    clearInterval(counter)
    startTimer(timeValue);
    if(que_count==questions.length-1){
        next_btn.textContent='Submit';
    }else{
        next_btn.textContent='Next Que';
    }
    next_btn.classList.remove("show"); //hide the next button
})

quit_quiz.addEventListener('click',()=>{
    window.location.reload();
})





