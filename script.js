document.addEventListener("DOMContentLoaded", () => {

  let happiness = 50;
  let complimentsGiven = 0;
  let careActions = 0;

  const responses = [
    "The cactus feels emotionally validated 🌵💖",
    "Photosynthesis boosted by kindness ☀️",
    "Your words nourish my soul.",
    "Spikes up! That was nice.",
    "Emotional support cactus activated."
  ];

  const personalities = ["Sarcastic 🌚", "Needy 🥺", "Chill 😎", "Dramatic 🎭"];
  const personality =
    personalities[Math.floor(Math.random() * personalities.length)];

  const cactus = document.getElementById("cactus");
  const mood = document.getElementById("mood");
  const response = document.getElementById("response");

  document.getElementById("personality").innerText =
    "Personality: " + personality;

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

  function updateUI() {
    document.getElementById("happiness").innerText =
      "Happiness: " + happiness;
    document.getElementById("compliments").innerText =
      "Compliments given: " + complimentsGiven;
    document.getElementById("careCount").innerText =
      "Care actions: " + careActions;

    cactus.classList.remove("happy");

    if (happiness >= 80) {
      mood.innerText = "Mood: Thriving 😄";
      cactus.innerText = "🌵✨";
      cactus.classList.add("happy");
    } else if (happiness >= 50) {
      mood.innerText = "Mood: Content 🙂";
      cactus.innerText = "🌵";
    } else {
      mood.innerText = "Mood: Wilting 😐";
      cactus.innerText = "🥀";
    }
  }

  function giveCompliment() {
    const input = document.getElementById("complimentInput");
    if (input.value.trim() === "") return;

    happiness = Math.min(100, happiness + 10);
    complimentsGiven++;

    response.innerText =
      responses[Math.floor(Math.random() * responses.length)];

    input.value = "";
    saveState();
    updateUI();
  }

  function care(amount) {
    happiness = Math.min(100, happiness + amount);
    careActions++;

    response.innerText = "The cactus appreciated that 🌱";
    saveState();
    updateUI();
  }

  document.getElementById("complimentBtn")
    .addEventListener("click", giveCompliment);

  document.getElementById("waterBtn")
    .addEventListener("click", () => care(5));

  document.getElementById("sunBtn")
    .addEventListener("click", () => care(7));

  document.getElementById("talkBtn")
    .addEventListener("click", () => care(6));

  setInterval(() => {
    happiness = Math.max(0, happiness - 1);
    saveState();
    updateUI();
  }, 10000);

  loadState();
  updateUI();

});
