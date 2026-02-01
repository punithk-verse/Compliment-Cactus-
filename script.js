let happiness=50;
let complimentsGiven=0;
let careActions=0;
const responses=[
    'the cactus feels emotionally validated 🌵💖',
    'photosynthesis boosted by Kindness ☀️😊',
    'Your words nourish the soul 🌱✨',
    'Spikes up! That was nice 🌵👍',
    "Emotional support cactus mode activated 🌵🤗"
];

const personalities=[
    'Sarcastic 🌚',
    'needy 🌵',
    'Chill 🌴',
    'Dramatic 🎭',
];

const personality=
personalities[Math.floor(Math.random() * personalities.length)];

document.getElementById('personality').innerText=
   "personality: "+ personality;

function saveState(){
    loacalStorage.setItem('cactusData',JSON.stringify({
        happiness,
        complimentGiven,
        careActions
    }));
}

function loadState(){
    const saved=localStorage.getItem('cactusData');
    if(saved){
        const data=JSON.parse(saved);
        happiness=data.happiness;
        complimentsGiven=data.complimentsGiven;
        careActions=data.careActions;
    }
}
function updateUI(){
    document.getElementById('happiness').innerText=
    'Happiness: '+happiness;
    document.getElementById('compliments').innerText=
    'Compliments given: '+complimentsGiven;
    document.getElementById('carecount').innerText=
    'Care actions: '+careActions;

    const mood=document.getElementById('mood');
    const cactus=document.getElementById('cactus');
    cactus.classList.remove('happy');
    if (happiness>=80){
        mood.innerText="Mood: Thriving 🌵😄";
        cactus.innerText="🌵😊";
        cactus.classList.add('happy');
    } else if (happiness>=50){
        mood.innerText="Mood: Content 🌵🙂";
        cactus.innerText="🌵😐";
    } else {
        mood.innerText="Mood: wilting 🌵😞";
        cactus.innerText="🥀";
    }
}

function randomResponse(){
    return responses[Math.floor(Math.random() * responses.length)];
}

function giveCompliment(){
    const input=document.getElementById('complimentInput');
    if (input.value.trim()==="") return;
    happiness=Math.min(100,happiness+10);
    complimentsGiven++;
    document.getElementById('response').innerText=randomResponse();
    input.value="";
    saveState()="";
    updateUI();
}
function care(type) {
    if (type==="water") happiness+=5;
    if (type==="sunlight") happiness+=7;
    if (type==="fertilizer") happiness+=6;
    happiness=Math.min(100,happiness);
    careActions++;
    document.getElementById('response').innerText=
    "The cactus appreciates That! 🌵💧☀️ 🌿";
    saveState();
    updateUI();
}

setInterval(()=>{
    happiness-=1;
    if (happiness<0) happiness=0;
    saveState();
    updateUI();
},10000);
loadState();
updateUI();