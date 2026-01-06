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

let perDiceRollOutput = document.querySelector('#per-dice-roll-output');

const alertBox = document.querySelector('#main-alert-box');
const alertBoxTitle = alertBox.querySelector('.title');
const alertBoxDescription = alertBox.querySelector('.description');
// const closeAlertBoxButton = document.querySelector('#close-alert-box-button');

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
        <div class="form-row">
            <label for='test-dice-count'>Number of Dice
                <input type='number' id='test-dice-count' min='1' max='10' value='1'>
            </label>
            <label for='test-difficulty'>Difficulty Class (DC)
                <select name='test-difficulty' id='test-difficulty'>
                    <option selected value='0'>None</option>
                    <option value='5'>5 - Dead Easy</option>
                    <option value='10'>10 - Easy</option>
                    <option value='15'>15 - Moderate</option>
                    <option value='20'>20 - Difficult</option>
                    <option value='25'>25 - Extremely Difficult</option>
                    <option value='30'>30 - Nearly Impossible</option>
                </select>
            </label>
        </div>
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
            <div id="dice-icon-buttons-container" class="button-row-left">
                <button type="button" class="icon-button" id="dice-d4-button" title="Select d4"><img src="d4_button.svg" alt="d4"></button>
                <button type="button" class="icon-button" id="dice-d6-button" title="Select d6"><img src="d6_button.svg" alt="d6"></button>
                <button type="button" class="icon-button" id="dice-d8-button" title="Select d8"><img src="d8_button.svg" alt="d8"></button>
                <button type="button" class="icon-button" id="dice-d10-button" title="Select d10"><img src="d10_button.svg" alt="d10"></button>
                <button type="button" class="icon-button" id="dice-d12-button" title="Select d12"><img src="d12_button.svg" alt="d12"></button>
                <button type="button" class="icon-button" id="dice-d20-button" title="Select d20"><img src="d20_button.svg" alt="d20"></button>
            </div>
        </label>
        <div class="full center-content" id="roll-results-container">
            <div id='per-dice-roll-output'></div>
            <p id='test-result-output'></p>
        </div>
        <br><br>
        <div class="button-row">
            <button type='button' class='button danger' id='cancel-test-roll-button'>Cancel</button>
            <button type='button' class='button secondary' id='reset-test-roll-button'>Reset</button>
            <button type='button' class='button' id='test-roll-button'><img src='uiButtonIcon_white.svg'>Roll Dice</button>
        </div>`
        ;

    let testDiceCount = document.querySelector('#test-dice-count');
    let testDiceType = document.querySelector('#test-dice-type');
    let d4Button = document.querySelector('#dice-d4-button');
    let d6Button = document.querySelector('#dice-d6-button');
    let d8Button = document.querySelector('#dice-d8-button');
    let d10Button = document.querySelector('#dice-d10-button');
    let d12Button = document.querySelector('#dice-d12-button');
    let d20Button = document.querySelector('#dice-d20-button');
    let testDifficulty = document.querySelector('#test-difficulty');
    let cancelTestButton = document.querySelector('#cancel-test-roll-button');
    let resetTestButton = document.querySelector('#reset-test-roll-button');
    let testRollButton = document.querySelector('#test-roll-button');
    let rollResultsContainer = document.querySelector('#roll-results-container');
    let perDiceRollOutput = document.querySelector('#per-dice-roll-output');
    let testResultOutput = document.querySelector('#test-result-output');

    function clearSelectedDice() {
        d4Button.classList.remove('selected');
        d6Button.classList.remove('selected');
        d8Button.classList.remove('selected');
        d10Button.classList.remove('selected');
        d12Button.classList.remove('selected');
        d20Button.classList.remove('selected');
        testDiceType.value = 'Select a dice';
    };

    cancelTestButton.addEventListener('click', () => {
        console.log('Cancel test roll button pressed');

        alertBox.style.display = 'none';

        console.log('Alert box successfully hidden');
    });

    resetTestButton.addEventListener('click', () => {
        console.log('Reset test roll button pressed');

        testDiceCount.value = '1';
        testDifficulty.value = '0';
        testResultOutput.innerHTML = '';

        testResultOutput.style.backgroundColor = ''; // Reset to default
        testResultOutput.style.fontSize = ''; // Reset to default
        rollResultsContainer.style.display = 'none';
        perDiceRollOutput.innerHTML = '';

        clearSelectedDice();

        console.log('Test roll inputs reset');
    });

    d4Button.addEventListener('click', () => {
        clearSelectedDice();
        d4Button.classList.add('selected');
        testDiceType.value = '4';
    })

    d6Button.addEventListener('click', () => {
        clearSelectedDice();
        d6Button.classList.add('selected');
        testDiceType.value = '6';
    })

    d8Button.addEventListener('click', () => {
        clearSelectedDice();
        d8Button.classList.add('selected');
        testDiceType.value = '8';
    })

    d10Button.addEventListener('click', () => {
        clearSelectedDice();
        d10Button.classList.add('selected');
        testDiceType.value = '10';
    })

    d12Button.addEventListener('click', () => {
        clearSelectedDice();
        d12Button.classList.add('selected');
        testDiceType.value = '12';
    })

    d20Button.addEventListener('click', () => {
        clearSelectedDice();
        d20Button.classList.add('selected');
        testDiceType.value = '20';
    })

    testRollButton.addEventListener('click', () => {
        console.log('Test roll dice button pressed');

        rollResultsContainer.style.display = 'flex';

        if (testDiceType.value == 'Select a dice') {
            const testResultOutput = document.querySelector('#test-result-output');
            testResultOutput.style.fontSize = '14px'; // Prevent overflow of large font size
            testResultOutput.style.background = 'none'; // Make black text legible
            testResultOutput.style.color = '#000000'; // Change text color to black
            testResultOutput.innerHTML = 'Please select a dice type to roll.';

            const perDiceRollOutput = document.querySelector('#per-dice-roll-output');
            perDiceRollOutput.innerHTML = '';
            return;
        }

        // Roll the dice
        const result = rollDice(
            parseInt(testDiceCount.value),
            parseInt(testDiceType.value),
            parseInt(testDifficulty.value)
        );

        // Display results
        displayDiceRolls(result);

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
// closeAlertBoxButton.addEventListener('click', () => {
//     console.log('Close alert box button pressed');

//     alertBox.style.display = 'none';

//     console.log('Alert box closed');
// })

// --- END EVENT LISTENERS ---
// ---------------------------

// CUSTOM DICE ROLL FUNCTION

function rollDice(count, sides, dc = 0) {
    const rolls = []; // Store individual rolls
    let total = 0; // Sum of all rolls

    // Roll each die
    for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll); // Save roll
        total += roll; // Add to total
    }

    // Calculate success/failure (if DC exists)
    let status = 'none';
    if (dc > 0) {
        status = total >= dc ? 'success' : 'fail';
    }

    // Check for special rolls (only on d20s)
    const hasNatural20 = sides === 20 && rolls.includes(20);
    const hasNatural1 = sides === 20 & rolls.includes(1);

    // Return all the data
    return {
        rolls: rolls,
        total: total,
        dc: dc,
        status: status,
        sides: sides,
        count: count,
        hasNatural20: hasNatural20,
        hasNatural1: hasNatural1
    };
}

function displayDiceRolls(result) {
    const perDiceRollOutput = document.querySelector('#per-dice-roll-output');
    const testResultOutput = document.querySelector('#test-result-output');

    let spanRollID = 0;

    // Safety check
    if (!perDiceRollOutput || !testResultOutput) {
        console.error('Roll output elements not found!');
        return;
    }

    // Clear previous rolls
    perDiceRollOutput.innerHTML = '';

    // Single die: hide individual display
    if (result.count === 1) {
        perDiceRollOutput.style.display = 'none';
        testResultOutput.innerHTML = result.total;
    }
    // Multiple dice: show individual rolls
    else {
        perDiceRollOutput.style.display = 'flex';

        // Create a span for each die rolled
        result.rolls.forEach((roll) => {
            const span = document.createElement('span');
            span.className = 'per-dice-roll';
            span.id = `dice-${spanRollID++}`;
            span.textContent = roll;
            span.style.opacity = '1'; // Set opacity for variable testing later

            //Color code based on roll value
            if (roll === result.sides) {
                // Max roll (e.g., 20 on d20)
                span.style.background = '#4000ff';
                span.style.color = 'white';
                span.style.border = 'none';
            } else if (roll === 1) {
                // Min roll (always 1)
                span.style.background = '#ff0033';
                span.style.color = 'white';
                span.style.border = 'none';
            }

            console.log(span.style.opacity);

            // Add event listener for each span element
            span.addEventListener('click', () => {
                let testResultOutput = document.querySelector('#test-result-output');

                span.style.opacity = span.style.opacity == '1' ? '0.3' : '1';
                console.log('Clicked on dice showing ' + roll);
                console.log('Span opacity set to ' + span.style.opacity);
                result.total = span.style.opacity == '1' ? result.total += roll : result.total -= roll;
                console.log(result.total);

                testResultOutput.innerHTML = result.total;
            })

            // Add to container
            perDiceRollOutput.appendChild(span);
        });

        // Show total
        testResultOutput.innerHTML = result.total;
    }

    // Color the total based on result
    updateTotalColor(result);
}

function updateTotalColor(result) {
    const testResultOutput = document.querySelector('#test-result-output');
    if (!testResultOutput) return;

    let bgColor = '';
    const { total, count, sides, dc } = result;

    // Check for perfect rolls first
    if (total === count * sides) {
        bgColor = '#4000ff'; // Perfect roll
    } else if (total === count) {
        bgColor = '#ff0033'; // Minimum roll
    } else if (dc > 0) {
        bgColor = total >= dc ? '#00cc44' : '#ff0033'; // Check against DC for success or fail
    }

    // Else no color
    testResultOutput.style.backgroundColor = bgColor;
}
