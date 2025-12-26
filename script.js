const photos = Array.from({ length: 10 }, (_, i) => `photos/${i + 1}.jpeg`);
let index = 1;

const audio = document.getElementById("bg-music");
const collage = document.getElementById("mobile-collage");
const placedRects = [];

/* INTRO */
document.getElementById("intro-screen").addEventListener("click", () => {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("main-card").classList.remove("hidden");
  document.getElementById("next-btn").classList.remove("hidden");

  audio.volume = 0.4;
  audio.play().catch(() => {});
});

/* MOBILE CHECK */
function isMobile() {
  return window.innerWidth < 768;
}

/* COLLAGE PLACEMENT */
function placeCollageImage(src) {
  if (!isMobile()) return;

  const img = document.createElement("img");
  img.src = src;

  for (let i = 0; i < 40; i++) {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 140);
    const rect = { x, y, w: 100, h: 140 };

    const overlap = placedRects.some(r =>
      !(rect.x + rect.w < r.x ||
        rect.x > r.x + r.w ||
        rect.y + rect.h < r.y ||
        rect.y > r.y + r.h)
    );

    if (!overlap) {
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.transform = `rotate(${Math.random() * 12 - 6}deg)`;
      placedRects.push(rect);
      collage.appendChild(img);
      return;
    }
  }
}

/* NEXT PHOTO */
function nextPhoto() {
  const mainPhoto = document.getElementById("main-photo");
  mainPhoto.style.opacity = 0;

  setTimeout(() => {
    if (index < photos.length) {
      mainPhoto.src = photos[index];
      mainPhoto.style.opacity = 1;

      placeCollageImage(photos[index - 1]);

      if (!isMobile()) {
        const floating = document.createElement("img");
        floating.src = photos[index - 1];
        floating.style.top = Math.random() * 80 + "%";
        floating.style.left = Math.random() * 80 + "%";
        document.getElementById("photo-grid").appendChild(floating);
      }

      index++;
    } else {
      mainPhoto.classList.add("hidden");
      document.getElementById("next-btn").classList.add("hidden");
      document.getElementById("message").classList.remove("hidden");
      typeMessage();
    }
  }, 300);
}

/* MESSAGE */
function typeMessage() {
  const text =
`Some moments arrive quietly, today is one of them —
Cause it’s your birthday 🌸

You remain special to me,
in a gentle, unspoken way 🤍

I hope this year meets you with kindness and bring you peace,
wherever life leads you 🌻
`;

  const el = document.getElementById("typed-text");
  el.classList.add("typing");
  let i = 0;

  const typer = setInterval(() => {
    el.textContent += text.charAt(i++);
    if (i >= text.length) {
      clearInterval(typer);
      el.classList.remove("typing");
      confetti({ particleCount: 120, spread: 60 });
      document.getElementById("special-lines").classList.remove("hidden");
      document.getElementById("replay-btn").classList.remove("hidden");
    }
  }, 45);
}

function replay() {
  location.reload();
}
