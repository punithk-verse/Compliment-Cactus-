// ---------- INITIAL STATE ----------
let happiness = 50;
let complimentsGiven = 0;
let careActions = 0;

// ---------- RESPONSES ----------
const responses = [
  "The cactus feels appreciated 🌵💖",
  "Photosynthesis boosted by kindness ☀️",
  "Your words nourish my soul.",
  "Spikes up! That was nice.",
  "Emotional support cactus activated."
];

// ---------- LOAD / SAVE ----------
function saveState() {
  localStorage.setItem("cactusData", JSON.stringify({
    happiness,
    complimentsGiven,
    careActions
  }));
}

function loadState() {
  const saved = localStorage.getItem("cactusData");
  if (saved) {
    const data = JSON.parse(saved);
    happiness = data.happiness;
    complimentsGiven = data.complimentsGiven;
    careActions = data.careActions;
  }
}

// ---------- UPDATE UI ----------
function updateUI() {
  document.getElementById("happiness").innerText = "Happiness: " + happiness;
  document.getElementById("compliments").innerText = "Compliments given: " + complimentsGiven;
  document.getElementById("careCount").innerText = "Care actions: " + careActions;

  const cactus = document.getElementById("cactus");
  const mood = document.getElementById("mood");

  if (happiness >= 80) {
    mood.innerText = "Mood: Thriving 😄";
    cactus.innerText = "🌵✨";
  } else if (happiness >= 50) {
    mood.innerText = "Mood: Content 🙂";
    cactus.innerText = "🌵";
  } else {
    mood.innerText = "Mood: Wilting 😐";
    cactus.innerText = "🥀";
  }
}

// ---------- ACTION FUNCTIONS ----------
function giveCompliment() {
  const input = document.getElementById("input");
  if (input.value.trim() === "") return;

  happiness = Math.min(100, happiness + 10);
  complimentsGiven++;
  document.getElementById("response").innerText = responses[Math.floor(Math.random() * responses.length)];
  input.value = "";

  saveState();
  updateUI();
}

function care(amount) {
  happiness = Math.min(100, happiness + amount);
  careActions++;
  document.getElementById("response").innerText = "The cactus enjoyed that 🌱";

  saveState();
  updateUI();
}

// ---------- DECAY ----------
setInterval(() => {
  happiness = Math.max(0, happiness - 1);
  saveState();
  updateUI();
}, 10000); // every 10 seconds

// ---------- INIT ----------
loadState();
updateUI();
