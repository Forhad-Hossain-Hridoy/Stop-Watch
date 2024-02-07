// DOM Reference
const startButton = document.querySelector(".start__container");
const clearButton = document.querySelector(".clear__container");
const time = document.querySelector(".time");
const progressBar = document.querySelector(".progressBar");
const listContainer = document.querySelector(".list__contianer");
const controlsTitle = document.querySelector(".controls__title");

// variables
let timer = null;
let timerOn = 0;
let isWatchRunning = false ;
let cycleCount = 0 ;
let watch = true;

// functions
let  start =()=>{
    if(!isWatchRunning){
        isWatchRunning = true;
        timer = setInterval(()=>{
            timerOn +=1;
            time.innerHTML = (timerOn<10) ? ("0" + timerOn) : timerOn;
            if(timerOn === 30){
                clear();
                start();
                addCycle();
            }
         progressBar.style.width = (timerOn/30) * 100 + "%";
        },1000);
    }
} 

// time pause
function pause(){
    isWatchRunning = false;
    clearInterval(timer);
}

// Add Cycle to List
function addCycle(){
    cycleCount+=1;
    const list = document.createElement("li");
    list.innerHTML = `Cycle ${cycleCount}`;
    listContainer.appendChild(list);
}
// reset timer 
function clear(){
    isWatchRunning = false;
    clearInterval(timer);
    timerOn = 0;
    time.innerHTML = "00"
    progressBar.style.width = 0 + "%";
}

// clear Cycle List 
function clearCycle(){
   let listItems = listContainer.querySelectorAll("li");
   listItems.forEach((item)=>{
    item.remove();
   });
    cycleCount = 0;
}

// handlers
function handlerClearButton(){
    clear();
    clearCycle();
    controlsTitle.innerHTML = "Start";
    watch = true;
} 

function hanlderStartAndPauseButton (){
    if(watch){
        start();
        controlsTitle.innerHTML = "Pause";
        watch = false;
    }else{
        pause();
        controlsTitle.innerHTML = "Start";
        watch = true;
    }
}

// EventListners
startButton.addEventListener("click",hanlderStartAndPauseButton);
clearButton.addEventListener("click",handlerClearButton);

