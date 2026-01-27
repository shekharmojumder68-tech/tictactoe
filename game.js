let boxes = document.querySelectorAll(".box");
let reste_btn= document.querySelector("#reset-game");
let newgamebtn = document.querySelector("#new-btn");
let pmsg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");
let musicsorce = document.querySelector("#music");

 //Start button
 let container = document.querySelector(".container");
let startbtn = document.querySelector("#start");



let bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.4;
bgMusic.loop = true;


//Home button

let home_btn = document.getElementById("home").addEventListener("click", ()=>{
    window.location.href = "index.html";
});

let aboutBtn = document.getElementById("aboutBtn");
let aboutModel = document.getElementById("aboutModal");
let closeAbout  = document.getElementById("closeAbout");

aboutBtn.addEventListener("click", () =>{
    aboutModel.style.display = "flex";
});
closeAbout.addEventListener("click", () => {
    aboutModel.style.display = "none";
});



//Help element

let helpbtn = document.getElementById("help");
let help_box = document.getElementById("help-box");
let closebtn = document.getElementById("close-btn");


helpbtn.addEventListener("click", () =>{
    help_box.style.display = "inline-block";
});
closebtn.addEventListener("click", ()=>{
    help_box.style.display = "";
});


//play music only once
bgMusic.loop= true;
bgMusic.volume = 0.2;

musicsorce.loop = false;
musicsorce.volume = 0.4;

let musicstarted = false;

let turn0 = true ; //PlyerX, player0

const winpattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6],
];

//start button

document.addEventListener("click",() => {
    startbtn.style.display = "none";
    container.classList.remove("hide");
    reste_btn.style.display = "inline-block";

    if(!musicstarted){
        bgMusic.play().catch(() =>{});
        musicstarted = true;
    }
 },{once: true});


boxes.forEach((box) =>{
  box.addEventListener("click", () => {

    //play music on first move only
     musicsorce.currentTime =0;
     musicsorce.play().catch(()=>{});

  if(turn0){

    box.innerText = "X";
    turn0 =false;
  }
  else{
    box.innerText = "O";
    turn0=true;
}
box.disabled=true;

 checkWinner();
  });
});


const resetgame = () => {
    turn0 = true;
    enabledbox();
    msgcontainer.classList.add("hide");
};

 const disabledbox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
 };
 const enabledbox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
 };

const showWinner = (winner) => {
    pmsg.innerText = `Congratulation, Winner is ${winner}`;
   msgcontainer.classList.remove("hide");
   disabledbox();
};

const checkWinner = () => {
   for (let pattern of winpattern){
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if(pos1 !=="" && pos2 !=="" && pos3 !==""){
        if(pos1===pos2 && pos2===pos3){
            console.log("winner is", pos1);
            showWinner(pos1);
        }
    }
   }
};
newgamebtn.addEventListener("click" , resetgame);
reste_btn.addEventListener("click",  resetgame);
