//const axios = require("axios");
const RINGDELAY = 120;
const soundPath = {
    red: "sounds/red.wav",
    blue: "sounds/blue.wav",
    green: "sounds/green.wav",
    yellow: "sounds/yellow.wav",
  };
//TODO figure out how to stagger audio




//Button class that takes an Element ID as its constructor then loads up
class Button {

    //Contructs button based on element ID
    constructor (element){
        this.button = document.querySelector(element);
        this.color = this.button.className
    }
    
    //Sets audio p


    playSound(path) {
        new Audio(path).play();
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
        this.startPattern = ["G","B","R","Y","G","B","Y","R","G","R","B","G"];
        this.number = document.querySelector("#rounds").value;
        this.R = new Button("#redSq")
        this.B = new Button("#blueSq")
        this.G = new Button("#greenSq")
        this.Y = new Button("#yellowSq")

    }
    async getPattern() {
        try{
            //TODO implement request
            let endpoint = "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start"
            return this.startPattern;

        } catch(err) {
            return;}
    }
    async beeper(pattern, delay){
        if(typeof(delay)==='undefined') delay = RINGDELAY;
        for (const color of pattern) {
            i++;
            ring(color);
            await sleep(delay);
        }
         
     
        
    }
}
//grab play button and add event listener
//even listener grabs val
let targetString = ["r", "b"]//change to get string 
let playing = true;
let turnCount = 0;    

let JSONstring = ''; //TODO write code to grab JSON string

let i = 0;
document.addEventListener("click", () => game.beeper(game.startPattern));

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
    if (color == "R"){
       
        game.R.changeColor();
        game.R.playSound(soundPath.red);
        await sleep(RINGDELAY);
        game.R.revert();
    }
    else if (color == "B"){
        game.B.changeColor();
        game.B.playSound(soundPath.blue);
        await sleep(RINGDELAY);
        game.B.revert();

    }else if (color == "Y"){
        game.Y.changeColor();
        game.Y.playSound(soundPath.yellow);
        await sleep(RINGDELAY);
        game.Y.revert();

    }else if (color == "G"){
        game.G.changeColor();
        game.G.playSound(soundPath.green);
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

document.querySelector("#play").addEventListener("click", () => {
    var game = new SimoneGame();
})
//make a function 
//function play();
//set event listener for "play game"