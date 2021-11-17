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
        })//adds border while hovered over
        this.button.addEventListener("mouseover", () =>{
            if (playing) {
                this.button.classList.add("hover");
            }})
        //removes the border once hover is gone    
        this.button.addEventListener("mouseout", () => {
            if (playing) {this.button.classList.remove("hover")}
        })
        //when the mouse is released it does the check and noise but no flash
        this.button.addEventListener("mouseup", () =>{
            this.revert();
            this.game.check(this.name);
            this.sound.play()}
        )    
         
    }
} 
//Class for a specific instance of the game 
class SimoneGame {
    constructor (){
        
        this.turnCount = 0;

        this.number = document.querySelector("#rounds").value;
        
        this.roundsPlayed = 0;  
        
        //inits all the buttons
        this.R = new Button("#redSq", "R", this, soundPath.red)
        this.B = new Button("#blueSq", "B", this, soundPath.blue)
        this.G = new Button("#greenSq", "G", this, soundPath.green)
        this.Y = new Button("#yellowSq", "Y", this, soundPath.yellow)
        this.header = document.querySelector("#status");

        //necessary sounds for the game
        this.loser = new Audio(soundPath.lose)
        this.winner = new Audio(soundPath.win)
        this.next = new Audio(soundPath.next)
        this.wrong = new Audio(soundPath.wrong)
        this.newGame(this.number);
   
    }

    
    //function that rings the various buttons
    async beeper(pattern, delay){
        if(typeof(delay)==='undefined') delay = RINGDELAY;
        for (const color of pattern) {
            await this.ring(color);
            await sleep(delay);
        }
    }
    //method that is called when a new game is began
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

        //getting main solution
        this.sol = await getSeq(this.number);
        this.sol = this.sol.data.key

        //starts game loop
        this.nextRound();
        
    }

    //"rings" button by changing color and playing sound
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
    //checks if the clicked button is the right one according to the solution
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

        //checks the rounds completed against total to see if done
        if (this.roundsPlayed++ == this.number){
            document.body.style.backgroundColor = "DeepSkyBlue"
            this.winner.play();
            this.header.innerHTML = "Yay you win!"
        }
        else if (playing){
            //if it isnt the first round, print out messages
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
