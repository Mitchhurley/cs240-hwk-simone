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
        this.name = ""
        
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
    //add method on hover
    hover(bool){
    
    }
}  
class SimoneGame {
    constructor (){
        this.startPattern = ["G","B","R","Y","G","B","Y","R","G","R","B","G"];
        this.number = document.querySelector("#rounds").value;
        this.roundsPlayed = 0;  
        this.R = new Button("#redSq")
        this.R.name = "R"
        this.B = new Button("#blueSq")
        this.B.name = "B"
        this.G = new Button("#greenSq")
        this.G.name = "G"
        this.Y = new Button("#yellowSq")
        this.Y.name = "Y"

        addButtonlisteners();

        this.newGame(this.number)
        //keeps track of if user has selected pattern
        this.hasNext = false;


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
            this.ring(color);
            await sleep(delay);
        }
    }
    async newGame(){
        //get basic string
        let sol = ["Y","B","R","Y","B","B","R","R","G","R"];
        for (let j = 0; j < this.number; j++){
            await this.beeper(sol.slice(0, j), 500)
            //print out
        }
        humanTurn()
        /*
        check answer loop{
            try to get ans
            await check(curr)
            when check resolves, move on and repeat
            when check rejects go to fail case
        }
        */
    }
    async ring(color){
        //TODO implement ring
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
    check() {
        
       // while (this.hasNext)
    }
    addButtonlisteners(target) {
        target.button.addEventListener("click", () =>{
            this.check(target.name);
        }
        )
    }


}
//grab play button and add event listener
//even listener grabs val
let targetString = ["r", "b"]//change to get string 
let playing = true;
let turnCount = 0;    

let JSONstring = ''; //TODO write code to grab JSON string

let i = 0;
//document.addEventListener("click", () => game.beeper(game.startPattern));

//within game loop, await a promise for correct input


//timeout code
//await new Promise(resolve => setTimeout(resolve, 1000));


//function that takes a color, and lights it up and plays a sound, then reverts after a delay


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
        var game = new SimoneGame();
    }
    
    
})
//make a function 
//function play();
//set event listener for "play game"