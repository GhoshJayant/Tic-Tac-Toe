const gameDesc = document.querySelector("[data-gameDescription]");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector("[data-newGameAccess]");


const winPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [0,4,7],
];

var grid = ["","","","","","","","",""];
let currPlayer;

function initfunc(){
    currPlayer = 'X';
    grid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameDesc.innerText = `Current Player - ${currPlayer}`;
    boxes.forEach( (box) =>{
        box.innerText ="";
        box.classList.remove("greendiv");
        box.style.pointerEvents = 'all';
    })
    
}
initfunc();


function swapPlayer(){
    if(currPlayer === 'X')
        currPlayer = 'O';
    else
        currPlayer = 'X';

    gameDesc.innerText = "Current Player - " + currPlayer;
}

function checkGame(){
    let answer="";

    winPositions.forEach((position) =>{
        if((grid[position[0]] !== "" || grid[position[1]] !== "" || grid[position[2]] !== "")
        && (grid[position[0]] === grid[position[1]]) && (grid[position[1]] === grid[position[2]])){
            answer = grid[position[0]];
            boxes[position[0]].classList.add("greendiv");
            boxes[position[1]].classList.add("greendiv");
            boxes[position[2]].classList.add("greendiv");

            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

        }
    });

    if(answer!==""){
        gameDesc.innerText = "Winner Player - "+ answer; 
        newGameBtn.classList.add("active");
        return;
    }

    let count = 0;
    grid.forEach( (box) => {
        if(box !== ""){
            count++;
        }

    })
    
    if(count === 9){
        gameDesc.innerText = "Game Tied";
        newGameBtn.classList.add("active");

    }

}

function handleClick(index){
    if(grid[index] === "" ){
        boxes[index].innerText = currPlayer;
        grid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        swapPlayer();
        checkGame();
    }
}


boxes.forEach((box,index) =>{
    box.addEventListener("click" , ()=>{
        handleClick(index);
    })
});

// NEW GAME

newGameBtn.addEventListener("click", initfunc);
