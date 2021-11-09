//const axios = require("axios");

const soundPath = {
    red: "sounds/red.wav",
    blue: "sounds/blue.wav",
    green: "sounds/green.wav",
    yellow: "sounds/yellow.wav",
  };
//Button class that takes an Element ID as its constructor then loads up
class Button {
    constructor (element){
        this.button = document.querySelector(element);
        this.color = this.button.className
    }
    loadSound(path) {
        this.audio = new Audio(path);
    }
    playSound() {
        this.audio.play();
    }
    changeColor() {
        this.button.className =  `light${this.color}`
    }
    revert() {
        this.button.className = this.color
    }

    //functions to play sound
    //functions to change color

    //function to get the actual element

//TODO make a button class
}  
class SimoneGame {
    constructor (){
        this.number = document.querySelector("#rounds").value;
        this.R = new Button("#redSq")
        this.B = new Button("#blueSq")
        this.G = new Button("#greenSq")
        this.Y = new Button("#yellowSq")

        this.R.loadSound(soundPath.red)
        this.B.loadSound(soundPath.blue)
        this.G.loadSound(soundPath.green)
        this.Y.loadSound(soundPath.yellow)
    }
}

let targetString = ["r", "b"]//change to get string 
let playing = true;
let turnCount = 0;    

let JSONstring = ''; //TODO write code to grab JSON string
let game = new SimoneGame();





//timeout code
//await new Promise(resolve => setTimeout(resolve, 1000));


//Actual game loop
for(let i = 1; i <= 1;i++){
    output(JSONstring, i);
    //Add wait
    //get user input and check it
    //if user input
}
//function that takes am array of letters, how many to do, and then rings them
async function output(string, numbertoPrint){
    for (let j = 0; j < numbertoPrint;j++){
        let done = await ring(string[j]);
        
        //TODO add wait
    }

}
//function that takes a color, and lights it up and plays a sound
async function ring(color){
    //TODO implement ring
    if (color == "r" && playing){
        setTimeout( () => {
            red.className = "lightred";
            setTimeout( () => {
                red.className = "red";
            }
            , 1000)
        }
        , 1000)

    }
    else if (color == "b" && playing){
        setTimeout( () => {
            blue.className = "lightblue";
            setTimeout( () => {
                blue.className = "blue";
            }
            , 1000)
        }
        , 1000)
    }else if (color == "y" && playing){
        setTimeout( () => {
            yellow.className = "lightyellow";
            setTimeout( () => {
                yellow.className = "yellow";
            }
            , 1000)
        }
        , 1000)
    }else if (color == "g" && playing){
        setTimeout( () => {
            green.className = "lightgreen";
            setTimeout( () => {
                green.className = "green";
            }
            , 1000)
        }
        , 1000)
    }
}

async function getGreeting(){
    try{
        let endpoint = "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/start"
    } catch(err) {
        return;}
}


//make sleep 
async function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
//make a function 
//function play();
//set event listener for "play game"