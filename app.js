//const axios = require("axios");
const RINGDELAY = 1000;
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
    //lightens color
    changeColor() {
        this.button.className =  `light${this.color}`
    }
    //changes color back to basic
    revert() {
        this.button.className = this.color
    }
}  
class SimoneGame {
    constructor (){
        this.startPattern = ["G","B","G","Y","G","B","B","G","G","R","B","G"];
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
    async getPattern() {
        try{
            //TODO implement request
            let endpoint = "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start"
            return this.startPattern;

        } catch(err) {
            return;}
    }
}

let targetString = ["r", "b"]//change to get string 
let playing = true;
let turnCount = 0;    

let JSONstring = ''; //TODO write code to grab JSON string
let game = new SimoneGame();


//within game loop, await a promise for correct input


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
        ring(string[j]);
        await sleep(1000)
        
        //TODO add wait
    }

}
//function that takes a color, and lights it up and plays a sound, then reverts after a delay
async function ring(color){
    //TODO implement ring
    if (color == "r" && playing){
       
        game.R.changeColor();
        game.R.playSound();
        await sleep(RINGDELAY);
        game.R.revert();
    }
    else if (color == "b" && playing){
        game.B.changeColor();
        game.B.playSound();
        await sleep(RINGDELAY);
        game.B.revert();

    }else if (color == "y" && playing){
        game.Y.changeColor();
        game.Y.playSound();
        await sleep(RINGDELAY);
        game.Y.revert();

    }else if (color == "g" && playing){
        game.G.changeColor();
        game.G.playSound();
        await sleep(RINGDELAY);
        game.G.revert();
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