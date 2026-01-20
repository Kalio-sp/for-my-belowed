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

const fullMessage = "Ты мне нравишься ❤";
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

// диалог

const steps = {
  1: {
    text: "Как ты обычно относишься к неожиданным вещам?",
    buttons: [
      { text: "Люблю сюрпризы", next: 2 },
      { text: "Смущают, но допустим", next: 3 },
    ],
  },
  2: {
    text: "Тогда можно быть с тобой смелым?",
    buttons: [
      { text: "Да", next: 4 },
      { text: "Наверное", next: 4 },
    ],
  },
  3: {
    text: "Хочешь, чтобы я был аккуратнее?",
    buttons: [
      { text: "Да, это важно", next: 4 },
      { text: "Можно честно", next: 4 },
    ],
  },
  4: {
    text: "Тогда я хочу узнать...",
    buttons: [
      { text: "Что узнать?", next: "final" },
      { text: "не пугай", next: "final" },
    ],
  },
};

const questionEl = document.getElementById("question");
const buttonsEl = document.getElementById("buttons");
const finalEl = document.getElementById("final");
const quizEl = document.getElementById("quiz");

let currentStep = 1;

function renderStep(step) {
  const data = steps[step];
  questionEl.textContent = data.text;
  buttonsEl.innerHTML = "";

  data.buttons.forEach((btn) => {
    const button = document.createElement("button");
    button.textContent = btn.text;
    button.onclick = () => {
      if (btn.next === "final") {
        quizEl.classList.add("hidden");
        finalEl.classList.remove("hidden");
        finalEl.scrollIntoView({ behavior: "smooth" });
      } else {
        renderStep(btn.next);
      }
    };
    buttonsEl.appendChild(button);
  });
}

renderStep(currentStep);

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Создаем модальное окно
function showModal(message) {
  // Создаем оверлей (затемнение)
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: linear-gradient(135deg, #1a2332 0%, #2d3748 100%);
    padding: 40px 60px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 600px;
    border: 2px solid #4ade80;
    transform: scale(0.8);
    transition: transform 0.3s;
  `;

  const text = document.createElement("p");
  text.style.cssText = `
    color: white;
    font-size: 24px;
    line-height: 1.6;
    margin-bottom: 30px;
    font-family: 'Zalando Sans Expanded', serif;
  `;
  text.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Закрыть";
  closeBtn.style.cssText = `
    background: #4ade80;
    color: #1a2332;
    border: none;
    padding: 12px 30px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  `;

  closeBtn.onmouseover = () => {
    closeBtn.style.background = "#22c55e";
    closeBtn.style.transform = "scale(1.05)";
  };

  closeBtn.onmouseout = () => {
    closeBtn.style.background = "#4ade80";
    closeBtn.style.transform = "scale(1)";
  };

  closeBtn.onclick = () => {
    overlay.style.opacity = "0";
    modal.style.transform = "scale(0.8)";
    setTimeout(() => overlay.remove(), 300);
  };

  modal.appendChild(text);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = "1";
    modal.style.transform = "scale(1)";
  }, 10);
}

yesBtn.addEventListener("click", () => {
  showModal(
    "Тогда я не зря сделал этот сайт. Ты для меня очень важна, и я правда надеюсь, что это только начало чего-то лучшего между нами.",
  );
});

noBtn.addEventListener("click", () => {
  showModal(
    "Я понимаю... Но я всё равно рад, что ты уделила время и посмотрела этот сайт. Спасибо за честность.",
  );
});
