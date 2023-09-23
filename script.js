let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting,
  monsterHealth,
  inventory = ["stick"];
//creating a reference to the button1,button2 etc  elements in the html code using its id in the code
//buttons initialize
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const getGold = document.querySelector("#addGold");
const addHealth = document.querySelector("#addHealth");
const enableCheats = document.querySelector("#enableCheats");
const restartGame = document.querySelector("#restartGame");
const isMonsterHit = () => Math.random() > 0.2 || health < 20;
enableCheats.addEventListener("change", function () {
  if (enableCheats.checked) {
    getGold.style.display = "inline-block";
    addHealth.style.display = "inline-block";
    restartGame.style.display = "inline-block";
  } else {
    getGold.style.display = "none";
    addHealth.style.display = "none";
    restartGame.style.display = "none";
  }
});

const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 10,
  },
  {
    name: "claw hammer",
    power: 30,
  },
  {
    name: "sword",
    power: 100,
  },
];
const monsters = [
  {
    name: "Slime",
    health: 15,
    level: 2,
  },
  {
    name: "fanged beast",
    health: 60,
    level: 8,
  },
  {
    name: "dragon",
    health: 300,
    level: 20,
  },
];
const locations = [
  {
    name: "Town Square",
    "button text": ["Go to Store", "Go to cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store"',
  },
  {
    name: "Store",
    "button text": [
      "Buy 10 Health (10 gold)",
      "Buy Weapon (30 gold)",
      "Go to Town Square",
    ],
    "button functions": [buyhealth, buyWeapon, goTown],
    text: "You entered the Store",
  },
  {
    name: "cave",
    "button text": ["Fight Slime", "Fight Beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave, You see some monsters",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are   fighting a monster",
  },

  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster screams as it dies, you have gained experience points and found gold.",
  },
  {
    name: "lose",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "you died,RIP 💀💀💀💀 ",
  },
  {
    name: "win",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You slayed the dragon, Congratiolations!🎈🎉🎈🎉🎈🎉",
  },
  {
    name: "easater Egg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You Found a secret!, pick a number from the above options, 10 random number will appear in the screen, and if the number you chose appears in one of them then you will win a prize!",
  },
  {
    name: "win",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You slayed the dragon, Congratiolations!🎈🎉🎈🎉🎈🎉",
  },
];
//binit buttons actions
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
getGold.onclick = addGold;
addHealth.onclick = addHp;
restartGame.onclick = showAlert;
function showAlert() {
  var result = window.confirm("Are you sure you want to restart the game?");
  if (result) {
    restart();
  } else {
    pass;
  }
}
function addGold() {
  gold += 10;
  goldText.innerText = gold;
}
function addHp() {
  health += 10;
  healthText.innerText = health;
}

function update(location) {
  monsterStats.style.display = "none";
  text.innerText = location.text;
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
}

function goTown() {
  update(locations[[0]]);
  text.style.color = "white";
}
function goStore() {
  update(locations[[1]]);
}
function goCave() {
  update(locations[2]);
}

function buyhealth() {
  if (gold < 10) {
    text.innerText = "You dont have enough gold!";
    text.style.color = "red";
  } else {
    gold -= 10;
    health += 10;
    healthText.innerText = health;
    goldText.innerText = gold;
    text.innerText = "successfully healed to " + health + "hp!";
    text.style.color = "white";
  }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;

      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.innerText = "you now have a new weapon: " + newWeapon + ".\n";
      text.innerText += "in your inventory you have: " + inventory;
      text.style.color = "white";
    } else {
      //incase we already have the best weapon
      text.innerText = "you dont have enough money!";
      text.style.color = "red";
    }
  } else {
    text.innerText = "You Already have the strongest weapon!";
    button2.innerText = "Sell Weapon for 15 gold!";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "you sold a " + currentWeapon + ".\n";
    text.innerText += "in your inventory you have: " + inventory;
    text.style.color = "white";
  } else {
    text.innerText = "you cant sell your only weapon!";
    text.style.color = "red";
  }
}
function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function attack() {
  text.innerText = "The " + monsters[fighting].name + " has attacked you!\n";
  text.innerText +=
    "you attacked it with your " + weapons[currentWeapon].name + "!";
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += "you missed...";
  }

  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  monsterHealthText.innerText = monsterHealth;
  healthText.innerText = health;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting == 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += "Your " + inventory.pop() + " broke mid Battle...";
    currentWeapon--;
  }
}
function dodge() {
  text.innerText =
    "You successfully dodged the attack from" + monsters[fighting].name + ".";
}
function lose() {
  update(locations[5]);
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  xpText.innerText = xp;
  goldText.innerText = gold;
  update(locations[4]);
}
function winGame() {
 update(locations[6]);
}
function getMonsterAttackValue(level) {
  let hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit;
}

function easterEgg() {
  update(locations[7]);
}
function pick(number) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "you picked " + number + ". Here are the Random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(number) !== -1) {
    text.innerText += "You are right! and won 20 gold";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "You are wrong! and lost 10 health";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
function pickEight() {
  pick(8);
}
function pickTwo() {
  pick(2);
}
