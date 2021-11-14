//const axios = require("axios");
const RINGDELAY = 120;
const soundPath = {
    red: "sounds/red.wav",
    blue: "sounds/blue.wav",
    green: "sounds/green.wav",
    yellow: "sounds/yellow.wav",
    lose: "sounds/lose.wav",
  };
//TODO List
//Add button listeners for lighting up and playing noise when clicked
//Make a fail case
//Figure out axios requests
//Make progress updates as game goes along
//Add in timing in between segments




//Button class that takes an Element ID as its constructor then loads up
class Button {

    //Contructs button based on element ID
    constructor (element, colorLetter, game, path){
        this.button = document.querySelector(element);
        this.color = this.button.className;
        this.name = colorLetter;
        this.game = game;
        this.sound = new Audio(path);
        
    }
    playSound(path) {
        this.sound.play();
    }
    //lightens color
    changeColor() {
        this.button.className =  `light${this.color}`
    }
    //changes color back to basic
    revert() {
        this.button.className = this.color
    }
    addButtonlisteners() {
        this.button.addEventListener("click", () =>{
            if (playing) {
                this.game.ring(this.name);
                this.game.check(this.name);

            }
        })
        this.button.addEventListener("mouseover", () =>{
            if (playing) {
                this.button.classList.add("hover");
            }})
        this.button.addEventListener("mouseout", () => {
            if (playing) {this.button.classList.remove("hover")}
        })    
    }
}  
class SimoneGame {
    constructor (){
        turnCount = 0;
        this.startPattern = ["G","B","R","Y","G","B","Y","R","G","R","B","G"];
        this.number = document.querySelector("#rounds").value;
        this.roundsPlayed = 0;  
        this.R = new Button("#redSq", "R", this, soundPath.red)
        this.B = new Button("#blueSq", "B", this, soundPath.blue)
        this.G = new Button("#greenSq", "G", this, soundPath.green)
        this.Y = new Button("#yellowSq", "Y", this, soundPath.yellow)
        this.header = document.querySelector("#status");
        this.loser = new Audio(soundPath.lose)

        this.newGame(this.number);
   
    }
    
    async getPattern() {
        try{
            //TODO implement request
            let endpoint = "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start"
            let response = await axios.get(endpoint);
            return response.sequence;

        } catch(err) {
            return;}
    }
    async beeper(pattern, delay){
        if(typeof(delay)==='undefined') delay = RINGDELAY;
        for (const color of pattern) {
            this.ring(color);
            await sleep(delay);
        }
    }
    async newGame(){
        //get basic string
        playing = true;
        this.R.addButtonlisteners();
        this.B.addButtonlisteners();
        this.Y.addButtonlisteners();
        this.G.addButtonlisteners();
        //let response = await this.getPattern();
        this.beeper(this.startPattern)
        await sleep(5000);
        this.sol = ["Y","B","R","Y","B","B","R","R","G","R"];
        //for (let j = 0; j < this.number; j++){
         //   await this.beeper(this.sol.slice(0, j), 500)
            //print out
        //}
        this.nextRound();
        
    }
    async ring(color){
   
        if (color == "R"){
           
            this.R.changeColor();
            this.R.playSound(soundPath.red);
            await sleep(RINGDELAY);
            this.R.revert();
        }
        else if (color == "B"){
            this.B.changeColor();
            this.B.playSound(soundPath.blue);
            await sleep(RINGDELAY);
            this.B.revert();
    
        }else if (color == "Y"){
            this.Y.changeColor();
            this.Y.playSound(soundPath.yellow);
            await sleep(RINGDELAY);
            this.Y.revert();
    
        }else if (color == "G"){
            this.G.changeColor();
            this.G.playSound(soundPath.green);
            await sleep(RINGDELAY);
            this.G.revert();
        }
    }
    check(val) {
       if (this.sol[turnCount]==val){
           turnCount++
           if (turnCount == this.roundsPlayed){
               this.nextRound();
           }else {
               this.header.innerHTML = `Nice Job! ${this.roundsPlayed - turnCount} to go!`
                       }
       } else{
           playing = false;
           document.body.style.backgroundColor = "HotPink";
           this.loser.play();
       // while (this.hasNext)


       //if all the current answers are right
    }}
    
    //moves to the next round 
    nextRound(){
        turnCount = 0;
        this.roundsPlayed++
        this.header.innerHTML = ``;
        if (this.roundsPlayed == this.number){
            //win case
            console.log("you win")
        }
        this.beeper(this.sol.slice(0, this.roundsPlayed), 500)

        
    }


}
//grab play button and add event listener
//even listener grabs val
let targetString = ["r", "b"]//change to get string 
let playing = false;
var turnCount = 0;    

let JSONstring = ''; //TODO write code to grab JSON string

let i = 0;
//document.addEventListener("click", () => game.beeper(game.startPattern));

//within game loop, await a promise for correct input


//timeout code
//await new Promise(resolve => setTimeout(resolve, 1000));


//function that takes a color, and lights it up and plays a sound, then reverts after a delay

var game;
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
let play = document.querySelector("#play")
play.addEventListener("click", () => {
    if (playing == false){
        game = new SimoneGame();
    }
    
    
})
//make a function 
//function play();
//set event listener for "play game"