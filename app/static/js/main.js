const clock = document.querySelector("#clock");
const channels = [...document.querySelectorAll(".channel")];
const dial = document.querySelector(".dial");
const previousButton = document.querySelector('[data-action="previous"]');
const nextButton = document.querySelector('[data-action="next"]');
const counter = document.querySelector(".counter-readout strong");
const featureTitle = document.querySelector(".featured-piece__caption h2");
const featureDescription = document.querySelector(".featured-piece__caption p");
const featureImage = document.querySelector(".featured-piece__image");

const pieces = [
    {
        title: "Morning light, borrowed room",
        description: "Somewhere between leaving and staying, the room became the subject.",
        image: "linear-gradient(117deg, transparent 0 43%, rgb(239 224 188 / 22%) 43% 54%, transparent 54%), linear-gradient(180deg, rgb(77 87 71 / 0%) 15%, rgb(31 42 37 / 65%) 100%), linear-gradient(122deg, #bdab87 0 22%, #74816f 22% 58%, #3b4b45 58% 100%)"
    },
    {
        title: "The blue hour, held still",
        description: "A few minutes where the city forgot to perform itself.",
        image: "linear-gradient(137deg, transparent 0 35%, rgb(225 214 184 / 24%) 35% 47%, transparent 47%), linear-gradient(180deg, rgb(88 106 126 / 0%), rgb(25 37 50 / 70%)), linear-gradient(122deg, #687e8b 0 24%, #b5ad96 24% 53%, #384657 53% 100%)"
    },
    {
        title: "Objects with a memory",
        description: "The best things in the room had already lived another life.",
        image: "linear-gradient(115deg, transparent 0 51%, rgb(245 215 169 / 26%) 51% 60%, transparent 60%), linear-gradient(180deg, rgb(133 98 69 / 0%), rgb(55 35 25 / 72%)), linear-gradient(122deg, #d4b184 0 28%, #9a573b 28% 66%, #40362d 66% 100%)"
    }
];

let pieceIndex = 0;
let dialRotation = 0;

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    clock.textContent = `LOCAL TIME ${time}`;
}

function updatePiece(direction) {
    pieceIndex = (pieceIndex + direction + pieces.length) % pieces.length;
    const piece = pieces[pieceIndex];
    counter.textContent = String(pieceIndex + 1).padStart(2, "0");
    featureTitle.textContent = piece.title;
    featureDescription.textContent = piece.description;
    featureImage.style.background = piece.image;
    dialRotation += direction * 120;
    dial.style.transform = `rotate(${dialRotation}deg)`;
}

channels.forEach((channel) => {
    channel.addEventListener("click", () => {
        channels.forEach((item) => item.classList.remove("is-active"));
        channel.classList.add("is-active");
    });
});

previousButton.addEventListener("click", () => updatePiece(-1));
nextButton.addEventListener("click", () => updatePiece(1));
dial.addEventListener("click", () => updatePiece(1));

updateClock();
window.setInterval(updateClock, 30000);
