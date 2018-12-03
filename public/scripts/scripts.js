var userScore = 0;
var compScore = 0;
var gamesplayed = 0;
var userWinrate = 0;
var recordthrows = [0,0,0];
var bow_recordthrows = [0,0,0];
var tiecount = 0;
var throw_choice1;
var player_name;

class Player{
  constructor(name,score,gamesplayed,rocks,scissors,papers){
  this.name = name;
  this.score = score;
  this.gamesplayed = gamesplayed;
  this.winrate = score/gamesplayed*100;
  this.rocks = rocks;
  this.scissors = scissors;
  this.papers = papers;
  this.rockrate = rocks/gamesplayed*100;
  this.scissorsrate = scissors/gamesplayed*100;
  this.paperrate = papers/gamesplayed*100;
}}


if(localStorage.udata != null){
  var udata = JSON.parse(localStorage.getItem('udata'));
  player_name = udata.name;
}
else
  var udata = new Player(null,0,0,0,0,0);

if(localStorage.bowdata != null){
  var bowdata = JSON.parse(localStorage.getItem('bowdata'));
}
else
 var bowdata = new Player(null,0,0,0,0,0);





if(!player_name){
  makeVisible(document.getElementById("enter_name"));
}
else{
  document.getElementById("clientgreeting").innerHTML="Hi "+localStorage.getItem("player_name")+"! Are you ready to RUMBLE?"
  makeVisible(throw_choice);
}

toggleVisibility(document.getElementById("enter_name_button"),document.getElementById("enter_name"));


function winner(userchoice, compchoice) {
    if (userchoice == compchoice) {
        console.log("Tie.");
        makeGood(game_results);
        return ["YOU BOTH THREW THE SAME THING: TIE", "tie"];
    } else if (userchoice == 0) {
        if (compchoice == 2) {
            console.log("rock > scissors");
            makeGood(game_results);
            return ["nice! you're just so heavy that you were able to overwhelm bowser! You threw rock and bowser threw scissors!", "user"];
        } else if (compchoice === 1) {
            console.log("paper > rock");
            makeBad(game_results);
            return ["eeek, bowser just cut right through you. You threw rock and bowser threw paper", "comp"];
        }
    } else if (userchoice == 1) {
        if (compchoice == 0) {
            console.log("paper > rock");
            makeGood(game_results);
            return ["You WIN! Your paper beats bowser's rock", "user"];
        } else if (compchoice === 2) {
            console.log("scissors > paper");
            makeBad(game_results);
            return ["YOU LOST TO SCISSORS BOWSER HA HA! Your scissors beat bowser's paper", "comp"];
        }
    } else if (userchoice == 2) {
        if (compchoice == 0) {
            console.log("rock > scissors");
            makeBad(game_results);
            return ["you got crushed by rock bowser! Your scissors got beat by bowser's rock", "comp"];
        } else if (compchoice == 1) {
            console.log("scissors > paper");
            makeGood(game_results);
            return ["snip snip! You just cut right through paper bowser. Your scissors beat bowser's paper", "user"];
        }
    }
}

document.getElementById("confirm_name").addEventListener('click', function () {
    player_name = document.getElementById("name_input").value;
    if(player_name != null){
    localStorage.setItem("player_name",player_name);
    console.log(player_name);
    makeInvisible(enter_name)
    makeVisible(throw_choice);
  }

    document.getElementById("clientgreeting").innerHTML="Hi "+localStorage.getItem("player_name")+"! Are you ready to RUMBLE?"
});
document.getElementById("play_again_button").addEventListener('click',function() {
    document.getElementById("throw").value = "";
});
document.getElementById("confirm_choice").addEventListener('click', function () {

    throw_choice1 = document.getElementById("throw").value
    if(throw_choice1 != ""){
    var bowser_choice = Math.floor(Math.random() * 3);//0=Rock, 1=Paper, 2=Scissors
    //console.log(throw_choice1,bowser_choice)

    if(throw_choice1 == 0){
      document.getElementById("Hand").src='images/gokurock.jpg'
      recordthrows[0] += 1;
    }
    else if(throw_choice1 == 1){
      document.getElementById("Hand").src='images/gokupaper.PNG'
      recordthrows[1] += 1;
    }
    else if(throw_choice1 == 2){
      document.getElementById("Hand").src='images/gokuscissors.jpg'
      recordthrows[2] += 1;
    }

    if(bowser_choice == 0){
      document.getElementById("Bowser").src='images/rockbowser.png'
        bow_recordthrows[0] += 1;
    }
    else if(bowser_choice==1){
      document.getElementById("Bowser").src='images/paperbowser.jpg'
        bow_recordthrows[1] += 1;
    }
    else {
      document.getElementById("Bowser").src='images/scissorsbowser.png'
        bow_recordthrows[2] += 1;
    }


    result = winner(throw_choice1, bowser_choice);
    console.log(result)
      if (result[1] === "user") {
          userScore++;
          console.log("Add one to user! userScore is now " + userScore);

      } else if (result[1] === "comp") {
          compScore++;
          console.log("Add one to computer! compScore is now " + compScore);
      } else if (result[1] === "tie") {
        tiecount++;
          console.log("It was a tie!")
      }

    document.getElementById("game_results").innerHTML=result[0]
    udata = new Player(player_name, udata.score+userScore, udata.gamesplayed+1, recordthrows[0]+udata.rocks, recordthrows[1]+udata.scissors, recordthrows[2]+udata.papers);
    bowdata = new Player("bowser", bowdata.score+compScore, bowdata.gamesplayed+1, bow_recordthrows[0]+bowdata.rocks, bow_recordthrows[1]+bowdata.scissors, bow_recordthrows[2]+bowdata.papers);

    userScore = 0;
    compScore = 0;

    recordthrows = [0,0,0];
    bow_recordthrows = [0,0,0];

    localStorage.setItem('udata', JSON.stringify(udata));
    localStorage.setItem('bowdata', JSON.stringify(bowdata));
}
});

function toggleVisibility(button, div){
  button.addEventListener("click", function(){
  if(div.classList.contains("hidden")){
    div.classList.remove("hidden");
    div.classList.add("visible");
  }
  else{
    div.classList.remove("visible");
    div.classList.add("hidden");
  }
 })
}
function makeVisible(div){
      if(div.classList.contains("hidden")){
        div.classList.remove("hidden");
        div.classList.add("visible");
      }
}
function makeInvisible(div){
        if(div.classList.contains("visible")){
          div.classList.remove("visible");
          div.classList.add("hidden");
        }
}

function makeBad(div){
      if(div.classList.contains("good")){
        div.classList.remove("good");
        div.classList.add("bad");
      }
}
function makeGood(div){
      if(div.classList.contains("bad")){
        div.classList.remove("bad");
        div.classList.add("good");
      }
}
