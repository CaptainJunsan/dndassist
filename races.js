// ============================================
// D&D 5E PLAYER'S HANDBOOK RACES DATA
// ============================================
// Based on 2014 Player's Handbook
// All ability score modifiers, traits, and features

const races = {
    "Dwarf": {
        abilityScoreModifiers: { con: 2 },
        speed: 25,
        size: "Medium",
        darkvision: 60,
        languages: ["Common", "Dwarvish"],
        traits: [
            {
                name: "Dwarven Resilience",
                description: "You have advantage on saving throws against poison, and you have resistance against poison damage."
            },
            {
                name: "Dwarven Combat Training",
                description: "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer."
            },
            {
                name: "Tool Proficiency",
                description: "You gain proficiency with the artisan's tools of your choice: smith's tools, brewer's supplies, or mason's tools."
            },
            {
                name: "Stonecunning",
                description: "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus."
            }
        ],
        subraces: {
            "Hill Dwarf": {
                abilityScoreModifiers: { wis: 1 },
                traits: [
                    {
                        name: "Dwarven Toughness",
                        description: "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level."
                    }
                ]
            },
            "Mountain Dwarf": {
                abilityScoreModifiers: { str: 2 },
                traits: [
                    {
                        name: "Dwarven Armor Training",
                        description: "You have proficiency with light and medium armor."
                    }
                ]
            }
        },
        description: "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal."
    },

    "Elf": {
        abilityScoreModifiers: { dex: 2 },
        speed: 30,
        size: "Medium",
        darkvision: 60,
        languages: ["Common", "Elvish"],
        traits: [
            {
                name: "Keen Senses",
                description: "You have proficiency in the Perception skill."
            },
            {
                name: "Fey Ancestry",
                description: "You have advantage on saving throws against being charmed, and magic can't put you to sleep."
            },
            {
                name: "Trance",
                description: "Elves don't need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep."
            }
        ],
        subraces: {
            "High Elf": {
                abilityScoreModifiers: { int: 1 },
                traits: [
                    {
                        name: "Elf Weapon Training",
                        description: "You have proficiency with the longsword, shortsword, shortbow, and longbow."
                    },
                    {
                        name: "Cantrip",
                        description: "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it."
                    },
                    {
                        name: "Extra Language",
                        description: "You can speak, read, and write one extra language of your choice."
                    }
                ]
            },
            "Wood Elf": {
                abilityScoreModifiers: { wis: 1 },
                speed: 35,
                traits: [
                    {
                        name: "Elf Weapon Training",
                        description: "You have proficiency with the longsword, shortsword, shortbow, and longbow."
                    },
                    {
                        name: "Fleet of Foot",
                        description: "Your base walking speed increases to 35 feet."
                    },
                    {
                        name: "Mask of the Wild",
                        description: "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena."
                    }
                ]
            },
            "Dark Elf (Drow)": {
                abilityScoreModifiers: { cha: 1 },
                darkvision: 120,
                traits: [
                    {
                        name: "Superior Darkvision",
                        description: "Your darkvision has a radius of 120 feet."
                    },
                    {
                        name: "Sunlight Sensitivity",
                        description: "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight."
                    },
                    {
                        name: "Drow Magic",
                        description: "You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells."
                    },
                    {
                        name: "Drow Weapon Training",
                        description: "You have proficiency with rapiers, shortswords, and hand crossbows."
                    }
                ]
            }
        },
        description: "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it."
    },

    "Halfling": {
        abilityScoreModifiers: { dex: 2 },
        speed: 25,
        size: "Small",
        darkvision: 0,
        languages: ["Common", "Halfling"],
        traits: [
            {
                name: "Lucky",
                description: "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll."
            },
            {
                name: "Brave",
                description: "You have advantage on saving throws against being frightened."
            },
            {
                name: "Halfling Nimbleness",
                description: "You can move through the space of any creature that is of a size larger than yours."
            }
        ],
        subraces: {
            "Lightfoot": {
                abilityScoreModifiers: { cha: 1 },
                traits: [
                    {
                        name: "Naturally Stealthy",
                        description: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you."
                    }
                ]
            },
            "Stout": {
                abilityScoreModifiers: { con: 1 },
                traits: [
                    {
                        name: "Stout Resilience",
                        description: "You have advantage on saving throws against poison, and you have resistance against poison damage."
                    }
                ]
            }
        },
        description: "The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense."
    },

    "Human": {
        abilityScoreModifiers: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        speed: 30,
        size: "Medium",
        darkvision: 0,
        languages: ["Common", "one extra of your choice"],
        traits: [
            {
                name: "Extra Language",
                description: "You can speak, read, and write one extra language of your choice."
            }
        ],
        subraces: null,
        description: "Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds."
    },

    "Dragonborn": {
        abilityScoreModifiers: { str: 2, cha: 1 },
        speed: 30,
        size: "Medium",
        darkvision: 0,
        languages: ["Common", "Draconic"],
        traits: [
            {
                name: "Draconic Ancestry",
                description: "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type."
            },
            {
                name: "Breath Weapon",
                description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw. The DC = 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can't use it again until you complete a short or long rest."
            },
            {
                name: "Damage Resistance",
                description: "You have resistance to the damage type associated with your draconic ancestry."
            }
        ],
        subraces: null,
        draconicAncestry: {
            "Black": { damageType: "Acid", breathWeapon: "5 by 30 ft. line (Dex. save)" },
            "Blue": { damageType: "Lightning", breathWeapon: "5 by 30 ft. line (Dex. save)" },
            "Brass": { damageType: "Fire", breathWeapon: "5 by 30 ft. line (Dex. save)" },
            "Bronze": { damageType: "Lightning", breathWeapon: "5 by 30 ft. line (Dex. save)" },
            "Copper": { damageType: "Acid", breathWeapon: "5 by 30 ft. line (Dex. save)" },
            "Gold": { damageType: "Fire", breathWeapon: "15 ft. cone (Dex. save)" },
            "Green": { damageType: "Poison", breathWeapon: "15 ft. cone (Con. save)" },
            "Red": { damageType: "Fire", breathWeapon: "15 ft. cone (Dex. save)" },
            "Silver": { damageType: "Cold", breathWeapon: "15 ft. cone (Con. save)" },
            "White": { damageType: "Cold", breathWeapon: "15 ft. cone (Con. save)" }
        },
        description: "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension."
    },

    "Gnome": {
        abilityScoreModifiers: { int: 2 },
        speed: 25,
        size: "Small",
        darkvision: 60,
        languages: ["Common", "Gnomish"],
        traits: [
            {
                name: "Gnome Cunning",
                description: "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic."
            }
        ],
        subraces: {
            "Forest Gnome": {
                abilityScoreModifiers: { dex: 1 },
                traits: [
                    {
                        name: "Natural Illusionist",
                        description: "You know the minor illusion cantrip. Intelligence is your spellcasting ability for it."
                    },
                    {
                        name: "Speak with Small Beasts",
                        description: "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts."
                    }
                ]
            },
            "Rock Gnome": {
                abilityScoreModifiers: { con: 1 },
                traits: [
                    {
                        name: "Artificer's Lore",
                        description: "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply."
                    },
                    {
                        name: "Tinker",
                        description: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time."
                    }
                ]
            }
        },
        description: "A gnome's energy and enthusiasm for living shines through every inch of his or her tiny body."
    },

    "Half-Elf": {
        abilityScoreModifiers: { cha: 2, choice: 2 }, // Player chooses +1 to two different abilities
        speed: 30,
        size: "Medium",
        darkvision: 60,
        languages: ["Common", "Elvish", "one extra of your choice"],
        traits: [
            {
                name: "Fey Ancestry",
                description: "You have advantage on saving throws against being charmed, and magic can't put you to sleep."
            },
            {
                name: "Skill Versatility",
                description: "You gain proficiency in two skills of your choice."
            }
        ],
        subraces: null,
        description: "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents."
    },

    "Half-Orc": {
        abilityScoreModifiers: { str: 2, con: 1 },
        speed: 30,
        size: "Medium",
        darkvision: 60,
        languages: ["Common", "Orc"],
        traits: [
            {
                name: "Menacing",
                description: "You gain proficiency in the Intimidation skill."
            },
            {
                name: "Relentless Endurance",
                description: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest."
            },
            {
                name: "Savage Attacks",
                description: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
            }
        ],
        subraces: null,
        description: "Half-orcs' grayish pigmentation, sloping foreheads, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see."
    },

    "Tiefling": {
        abilityScoreModifiers: { int: 1, cha: 2 },
        speed: 30,
        size: "Medium",
        darkvision: 60,
        languages: ["Common", "Infernal"],
        traits: [
            {
                name: "Hellish Resistance",
                description: "You have resistance to fire damage."
            },
            {
                name: "Infernal Legacy",
                description: "You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells."
            }
        ],
        subraces: null,
        description: "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling."
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { races };
}