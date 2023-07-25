window.addEventListener('DOMContentLoaded', init);

function init() {
  const startGameButton = document.getElementById("startButton");
  startGameButton.addEventListener("click", startGame);
}

function startGame() {
  const optionsInput = document.getElementById("optionsInput");
  if(optionsInput.value < 2 ){
    warn("Number of options must be more than one");
  }else if (optionsInput.value > 20 ){
    warn("Number of options must between 2 and 20");
  }else{
    localStorage.setItem('options', optionsInput.value);
    window.location.href = "game.html";

  }

  function warn(message) {
    alert (message);
  }
  
}