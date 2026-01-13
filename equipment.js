// ============================================
// D&D 5E EQUIPMENT DATA
// ============================================
// Armor, weapons, and adventuring gear from Player's Handbook

// ARMOR
const armor = {
    // Light Armor
    "Padded": { 
        type: 'light', 
        ac: 11, 
        stealthDisadvantage: true, 
        cost: { gp: 5 }, 
        weight: 8 
    },
    "Leather": { 
        type: 'light', 
        ac: 11, 
        stealthDisadvantage: false, 
        cost: { gp: 10 }, 
        weight: 10 
    },
    "Studded Leather": { 
        type: 'light', 
        ac: 12, 
        stealthDisadvantage: false, 
        cost: { gp: 45 }, 
        weight: 13 
    },

    // Medium Armor
    "Hide": { 
        type: 'medium', 
        ac: 12, 
        stealthDisadvantage: false, 
        cost: { gp: 10 }, 
        weight: 12 
    },
    "Chain Shirt": { 
        type: 'medium', 
        ac: 13, 
        stealthDisadvantage: false, 
        cost: { gp: 50 }, 
        weight: 20 
    },
    "Scale Mail": { 
        type: 'medium', 
        ac: 14, 
        stealthDisadvantage: true, 
        cost: { gp: 50 }, 
        weight: 45 
    },
    "Breastplate": { 
        type: 'medium', 
        ac: 14, 
        stealthDisadvantage: false, 
        cost: { gp: 400 }, 
        weight: 20 
    },
    "Half Plate": { 
        type: 'medium', 
        ac: 15, 
        stealthDisadvantage: true, 
        cost: { gp: 750 }, 
        weight: 40 
    },

    // Heavy Armor
    "Ring Mail": { 
        type: 'heavy', 
        ac: 14, 
        stealthDisadvantage: true, 
        strengthReq: 0,
        cost: { gp: 30 }, 
        weight: 40 
    },
    "Chain Mail": { 
        type: 'heavy', 
        ac: 16, 
        stealthDisadvantage: true, 
        strengthReq: 13,
        cost: { gp: 75 }, 
        weight: 55 
    },
    "Splint": { 
        type: 'heavy', 
        ac: 17, 
        stealthDisadvantage: true, 
        strengthReq: 15,
        cost: { gp: 200 }, 
        weight: 60 
    },
    "Plate": { 
        type: 'heavy', 
        ac: 18, 
        stealthDisadvantage: true, 
        strengthReq: 15,
        cost: { gp: 1500 }, 
        weight: 65 
    },

    // Shield
    "Shield": { 
        type: 'shield', 
        ac: 2, // AC bonus
        stealthDisadvantage: false, 
        cost: { gp: 10 }, 
        weight: 6 
    }
};

// WEAPONS
const weapons = {
    // Simple Melee Weapons
    "Club": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d4', 
        damageType: 'bludgeoning', 
        properties: ['light'], 
        cost: { sp: 1 }, 
        weight: 2 
    },
    "Dagger": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d4', 
        damageType: 'piercing', 
        properties: ['finesse', 'light', 'thrown (range 20/60)'], 
        cost: { gp: 2 }, 
        weight: 1 
    },
    "Greatclub": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'bludgeoning', 
        properties: ['two-handed'], 
        cost: { sp: 2 }, 
        weight: 10 
    },
    "Handaxe": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'slashing', 
        properties: ['light', 'thrown (range 20/60)'], 
        cost: { gp: 5 }, 
        weight: 2 
    },
    "Javelin": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'piercing', 
        properties: ['thrown (range 30/120)'], 
        cost: { sp: 5 }, 
        weight: 2 
    },
    "Light Hammer": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d4', 
        damageType: 'bludgeoning', 
        properties: ['light', 'thrown (range 20/60)'], 
        cost: { gp: 2 }, 
        weight: 2 
    },
    "Mace": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'bludgeoning', 
        properties: [], 
        cost: { gp: 5 }, 
        weight: 4 
    },
    "Quarterstaff": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'bludgeoning', 
        properties: ['versatile (1d8)'], 
        cost: { sp: 2 }, 
        weight: 4 
    },
    "Sickle": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d4', 
        damageType: 'slashing', 
        properties: ['light'], 
        cost: { gp: 1 }, 
        weight: 2 
    },
    "Spear": { 
        type: 'simple', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'piercing', 
        properties: ['thrown (range 20/60)', 'versatile (1d8)'], 
        cost: { gp: 1 }, 
        weight: 3 
    },

    // Simple Ranged Weapons
    "Light Crossbow": { 
        type: 'simple', 
        category: 'ranged', 
        damage: '1d8', 
        damageType: 'piercing', 
        properties: ['ammunition (range 80/320)', 'loading', 'two-handed'], 
        cost: { gp: 25 }, 
        weight: 5 
    },
    "Dart": { 
        type: 'simple', 
        category: 'ranged', 
        damage: '1d4', 
        damageType: 'piercing', 
        properties: ['finesse', 'thrown (range 20/60)'], 
        cost: { cp: 5 }, 
        weight: 0.25 
    },
    "Shortbow": { 
        type: 'simple', 
        category: 'ranged', 
        damage: '1d6', 
        damageType: 'piercing', 
        properties: ['ammunition (range 80/320)', 'two-handed'], 
        cost: { gp: 25 }, 
        weight: 2 
    },
    "Sling": { 
        type: 'simple', 
        category: 'ranged', 
        damage: '1d4', 
        damageType: 'bludgeoning', 
        properties: ['ammunition (range 30/120)'], 
        cost: { sp: 1 }, 
        weight: 0 
    },

    // Martial Melee Weapons
    "Battleaxe": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'slashing', 
        properties: ['versatile (1d10)'], 
        cost: { gp: 10 }, 
        weight: 4 
    },
    "Flail": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'bludgeoning', 
        properties: [], 
        cost: { gp: 10 }, 
        weight: 2 
    },
    "Glaive": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d10', 
        damageType: 'slashing', 
        properties: ['heavy', 'reach', 'two-handed'], 
        cost: { gp: 20 }, 
        weight: 6 
    },
    "Greataxe": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d12', 
        damageType: 'slashing', 
        properties: ['heavy', 'two-handed'], 
        cost: { gp: 30 }, 
        weight: 7 
    },
    "Greatsword": { 
        type: 'martial', 
        category: 'melee', 
        damage: '2d6', 
        damageType: 'slashing', 
        properties: ['heavy', 'two-handed'], 
        cost: { gp: 50 }, 
        weight: 6 
    },
    "Halberd": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d10', 
        damageType: 'slashing', 
        properties: ['heavy', 'reach', 'two-handed'], 
        cost: { gp: 20 }, 
        weight: 6 
    },
    "Lance": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d12', 
        damageType: 'piercing', 
        properties: ['reach', 'special'], 
        cost: { gp: 10 }, 
        weight: 6 
    },
    "Longsword": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'slashing', 
        properties: ['versatile (1d10)'], 
        cost: { gp: 15 }, 
        weight: 3 
    },
    "Maul": { 
        type: 'martial', 
        category: 'melee', 
        damage: '2d6', 
        damageType: 'bludgeoning', 
        properties: ['heavy', 'two-handed'], 
        cost: { gp: 10 }, 
        weight: 10 
    },
    "Morningstar": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'piercing', 
        properties: [], 
        cost: { gp: 15 }, 
        weight: 4 
    },
    "Pike": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d10', 
        damageType: 'piercing', 
        properties: ['heavy', 'reach', 'two-handed'], 
        cost: { gp: 5 }, 
        weight: 18 
    },
    "Rapier": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'piercing', 
        properties: ['finesse'], 
        cost: { gp: 25 }, 
        weight: 2 
    },
    "Scimitar": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'slashing', 
        properties: ['finesse', 'light'], 
        cost: { gp: 25 }, 
        weight: 3 
    },
    "Shortsword": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'piercing', 
        properties: ['finesse', 'light'], 
        cost: { gp: 10 }, 
        weight: 2 
    },
    "Trident": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d6', 
        damageType: 'piercing', 
        properties: ['thrown (range 20/60)', 'versatile (1d8)'], 
        cost: { gp: 5 }, 
        weight: 4 
    },
    "War Pick": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'piercing', 
        properties: [], 
        cost: { gp: 5 }, 
        weight: 2 
    },
    "Warhammer": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d8', 
        damageType: 'bludgeoning', 
        properties: ['versatile (1d10)'], 
        cost: { gp: 15 }, 
        weight: 2 
    },
    "Whip": { 
        type: 'martial', 
        category: 'melee', 
        damage: '1d4', 
        damageType: 'slashing', 
        properties: ['finesse', 'reach'], 
        cost: { gp: 2 }, 
        weight: 3 
    },

    // Martial Ranged Weapons
    "Blowgun": { 
        type: 'martial', 
        category: 'ranged', 
        damage: '1', 
        damageType: 'piercing', 
        properties: ['ammunition (range 25/100)', 'loading'], 
        cost: { gp: 10 }, 
        weight: 1 
    },
    "Hand Crossbow": { 
        type: 'martial', 
        category: 'ranged', 
        damage: '1d6', 
        damageType: 'piercing', 
        properties: ['ammunition (range 30/120)', 'light', 'loading'], 
        cost: { gp: 75 }, 
        weight: 3 
    },
    "Heavy Crossbow": { 
        type: 'martial', 
        category: 'ranged', 
        damage: '1d10', 
        damageType: 'piercing', 
        properties: ['ammunition (range 100/400)', 'heavy', 'loading', 'two-handed'], 
        cost: { gp: 50 }, 
        weight: 18 
    },
    "Longbow": { 
        type: 'martial', 
        category: 'ranged', 
        damage: '1d8', 
        damageType: 'piercing', 
        properties: ['ammunition (range 150/600)', 'heavy', 'two-handed'], 
        cost: { gp: 50 }, 
        weight: 2 
    },
    "Net": { 
        type: 'martial', 
        category: 'ranged', 
        damage: '-', 
        damageType: '-', 
        properties: ['special', 'thrown (range 5/15)'], 
        cost: { gp: 1 }, 
        weight: 3 
    }
};

// Helper: Calculate AC
function calculateAC(armorName, dexModifier, hasShield = false) {
    const armorData = armor[armorName];
    if (!armorData) return 10 + dexModifier; // Unarmored

    let ac = armorData.ac;

    // Apply DEX modifier based on armor type
    if (armorData.type === 'light') {
        ac += dexModifier;
    } else if (armorData.type === 'medium') {
        ac += Math.min(dexModifier, 2);
    }
    // Heavy armor: no DEX modifier

    // Add shield bonus
    if (hasShield && armorData.type !== 'shield') {
        ac += 2;
    }

    return ac;
}

// Helper: Calculate weapon attack bonus
function getWeaponAttackBonus(weaponName, abilityModifier, profBonus, isProficient) {
    const weaponData = weapons[weaponName];
    if (!weaponData) return 0;

    return abilityModifier + (isProficient ? profBonus : 0);
}

// Helper: Check if weapon uses finesse
function isFinesse(weaponName) {
    const weaponData = weapons[weaponName];
    if (!weaponData) return false;
    return weaponData.properties.includes('finesse');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        armor, 
        weapons, 
        calculateAC, 
        getWeaponAttackBonus, 
        isFinesse 
    };
}