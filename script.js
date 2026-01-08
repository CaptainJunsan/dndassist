// DOM DECLARATIONS

const createCharacterButton = document.querySelector('#create-character-button');
const createCharacterFormContainer = document.querySelector('#create-character-form');
const loadCharacterButton = document.querySelector('#load-character-button');
const testRollButton = document.querySelector('#test-roll');
const characterResetButton = document.querySelector('#character-reset-button');
const characterNameInput = document.querySelector('#character-name');
const characterRaceSelect = document.querySelector('#character-race');
const characterClassSelect = document.querySelector('#character-class');
const characterSexSelect = document.querySelector('#character-sex');
const cancelCharacterCreationButton = document.querySelector('#cancel-character-creation-button');
const characterOverviewContainer = document.querySelector('#character-overview');
const characterSubraceSelect = document.querySelector('#character-subrace');
const subraceSelectContainer = document.querySelector('#subrace-select-container');

// DOM Elements for Ability Scores
const abilityScoreMethodSelect = document.querySelector('#ability-score-method');
const availableScoresContainer = document.querySelector('#available-scores-container');
const availableScoresDiv = document.querySelector('#available-scores');
const abilityAssignmentContainer = document.querySelector('#ability-assignment-container');
const rerollScoresButton = document.querySelector('#reroll-scores-button');

const alertBox = document.querySelector('#main-alert-box');
const alertBoxTitle = alertBox.querySelector('.title');
const alertBoxDescription = alertBox.querySelector('.description');

let perDiceRollOutput = document.querySelector('#per-dice-roll-output');

// SCREEN WIDTH

const DESKTOP_BREAKPOINT = 1000;
// Previously used: screen.width;

// *** APP STATE ***

const appState = {
    screenWidth: window.innerWidth,
    isCharFormVisible: false
};

// UPDATE UI FUNCTION

function updateUIVisibility() {
    // 1. Read the app state
    const { screenWidth, isCharFormVisible } = appState;

    // 2. Update the character form visibility
    createCharacterFormContainer.style.display = isCharFormVisible ? 'flex' : 'none';

    // 3. Show or hide the overview when the form is visible
    characterOverviewContainer.style.display = isCharFormVisible ? 'flex' : 'none';
};

// UPDATE CHARACTER OVERVIEW FUNCTION

function updateCharacterOverview() {
    const name = characterNameInput.value || characterNameInput.placeholder;
    const race = characterRaceSelect.value;
    const subrace = characterSubraceSelect?.value || null;
    const charClass = characterClassSelect.value;
    const sex = characterSexSelect.value;

    // Get race data
    const raceData = races[race] || null;
    const subraceData = (raceData && subrace && raceData.subraces) ? raceData.subraces[subrace] : null;
    const classData = classes[charClass] || null;

    // Calculate total ability score modifiers (race + subrace)
    const totalAbilityMods = {};
    if (raceData) {
        Object.assign(totalAbilityMods, raceData.abilityScoreModifiers);
    }
    if (subraceData) {
        Object.entries(subraceData.abilityScoreModifiers).forEach(([ability, bonus]) => {
            totalAbilityMods[ability] = (totalAbilityMods[ability] || 0) + bonus;
        });
    }

    // Get effective speed and darkvision
    const effectiveSpeed = (subraceData?.speed) || (raceData?.speed) || 30;
    const effectiveDarkvision = (subraceData?.darkvision !== undefined) ? subraceData.darkvision : (raceData?.darkvision || 0);

    // Calculate final ability scores and modifiers
    const finalAbilityScores = {};
    const abilityModifiers = {};
    let allAbilitiesAssigned = true;

    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ability => {
        const base = abilityScoreState.assignedScores[ability];
        if (base === null) {
            allAbilitiesAssigned = false;
            finalAbilityScores[ability] = null;
            abilityModifiers[ability] = null;
        } else {
            const racialBonus = totalAbilityMods[ability] || 0;
            finalAbilityScores[ability] = base + racialBonus;
            abilityModifiers[ability] = calculateModifier(finalAbilityScores[ability]);
        }
    });

    // Calculate derived stats
    const conMod = abilityModifiers.con || 0;
    const dexMod = abilityModifiers.dex || 0;
    const wisMod = abilityModifiers.wis || 0;

    let hp = classData && finalAbilityScores.con !== null ? classData.hitDieValue + conMod : null;
    // Hill Dwarf bonus
    if (subrace === 'Hill Dwarf' && hp !== null) {
        hp += 1;
    }

    const initiative = finalAbilityScores.dex !== null ? (dexMod >= 0 ? `+${dexMod}` : `${dexMod}`) : null;
    const passivePerception = finalAbilityScores.wis !== null ? 10 + wisMod : null;
    const profBonus = 2; // Level 1

    characterOverviewContainer.innerHTML = `
        <div class="overview-section">
            <h3 class="title form-title">Character Overview</h3>
            
            <!-- Basic Info -->
            <div class="overview-stat">
                <span class="stat-label">Name:</span>
                <span class="stat-final-value">${name}</span>
            </div>
            
            <div class="overview-stat">
                <span class="stat-label">Race:</span>
                <span class="stat-final-value">${race}${subrace ? ' (' + subrace + ')' : ''}</span>
            </div>
            
            <div class="overview-stat">
                <span class="stat-label">Class:</span>
                <span class="stat-final-value">${charClass}</span>
            </div>
            
            <div class="overview-stat">
                <span class="stat-label">Sex:</span>
                <span class="stat-final-value">${sex}</span>
            </div>

            ${allAbilitiesAssigned ? `
                <div class="overview-divider"></div>
                <h4 class="overview-subtitle">Ability Scores</h4>
                
                ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(ability => {
                    const abilityNames = {
                        str: 'Strength',
                        dex: 'Dexterity',
                        con: 'Constitution',
                        int: 'Intelligence',
                        wis: 'Wisdom',
                        cha: 'Charisma'
                    };
                    const score = finalAbilityScores[ability];
                    const mod = abilityModifiers[ability];
                    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
                    return `
                        <div class="overview-stat">
                            <span class="stat-label">${abilityNames[ability]}:</span>
                            <span class="stat-final-value">${score} (${modStr})</span>
                        </div>
                    `;
                }).join('')}

                <div class="overview-divider"></div>
                <h4 class="overview-subtitle">Derived Stats</h4>

                ${hp !== null ? `
                    <div class="overview-stat">
                        <span class="stat-label">Hit Points:</span>
                        <span class="stat-final-value">${hp}</span>
                        <span class="stat-explanation">(${classData.hitDie} + CON ${subrace === 'Hill Dwarf' ? '+ 1 Hill Dwarf' : ''})</span>
                    </div>
                ` : ''}

                <div class="overview-stat">
                    <span class="stat-label">Initiative:</span>
                    <span class="stat-final-value">${initiative || '--'}</span>
                    <span class="stat-explanation">(DEX modifier)</span>
                </div>

                <div class="overview-stat">
                    <span class="stat-label">Proficiency Bonus:</span>
                    <span class="stat-final-value">+${profBonus}</span>
                    <span class="stat-explanation">(Level 1)</span>
                </div>

                <div class="overview-stat">
                    <span class="stat-label">Passive Perception:</span>
                    <span class="stat-final-value">${passivePerception || '--'}</span>
                    <span class="stat-explanation">(10 + WIS modifier)</span>
                </div>
            ` : ''}
            
            ${raceData || classData ? `
                <div class="overview-divider"></div>
                <h4 class="overview-subtitle">Character Stats</h4>
                
                ${raceData ? `
                    <div class="overview-stat">
                        <span class="stat-label">Speed:</span>
                        <span class="stat-final-value">${effectiveSpeed} ft</span>
                        <span class="stat-explanation">(from <span class="modifier-source">${subraceData?.speed ? subrace : 'Race'}</span>)</span>
                    </div>
                    
                    <div class="overview-stat">
                        <span class="stat-label">Size:</span>
                        <span class="stat-final-value">${raceData.size}</span>
                        <span class="stat-explanation">(from <span class="modifier-source">Race</span>)</span>
                    </div>
                    
                    ${effectiveDarkvision > 0 ? `
                        <div class="overview-stat">
                            <span class="stat-label">Darkvision:</span>
                            <span class="stat-final-value">${effectiveDarkvision} ft</span>
                            <span class="stat-explanation">(from <span class="modifier-source">${subraceData?.darkvision ? subrace : 'Race'}</span>)</span>
                        </div>
                    ` : ''}
                    
                    ${raceData.languages?.length > 0 ? `
                        <div class="overview-divider"></div>
                        <h4 class="overview-subtitle">Languages</h4>
                        <div class="overview-stat">
                            <span class="stat-label">Known:</span>
                            <span class="stat-final-value">${raceData.languages.join(', ')}</span>
                        </div>
                    ` : ''}
                    
                    ${raceData.traits?.length > 0 || subraceData?.traits?.length > 0 ? `
                        <div class="overview-divider"></div>
                        <h4 class="overview-subtitle">Racial Traits</h4>
                        ${raceData.traits.map(trait => `
                            <div class="trait-item">
                                <div class="trait-name">${trait.name}</div>
                                <div class="trait-description">${trait.description}</div>
                            </div>
                        `).join('')}
                        ${subraceData?.traits ? subraceData.traits.map(trait => `
                            <div class="trait-item">
                                <div class="trait-name">${trait.name} <span class="trait-source">(${subrace})</span></div>
                                <div class="trait-description">${trait.description}</div>
                            </div>
                        `).join('') : ''}
                    ` : ''}
                ` : ''}
                
                ${classData ? `
                    <div class="overview-divider"></div>
                    <h4 class="overview-subtitle">Class Features</h4>
                    
                    <div class="overview-stat">
                        <span class="stat-label">Hit Die:</span>
                        <span class="stat-final-value">${classData.hitDie}</span>
                        <span class="stat-explanation">(from <span class="modifier-source">Class</span>)</span>
                    </div>

                    ${classData.classFeatures.map(feature => `
                        <div class="trait-item">
                            <div class="trait-name">${feature.name}</div>
                            <div class="trait-description">${feature.description}</div>
                        </div>
                    `).join('')}

                    ${classData.spellcasting ? `
                        <div class="overview-divider"></div>
                        <h4 class="overview-subtitle">Spellcasting</h4>
                        <div class="overview-stat">
                            <span class="stat-label">Ability:</span>
                            <span class="stat-final-value">${classData.spellcasting.ability}</span>
                        </div>
                        <div class="overview-stat">
                            <span class="stat-label">Cantrips Known:</span>
                            <span class="stat-final-value">${classData.spellcasting.cantripsKnown}</span>
                        </div>
                        <div class="overview-stat">
                            <span class="stat-label">1st Level Slots:</span>
                            <span class="stat-final-value">${classData.spellcasting.spellSlots[1]}</span>
                        </div>
                    ` : ''}
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
    updateUIVisibility();
    updateCharacterOverview();
    createCharacterButton.disabled = true;

    console.log('Create character form displayed');
});



// Load Character Button Events
loadCharacterButton.addEventListener('click', () => {
    console.log('Load character button pressed');

    alert('Load character feature not yet available.');

    console.log('Load character alert displayed');
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
                <input type='range' name='test-difficulty' id='test-difficulty' min='0' max='50' step='5' value='0'>
                    <!-- <option selected value='0'>None</option>
                    <option value='5'>5 - Dead Easy</option>
                    <option value='10'>10 - Easy</option>
                    <option value='15'>15 - Moderate</option>
                    <option value='20'>20 - Difficult</option>
                    <option value='25'>25 - Extremely Difficult</option>
                    <option value='30'>30 - Nearly Impossible</option> -->
                </range>
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

// Reset Character Creation Button Events
characterResetButton.addEventListener('click', () => {
    console.log('Character reset button pressed');

    characterNameInput.value = '';
    characterRaceSelect.value = 'Select a race';
    characterClassSelect.value = 'Select a class';
    characterSexSelect.value = 'Select a sex';
    characterSubraceSelect.value = '';
    subraceSelectContainer.style.display = 'none';

    updateCharacterOverview();

    console.log('Character reset complete');
});

// Cancel Character Creation Button Events
cancelCharacterCreationButton.addEventListener('click', () => {
    console.log('Cancel character creation button pressed');

    // Trigger reset button to clear form fields
    characterResetButton.click();

    appState.isCharFormVisible = false;

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

characterRaceSelect.addEventListener('change', () => {
    console.log('Character race selection changed');

    const selectedRace = characterRaceSelect.value;
    const raceData = races[selectedRace];

    // Show/hide subrace dropdown based on whether race has subraces
    if (raceData && raceData.subraces) {
        subraceSelectContainer.style.display = 'flex';

        // Populate subrace dropdown
        characterSubraceSelect.innerHTML = '<option value="" disabled selected>Select a subrace</option>';
        Object.keys(raceData.subraces).forEach(subraceName => {
            const option = document.createElement('option');
            option.value = subraceName;
            option.textContent = subraceName;
            characterSubraceSelect.appendChild(option);
        });
    } else {
        subraceSelectContainer.style.display = 'none';
        characterSubraceSelect.value = '';
    }

    updateCharacterOverview();

    console.log('Character race set to ' + characterRaceSelect.value);
});

characterRaceSelect.addEventListener('change', updateRacialBonuses);

characterSubraceSelect.addEventListener('change', () => {
    console.log('Character subrace selection changed');

    updateCharacterOverview();

    console.log('Character subrace set to ' + characterSubraceSelect.value);
});

characterSubraceSelect.addEventListener('change', updateRacialBonuses);

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

// --- END EVENT LISTENERS ---
// ---------------------------

// CUSTOM DICE ROLL FUNCTION

// REFACTORED DICE ROLL FUNCTION
// Universal dice roller with processing modes

function rollDice(count, sides, process = null) {
    const rolls = [];
    let total = 0;
    let dropped = [];

    // Roll each die
    for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        total += roll;
    }

    // Apply processing rules
    if (process === 'abilityScore' && count >= 2) {
        // Find the lowest roll (only first occurrence if multiple)
        const lowest = Math.min(...rolls);
        const lowestIndex = rolls.indexOf(lowest);
        
        // Drop it from total
        total -= lowest;
        dropped.push(lowest);
        
        // Mark it as dropped (for display purposes)
        rolls[lowestIndex] = { value: lowest, dropped: true };
    }

    // Check for special rolls (only on d20s without processing)
    const hasNatural20 = sides === 20 && !process && rolls.includes(20);
    const hasNatural1 = sides === 20 && !process && rolls.includes(1);

    return {
        total: total,
        rolls: rolls,
        dropped: dropped,
        process: process || 'standard',
        sides: sides,
        count: count,
        hasNatural20: hasNatural20,
        hasNatural1: hasNatural1
    };
}

// Helper function: Generate 6 ability scores using 4d6 drop lowest
function generateRolledAbilityScores() {
    const scores = [];
    for (let i = 0; i < 6; i++) {
        const result = rollDice(4, 6, 'abilityScore');
        scores.push(result.total);
    }
    return scores;
}

function displayDiceRolls(result) {
    const perDiceRollOutput = document.querySelector('#per-dice-roll-output');
    const testResultOutput = document.querySelector('#test-result-output');

    // Attach click-to-copy listener once (works for single or multiple dice)
    if (testResultOutput && !testResultOutput.dataset.copyAttached) {
        testResultOutput.addEventListener('click', async () => {
            const text = testResultOutput.innerText;
            try {
                await navigator.clipboard.writeText(text);
                console.log('Copied to clipboard: ' + text);
            } catch (err) {
                console.error('Clipboard copy failed:', err);
                alert('Failed to copy: ' + err.message);
            }
        });
        testResultOutput.dataset.copyAttached = 'true';
    }

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

            // Add event listener for each span element
            span.addEventListener('click', () => {
                span.style.opacity = span.style.opacity == '1' ? '0.3' : '1';
                console.log('Clicked on dice showing ' + roll);
                console.log('Span opacity set to ' + span.style.opacity);

                // Update total (avoid compound assignment inside ternary)
                if (span.style.opacity == '1') {
                    result.total += roll;
                } else {
                    result.total -= roll;
                }
                console.log('Total rolled set to ' + result.total);

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

// Ability Score State
const abilityScoreState = {
    method: null,
    availableScores: [],
    assignedScores: { str: null, dex: null, con: null, int: null, wis: null, cha: null },
    selectedChip: null
};

// Calculate ability modifier
function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
}

// Update racial bonuses display
function updateRacialBonuses() {
    const race = characterRaceSelect.value;
    const subrace = characterSubraceSelect?.value || null;
    const raceData = races[race] || null;
    const subraceData = (raceData && subrace && raceData.subraces) ? raceData.subraces[subrace] : null;

    // Calculate total ability score modifiers (race + subrace)
    const totalAbilityMods = {};
    if (raceData) {
        Object.assign(totalAbilityMods, raceData.abilityScoreModifiers);
    }
    if (subraceData) {
        Object.entries(subraceData.abilityScoreModifiers).forEach(([ability, bonus]) => {
            totalAbilityMods[ability] = (totalAbilityMods[ability] || 0) + bonus;
        });
    }

    // Update each ability's racial bonus display
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ability => {
        const bonus = totalAbilityMods[ability] || 0;
        const bonusElement = document.querySelector(`#${ability}-racial`);
        if (bonusElement) {
            bonusElement.textContent = bonus > 0 ? `+${bonus}` : `+0`;
        }
    });

    // Recalculate final scores
    updateFinalScores();
}

// Update final scores and modifiers
function updateFinalScores() {
    const race = characterRaceSelect.value;
    const subrace = characterSubraceSelect?.value || null;
    const raceData = races[race] || null;
    const subraceData = (raceData && subrace && raceData.subraces) ? raceData.subraces[subrace] : null;

    // Get racial bonuses
    const totalAbilityMods = {};
    if (raceData) {
        Object.assign(totalAbilityMods, raceData.abilityScoreModifiers);
    }
    if (subraceData) {
        Object.entries(subraceData.abilityScoreModifiers).forEach(([ability, bonus]) => {
            totalAbilityMods[ability] = (totalAbilityMods[ability] || 0) + bonus;
        });
    }

    // Update each ability
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ability => {
        const baseScore = abilityScoreState.assignedScores[ability];
        const racialBonus = totalAbilityMods[ability] || 0;
        const finalElement = document.querySelector(`#${ability}-final`);

        if (baseScore !== null) {
            const finalScore = baseScore + racialBonus;
            const modifier = calculateModifier(finalScore);
            const modifierStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            finalElement.textContent = `= ${finalScore} (${modifierStr})`;
        } else {
            finalElement.textContent = `= -- (+-)`;
        }
    });

    // Update overview
    updateCharacterOverview();
}

// Generate score chips
function generateScoreChips(scores) {
    availableScoresDiv.innerHTML = '';
    abilityScoreState.availableScores = [...scores];

    scores.forEach((score, index) => {
        const chip = document.createElement('div');
        chip.className = 'score-chip';
        chip.textContent = score;
        chip.dataset.score = score;
        chip.dataset.index = index;

        chip.addEventListener('click', () => {
            // Deselect previous chip
            document.querySelectorAll('.score-chip').forEach(c => c.classList.remove('selected'));
            
            // Select this chip
            chip.classList.add('selected');
            abilityScoreState.selectedChip = score;
        });

        availableScoresDiv.appendChild(chip);

        rerollScoresButton.addEventListener('click', () => {
            abilityScoreMethodSelect.value = 'rolled';
            const changeEvent = new Event('change', { bubbles: true });
            abilityScoreMethodSelect.dispatchEvent(changeEvent);
        })
    });
}

// Assign score to ability
function assignScoreToAbility(ability, score) {
    // Remove score from available
    const scoreIndex = abilityScoreState.availableScores.indexOf(score);
    if (scoreIndex > -1) {
        abilityScoreState.availableScores.splice(scoreIndex, 1);
    }

    // Assign to ability
    abilityScoreState.assignedScores[ability] = score;

    // Update slot display
    const slot = document.querySelector(`#${ability}-slot .score-value`);
    slot.textContent = score;
    document.querySelector(`#${ability}-slot`).classList.add('filled');

    // Regenerate chips
    generateScoreChips(abilityScoreState.availableScores);
    abilityScoreState.selectedChip = null;

    // Update final scores
    updateFinalScores();
}

// Remove score from ability
function removeScoreFromAbility(ability) {
    const score = abilityScoreState.assignedScores[ability];
    if (score === null) return;

    // Add score back to available
    abilityScoreState.availableScores.push(score);
    abilityScoreState.availableScores.sort((a, b) => b - a); // Sort descending

    // Remove from ability
    abilityScoreState.assignedScores[ability] = null;

    // Update slot display
    const slot = document.querySelector(`#${ability}-slot .score-value`);
    slot.textContent = '--';
    document.querySelector(`#${ability}-slot`).classList.remove('filled');

    // Regenerate chips
    generateScoreChips(abilityScoreState.availableScores);

    // Update final scores
    updateFinalScores();
}

// Event listener: Ability score method selection
abilityScoreMethodSelect.addEventListener('change', () => {
    const method = abilityScoreMethodSelect.value;
    abilityScoreState.method = method;

    if (method == 'rolled') {
        rerollScoresButton.style.display = "flex";
    } else {
        rerollScoresButton.style.display = 'none';
    }

    // Reset state
    abilityScoreState.availableScores = [];
    abilityScoreState.assignedScores = { str: null, dex: null, con: null, int: null, wis: null, cha: null };
    abilityScoreState.selectedChip = null;

    // Clear all slots
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ability => {
        const slot = document.querySelector(`#${ability}-slot .score-value`);
        slot.textContent = '--';
        document.querySelector(`#${ability}-slot`).classList.remove('filled');
    });

    // Generate scores based on method
    let scores = [];
    if (method === 'standard') {
        scores = [15, 14, 13, 12, 10, 8];
    } else if (method === 'rolled') {
        scores = generateRolledAbilityScores();
    } else if (method === 'manual') {
        // TODO: Implement manual entry
        alert('Manual entry not yet implemented');
        return;
    } else if (method === 'pointbuy') {
        // TODO: Implement point buy
        alert('Point buy not yet implemented');
        return;
    }

    // Show UI
    availableScoresContainer.style.display = 'block';
    abilityAssignmentContainer.style.display = 'block';

    // Generate score chips
    generateScoreChips(scores);

    console.log(`Ability scores generated (${method}):`, scores);
});

// Event listeners: Ability score slots
document.querySelectorAll('.ability-score-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        const ability = slot.dataset.ability;
        const currentScore = abilityScoreState.assignedScores[ability];

        if (currentScore !== null) {
            // Remove score if already assigned
            removeScoreFromAbility(ability);
        } else if (abilityScoreState.selectedChip !== null) {
            // Assign selected chip
            assignScoreToAbility(ability, abilityScoreState.selectedChip);
        }
    });
});
