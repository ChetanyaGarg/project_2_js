let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let turnX = true;
let msgdisplay = document.querySelector(".msgdisplay");
let track = 0;
let isdraw = true;




const winningpattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],         //all the possible combinations of winning
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const draw = () => {
  if (track === 9) {
    for (let cell of winningpattern) {
      const cell1 = boxes[cell[0]].innerHTML;
      const cell2 = boxes[cell[1]].innerHTML;
      const cell3 = boxes[cell[2]].innerHTML;
      if (cell1 !== "" && cell2 !== "" && cell3 !== "" && cell1 === cell2 && cell2 === cell3) {
        isdraw = false;
        break;
      }
    }
    if (isdraw) {
      msgdisplay.classList.remove("hide");
      msgdisplay.innerHTML = "It 's A Draw";
      console.log(track);
    }
  }
}
const winnerofgame = (winner12) => {
  msgdisplay.innerHTML = "The Winner Is Player " + winner12;
  msgdisplay.classList.remove("hide");
  for (box of boxes) {
    box.disabled = true;
  }
}
const enable = () => {
  for (box of boxes) {
    box.disabled = false;
    turnX = true;
    msgdisplay.classList.add("hide");
    box.innerHTML = "";
    track = 0;
  }
}
const winner = () => {
  for (let position of winningpattern) {
    const pos1 = boxes[position[0]].innerHTML;
    const pos2 = boxes[position[1]].innerHTML;
    const pos3 = boxes[position[2]].innerHTML;
    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        winnerofgame(pos1);
        return;
      }
    }
  }
}

reset.addEventListener("click", enable);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.classList.add("x");
      box.classList.remove("y");
      box.innerHTML = "X";
      turnX = false;
      box.disabled = true;
      track += 1;
    } else {
      box.classList.add("y");
      box.classList.remove("x");
      box.innerHTML = "O";
      turnX = true;
      box.disabled = true;
      track += 1;
    }
    draw();
    winner();
  });
});
