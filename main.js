"use strict";
// 1. Very inefficient code ...

// Some bugs (dont feel like fixing)
// 2. if reset button is clicked too quickly (1-2 seconds) then all functions start to glitch
// specifically the fight buttons appearing while each attack is put on the screen in the textbox
// solution: make it so fight buttons are always hidden when the textbox is naming each attack
// another issue I saw was the fight buttons and move buttons being shown simutaneously
// solution: make it so the fight buttons cannot be shown at the same time
// these issues above are all related to resetting the game

const pkmnButton = document.getElementById("menuset1");
const runButton = document.getElementById("menuset2");
const itemButton = document.getElementById("menuset3");

const move0 = document.getElementById("moveset0");
const move1 = document.getElementById("moveset1");
const move2 = document.getElementById("moveset2");
const move3 = document.getElementById("moveset3");

const startermenu = document.getElementById("startermenu");
const moves = document.getElementById("moves");

const textMessage = document.getElementById("text");

const computerMoveSet = ["Psyhcic", "Self-Destruct", "Thunder", "Ice Beam"];

let hpBarAI = 312;
let hpBarPlayer = 406;

let hpai = document.getElementById("hpai");
let hpplayer = document.getElementById("hpplayer");

const hpbar0 = document.getElementById("hpbar0");
const hpbar1 = document.getElementById("hpbar1");
// old battle music Startbattle.mp3, old end music Endbattle.mp3
const sound1 = new Audio("trainerbattle.mp3");
const soundEnd = new Audio("victorysound1.mp3");
const soundLoss = new Audio("lavendertown.mp3");
const soundTie = new Audio("hurryalong.mp3");

let player0HealthBarWidth = "20px";
let player1HealthBarWidth = "20px";

const lowhpsound = new Audio("lowhpsound.mp3");
const player0sprite = document.getElementById("player0sprite");
const player1sprite = document.getElementById("player1sprite");
// Music button on or off

const musicImage = document.getElementById("musicimage");
const musicImage1 = document.getElementById("musicimage1");
const musicButtonOff = document.getElementById("musicbutton");

const restartbutton = document.getElementById("restartbutton");
const resetbutton = document.getElementById("resetbutton");

function musicButton() {
  musicButtonOff.addEventListener("click", function () {
    sound1.volume = 0;
    soundEnd.volume = 0;
    soundLoss.volume = 0;
    soundTie.volume = 0;
    musicButtonOff.style.display = "none";
    musicButtonOn();
  });
}
musicButton();

function musicButtonOn() {
  const musicButtonOn = document.getElementById("musicbutton1");

  musicButtonOn.style.display = "flex";
  musicButtonOn.addEventListener("click", function () {
    sound1.volume = 0.8;
    soundEnd.volume = 0.8;
    soundLoss.volume = 0.8;
    soundTie.volume = 0.8;
    musicButtonOn.style.display = "none";
    musicButtonOff.style.display = "flex";
  });
}

hpBarPlayer >= 1 && hpBarPlayer <= 80;
function changeHealthBarColor() {
  if (hpBarAI <= 0) {
    hpbar0.style.display = "none";
  } else if (hpBarPlayer <= 0) {
    hpbar1.style.display = "none";
  } else if (hpBarPlayer < 150) {
    hpbar1.style.borderColor = "red";
  } else if (hpBarAI < 130) {
    hpbar0.style.borderColor = "red";
  } else if (hpBarPlayer < 200) {
    hpbar1.style.borderColor = "orange";
  } else if (hpBarAI < 200) {
    hpbar0.style.borderColor = "orange";
  }
  if (hpBarPlayer <= 0) {
    hpbar1.style.display = "none";
    lowhpsound.pause();
    lowhpsound.loop = "false";
  } else if (hpBarAI <= 0) {
    hpbar0.style.display = "none";
    lowhpsound.pause();
    lowhpsound.loop = "false";
  } else if (hpBarPlayer < 150) {
    hpbar1.style.borderColor = "red";
    lowhpsound.play();
    lowhpsound.loop = "true";
  } else if (hpBarAI < 130) {
    hpbar0.style.borderColor = "red";
  } else if (hpBarPlayer < 200) {
    hpbar1.style.borderColor = "orange";
  } else if (hpBarAI < 200) {
    hpbar0.style.borderColor = "orange";
  } else if (
    hpbar1.style.borderColor === "orange" ||
    hpbar1.style.borderColor === "green"
  ) {
    lowhpsound.pause();
    lowhpsound.loop = "false";
  }
}
changeHealthBarColor();

function checkWinner() {
  if (hpBarAI === 0 && hpBarPlayer > 1) {
    hpai.textContent = "0 / 312";
    sound1.pause();
    soundEnd.loop = true;
    textMessage.textContent = "You Won!";
    player0sprite.style.display = "none";
    player1sprite.style.display = "flex";

    setTimeout(() => {
      if (hpBarAI === 0 && hpBarPlayer > 1) {
        soundEnd.play();
        textMessage.textContent = "Click reset to restart.";
        restartbutton.style.display = "flex";
      }
    }, 2000);
    moves.style.display = "none";
    startermenu.style.display = "none";
    restartGame();
  }
  if (hpBarPlayer <= 0 && hpBarAI > 1) {
    hpplayer.textContent = "0 / 406";
    sound1.pause();
    soundLoss.loop = true;
    textMessage.textContent = "You Lost...";
    player0sprite.style.display = "flex";
    player1sprite.style.display = "none";
    setTimeout(() => {
      if (hpBarPlayer <= 0 && hpBarAI > 1) {
        soundLoss.play();
        textMessage.textContent = "Click reset to try again.";
        restartbutton.style.display = "flex";
      }
    }, 2000);
    moves.style.display = "none";
    startermenu.style.display = "none";
    restartGame();
  }
  if (hpBarPlayer <= 0 && hpBarAI <= 0) {
    hpai.textContent = "0 / 312";
    hpplayer.textContent = "0 / 406";
    sound1.pause();
    sound1.loop = false;
    soundEnd.pause();
    soundEnd.loop = false;
    soundTie.play();
    soundTie.loop = true;
    textMessage.textContent =
      "Both SNORLAX and MEWTWO have fainted. The result is a draw.";
    player0sprite.style.display = "none";
    player1sprite.style.display = "none";
    moves.style.display = "none";
    startermenu.style.display = "none";
    restartbutton.style.display = "flex";
    restartGame();
  }
}
// These temp functions make the poof sound when hp bars are 0
function tempo() {
  if (
    player0sprite.style.display === "none" &&
    player1sprite.style.display === "none"
  ) {
    soundPlayer("poof.mp3");
    sound1.pause();
    sound1.loop = false;
    soundEnd.pause();
    soundEnd.loop = false;
    soundTie.play();
    soundTie.loop = true;
  }
}
tempo();
function tempo1() {
  if (hpBarPlayer <= 0 || hpBarAI <= 0) {
    soundPlayer("poof.mp3");
  }
}

// This function does not allow the player to open PkMn, Item, Or Run.
function otherButtons(button) {
  button.addEventListener("click", function () {
    startermenu.style.display = "none";
    buttonNoise0();
    textMessage.textContent = "Fool! You must fight.";
    if ((textMessage.textContent = "Fool! You must fight.")) {
      setTimeout(function () {
        textMessage.textContent = "";
        startermenu.style.display = "flex";
        moves.style.display = "none";
      }, 3000);
    }
  });
}
otherButtons(pkmnButton);
otherButtons(runButton);
otherButtons(itemButton);

// This function shows moves to the user when fight is pressed
function fight() {
  const fightButton = document.getElementById("menuset0");
  fightButton.addEventListener("click", function () {
    buttonNoise0();
    moves.style.display = "flex";
    startermenu.style.display = "none";
  });
}
fight();

//Player Attacks
function setHp0() {
  if (hpBarAI < 0) {
    hpBarAI = 0;
    checkWinner();
  }
}

function attack0() {
  move0.onclick = function () {
    buttonNoise0();
    moves.style.display = "none";
    textMessage.textContent = "SNORLAX Used Earthquake!";
    if (hpBarAI > 0 || hpBarPlayer > 0) {
      moveSnorlax();
      soundPlayer("Earthquake.mp3");
      setTimeout(function () {
        textMessage.textContent = "Earthquake did 82 damage!";
        hpBarAI -= 82;
        setHp0();
        changeHealthBarColor();
        tempo1();

        if (hpBarAI < 130) {
          hpbar0.style.borderColor = "red";
        }
        hpai.textContent = `${hpBarAI} / 312`;
        let playerAttack0 = (hpBarAI / 312) * 100;
        player0HealthBarWidth = hpBarAI - playerAttack0;
        hpbar0.style.width = `${player0HealthBarWidth}px`;
        setTimeout(function () {
          computerAttack();
          setTimeout(function () {
            textMessage.textContent = "";
            startermenu.style.display = "flex";
            checkWinner();
          }, 3000);
        }, 1500);
      }, 1500);
    } else checkWinner();
  };
}
attack0();

function attack1() {
  move1.onclick = function () {
    buttonNoise0();
    moves.style.display = "none";
    textMessage.textContent = "SNORLAX used Double-Edge!";
    if (hpBarAI > 0 || hpBarPlayer > 0) {
      moveSnorlax();
      soundPlayer("DoubleEdge.mp3");
      setTimeout(function () {
        textMessage.textContent = "Double-Edge did 130 damage!";
        hpBarAI -= 130;
        setHp0();
        changeHealthBarColor();
        tempo1();
        hpai.textContent = `${hpBarAI} / 312`;
        let playerAttack1 = (hpBarAI / 312) * 100;
        player0HealthBarWidth = hpBarAI - playerAttack1;
        hpbar0.style.width = `${player0HealthBarWidth}px`;
        if (player0HealthBarWidth < 130) {
          hpbar0.style.borderColor = "red";
        }
      }, 1500);
      setTimeout(function () {
        moveSnorlaxRecoil();
        if (hpBarAI > 0 && hpBarPlayer > 0) {
          textMessage.textContent = "Oh no, SNORLAX was hit with Recoil!";
        }
        hpBarPlayer -= 53;
        if (hpBarPlayer < 0) {
          hpBarPlayer = 0;
        }
        checkWinner();
        hpplayer.textContent = `${hpBarPlayer} / 406`;
        let playerRecoil = (hpBarPlayer / 406) * 100;
        player1HealthBarWidth = hpBarPlayer - (220 * playerRecoil) / 100;
        hpbar1.style.width = `${player1HealthBarWidth}px`;
        changeHealthBarColor();
        setHp0();
        tempo1();
        setTimeout(function () {
          computerAttack();
          setTimeout(function () {
            textMessage.textContent = "";
            startermenu.style.display = "flex";
            checkWinner();
          }, 3000);
        }, 1500);
      }, 1500);
    } else checkWinner();
  };
}
attack1();

function attack2() {
  move2.onclick = function () {
    buttonNoise0();
    moves.style.display = "none";
    textMessage.textContent = "SNORLAX used Recover!";
    if (hpBarAI > 0 || hpBarPlayer > 0) {
      moveSnorlax();
      soundPlayer("Recover.mp3");
      if (hpBarPlayer <= 310) {
        setTimeout(function () {
          textMessage.textContent = "HP was Restored!";
          hpBarPlayer += 96;
          setHp0();
          tempo1();
          hpplayer.textContent = `${hpBarPlayer} / 406`;
          let playerAttack2 = hpBarPlayer / 406;
          player1HealthBarWidth = 220 * playerAttack2;
          hpbar1.style.width = `${player1HealthBarWidth}px`;
          changeHealthBarColor();
          if (hpBarPlayer < 200) {
            hpbar1.style.borderColor = "orange";
          }
          if (hpBarPlayer > 200) {
            hpbar1.style.borderColor = "green";
          }
          if (hpBarPlayer < 100) {
            hpbar1.style.borderColor = "red";
          }
          // For stopping the low hp sound when hp is recovered
          if (
            hpbar1.style.borderColor === "orange" ||
            hpbar1.style.borderColor === "green"
          ) {
            lowhpsound.pause();
            lowhpsound.loop = "false";
          }
          setTimeout(function () {
            changeHealthBarColor();
            computerAttack();
            setTimeout(function () {
              textMessage.textContent = "";
              startermenu.style.display = "flex";
              checkWinner();
            }, 3000);
          }, 1500);
        }, 1500);
      } else {
        setTimeout(function () {
          textMessage.textContent = "SNORLAX recovered to full hp!";
          hpBarPlayer = 406;
          hpbar1.style.width = "220px";
          setHp0();
          tempo1();
          changeHealthBarColor();
          setTimeout(function () {
            changeHealthBarColor();
            computerAttack();
            setTimeout(function () {
              textMessage.textContent = "";
              startermenu.style.display = "flex";
              checkWinner();
            }, 3000);
          }, 1500);
        }, 1500);
      }
    } else checkWinner();
  };
}
attack2();

function attack3() {
  move3.onclick = function () {
    buttonNoise0();
    moves.style.display = "none";
    textMessage.textContent = "SNORLAX used Body Slam!";
    soundPlayer("BodySlam.mp3");
    if (hpBarAI > 0 || hpBarPlayer > 0) {
      moveSnorlax();
      setTimeout(function () {
        textMessage.textContent = "Body Slam did 97 damage!";
        hpBarAI -= 97;
        setHp0();
        changeHealthBarColor();
        tempo1();
        hpai.textContent = `${hpBarAI} / 312`;
        let playerAttack3 = (hpBarAI / 312) * 100;
        player0HealthBarWidth = hpBarAI - playerAttack3;
        hpbar0.style.width = `${player0HealthBarWidth}px`;
        setTimeout(function () {
          changeHealthBarColor();
          computerAttack();
          setTimeout(function () {
            textMessage.textContent = "";
            startermenu.style.display = "flex";
            checkWinner();
          }, 3000);
        }, 1500);
      }, 1500);
    } else checkWinner();
  };
}
attack3();

function computerAttack() {
  const randomNumber = Math.floor(Math.random() * 4);
  let attackMove = computerMoveSet[randomNumber];
  if ((hpBarAI > 0) & (hpBarPlayer > 0)) {
    if (attackMove === computerMoveSet[0]) {
      moveMewTwo();
      textMessage.textContent = `MEWTWO used Psychic`;
      soundPlayer("Psychic.mp3");
      setTimeout(function () {
        textMessage.textContent = "Psychic did 101 damage!";
        hpBarPlayer -= 101;
        changeHealthBarColor();
        setHp0();
        tempo1();
        hpplayer.textContent = `${hpBarPlayer} / 406`;
        let enemyAttack0 = (hpBarPlayer / 406) * 100;
        player1HealthBarWidth = hpBarPlayer - (220 * enemyAttack0) / 100;
        hpbar1.style.width = `${player1HealthBarWidth}px`;
        checkWinner();
      }, 1500);
    } else if (attackMove === "Self-Destruct") {
      moveMewTwo();
      textMessage.textContent = "MEWTWO used Self-Destruct";
      soundPlayer("SelfDestruct.mp3");
      setTimeout(function () {
        textMessage.textContent = `Self-Destruct did 270 damage!`;
        hpBarPlayer -= 270;
        changeHealthBarColor();
        setHp0();
        tempo1();
        hpplayer.textContent = `${hpBarPlayer} / 406`;
        let enemyAttack1 = (hpBarPlayer / 406) * 100;
        player1HealthBarWidth = hpBarPlayer - (220 * enemyAttack1) / 100;
        hpbar1.style.width = `${player1HealthBarWidth}px`;
        setTimeout(function () {
          moveMewTwoRecoil();
          if (hpBarAI > 0 && hpBarPlayer > 0) {
            textMessage.textContent = "MEWTWO recieved heavy recoil!";
          }
          hpBarAI -= 100;
          hpai.textContent = `${hpBarAI} / 312`;
          if (hpBarAI <= 130) {
            hpbar0.style.borderColor = "red";
          }
          if (hpBarAI > 130 && hpBarAI < 200) {
            hpbar0.style.borderColor = "orange";
          }
          setHp0();
          changeHealthBarColor();

          let enemyRecoil = (hpBarAI / 312) * 100;
          player0HealthBarWidth = hpBarAI - (220 * enemyRecoil) / 100;
          hpbar0.style.width = `${player0HealthBarWidth}px`;
          function rocky() {
            textMessage.textContent = "";
            startermenu.style.display = "flex";
            checkWinner();
          }
          rocky();
        }, 1500);
        checkWinner();
      }, 1500);
    } else if (attackMove === "Thunder") {
      moveMewTwo();
      textMessage.textContent = "MEWTWO used Thunder";
      soundPlayer("Thunder.mp3");
      setTimeout(function () {
        textMessage.textContent = "Thunder did 120 damage!";
        hpBarPlayer -= 120;
        changeHealthBarColor();
        setHp0();
        tempo1();
        hpplayer.textContent = `${hpBarPlayer} / 406`;
        let enemyAttack2 = (hpBarPlayer / 406) * 100;
        player1HealthBarWidth = hpBarPlayer - (220 * enemyAttack2) / 100;
        hpbar1.style.width = `${player1HealthBarWidth}px`;
        checkWinner();
      }, 1500);
    } else if (attackMove === "Ice Beam") {
      moveMewTwo();
      textMessage.textContent = `MEWTWO used Ice Beam`;
      soundPlayer("IceBeam.mp3");
      setTimeout(function () {
        textMessage.textContent = "Ice Beam did 98 damage!";
        hpBarPlayer -= 98;
        changeHealthBarColor();
        setHp0();
        tempo1();
        hpplayer.textContent = `${hpBarPlayer} / 406`;
        let enemyAttack3 = (hpBarPlayer / 406) * 100;
        player1HealthBarWidth = hpBarPlayer - (220 * enemyAttack3) / 100;
        hpbar1.style.width = `${player1HealthBarWidth}px`;
        checkWinner();
      }, 1500);
    }
  }
}

// Sounds
function buttonNoise0() {
  const sound0 = new Audio("buttonsound.mp3");
  sound0.play();
}
function buttonNoise1() {
  sound1.play();
  sound1.loop = true;
  sound1.volume = 0.8;
}
buttonNoise1();

function soundPlayer(sound) {
  let temp = new Audio(sound);
  temp.play();
}

// Reset Button
function restartGame() {
  resetbutton.addEventListener("click", function () {
    let buttontemp = new Audio("buttonsound.mp3");
    buttontemp.volume = 0.5;
    buttontemp.play();
    restartbutton.style.display = "none";
    moves.style.display = "none";
    hpBarAI = 312;
    hpai.textContent = `${hpBarAI} / 312`;
    hpBarPlayer = 406;
    hpplayer.textContent = `${hpBarPlayer} / 406`;
    hpbar0.style.borderColor = "green";
    hpbar1.style.borderColor = "green";
    hpbar0.style.width = "220px";
    hpbar1.style.width = "220px";
    textMessage.textContent = "";
    startermenu.style.display = "flex";
    player0sprite.style.display = "flex";
    player1sprite.style.display = "flex";
    if ((hpbar0.style.display = "none")) {
      hpbar0.style.display = "flex";
    }
    if ((hpbar1.style.display = "none")) {
      hpbar1.style.display = "flex";
    }
    soundEnd.pause();
    soundEnd.loop = false;
    soundLoss.pause();
    soundLoss.loop = false;
    soundTie.pause();
    soundTie.loop = false;
    sound1.play();
    sound1.loop = true;
  });
}

// Sprite Animation

const snorlax = document.getElementById("player1sprite");
function moveSnorlax() {
  snorlax.style.marginTop = "-290px";
  setTimeout(() => {
    snorlax.style.marginTop = "-280px";
  }, 300);
}
const mewtwo = document.getElementById("player0sprite");
function moveMewTwo() {
  mewtwo.style.marginRight = "20px";
  setTimeout(() => {
    mewtwo.style.marginRight = "30px";
  }, 300);
}

function moveSnorlaxRecoil() {
  snorlax.style.marginLeft = "20px";
  setTimeout(() => {
    snorlax.style.marginLeft = "30px";
  }, 300);
}

function moveMewTwoRecoil() {
  mewtwo.style.marginTop = "-430px";
  setTimeout(() => {
    mewtwo.style.marginTop = "-420px";
  }, 300);
}
