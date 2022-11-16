const game = {
  player1: {
    active: true,
    name: "Player 1",
    score: 0,
  },
  player2: {
    active: false,
    name: "Player 2",
    score: 0,
  },
  state: "playing",
  counter: 0,
};
const gameBoard = (() => {
  function ContainerBuildPrepend(name, text) {
    this.name = name;
    name = document.createElement("div");
    this.text = text;
    name.classList.add(this.name);
    name.textContent = text;
    bodyContainer.prepend(name);
    return name;
  }
  function ContainerBuildButtons(name, buttonName) {
    this.name = name;
    console.log(this.name);
    name = document.createElement("div");
    console.log(name);
    name.classList.add(this.name);
    bodyContainer.appendChild(name);
    this.buttonName = buttonName;
    this.buttonName = document.createElement("button");
    this.buttonName.textContent = "Restart game";
    name.appendChild(this.buttonName);
    bodyContainer.appendChild(name);
    this.buttonName.addEventListener("click", function () {
      for (let i = 0; i < cellsArray.length; i++)
        cellsArray[i].textContent = "";
      game.state = "playing";
      game.counter = 0;
      statusContainer.textContent = "Tic Tac Toe Game";
      p1ResultsContainer.textContent = `${game.player1.name}: ${game.player1.score}`;
      resultsContainer.appendChild(p2ResultsContainer);
      statusContainer.appendChild(resultsContainer);
      p2ResultsContainer.textContent = `${game.player2.name}: ${game.player2.score}`;
    });
    return name;
  }
  const bodyContainer = document.querySelector(".bodyContainer");
  const statusContainer = new ContainerBuildPrepend(
    "statusContainer",
    "Tic Tac Toe Game"
  );
  const buttonsContainer = new ContainerBuildButtons(
    "buttonsContainer",
    "resetBtn"
  );
  const resultsContainer = document.createElement("div");
  resultsContainer.classList.add("resultsContainer");
  statusContainer.appendChild(resultsContainer);
  const p1ResultsContainer = document.createElement("div");
  resultsContainer.appendChild(p1ResultsContainer);
  p1ResultsContainer.textContent = `${game.player1.name}: ${game.player1.score}`;
  const p2ResultsContainer = document.createElement("div");
  resultsContainer.appendChild(p2ResultsContainer);
  p2ResultsContainer.textContent = `${game.player2.name}: ${game.player2.score}`;
  const choosePlayer = document.createElement("button");
  choosePlayer.textContent = "Choose Player";

  choosePlayer.addEventListener("click", function () {
    if ((game.state = "before")) {
      if (game.player1.active === true) {
        game.player1.active = false;
        game.player2.active = true;
      } else {
        game.player2.active = false;
        game.player1.active = true;
      }
    }
  });

  buttonsContainer.appendChild(choosePlayer);

  const gridContainer = document.querySelector(".gridContainer");

  const createGrid = (() => {
    for (let i = 0; i < 3; i++) {
      let cols = document.createElement("div");
      cols.className = "cols";
      gridContainer.appendChild(cols);
      for (let j = 0; j < 3; j++) {
        let cells = document.createElement("div");
        cells.className = "cells";
        cols.appendChild(cells);
      }
    }
  })();

  const cells = document.querySelectorAll(".cells");
  const cellsArray = Array.from(cells);

  const numberCells = (() => {
    for (let i = 0; i < cells.length; i++) {
      cellsArray[i].classList.add("cell" + i);
      cellsArray[i].addEventListener("click", function () {
        if (game.state === "playing") {
          if (cellsArray[i].textContent === "") {
            if (game.player1.active) {
              game.player1.active = false;
              game.player2.active = true;
              cells[i].textContent = "O";
              game.counter++;
              if (game.counter >= 9) {
                game.state = "tied";
              }
              checkWin();
            } else {
              game.player1.active = true;
              game.player2.active = false;
              cells[i].textContent = "X";
              game.counter++;
              if (game.counter >= 9) {
                game.state = "tied";
              }
              checkWin();
            }
          }
        }
      });
    }
  })();

  function checkWin() {
    const winCond = [
      [
        cellsArray[0].textContent,
        cellsArray[1].textContent,
        cellsArray[2].textContent,
      ],
      [
        cellsArray[3].textContent,
        cellsArray[4].textContent,
        cellsArray[5].textContent,
      ],
      [
        cellsArray[6].textContent,
        cellsArray[7].textContent,
        cellsArray[8].textContent,
      ],
      [
        cellsArray[0].textContent,
        cellsArray[3].textContent,
        cellsArray[6].textContent,
      ],
      [
        cellsArray[1].textContent,
        cellsArray[4].textContent,
        cellsArray[7].textContent,
      ],
      [
        cellsArray[2].textContent,
        cellsArray[5].textContent,
        cellsArray[8].textContent,
      ],
      [
        cellsArray[0].textContent,
        cellsArray[4].textContent,
        cellsArray[8].textContent,
      ],
      [
        cellsArray[2].textContent,
        cellsArray[4].textContent,
        cellsArray[6].textContent,
      ],
    ];
    for (let i = 0; i < winCond.length; i++) {
      if (
        winCond[i][0] != "" &&
        winCond[i][0] === winCond[i][1] &&
        winCond[i][0] === winCond[i][2]
      ) {
        game.state = "after";
        if (game.player1.active === true) {
          game.player1.score++;
        } else {
          game.player2.score++;
        }
        statusContainer.textContent =
          game.player1.active === true ? "Player 1 wins" : "Player 2 wins";
      } else if (game.state === "tied") {
        statusContainer.textContent = "Draw";
      }
    }
  }
  checkWin();
})();
