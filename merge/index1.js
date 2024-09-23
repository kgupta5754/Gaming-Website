let modebtn = document.querySelector("#mode");
let body = document.querySelector("body");
let currmode = "light";

modebtn.addEventListener("click", () => {
    if (currmode === "light") {
        currmode = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
    } else {
        currmode = "light";
        body.classList.add("light");
        body.classList.remove("dark");
    }
    console.log(currmode);
});

let userscore = 0;
let compscore = 0;

const containers = document.querySelectorAll(".container");
const msg = document.querySelector("#msg");

const userscorep = document.querySelector("#user-score");
const compscorep = document.querySelector("#comp-score");

const gencompcontainer = () => {
    const options = ["stone", "paper", "scissor"];
    const ranIdx = Math.floor(Math.random() * 3);
    return options[ranIdx];
};

const draw = () => {
    msg.innerText = "Game was draw, play again";
};

const winner = (userwin, usercontainer, compcontainer) => {
    if (userwin) {
        userscore++;
        userscorep.innerText = userscore;
        msg.innerText = `You win! ${usercontainer} beats ${compcontainer}`;
        msg.style.backgroundColor = "green";
    } else {
        compscore++;
        compscorep.innerText = compscore;
        msg.innerText = `You lose! ${compcontainer} beats ${usercontainer}`;
        msg.style.backgroundColor = "red";
    }
};

const playgame = (usercontainer) => {
    const compcontainer = gencompcontainer();
    if (usercontainer === compcontainer) {
        draw();
    } else {
        let userwin = true;
        if (usercontainer === "stone") {
            userwin = compcontainer === "paper" ? false : true;
        } else if (usercontainer === "paper") {
            userwin = compcontainer === "scissor" ? false : true;
        } else {
            userwin = compcontainer === "stone" ? false : true;
        }
        winner(userwin, usercontainer, compcontainer);
    }
};

containers.forEach((container) => {
    container.addEventListener("click", () => {
        const usercontainer = container.getAttribute("id");
        playgame(usercontainer);
    });
});
