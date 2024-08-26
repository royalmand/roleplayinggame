// Initialize 
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// Grab HTML Element
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Set of the weapons
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 },
  { name: 'flute', power: 150 },
  { name: 'axe', power: 65 },
  { name: 'katana', power: 120 },
  { name: 'bazooka', power: 200 }
];


// Set of the monsters
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

// Set of the locations user be
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Explore cave", "Search monster", "Go to town square"],
    "button functions": [exploreCave, fightBeast, goTown],
    text: "You enter the cave. What are you gonna do?"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Continue explore", "Go to town square", "Go to town square"],
    "button functions": [exploreCave, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name: "treasure chest",
    "button text": ["Continue exploring", "Search a monster", "Go to town square"],
    "button functions": [exploreCave, fightBeast, goTown],
    text: "You find a hidden treasure chest! It contains 50 gold and a rare gem."
  },
  {
    name: "mysterious potion",
    "button text": ["Yes", "Continue exploring", "Go to town square"],
    "button functions": [isDrinkPotion, exploreCave, goTown],
    text: "You discover a bubbling potion on the ground. Do you drink it?"
  },
  {
    name: "ancient relic",
    "button text": ["Continue exploring", "Search a monster", "Go to town square"],
    "button functions": [exploreCave, fightBeast, goTown],
    text: "You stumble upon an ancient relic. It will add health 100."
  },
  {
    name: "potion drank",
    "button text": ["Continue exploring", "Continue exploring", "Go to town square"],
    "button functions": [exploreCave, exploreCave, goTown],
    text: "You drink a bubbling potion an gain a power up!"
  },
];

// Define the random events for the cave
const caveRandomEvents = [treasureChest, mysteriousPotion, ancientRelic, fightBeast, fightSlime];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Change the innerText in button every time user click a button
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// Initial Button
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

// Store
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ");
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Cave random events
function exploreCave() {
    // Randomly select a function from the array and run it
    const randomIndex = Math.floor(Math.random() * caveRandomEvents.length);
    const selectedFunction = caveRandomEvents[randomIndex];
    selectedFunction(); // Execute the selected function
}

function treasureChest() {
    update(locations[8]);
    gold += 50;
    goldText.innerHTML = gold;
    text.innerHTML = "You found a treasure chest! You gain 50 gold.";
}

function mysteriousPotion() {
    update(locations[9]);
    isDrinkPotion()
}

function isDrinkPotion() {
    // Yes button, player will gain health by 20
    update(locations[11]);
    health += 20;
    healthText.innerHTML = health;
}


function ancientRelic() {
    update(locations[10]);
    health += 100;
    healthText.innerHTML = health;
    text.innerText = "You find an ancient relic and gain 100 health!";
}


// Fight monster
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
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);

  // Monster hit or not?
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(`Your health decreases by ${hit}`);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
    if (isPlayerDodge()) {
        text.innerText = "You dodge the attack from the " + monsters[fighting].name;
    } else {
        return isMonsterHit();
    }
}

function isPlayerDodge() {
    console.log("You're succeed to dodge");
    return Math.random() > .5;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);

  // Randomly determine the weapon dropped
  const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
  console.log(`Take an object ${randomWeapon.name} as a loot weapon for defeating ${monsters[fighting].name}`);

  /* inventory[0]: This takes the first item in the inventory array. The inventory holds the names of weapons that the player has.
  
  weapons.find(weapon => weapon.name === inventory[0]): This finds the corresponding weapon object in the weapons array that matches the first weapon in the inventory.
  
  strongestWeapon: This variable now holds the weapon object that corresponds to the first weapon in the inventory.*/

  // Add the weapon to the player's inventory
  inventory.push(randomWeapon.name);
  text.innerText += `You have defeated the monster and found a "${randomWeapon.name}"!`;

  // Find the strongest weapon in the inventory
  let strongestWeapon = weapons.find(weapon => weapon.name === inventory[0]);

  /* inventory.forEach(weaponName => { ... }): This loops through each weapon name in the inventory.

   weapons.find(w => w.name === weaponName): For each weapon name in the inventory, it finds the corresponding weapon object in the weapons array.

   weapon: This is the parameter of the arrow function. It represents each individual object in the weapons array as the .find() method iterates through the array.

   weapon.name: weapon is an object representing a single weapon in the weapons array. .name accesses the name property of this weapon object.

   weapon.name === inventory[0]: This is the condition that the .find() method is checking. It compares the name property of the current weapon object with the first item in the inventory array.
   */
  inventory.forEach(weaponName => {
    const weapon = weapons.find(w => w.name === weaponName);
    if (weapon.power > strongestWeapon.power) {
        strongestWeapon = weapon; 
    }
  });

   /* First, the code initializes strongestWeapon with the first weapon in the inventory.

   Then, it goes through each weapon in the inventory and checks if any weapon has more power than the currently identified strongestWeapon.

   Finally, strongestWeapon ends up being the weapon with the highest power in the inventory.
   */

  // Change currentWeapon index 
  const weaponIndex = weapons.findIndex(weapon => weapon.name === strongestWeapon.name);
  console.log(weaponIndex);

  // Update currentWeapon to this index
  currentWeapon = weaponIndex;
  console.log(`Current weapon set to ${weapons[currentWeapon].name}`);

}


function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
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

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}