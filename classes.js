// ============================================
// D&D 5E PLAYER'S HANDBOOK CLASSES DATA
// ============================================
// Based on 2014 Player's Handbook
// All 12 classes with level 1 features

const classes = {
    "Barbarian": {
        hitDie: "d12",
        hitDieValue: 12,
        primaryAbilities: ["Strength"],
        savingThrowProficiencies: ["Strength", "Constitution"],
        armorProficiencies: ["Light armor", "Medium armor", "Shields"],
        weaponProficiencies: ["Simple weapons", "Martial weapons"],
        toolProficiencies: [],
        skillChoices: {
            choose: 2,
            from: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"]
        },
        classFeatures: [
            {
                name: "Rage",
                level: 1,
                description: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain +2 damage on melee attacks using Strength, resistance to physical damage, and advantage on Strength checks and saves. You can't cast spells while raging. Rage lasts 1 minute and you have 2 rages per long rest."
            },
            {
                name: "Unarmored Defense",
                level: 1,
                description: "While not wearing armor, your AC equals 10 + Dexterity modifier + Constitution modifier. You can use a shield and still gain this benefit."
            }
        ],
        spellcasting: null
    },

    "Bard": {
        hitDie: "d8",
        hitDieValue: 8,
        primaryAbilities: ["Charisma"],
        savingThrowProficiencies: ["Dexterity", "Charisma"],
        armorProficiencies: ["Light armor"],
        weaponProficiencies: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"],
        toolProficiencies: ["Three musical instruments of your choice"],
        skillChoices: {
            choose: 3,
            from: ["Athletics", "Acrobatics", "Sleight of Hand", "Stealth", "Arcana", "History", "Investigation", "Nature", "Religion", "Animal Handling", "Insight", "Medicine", "Perception", "Survival", "Deception", "Intimidation", "Performance", "Persuasion"]
        },
        classFeatures: [
            {
                name: "Spellcasting",
                level: 1,
                description: "You can cast bard spells. Charisma is your spellcasting ability. Spell save DC = 8 + proficiency bonus + Charisma modifier. Spell attack modifier = proficiency bonus + Charisma modifier."
            },
            {
                name: "Bardic Inspiration",
                level: 1,
                description: "You can inspire others through stirring words or music. As a bonus action, give one creature within 60 feet a Bardic Inspiration die (d6). Once within 10 minutes, they can roll it and add the result to one ability check, attack roll, or saving throw. You can use this feature a number of times equal to your Charisma modifier (minimum 1). You regain expended uses on a long rest."
            }
        ],
        spellcasting: {
            ability: "Charisma",
            cantripsKnown: 2,
            spellsKnown: 4,
            spellSlots: { 1: 2 }
        }
    },

    "Cleric": {
        hitDie: "d8",
        hitDieValue: 8,
        primaryAbilities: ["Wisdom"],
        savingThrowProficiencies: ["Wisdom", "Charisma"],
        armorProficiencies: ["Light armor", "Medium armor", "Shields"],
        weaponProficiencies: ["Simple weapons"],
        toolProficiencies: [],
        skillChoices: {
            choose: 2,
            from: ["History", "Insight", "Medicine", "Persuasion", "Religion"]
        },
        classFeatures: [
            {
                name: "Spellcasting",
                level: 1,
                description: "You can cast cleric spells. Wisdom is your spellcasting ability. Spell save DC = 8 + proficiency bonus + Wisdom modifier. Spell attack modifier = proficiency bonus + Wisdom modifier. You prepare spells from the cleric spell list."
            },
            {
                name: "Divine Domain",
                level: 1,
                description: "Choose a divine domain (Life, Light, Knowledge, Nature, Tempest, Trickery, War). Your choice grants domain spells and other features."
            }
        ],
        spellcasting: {
            ability: "Wisdom",
            cantripsKnown: 3,
            spellsKnown: "prepared", // Clerics prepare spells
            spellSlots: { 1: 2 }
        }
    },

    "Druid": {
        hitDie: "d8",
        hitDieValue: 8,
        primaryAbilities: ["Wisdom"],
        savingThrowProficiencies: ["Intelligence", "Wisdom"],
        armorProficiencies: ["Light armor", "Medium armor", "Shields (druids will not wear armor or use shields made of metal)"],
        weaponProficiencies: ["Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars", "Sickles", "Slings", "Spears"],
        toolProficiencies: ["Herbalism kit"],
        skillChoices: {
            choose: 2,
            from: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"]
        },
        classFeatures: [
            {
                name: "Druidic",
                level: 1,
                description: "You know Druidic, the secret language of druids. You can speak it and use it to leave hidden messages."
            },
            {
                name: "Spellcasting",
                level: 1,
                description: "You can cast druid spells. Wisdom is your spellcasting ability. Spell save DC = 8 + proficiency bonus + Wisdom modifier. You prepare spells from the druid spell list."
            }
        ],
        spellcasting: {
            ability: "Wisdom",
            cantripsKnown: 2,
            spellsKnown: "prepared",
            spellSlots: { 1: 2 }
        }
    },

    "Fighter": {
        hitDie: "d10",
        hitDieValue: 10,
        primaryAbilities: ["Strength", "Dexterity"],
        savingThrowProficiencies: ["Strength", "Constitution"],
        armorProficiencies: ["All armor", "Shields"],
        weaponProficiencies: ["Simple weapons", "Martial weapons"],
        toolProficiencies: [],
        skillChoices: {
            choose: 2,
            from: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Survival"]
        },
        classFeatures: [
            {
                name: "Fighting Style",
                level: 1,
                description: "You adopt a particular style of fighting. Choose one: Archery (+2 to ranged attacks), Defense (+1 AC in armor), Dueling (+2 damage with one-handed weapon), Great Weapon Fighting (reroll 1s and 2s on damage), Protection (impose disadvantage on enemy attacks), or Two-Weapon Fighting (add ability modifier to off-hand attack)."
            },
            {
                name: "Second Wind",
                level: 1,
                description: "You can use a bonus action to regain hit points equal to 1d10 + your fighter level. You can use this feature once per short or long rest."
            }
        ],
        spellcasting: null
    },

    "Monk": {
        hitDie: "d8",
        hitDieValue: 8,
        primaryAbilities: ["Dexterity", "Wisdom"],
        savingThrowProficiencies: ["Strength", "Dexterity"],
        armorProficiencies: [],
        weaponProficiencies: ["Simple weapons", "Shortswords"],
        toolProficiencies: ["One type of artisan's tools or one musical instrument"],
        skillChoices: {
            choose: 2,
            from: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"]
        },
        classFeatures: [
            {
                name: "Unarmored Defense",
                level: 1,
                description: "While not wearing armor or wielding a shield, your AC equals 10 + Dexterity modifier + Wisdom modifier."
            },
            {
                name: "Martial Arts",
                level: 1,
                description: "Your unarmed strikes deal 1d4 damage and use Dexterity for attack/damage rolls. When you use the Attack action with an unarmed strike or monk weapon, you can make one unarmed strike as a bonus action."
            }
        ],
        spellcasting: null
    },

    "Paladin": {
        hitDie: "d10",
        hitDieValue: 10,
        primaryAbilities: ["Strength", "Charisma"],
        savingThrowProficiencies: ["Wisdom", "Charisma"],
        armorProficiencies: ["All armor", "Shields"],
        weaponProficiencies: ["Simple weapons", "Martial weapons"],
        toolProficiencies: [],
        skillChoices: {
            choose: 2,
            from: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"]
        },
        classFeatures: [
            {
                name: "Divine Sense",
                level: 1,
                description: "You can detect the presence of celestials, fiends, or undead within 60 feet. You can use this feature a number of times equal to 1 + your Charisma modifier. You regain all expended uses on a long rest."
            },
            {
                name: "Lay on Hands",
                level: 1,
                description: "You have a pool of healing power equal to your paladin level × 5. As an action, you can touch a creature to restore hit points from this pool (max equal to their hit point maximum). You can also cure one disease or neutralize one poison per 5 hit points spent."
            }
        ],
        spellcasting: null // Paladins get spellcasting at level 2
    },

    "Ranger": {
        hitDie: "d10",
        hitDieValue: 10,
        primaryAbilities: ["Dexterity", "Wisdom"],
        savingThrowProficiencies: ["Strength", "Dexterity"],
        armorProficiencies: ["Light armor", "Medium armor", "Shields"],
        weaponProficiencies: ["Simple weapons", "Martial weapons"],
        toolProficiencies: [],
        skillChoices: {
            choose: 3,
            from: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"]
        },
        classFeatures: [
            {
                name: "Favored Enemy",
                level: 1,
                description: "Choose a type of favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead (or two races of humanoid). You have advantage on Wisdom (Survival) checks to track them and Intelligence checks to recall information about them."
            },
            {
                name: "Natural Explorer",
                level: 1,
                description: "Choose a favored terrain: arctic, coast, desert, forest, grassland, mountain, swamp, or Underdark. You gain benefits when traveling in that terrain."
            }
        ],
        spellcasting: null // Rangers get spellcasting at level 2
    },

    "Rogue": {
        hitDie: "d8",
        hitDieValue: 8,
        primaryAbilities: ["Dexterity"],
        savingThrowProficiencies: ["Dexterity", "Intelligence"],
        armorProficiencies: ["Light armor"],
        weaponProficiencies: ["Simple weapons", "Hand crossbows", "Longswords", "Rapiers", "Shortswords"],
        toolProficiencies: ["Thieves' tools"],
        skillChoices: {
            choose: 4,
            from: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"]
        },
        classFeatures: [
            {
                name: "Expertise",
                level: 1,
                description: "Choose two of your skill proficiencies or one skill and thieves' tools. Your proficiency bonus is doubled for any ability check using the chosen proficiencies."
            },
            {
                name: "Sneak Attack",
                level: 1,
                description: "Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll or if another enemy of the target is within 5 feet of it. The attack must use a finesse or ranged weapon."
            },
            {
                name: "Thieves' Cant",
                level: 1,
                description: "You know thieves' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation."
            }
        ],
        spellcasting: null
    },

    "Sorcerer": {
        hitDie: "d6",
        hitDieValue: 6,
        primaryAbilities: ["Charisma"],
        savingThrowProficiencies: ["Constitution", "Charisma"],
        armorProficiencies: [],
        weaponProficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light crossbows"],
        toolProficiencies: [],
        skillChoices: {
            choose: 2,
            from: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"]
        },
        classFeatures: [
            {
                name: "Spellcasting",
                level: 1,
                description: "You can cast sorcerer spells. Charisma is your spellcasting ability. Spell save DC = 8 + proficiency bonus + Charisma modifier. Spell attack modifier = proficiency bonus + Charisma modifier."
            },
            {
                name: "Sorcerous Origin",
                level: 1,
                description: "Choose a sorcerous origin (Draconic Bloodline or Wild Magic) that grants you features and bonus spells."
            }
        ],
        spellcasting: {
            ability: "Charisma",
            cantripsKnown: 4,
            spellsKnown: 2,
            spellSlots: { 1: 2 }
        }
    },

    "Warlock": {
        hitDie: "d8",
        hitDieValue: 8,
        primaryAbilities: ["Charisma"],
        savingThrowProficiencies: ["Wisdom", "Charisma"],
        armorProficiencies: ["Light armor"],
        weaponProficiencies: ["Simple weapons"],
        toolProficiencies: [],
        skillChoices: {
            choose: 2,
            from: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"]
        },
        classFeatures: [
            {
                name: "Otherworldly Patron",
                level: 1,
                description: "You have made a pact with an otherworldly being. Choose the Archfey, the Fiend, or the Great Old One as your patron. Your choice grants you features and spells."
            },
            {
                name: "Pact Magic",
                level: 1,
                description: "You can cast warlock spells. Charisma is your spellcasting ability. Spell save DC = 8 + proficiency bonus + Charisma modifier. Unlike other spellcasters, your spell slots are always the same level and you regain them on a short rest."
            }
        ],
        spellcasting: {
            ability: "Charisma",
            cantripsKnown: 2,
            spellsKnown: 2,
            spellSlots: { 1: 1 } // Warlocks have unique slot mechanics
        }
    },

    "Wizard": {
        hitDie: "d6",
        hitDieValue: 6,
        primaryAbilities: ["Intelligence"],
        savingThrowProficiencies: ["Intelligence", "Wisdom"],
        armorProficiencies: [],
        weaponProficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light crossbows"],
        toolProficiencies: [],
        skillChoices: {
            choose: 2,
            from: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"]
        },
        classFeatures: [
            {
                name: "Spellcasting",
                level: 1,
                description: "You can cast wizard spells from your spellbook. Intelligence is your spellcasting ability. Spell save DC = 8 + proficiency bonus + Intelligence modifier. Spell attack modifier = proficiency bonus + Intelligence modifier. You prepare spells from your spellbook."
            },
            {
                name: "Arcane Recovery",
                level: 1,
                description: "Once per day during a short rest, you can recover expended spell slots with a combined level equal to or less than half your wizard level (rounded up)."
            }
        ],
        spellcasting: {
            ability: "Intelligence",
            cantripsKnown: 3,
            spellsKnown: "spellbook", // Wizards use a spellbook, start with 6 spells
            spellSlots: { 1: 2 }
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { classes };
}