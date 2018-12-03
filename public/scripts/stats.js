/*var userScore = document.getElementById('userScore');
var compScore = document.getElementById('compScore');
var gamesplayed = document.getElementById('gamesplayed');
var winrate = document.getElementById('winrate');
var rockrate = document.getElementById('rockrate');
var paperrate = document.getElementById('paperrate');
var scissorsrate = document.getElementById('scissorsrate');

*/


if(localStorage.udata != null){
  var udata = JSON.parse(localStorage.getItem('udata'));
Object.keys(udata).forEach(function (itemValue) {
  if(document.getElementById(itemValue) !== null)
  document.getElementById(itemValue).innerHTML = udata[itemValue];

});
}
if(localStorage.bowdata != null){
  var bowdata = JSON.parse(localStorage.getItem('bowdata'));
  document.getElementById('compScore').innerHTML = bowdata.score;
  document.getElementById('bowrockrate').innerHTML = bowdata.rockrate;
  document.getElementById('bowpaperrate').innerHTML = bowdata.paperrate;
  document.getElementById('bowscissorsrate').innerHTML = bowdata.scissorsrate;


}
