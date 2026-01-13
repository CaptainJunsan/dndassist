// ============================================
// D&D 5E SKILLS DATA
// ============================================
// All 18 skills from Player's Handbook
// Associated ability scores for modifier calculations

const skills = {
    // STRENGTH
    athletics: {
        name: 'Athletics',
        ability: 'str',
        description: 'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming.'
    },

    // DEXTERITY
    acrobatics: {
        name: 'Acrobatics',
        ability: 'dex',
        description: 'Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you\'re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship\'s deck.'
    },
    sleightOfHand: {
        name: 'Sleight of Hand',
        ability: 'dex',
        description: 'Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check.'
    },
    stealth: {
        name: 'Stealth',
        ability: 'dex',
        description: 'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.'
    },

    // INTELLIGENCE
    arcana: {
        name: 'Arcana',
        ability: 'int',
        description: 'Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.'
    },
    history: {
        name: 'History',
        ability: 'int',
        description: 'Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.'
    },
    investigation: {
        name: 'Investigation',
        ability: 'int',
        description: 'When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check.'
    },
    nature: {
        name: 'Nature',
        ability: 'int',
        description: 'Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.'
    },
    religion: {
        name: 'Religion',
        ability: 'int',
        description: 'Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.'
    },

    // WISDOM
    animalHandling: {
        name: 'Animal Handling',
        ability: 'wis',
        description: 'When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal\'s intentions, the DM might call for a Wisdom (Animal Handling) check.'
    },
    insight: {
        name: 'Insight',
        ability: 'wis',
        description: 'Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone\'s next move.'
    },
    medicine: {
        name: 'Medicine',
        ability: 'wis',
        description: 'A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.'
    },
    perception: {
        name: 'Perception',
        ability: 'wis',
        description: 'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses.'
    },
    survival: {
        name: 'Survival',
        ability: 'wis',
        description: 'The DM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.'
    },

    // CHARISMA
    deception: {
        name: 'Deception',
        ability: 'cha',
        description: 'Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions.'
    },
    intimidation: {
        name: 'Intimidation',
        ability: 'cha',
        description: 'When you attempt to influence someone through overt threats, hostile actions, and physical violence, the DM might ask you to make a Charisma (Intimidation) check.'
    },
    performance: {
        name: 'Performance',
        ability: 'cha',
        description: 'Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.'
    },
    persuasion: {
        name: 'Persuasion',
        ability: 'cha',
        description: 'When you attempt to influence someone or a group of people with tact, social graces, or good nature, the DM might ask you to make a Charisma (Persuasion) check.'
    }
};

// Skills grouped by ability for UI display
const skillsByAbility = {
    str: ['athletics'],
    dex: ['acrobatics', 'sleightOfHand', 'stealth'],
    int: ['arcana', 'history', 'investigation', 'nature', 'religion'],
    wis: ['animalHandling', 'insight', 'medicine', 'perception', 'survival'],
    cha: ['deception', 'intimidation', 'performance', 'persuasion']
};

// Helper: Get skill modifier
function getSkillModifier(skillKey, abilityScores, proficiencies, profBonus) {
    const skill = skills[skillKey];
    if (!skill) return 0;

    const abilityMod = Math.floor((abilityScores[skill.ability] - 10) / 2);
    const isProficient = proficiencies[skillKey] || false;
    
    return abilityMod + (isProficient ? profBonus : 0);
}

// Helper: Get all skill modifiers for a character
function getAllSkillModifiers(abilityScores, proficiencies, profBonus = 2) {
    const modifiers = {};
    
    Object.keys(skills).forEach(skillKey => {
        modifiers[skillKey] = getSkillModifier(skillKey, abilityScores, proficiencies, profBonus);
    });
    
    return modifiers;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { skills, skillsByAbility, getSkillModifier, getAllSkillModifiers };
}