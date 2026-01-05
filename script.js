// DOM DECLARATIONS

const createCharacterButton = document.querySelector('#create-character-button');
const createCharacterFormContainer = document.querySelector('#create-character-form');
const loadCharacterButton = document.querySelector('#load-character-button');
const showTipsButton = document.querySelector('#show-tips-button');
const testRollButton = document.querySelector('#test-roll');
const nextOneButton = document.querySelector('#next-one');
const characterResetButton = document.querySelector('#character-reset-button');
const characterNameInput = document.querySelector('#character-name');
const characterRaceSelect = document.querySelector('#character-race');
const characterClassSelect = document.querySelector('#character-class');
const characterSexSelect = document.querySelector('#character-sex');
const cancelCharacterCreationButton = document.querySelector('#cancel-character-creation-button');
const characterCreationTipsSidebar = document.querySelector('#character-creation-tips-sidebar');
const closeTipsSidebarButton = document.querySelector('#close-tips-sidebar-button');
const characterOverviewContainer = document.querySelector('#character-overview');

const alertBox = document.querySelector('#main-alert-box');
const alertBoxTitle = alertBox.querySelector('.title');
const alertBoxDescription = alertBox.querySelector('.description');
const closeAlertBoxButton = document.querySelector('#close-alert-box-button');

// SCREEN WIDTH

const DESKTOP_BREAKPOINT = 1000;
// Previously used: screen.width;

// *** APP STATE ***

const appState = {
    screenWidth: window.innerWidth,
    isCharFormVisible: false,
    isTipsSidebarVisible: false,
    isShowTipsButtonVisible: false
};

// UPDATE UI FUNCTION

function updateUIVisibility() {
    // 1. Read the app state
    const { screenWidth, isCharFormVisible, isTipsSidebarVisible } = appState;

    // 2. Update the character form visibility
    createCharacterFormContainer.style.display = isCharFormVisible ? 'flex' : 'none';

    // 3. Apply changes to the DOM
    if (isCharFormVisible) {
        characterCreationTipsSidebar.style.display = isTipsSidebarVisible ? 'flex' : 'none';
        showTipsButton.style.display = isTipsSidebarVisible ? 'none' : 'block';
        characterOverviewContainer.style.display = 'flex';
    } else {
        characterCreationTipsSidebar.style.display = 'none';
        showTipsButton.style.display = 'none';
        characterOverviewContainer.style.display = 'none';
    }
};

// UPDATE CHARACTER OVERVIEW FUNCTION

function updateCharacterOverview() {
    const name = characterNameInput.value || characterNameInput.placeholder;
    const race = characterRaceSelect.value;
    const charClass = characterClassSelect.value;
    const sex = characterSexSelect.value;

    // Get race data (if available)
    const raceData = races[race] || null;
    const classData = classes[charClass] || null;

    characterOverviewContainer.innerHTML = `
        <div class="overview-section">
            <h3 class="overview-title">Character Overview</h3>
            
            <!-- Basic Info -->
            <div class="overview-stat">
                <span class="stat-label">Name:</span>
                <span class="stat-final-value">${name}</span>
            </div>
            
            <div class="overview-stat">
                <span class="stat-label">Race:</span>
                <span class="stat-final-value">${race}</span>
            </div>
            
            <div class="overview-stat">
                <span class="stat-label">Class:</span>
                <span class="stat-final-value">${charClass}</span>
            </div>
            
            <div class="overview-stat">
                <span class="stat-label">Sex:</span>
                <span class="stat-final-value">${sex}</span>
            </div>
            
            ${raceData || classData ? `
                <div class="overview-divider"></div>
                <h4 class="overview-subtitle">Character Stats</h4>
                
                ${raceData ? `
                    <!-- Speed -->
                    <div class="overview-stat">
                        <span class="stat-label">Speed:</span>
                        <span class="stat-final-value">${raceData.speed} ft</span>
                        <span class="stat-explanation">(from <span class="modifier-source">Race</span>)</span>
                    </div>
                    
                    <!-- Size -->
                    <div class="overview-stat">
                        <span class="stat-label">Size:</span>
                        <span class="stat-final-value">${raceData.size}</span>
                        <span class="stat-explanation">(from <span class="modifier-source">Race</span>)</span>
                    </div>
                ` : ''}
                
                ${classData ? `
                    <!-- Hit Die -->
                    <div class="overview-stat">
                        <span class="stat-label">Hit Die:</span>
                        <span class="stat-final-value">${classData.hitDie}</span>
                        <span class="stat-explanation">(from <span class="modifier-source">Class</span>)</span>
                    </div>
                ` : ''}
            ` : ''}
        </div>
    `;
}

// CHARACTER OBJECT TEMPLATE

class Character {
    constructor(data = {}) {
        // === BASIC INFO ===
        this.name = data.name || '';
        this.sex = data.sex || '';
        this.race = data.race || '';
        this.subrace = data.subrace || '';
        this.charClass = data.charClass || '';
        this.subclass = data.subclass || '';
        this.level = data.level || 1;
        this.background = data.background || '';
        this.alignment = data.alignment || '';
        this.experiencePoints = data.experiencePoints || 0;

        // === ABILITY SCORES ===
        this.attStr = data.attStr || 10;
        this.attDex = data.attDex || 10;
        this.attCon = data.attCon || 10;
        this.attInt = data.attInt || 10;
        this.attWis = data.attWis || 10;
        this.attCha = data.attCha || 10;

        // === DERIVED STATS ===
        this.hpMax = data.hpMax || 0;
        this.ac = data.ac || 10;
        this.initiative = data.initiative || 0;
        this.speed = data.speed || 30;
        this.profBonus = data.profBonus || 2;
        this.passivePerception = data.passivePerception || 10;

        // === PROFICIENCIES ===
        this.skills = data.skills || {}; // e.g., {athletics: true, perception: true}
        this.savingThrows = data.savingThrows || []; // e.g., ['str', 'con']
        this.armorProficiencies = data.armorProficiencies || [];
        this.weaponProficiencies = data.weaponProficiencies || [];
        this.toolProficiencies = data.toolProficiencies || [];
        this.languages = data.languages || ['Common'];

        // === EQUIPMENT ===
        this.inventory = data.inventory || [];
        this.currency = data.currency || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };

        // === SPELLCASTING (if applicable) ===
        this.spellcastingAbility = data.spellcastingAbility || null; // 'int', 'wis', 'cha', or null
        this.spellSaveDC = data.spellSaveDC || null;
        this.spellAttackBonus = data.spellAttackBonus || null;
        this.cantripsKnown = data.cantripsKnown || [];
        this.spells = data.spells || []; // Known spells or prepared spells
        this.spellSlots = data.spellSlots || {}; // e.g., {1: 2, 2: 0} - max slots per level

        // === FEATURES & TRAITS ===
        this.racialTraits = data.racialTraits || [];
        this.classFeatures = data.classFeatures || [];
        this.feats = data.feats || []; // Optional rule

        // === CHARACTER STORY ===
        this.backstory = data.backstory || '';
        this.personality = data.personality || '';
        this.ideals = data.ideals || '';
        this.bonds = data.bonds || '';
        this.flaws = data.flaws || '';
        this.appearance = data.appearance || '';
        this.notes = data.notes || '';
    }
}

// Race Objects

const races = {
    "Human": {
        abilityScoreModifiers: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        speed: 30,
        size: "Medium",
        languages: ["Common", "one extra"],
        traits: [
            "Extra Language",
            "Versatile (extra skill proficiency option)"
        ],
        description: "Versatile and adaptable...",
        subRace: null
    }
}

const classes = {
    "Fighter": {
        hitDie: "d10",
        primaryAbilities: ["Strength", "Dexterity"],
        savingThrowProficiencies: ["Strength", "Constitution"],
        armorProficiencies: ["All armor", "Shields"],
        weaponProficiencies: ["Simple weapons", "Martial weapons"],
        skillChoices: {
            choose: 2,
            from: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]
        },
        startingEquipment: [
            // Equipment options...
        ],
        classFeatures: [
            {
                name: "Fighting Style",
                level: 1,
                description: "Choose a fighting style..."
            },
            {
                name: "Second Wind",
                level: 1,
                description: "Regain hit points as a bonus action..."
            }
        ],
        spellcasting: null
    }
}

// ============== EVENT LISTENERS ==============

window.addEventListener('resize', function () {
    // Get the new window width
    appState.screenWidth = window.innerWidth;
    updateUIVisibility();
    // console.log('Window resized to: ' + appState.screenWidth + 'px');
});

// Create Character Button Events
createCharacterButton.addEventListener('click', () => {
    console.log('Create character button pressed');

    appState.isCharFormVisible = true;
    appState.isTipsSidebarVisible = false;
    // appState.isTipsSidebarVisible = (appState.screenWidth > DESKTOP_BREAKPOINT);
    updateUIVisibility();
    updateCharacterOverview();
    createCharacterButton.disabled = true;

    console.log('Create character form displayed');
});

// Close Sidebar Button Events
closeTipsSidebarButton.addEventListener('click', () => {
    console.log('Close tips sidebar button pressed');

    appState.isTipsSidebarVisible = false;
    updateUIVisibility();

    console.log('Character creation tips sidebar hidden');
})

// Load Character Button Events
loadCharacterButton.addEventListener('click', () => {
    console.log('Load character button pressed');

    alert('Load character feature not yet available.');

    console.log('Load character alert displayed');
})

// Show Sidebar Button Events
showTipsButton.addEventListener('click', () => {
    console.log('Show tips button pressed');

    appState.isTipsSidebarVisible = !appState.isTipsSidebarVisible;
    updateUIVisibility();

    console.log('Tips sidebar shown');
})

// Test Roll Button Events
testRollButton.addEventListener('click', () => {
    console.log('Test roll button pressed');

    alertBox.style.display = 'flex';
    alertBoxTitle.innerText = 'Roll some dice!';
    alertBoxDescription.innerText = 'Select the number of dice, type of dice, and difficulty class (DC) to beat.';

    alertBoxDescription.innerHTML += `
        <br><br>
        <label for='test-dice-count'>Number of Dice
            <input type='number' id='test-dice-count' min='1' max='10' value='1'>
        </label>
        <br>
        <label for='test-dice-type'>Type of Dice
            <select name='test-dice-type' id='test-dice-type'>
                <option disabled selected value='Select a dice'>Select a dice</option>
                <option value='4'>d4</option>
                <option value='6'>d6</option>
                <option value='8'>d8</option>
                <option value='10'>d10</option>
                <option value='12'>d12</option>
                <option value='20'>d20</option>
            </select>
        </label>
        <br>
        <label for='test-difficulty'>Difficulty Class (DC)
            <select name='test-difficulty' id='test-difficulty'>
                <option disabled selected value='Select a DC'>Select a DC</option>
                <option value='5'>5 - Dead Easy</option>
                <option value='10'>10 - Easy</option>
                <option value='15'>15 - Moderate</option>
                <option value='20'>20 - Difficult</option>
                <option value='25'>25 - Extremely Difficult</option>
                <option value='30'>30 - Nearly Impossible</option>
            </select>
        </label>
        <br><br>
        <div class="button-row">
            <button type='button' class='button secondary' id='reset-test-roll-button'>Reset</button>
            <button type='button' class='button' id='test-roll-button'><img src='uiButtonIcon_white.svg'>Roll Dice</button>
        </div>
        <p id='test-result-output'></p>`
        ;

    let testDiceCount = document.querySelector('#test-dice-count');
    let testDiceType = document.querySelector('#test-dice-type');
    let testDifficulty = document.querySelector('#test-difficulty');
    let resetTestButton = document.querySelector('#reset-test-roll-button');
    let testRollButton = document.querySelector('#test-roll-button');
    let testResultOutput = document.querySelector('#test-result-output');

    resetTestButton.addEventListener('click', () => {
        console.log('Reset test roll button pressed');

        testDiceCount.value = '1';
        testDiceType.value = 'Select a dice';
        testDifficulty.value = 'Select a DC';
        testResultOutput.innerHTML = '';

        testResultOutput.style.fontSize = ''; // Reset to default;
        testResultOutput.style.marginTop = ''; // Reset to default;

        console.log('Test roll inputs reset');
    });

    testRollButton.addEventListener('click', () => {
        console.log('Test roll dice button pressed');

        if (testDiceType.value == 'Select a dice' || testDifficulty.value == 'Select a DC') {
            testResultOutput.style.fontSize = '14px'; // Prevent overflow of large font size
            testResultOutput.style.marginTop = '25px'; // Add spacing above temorarily
            testResultOutput.innerHTML = 'Please select both a dice type and a difficulty class (DC) to roll.';
        } else {
            testResultOutput.style.fontSize = ''; // Reset to default;
            testResultOutput.style.marginTop = '20px'; // Reset to default;
            let testResult = rollDice(
                parseInt(testDiceCount.value),
                parseInt(testDiceType.value),
                parseInt(testDifficulty.value),
                false
            );
            testResultOutput.innerHTML = testResult
            if (testResult < testDifficulty.value) {
                testResultOutput.style.color = 'red';
            } else {
                testResultOutput.style.color = 'green';
            }
        }

        console.log('Test roll completed');
    });

});

// Next Buttons Events
nextOneButton.addEventListener('click', () => {
    // Dummy function contents

    // console.log('Next button pressed');

    // if (characterRaceSelect.value === 'Select a race' || characterRaceSelect.value === '') {

    //     alertBox.style.display = 'flex';
    //     alertBoxTitle.innerText = 'Character incomplete';
    //     alertBoxDescription.innerText = 'Please complete all necessary fields in order to continue.';
    //     characterRaceSelect.focus();

    //     console.log('No race selected - alert displayed');
    // } else {
    //     return;
    // }
});

// Reset Character Creation Button Events
characterResetButton.addEventListener('click', () => {
    console.log('Character reset button pressed');

    characterNameInput.value = '';
    characterRaceSelect.value = 'Select a race';

    updateCharacterOverview();

    console.log('Character reset complete');
});

// Cancel Character Creation Button Events
cancelCharacterCreationButton.addEventListener('click', () => {
    console.log('Cancel character creation button pressed');

    // Trigger reset button to clear form fields
    characterResetButton.click();

    appState.isCharFormVisible = false;
    appState.isTipsSidebarVisible = false;

    updateUIVisibility();

    createCharacterButton.disabled = false;

    console.log('Character reset, fields cleared and form hidden');
});

// Character Overview Element Event Listeners
characterNameInput.addEventListener('keyup', () => {
    console.log('Character name input changing...');

    updateCharacterOverview();

    console.log('Character name input updated to ' + characterNameInput.value);
})

characterRaceSelect.addEventListener('change', () => {
    console.log('Character race selection changed');

    updateCharacterOverview();

    console.log('Character race set to ' + characterRaceSelect.value);
});

characterClassSelect.addEventListener('change', () => {
    console.log('Character class selection changed');

    updateCharacterOverview();

    console.log('Character class set to ' + characterClassSelect.value);
});

characterSexSelect.addEventListener('change', () => {
    console.log('Character sex selection changed');

    updateCharacterOverview();

    console.log('Character sex set to: ' + characterSexSelect.value);
})

// Alert Box Events
closeAlertBoxButton.addEventListener('click', () => {
    console.log('Close alert box button pressed');

    alertBox.style.display = 'none';

    console.log('Alert box closed');
})

// --- END EVENT LISTENERS ---
// ---------------------------

// CUSTOM DICE ROLL FUNCTION

function rollDice(count, sides, dc, desc) {
    let total = 0;
    let rolls = [];

    for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        console.log(`Rolled a d${sides}: ${roll}`);
        total += roll;
    }

    if (total < dc) {
        console.log(`Roll failed: ${total} (needed ${dc} or higher)`);
        if (desc == false) {
            return total;
        } else {
            return "Roll failed with " + total;
        }
    } else {
        console.log(`Roll succeeded: ${total} (needed ${dc} or higher)`);
        if (desc == false) {
            return total;
        } else {
            return "Roll succeeded with " + total;
        }
    }
}

// console.log(`Test roll: 2d20 with DC of 15. Result: ${rollDice(2, 20, 15)}`);