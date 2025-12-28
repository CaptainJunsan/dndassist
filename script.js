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
const deviceScreenWidth = window.innerWidth;
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
    // Add Logic here...
}

// CHARACTER OBJECT TEMPLATE

class Character {
    constructor(name, sex, race, charClass, level, attStr, attDex, attWis, attInt, attCha, attCon, hp, ac, speed, profBonus, skills, inventory, spells, backstory, notes) {
        this.name = name;
        this.sex = sex;
        this.race = race;
        this.charClass = charClass;
        this.level = level;
        this.attStr = attStr;
        this.attDex = attDex;
        this.attWis = attWis;
        this.attInt = attInt;
        this.attCha = attCha;
        this.attCon = attCon;
        this.hp = hp;
        this.ac = ac;
        this.speed = speed;
        this.profBonus = profBonus;
        this.skills = skills;
        this.inventory = inventory;
        this.spells = spells;
        this.backstory = backstory;
        this.notes = notes;
    }
}

// Control display of tips sidebar button based on screen width
// USE CASE:
// If narrow (mobile): Show button on character creation but keep sidebar hidden
// Else if wide: keep default behavior
if (window.innerWidth > DESKTOP_BREAKPOINT) {
    // Add logic here...
} else if (window.innerWidth <= DESKTOP_BREAKPOINT) {
    // Add logic here...
}

// EVENT LISTENERS

window.addEventListener('resize', function () {
    // Get the new window width
    deviceScreenWidth = window.innerWidth;
    console.log('Window resized to: ' + deviceScreenWidth + 'px');

    if (deviceScreenWidth > DESKTOP_BREAKPOINT) {
        // Add logic here...
    } else if (deviceScreenWidth <= DESKTOP_BREAKPOINT) {
        // Add logic here...
    }
});

// Create Character Button Events
createCharacterButton.addEventListener('click', () => {
    console.log('Create character button pressed');

    createCharacterFormContainer.style.display = 'block';
    createCharacterButton.disabled = true;
    characterCreationTipsSidebar.style.display = 'block';

    console.log('Create character form displayed');
});

// Close Sidebar Button Events
closeTipsSidebarButton.addEventListener('click', () => {
    console.log('Close tips sidebar button pressed');

    characterCreationTipsSidebar.style.display = 'none';
    showTipsButton.style.display = 'block';

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

    if (characterCreationTipsSidebar.style.display == 'none') {
        characterCreationTipsSidebar.style.display = 'block';
        showTipsButton.style.display = 'none';
    } else if (characterCreationTipsSidebar.style.display == 'block') {
        characterCreationTipsSidebar.style.display = 'none';
        showTipsButton.style.display = 'block';
    };

    console.log('Tips sidebar shown');
})

// Reset CHaracter Creation Button Events
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

    createCharacterFormContainer.style.display = 'none';
    characterCreationTipsSidebar.style.display = 'none';
    characterNameSexNoteBox.style.display = 'none';
    showTipsButton.style.display = 'none';
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