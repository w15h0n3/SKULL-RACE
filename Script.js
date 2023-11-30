document.addEventListener("DOMContentLoaded", function () {
    const bloodRiver = document.querySelector(".blood-river");
    const startLine = document.querySelector(".start-line");
    const countdownDisplay = document.querySelector(".countdown");

    const numberOfSkulls = 8;
    const countdownDuration = 1000; // 1 second for each countdown step

    let skullsInRace = numberOfSkulls;

    // Create an array of people
    const people = Array.from({ length: numberOfSkulls }, (_, index) => {
        return { id: index, name: `Person ${index + 1}` };
    });

    // Create skulls and associate them with random people
    for (let i = 0; i < numberOfSkulls; i++) {
        createSkull(people[i]);
    }

    // Start the countdown
    startCountdown();

    function createSkull(person) {
        const skull = document.createElement("div");
        skull.classList.add("skull");
        skull.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        skull.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random speed

        // Add person information to the skull
        skull.setAttribute("data-person-id", person.id);
        skull.setAttribute("data-person-name", person.name);

        bloodRiver.appendChild(skull);
    }

    function startCountdown() {
        let countdown = 5;

        const countdownInterval = setInterval(() => {
            countdownDisplay.textContent = countdown;
            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval);
                countdownDisplay.style.display = "none";
                startRace();
            }
        }, countdownDuration);
    }

    function startRace() {
        // Remove the starting line
        startLine.style.display = "none";

        // Start the animation for each skull
        document.querySelectorAll(".skull").forEach((skull) => {
            skull.addEventListener("animationend", handleSkullFinish);
            skull.style.animationPlayState = "running";
        });
    }

    function handleSkullFinish(event) {
        const skull = event.target;
        const personName = skull.getAttribute("data-person-name");

        // Announce the winner
        if (skull.style.animationPlayState !== "finished" && event.animationName === "skullAnimation") {
            skull.style.animationPlayState = "finished";
            announceWinner(personName);
        }
    }

    function announceWinner(winnerName) {
        const winnerDisplay = document.createElement("div");
        winnerDisplay.classList.add("winner-display");
        winnerDisplay.textContent = `Winner: ${winnerName}`;
        document.body.appendChild(winnerDisplay);
    }
});
