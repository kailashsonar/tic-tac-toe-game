const boxes = document.querySelectorAll(".box");

const playerBtn = document.querySelector('.playerBtn');

const startBtn = document.querySelector('.startBtn');
let start = false;

const computerBtn = document.querySelector('.computerBtn');
let computerGame = false;
const restartBtn = document.querySelector('.restartBtn');
const bodyTag = document.querySelector('body');

let flip = false;
const pressBtn = [];

let game = [[], [], []];
let h2Heading = document.createElement("h2");

let circleWon = false;
let xWon = false;

for (box of boxes) {
    box.addEventListener("click", function (ev) {
        if (!pressBtn.includes(parseInt(ev.target.id)) && ev.target.localName == "div" && start && !circleWon && !xWon) {

            if (flip) {
                const newX = document.createElement("i");
                newX.className = "fa-regular fa-x";

                this.append(newX);
                flip = false;

                pressBtn.push(parseInt(ev.target.id));

                store(ev.target.id, "x");
                check();
                if (computerGame && !circleWon) {
                    random();
                }
            }
            else {
                let newCircle = document.createElement("i");
                newCircle.className = "fa-regular fa-circle";

                this.append(newCircle);
                flip = true;

                pressBtn.push(parseInt(ev.target.id));

                store(ev.target.id, "circle");
                check();
                if (computerGame && !circleWon && !xWon) {
                    random();
                }
            }
        }
    });
}

function store(id, name) {
    if (id == 1 || id == 2 || id == 3) {
        game[0][id - 1] = name;
    }
    else if (id == 4 || id == 5 || id == 6) {
        game[1][id - 4] = name;
    }
    else if (id == 7 || id == 8 || id == 9) {
        game[2][id - 7] = name;
    }
}

function check() {
    const xMark = "x";
    const circleMark = "circle";

    if ((game[0][0] == xMark && game[0][1] == xMark && game[0][2] == xMark) || (game[1][0] == xMark && game[1][1] == xMark && game[1][2] == xMark) || (game[2][0] == xMark && game[2][1] == xMark && game[2][2] == xMark) || (game[0][0] == xMark && game[1][0] == xMark && game[2][0] == xMark) || (game[0][1] == xMark && game[1][1] == xMark && game[2][1] == xMark) || (game[0][2] == xMark && game[1][2] == xMark && game[2][2] == xMark) || (game[0][0] == xMark && game[1][1] == xMark && game[2][2] == xMark) || (game[0][2] == xMark && game[1][1] == xMark && game[2][0] == xMark)) {
        xWon = true;

        const newX = document.createElement("i");
        newX.className = "fa-regular fa-x";

        h2Heading.append(newX, " won");

        bodyTag.prepend(h2Heading);

    } else if ((game[0][0] == circleMark && game[0][1] == circleMark && game[0][2] == circleMark) || (game[1][0] == circleMark && game[1][1] == circleMark && game[1][2] == circleMark) || (game[2][0] == circleMark && game[2][1] == circleMark && game[2][2] == circleMark) || (game[0][0] == circleMark && game[1][0] == circleMark && game[2][0] == circleMark) || (game[0][1] == circleMark && game[1][1] == circleMark && game[2][1] == circleMark) || (game[0][2] == circleMark && game[1][2] == circleMark && game[2][2] == circleMark) || (game[0][0] == circleMark && game[1][1] == circleMark && game[2][2] == circleMark) || (game[0][2] == circleMark && game[1][1] == circleMark && game[2][0] == circleMark)) {
        circleWon = true;

        const newCircle = document.createElement("i");
        newCircle.className = "fa-regular fa-circle";

        h2Heading.append(newCircle, " won");

        bodyTag.prepend(h2Heading);
    } else if (pressBtn.length === 9 && !circleWon && !xWon) {
        h2Heading.textContent = "Match Draw!";
        bodyTag.prepend(h2Heading);
    }

}

function random() {
    while (true) {
        let ranBtn = Math.floor(Math.random() * 9);

        if (pressBtn.length === 9) {
            break;
        }

        if (!pressBtn.includes(ranBtn + 1)) {
            pressBtn.push(ranBtn + 1);
            let newXmark = document.createElement("i");
            newXmark.classList.add("fa-regular");
            newXmark.classList.add("fa-x");

            boxes[ranBtn].append(newXmark);

            flip = false;

            store(ranBtn + 1, "x");
            check();
            break;
        }
    }
}

startBtn.addEventListener("click", (ev) => {
    startBtn.classList.add("hidden");
    playerBtn.classList.remove("hidden");
    computerBtn.classList.remove("hidden");
});

playerBtn.addEventListener("click", (ev) => {
    start = true;
    playerBtn.classList.add("hidden");
    computerBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
});

computerBtn.addEventListener("click", (ev) => {
    start = true;
    computerGame = true;
    computerBtn.classList.add("hidden");
    playerBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
});

restartBtn.addEventListener("click", (ev) => {
    circleWon = false;
    xWon = false;
    flip = false;

    pressBtn.length = 0;
    game = [[], [], []];
    boxes.forEach(box => box.innerHTML = "");
    if (h2Heading) {
        h2Heading.innerHTML = ""
        h2Heading.remove()
    };
});

/*  let row1 = [game[0][0],game[0][1],game[0][2]];
     let row2 = [game[1][0],game[1][1],game[1][2]];
     let row3 = [game[2][0],game[2][1],game[2][2]];
 
     let col1 = [game[0][0],game[1][0],game[2][0]];
     let col2 = [game[0][1],game[1][1],game[2][1]];
     let col3 = [game[0][2],game[1][2],game[2][2]];
 
     let cros1 = [game[0][0],game[1][1],game[2][2]];
     let cros2 = [game[0][2],game[1][1],game[2][0]];
 
    let ans = row1.every((a)=>{
     return a == "x" ;   circle
    });*/