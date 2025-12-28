// DOM DECLARATIONS

const createCharacterButton = document.querySelector('#create-character-button');
const createCharacterFormContainer = document.querySelector('#create-character-form');
const loadCharacterButton = document.querySelector('#load-character-button');
const showTipsButton = document.querySelector('#show-tips-button');
const characterResetButton = document.querySelector('#character-reset-button');
const characterNameInput = document.querySelector('#character-name');
const characterRaceSelect = document.querySelector('#character-race');
const cancelCharacterCreationButton = document.querySelector('#cancel-character-creation-button');
const characterCreationTipsSidebar = document.querySelector('#character-creation-tips-sidebar');
const closeTipsSidebarButton = document.querySelector('#close-tips-sidebar-button');
const characterNameSexNoteBox = document.querySelector('#character-note-box');
const characterNameSexNoteTitle = document.querySelector('#character-name-sex-note-title');
const characterNameSexNoteText = document.querySelector('#character-name-sex-note-text');

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
    createCharacterFormContainer.style.display = isCharFormVisible ? 'block' : 'none';

    // 3. Apply changes to the DOM
    if (isCharFormVisible) {
        characterCreationTipsSidebar.style.display = isTipsSidebarVisible ? 'block' : 'none';
        showTipsButton.style.display = isTipsSidebarVisible ? 'none' : 'block';
    } else {
        characterCreationTipsSidebar.style.display = 'none';
        showTipsButton.style.display = 'none';
    }
};

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

// EVENT LISTENERS

window.addEventListener('resize', function () {
    // Get the new window width
    appState.screenWidth = window.innerWidth;
    updateUIVisibility();
    console.log('Window resized to: ' + appState.screenWidth + 'px');
});

// Create Character Button Events
createCharacterButton.addEventListener('click', () => {
    console.log('Create character button pressed');

    appState.isCharFormVisible = true;
    appState.isTipsSidebarVisible = (appState.screenWidth > DESKTOP_BREAKPOINT);
    updateUIVisibility();
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

// Reset Character Creation Button Events
characterResetButton.addEventListener('click', () => {
    console.log('Character reset button pressed');

    characterNameInput.value = '';
    characterRaceSelect.value = 'Select a race';

    if (characterRaceSelect.value === 'Select a race' || characterRaceSelect.value === '') {
        characterNameSexNoteBox.style.display = 'none';
    } else {
        characterNameSexNoteBox.style.display = 'flex';
    };

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

// Notebox Events
characterRaceSelect.addEventListener('change', () => {
    const selectedRace = characterRaceSelect.value;

    if (characterRaceSelect.value === 'Select a race' || characterRaceSelect.value === '') {
        characterNameSexNoteBox.style.display = 'none';
    } else {
        characterNameSexNoteBox.style.display = 'flex';
    };

    switch (selectedRace) {
        case 'Dwarf':
            characterNameSexNoteTitle.innerText = "Common Dwarf Names";
            characterNameSexNoteText.innerText = "Adrik, Alberich, Baern, Barendd, Brottor, Bruenor, Oain, Oarrak, Oelg, Eberk, Einkil, Fargrim, Flint, Gardain, Harbek, Kildrak, Morgran, Orsik, Oskar, Rangrim, Rurik, Taklinn, Thoradin, Thorin, Tordek, Traubon, Travok, Ulfgar, Veit, Vonda";
            break;
        case 'Elf':
            characterNameSexNoteTitle.innerText = "Common Elf Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        case 'Halfling':
            characterNameSexNoteTitle.innerText = "Common Halfling Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        case 'Human':
            characterNameSexNoteTitle.innerText = "Common Human Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        case 'Dragonborn':
            characterNameSexNoteTitle.innerText = "Common Dragonborn Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        case 'Gnome':
            characterNameSexNoteTitle.innerText = "Common Gnome Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        case 'Half-Elf':
            characterNameSexNoteTitle.innerText = "Common Half-Elf Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        case 'Half-Orc':
            characterNameSexNoteTitle.innerText = "Common Half-Orc Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        case 'Tiefling':
            characterNameSexNoteTitle.innerText = "Common Tiefling Names";
            characterNameSexNoteText.innerText = "Some names here...";
            break;
        default:
            characterNameSexNoteBox.style.display = "none";
            break;
    };
});

// --- END EVENT LISTENERS ---
// ---------------------------