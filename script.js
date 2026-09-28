/* =========================================================
   BIRTHDAY WEBSITE
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. ELEMENTS
   ========================================================= */

const screens = document.querySelectorAll(".screen");

const startButton = document.getElementById("startButton");
const giftBox = document.getElementById("giftBox");

const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");


/* =========================================================
   2. SCREEN NAVIGATION
   ========================================================= */

function showScreen(screenId) {

    const targetScreen = document.getElementById(screenId);

    if (!targetScreen) return;

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    requestAnimationFrame(() => {
        targetScreen.classList.add("active");
    });

    const content = targetScreen.querySelector(".screen-content");

    if (content) {
        content.scrollTop = 0;
    }
}


/* =========================================================
   3. START BUTTON
   ========================================================= */

if (startButton) {

    startButton.addEventListener("click", () => {

        showScreen("screen-gift");

    });

}


/* =========================================================
   4. GIFT BOX
   ========================================================= */

if (giftBox) {

    giftBox.addEventListener("click", () => {

        giftBox.style.pointerEvents = "none";

        const lid = giftBox.querySelector(".gift-lid");

        if (lid) {

            lid.style.transform =
                "rotate(-18deg) translateY(-45px)";

        }

        createConfetti();

        setTimeout(() => {

            showScreen("screen-birthday");

            // 🎵 Music starts with the birthday reveal
            startMusic();

        }, 900);

    });

}


/* =========================================================
   5. NEXT BUTTONS
   ========================================================= */

const nextButtons = document.querySelectorAll(
    ".next-button"
);

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextScreen =
            button.getAttribute("data-next");

        if (nextScreen) {

            showScreen(nextScreen);

        }

    });

});


/* =========================================================
   6. MUSIC
   ========================================================= */

let musicPlaying = false;


/*
   Music file location:

   music/birthday.mp3

   The <audio> element in index.html should point
   to the same location.
*/

function startMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.45;

    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            })
            .catch(() => {

                musicPlaying = false;

                updateMusicButton();

            });

    }

}


/* =========================================================
   MUSIC BUTTON
   ========================================================= */

if (musicButton) {

    musicButton.addEventListener("click", () => {

        if (!bgMusic) return;

        if (musicPlaying) {

            bgMusic.pause();

            musicPlaying = false;

        } else {

            bgMusic.volume = 0.45;

            bgMusic.play()
                .then(() => {

                    musicPlaying = true;

                    updateMusicButton();

                })
                .catch(() => {

                    musicPlaying = false;

                    updateMusicButton();

                });

        }

        updateMusicButton();

    });

}


/* =========================================================
   MUSIC BUTTON DISPLAY
   ========================================================= */

function updateMusicButton() {

    if (!musicButton) return;

    musicButton.textContent =
        musicPlaying ? "🔊" : "🎵";

    musicButton.setAttribute(
        "aria-label",
        musicPlaying
            ? "Pause music"
            : "Play music"
    );

}


/* =========================================================
   7. CONFETTI
   ========================================================= */

function createConfetti() {

    const amount = 45;

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("span");

        piece.classList.add("confetti-piece");

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.animationDelay =
            Math.random() * 0.4 + "s";

        piece.style.animationDuration =
            1.8 + Math.random() * 1.8 + "s";

        const size =
            5 + Math.random() * 7;

        piece.style.width =
            size + "px";

        piece.style.height =
            size * 1.5 + "px";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 4000);

    }

}


/* =========================================================
   8. FLOATING HEARTS
   ========================================================= */

function createFloatingHeart() {

    const heart = document.createElement("span");

    heart.textContent = "♡";

    heart.style.position = "fixed";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize =
        12 + Math.random() * 18 + "px";

    heart.style.color =
        "rgba(255, 190, 225, 0.55)";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "1";

    heart.style.animation =
        `floatHeart ${
            6 + Math.random() * 4
        }s linear forwards`;

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}


setInterval(() => {

    createFloatingHeart();

}, 2200);


/* =========================================================
   9. CONFETTI + HEART STYLES
   ========================================================= */

const confettiStyle =
document.createElement("style");

confettiStyle.textContent = `

    .confetti-piece {
        position: fixed;
        top: -20px;

        border-radius: 2px;

        background:
            linear-gradient(
                135deg,
                #ffd4ec,
                #d8b5ff
            );

        pointer-events: none;

        z-index: 200;

        animation:
            confettiFall
            linear
            forwards;
    }

    @keyframes confettiFall {

        0% {
            opacity: 1;
            transform:
                translateY(0)
                rotate(0deg);
        }

        100% {
            opacity: 0;
            transform:
                translateY(110vh)
                rotate(720deg);
        }

    }

    @keyframes floatHeart {

        0% {
            opacity: 0;
            transform:
                translateY(0)
                scale(0.7)
                rotate(0deg);
        }

        10% {
            opacity: 0.7;
        }

        80% {
            opacity: 0.5;
        }

        100% {
            opacity: 0;
            transform:
                translateY(-115vh)
                scale(1.3)
                rotate(25deg);
        }

    }

`;

document.head.appendChild(confettiStyle);


/* =========================================================
   10. SMALL PARALLAX EFFECT
   ========================================================= */

document.addEventListener("pointermove", event => {

    if (window.innerWidth < 700) return;

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);

    const heart =
        document.querySelector(".hero-heart");

    if (heart) {

        heart.style.marginLeft =
            `${x * 12}px`;

        heart.style.marginTop =
            `${y * 12}px`;

    }

});


/* =========================================================
   11. TOUCH / MOBILE FRIENDLY
   ========================================================= */

document.addEventListener(
    "touchmove",
    () => {},
    { passive: true }
);


/* =========================================================
   12. INITIAL STATE
   ========================================================= */

showScreen("screen-opening");

updateMusicButton();
