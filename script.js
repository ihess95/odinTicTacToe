const game = {
  player1: {
    active: true,
  },
  player2: {
    active: false,
  },
  state: "playing",
};

const gameBoard = (() => {
  const bodyContainer = document.querySelector(".bodyContainer");
  const statusContainer = document.createElement("div");
  const buttonsContainer = document.createElement("div");
  const resetBtn = document.createElement("button");
  statusContainer.classList.add("statusContainer");
  statusContainer.textContent = "Tic Tac Toe Game";
  resetBtn.textContent = "Restart game";
  buttonsContainer.appendChild(resetBtn);
  bodyContainer.prepend(statusContainer);
  bodyContainer.appendChild(buttonsContainer);
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
        resetBtn.addEventListener("click", function () {
          cellsArray[i].textContent = "";
          game.state = "playing";
          console.log("test");
        });
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
    console.log(winCond);
    for (let i = 0; i < winCond.length; i++) {
      if (
        winCond[i][0] != "" &&
        winCond[i][0] === winCond[i][1] &&
        winCond[i][0] === winCond[i][2]
      ) {
        game.state = "after";
        statusContainer.textContent = "You win";
      }
    }
  }
  checkWin();
})();
