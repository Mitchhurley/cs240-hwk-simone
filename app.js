const axios = require("axios");
//Time delay in MS for opening sequence
const RINGDELAY = 120;

//the paths for various sound effects
const soundPath = {
    red: "sounds/red.wav",
    blue: "sounds/blue.wav",
    green: "sounds/green.wav",
    yellow: "sounds/yellow.wav",
    lose: "sounds/lose.wav",
    next: "sounds/nextRound.wav",
    wrong: "sounds/wrong.wav",
    win: "sounds/win.mp3"
  };
//Button class that takes an Element ID, letter, parent game, and sound effect path
class Button {

    //Contructs button based on element ID
    constructor (element, colorLetter, game, path){
        this.button = document.querySelector(element);
        this.color = this.button.className;
        this.name = colorLetter;
        this.game = game;
        this.sound = new Audio(path);
        
    }
    //makes a new audio and plays it
    async playSound(path) {
        let temp = (new Audio(path))
        temp.oncanplaythrough = () => {
            temp.play();
        }
    }
    //lightens color
    changeColor() {
        this.button.className =  `light${this.color}`
    }
    //changes color back to basic
    revert() {
        this.button.className = this.color
    }
    //initializes button listeners once game has began
    addButtonlisteners() {
        this.button.addEventListener("mousedown", () =>{
            if (playing) {
                this.changeColor();
                this.button.addEventListener("mouseout", () => {this.revert()})
                

            }
        })
        this.button.addEventListener("mouseover", () =>{
            if (playing) {
                this.button.classList.add("hover");
            }})
        this.button.addEventListener("mouseout", () => {
            if (playing) {this.button.classList.remove("hover")}
        })
        this.button.addEventListener("mouseup", () =>{
            this.revert();
            this.game.check(this.name);
            this.sound.play()}
        )    
         
    }
}  
class SimoneGame {
    constructor (){
        this.turnCount = 0;
        this.startPattern = ["G","B","R","Y","G","B","Y","R","G","R","B","G"];
        this.number = document.querySelector("#rounds").value;
        this.roundsPlayed = 0;  
        this.R = new Button("#redSq", "R", this, soundPath.red)
        this.B = new Button("#blueSq", "B", this, soundPath.blue)
        this.G = new Button("#greenSq", "G", this, soundPath.green)
        this.Y = new Button("#yellowSq", "Y", this, soundPath.yellow)
        this.header = document.querySelector("#status");
        this.loser = new Audio(soundPath.lose)
        this.winner = new Audio(soundPath.win)
        this.next = new Audio(soundPath.next)
        this.wrong = new Audio(soundPath.wrong)
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
            await this.ring(color);
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
        this.startPattern = await getGreeting()
 
        //let response = await this.getPattern();
        await this.beeper(this.startPattern.data.sequence)

        //requisite 4 sec delay
        await sleep(4000);
        this.sol = await getSeq(this.number);
        this.sol = this.sol.data.key
        //for (let j = 0; j < this.number; j++){
         //   await this.beeper(this.sol.slice(0, j), 500)
            //print out
        //}
        this.nextRound();
        
    }
    async ring(color){
   
        if (color == "R"){
           
            this.R.changeColor();
            await this.R.playSound(soundPath.red);
            await sleep(RINGDELAY);
            this.R.revert();
        }
        else if (color == "B"){
            this.B.changeColor();
            await this.B.playSound(soundPath.blue);
            await sleep(RINGDELAY);
            this.B.revert();
    
        }else if (color == "Y"){
            this.Y.changeColor();
            await this.Y.playSound(soundPath.yellow);
            await sleep(RINGDELAY);
            this.Y.revert();
    
        }else if (color == "G"){
            this.G.changeColor();
            await this.G.playSound(soundPath.green);
            await sleep(RINGDELAY);
            this.G.revert();
        }
    }
    check(val) {
       if (this.sol[this.turnCount]==val){
           this.turnCount++
           if (this.turnCount == this.roundsPlayed){
               this.nextRound();
           }else {
               this.header.innerHTML = `Nice Job! ${this.roundsPlayed - this.turnCount} to go!`
                       }
       } else{
           playing = false;
           document.body.style.backgroundColor = "HotPink";
           this.loser.play();
           this.header.innerHTML = "Incorrect! You Lose"

    }}
    
    //Method called when the round should be incremented, beeps the solution sequence 
    async nextRound(){
        this.turnCount = 0;
        this.header.innerHTML = ``;
        if (this.roundsPlayed++ == this.number){
            //document.body.style.backgroundColor = "DeepSkyBlue"
            this.winner.play();
            this.header.innerHTML = "Yay you win!"
        }
        else if (playing){
            if (this.roundsPlayed !=1){this.next.play()
            this.header.innerHTML = `Nice Job! Prepare for the next Round!`
            await sleep(800)
            this.header.innerHTML = `Round ${this.roundsPlayed} of ${this.number}`;
            await sleep(800)}
            this.beeper(this.sol.slice(0, this.roundsPlayed), 400)
        }
        

        
    }


}

//keeps track of if there is a game currently being played
var playing = false;


var game;

//the function that uses the api to get a start sequence
async function getGreeting(){
    try{
        let endpoint = "http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start"
        let response = await axios.get(endpoint);
        return response;
    } catch(err) {
        alert(err)
        return;}
}
//function that uses the api to get a solution of a length based on the parameter
async function getSeq(number){
    try{
        let endpoint = `http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${number}`
        let response = await axios.get(endpoint);
        return response;
    } catch(err) {
        alert(err)
        return;}
}

//Function that "sleeps" for a certain time, await sleep to use
async function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

let play = document.querySelector("#play")
//event listener that initializes everything once the play button is clicked
play.addEventListener("click", () => {
    //if statement makes sure there is no current game
    
        game = new SimoneGame();
    
})
