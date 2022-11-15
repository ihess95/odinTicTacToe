const gameBoard = (() => {
  const game = {
    player1: {
      active: true,
    },
    player2: {
      active: false,
    },
    state: "playing",
  };
  function ContainerBuildPrepend(name, text) {
    this.name = name;
    name = document.createElement("div");
    this.text = text;
    name.classList.add(this.name);
    name.textContent = text;
    bodyContainer.prepend(name);
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
      statusContainer.textContent = "Tic Tac Toe Game";
    });
    return buttonName;
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
              checkWin();
            } else {
              game.player1.active = true;
              game.player2.active = false;
              cells[i].textContent = "X";
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
        statusContainer.textContent =
          game.player1.state === "active" ? "Player 1 wins" : "Player 2 wins";
      }
    }
  }
  checkWin();
})();
