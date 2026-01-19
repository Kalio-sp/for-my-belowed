//фон

const bg = document.getElementById("bg");

for (let i = 0; i < 40; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.width = Math.random() * 3 + "px";
  star.style.height = star.style.width;
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  bg.appendChild(star);
}

const colors = ["pink", "purple", "blue", "green"];
const heartPositions = [
  { left: "8%", top: "5%", size: 40, color: "purple" },
  { left: "15%", top: "15%", size: 30, color: "pink" },
  { left: "20%", top: "35%", size: 25, color: "blue" },
  { left: "12%", top: "60%", size: 35, color: "purple" },

  { left: "45%", top: "8%", size: 28, color: "pink" },
  { left: "52%", top: "25%", size: 22, color: "purple" },
  { left: "48%", top: "70%", size: 30, color: "green" },

  { left: "70%", top: "6%", size: 35, color: "pink" },
  { left: "75%", top: "18%", size: 25, color: "purple" },
  { left: "82%", top: "12%", size: 30, color: "pink" },
  { left: "78%", top: "40%", size: 28, color: "blue" },

  { left: "88%", top: "58%", size: 40, color: "pink" },
  { left: "92%", top: "75%", size: 30, color: "purple" },

  { left: "25%", top: "82%", size: 32, color: "green" },
  { left: "35%", top: "88%", size: 25, color: "blue" },

  { left: "65%", top: "85%", size: 35, color: "pink" },
  { left: "72%", top: "92%", size: 28, color: "green" },

  { left: "30%", top: "45%", size: 50, color: "purple" },
  { left: "60%", top: "50%", size: 45, color: "pink" },
  { left: "85%", top: "30%", size: 40, color: "blue" },
];

heartPositions.forEach((pos, index) => {
  const heart = document.createElement("div");
  heart.className = `heart ${pos.color}`;
  heart.style.width = pos.size + "px";
  heart.style.height = pos.size + "px";
  heart.style.left = pos.left;
  heart.style.top = pos.top;
  heart.style.animationDelay = index * 0.3 + "s";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  bg.appendChild(heart);
});

// кнопка

const btn = document.getElementById("loveBtn");
const overlay = document.getElementById("loveOverlay");
const textBlock = document.getElementById("loveText");

const fullMessage = "Я тебя люблю ❤";
const MAX_LENGTH = 20;

let isOpen = false;
let typingInterval = null;

btn.onclick = () => openLove();

function openLove() {
  if (isOpen) return;
  isOpen = true;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  startTyping(fullMessage.slice(0, MAX_LENGTH));
}

function closeLove() {
  if (!isOpen) return;
  isOpen = false;

  overlay.classList.remove("active");
  document.body.style.overflow = "";

  clearInterval(typingInterval);
  textBlock.textContent = "";
}

function startTyping(text) {
  clearInterval(typingInterval);
  textBlock.textContent = "";

  let index = 0;

  typingInterval = setInterval(() => {
    if (index < text.length) {
      textBlock.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 120);
}

overlay.addEventListener("click", closeLove);
overlay.addEventListener("touchstart", closeLove);

document.addEventListener("keydown", (e) => {
  if (!isOpen) return;

  if (e.key === "Escape") {
    closeLove();
  } else {
    e.preventDefault();
    e.stopPropagation();
  }
});

// безвыходный выбор

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");

yesBtn.addEventListener("click", () => {
  popup.className = "popup success";
  popup.innerHTML = "Ты никогда не пожалеешь ❤️";
  popup.classList.remove("hidden");
});

noBtn.addEventListener("click", () => {
  popup.className = "popup error";
  popup.innerHTML = `
Ошибка 0x0000LOVE<br><br>
Доступ запрещён 💔<br>
Сердце уже занято Ладой.
  `;
  popup.classList.remove("hidden");
});


popup.addEventListener("click", closePopup);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

function closePopup() {
  popup.classList.add("hidden");
}
