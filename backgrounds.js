// ============================================
// D&D 5E BACKGROUNDS DATA
// ============================================
// Player's Handbook backgrounds with proficiencies and features

const backgrounds = {
    "Acolyte": {
        skillProficiencies: ['insight', 'religion'],
        toolProficiencies: [],
        languages: 2, // Choose 2 languages
        startingGold: 15,
        equipment: [
            'Holy symbol (gift from when you entered priesthood)',
            'Prayer book or prayer wheel',
            'Sticks of incense (5)',
            'Vestments',
            'Common clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'Shelter of the Faithful',
            description: 'As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle. You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the temple where you used to serve, if you remain on good terms with it, or a temple where you have found a new home. While near your temple, you can call upon the priests for assistance, provided the assistance you ask for is not hazardous and you remain in good standing with your temple.'
        },
        description: 'You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine.'
    },

    "Criminal": {
        skillProficiencies: ['deception', 'stealth'],
        toolProficiencies: ['Thieves\' tools', 'One type of gaming set'],
        languages: 0,
        startingGold: 15,
        equipment: [
            'Crowbar',
            'Dark common clothes with hood',
            'Belt pouch'
        ],
        feature: {
            name: 'Criminal Contact',
            description: 'You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.'
        },
        specialty: [
            'Blackmailer', 'Burglar', 'Enforcer', 'Fence',
            'Highway robber', 'Hired killer', 'Pickpocket', 'Smuggler'
        ],
        description: 'You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld.'
    },

    "Folk Hero": {
        skillProficiencies: ['animalHandling', 'survival'],
        toolProficiencies: ['One type of artisan\'s tools', 'Vehicles (land)'],
        languages: 0,
        startingGold: 10,
        equipment: [
            'Set of artisan\'s tools (one of your choice)',
            'Shovel',
            'Iron pot',
            'Common clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'Rustic Hospitality',
            description: 'Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.'
        },
        definingEvent: [
            'I stood up to a tyrant\'s agents',
            'I saved people during a natural disaster',
            'I stood alone against a terrible monster',
            'I stole from a corrupt merchant',
            'I led a militia to fight off an invading army',
            'I broke into a tyrant\'s castle and stole weapons',
            'I trained the peasantry to use farm implements as weapons',
            'A lord rescinded an unpopular decree after I led a symbolic act of protest',
            'A celestial, fey, or similar creature gave me a blessing or revealed my secret origin',
            'Recruited into a lord\'s army, I rose to leadership and was commended for my heroism'
        ],
        description: 'You come from a humble social rank, but you are destined for so much more. Already the people of your home village regard you as their champion, and your destiny calls you to stand against the tyrants and monsters that threaten the common folk everywhere.'
    },

    "Noble": {
        skillProficiencies: ['history', 'persuasion'],
        toolProficiencies: ['One type of gaming set'],
        languages: 1, // Choose 1 language
        startingGold: 25,
        equipment: [
            'Set of fine clothes',
            'Signet ring',
            'Scroll of pedigree',
            'Purse'
        ],
        feature: {
            name: 'Position of Privilege',
            description: 'Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you and avoid your displeasure, and other people of high birth treat you as a member of the same social sphere. You can secure an audience with a local noble if you need to.'
        },
        description: 'You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence.'
    },

    "Sage": {
        skillProficiencies: ['arcana', 'history'],
        toolProficiencies: [],
        languages: 2, // Choose 2 languages
        startingGold: 10,
        equipment: [
            'Bottle of black ink',
            'Quill',
            'Small knife',
            'Letter from dead colleague with question you have not yet answered',
            'Common clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'Researcher',
            description: 'When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this information comes from a library, scriptorium, university, or a sage or other learned person or creature. Your DM might rule that the knowledge you seek is secreted away in an almost inaccessible place, or that it simply cannot be found. Unearthing the deepest secrets of the multiverse can require an adventure or even a whole campaign.'
        },
        specialty: [
            'Alchemist', 'Astronomer', 'Discredited academic', 'Librarian',
            'Professor', 'Researcher', 'Wizard\'s apprentice', 'Scribe'
        ],
        description: 'You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interest you. Your efforts have made you a master in your fields of study.'
    },

    "Soldier": {
        skillProficiencies: ['athletics', 'intimidation'],
        toolProficiencies: ['One type of gaming set', 'Vehicles (land)'],
        languages: 0,
        startingGold: 10,
        equipment: [
            'Insignia of rank',
            'Trophy taken from fallen enemy',
            'Set of bone dice or deck of cards',
            'Common clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'Military Rank',
            description: 'You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you when you are in a position to assert your will. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use. You can also usually gain access to friendly military encampments and fortresses where your rank is recognized.'
        },
        specialty: [
            'Officer', 'Scout', 'Infantry', 'Cavalry',
            'Healer', 'Quartermaster', 'Standard bearer', 'Support staff'
        ],
        description: 'War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, learned basic survival techniques, including how to stay alive on the battlefield.'
    },

    "Charlatan": {
        skillProficiencies: ['deception', 'sleightOfHand'],
        toolProficiencies: ['Disguise kit', 'Forgery kit'],
        languages: 0,
        startingGold: 15,
        equipment: [
            'Set of fine clothes',
            'Disguise kit',
            'Tools of con of your choice (ten stoppered bottles filled with colored liquid, weighted dice, deck of marked cards, or signet ring of imaginary duke)',
            'Belt pouch'
        ],
        feature: {
            name: 'False Identity',
            description: 'You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.'
        },
        favoriteSchemes: [
            'I cheat at games of chance',
            'I shave coins or forge documents',
            'I insinuate myself into people\'s lives to prey on their weakness',
            'I put on new identities like clothes',
            'I run sleight-of-hand cons on street corners',
            'I convince people that worthless junk is worth their hard-earned money'
        ],
        description: 'You have always had a way with people. You know what makes them tick, you can tease out their hearts\' desires after a few minutes of conversation, and with a few leading questions you can read them like they were children\'s books.'
    },

    "Entertainer": {
        skillProficiencies: ['acrobatics', 'performance'],
        toolProficiencies: ['Disguise kit', 'One type of musical instrument'],
        languages: 0,
        startingGold: 15,
        equipment: [
            'Musical instrument (one of your choice)',
            'Favor of an admirer (love letter, lock of hair, or trinket)',
            'Costume',
            'Belt pouch'
        ],
        feature: {
            name: 'By Popular Demand',
            description: 'You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble\'s court. At such a place, you receive free lodging and food of a modest or comfortable standard (depending on the quality of the establishment), as long as you perform each night. In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you.'
        },
        routines: [
            'Actor', 'Dancer', 'Fire-eater', 'Jester',
            'Juggler', 'Instrumentalist', 'Poet', 'Singer', 'Storyteller', 'Tumbler'
        ],
        description: 'You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetics can stir the hearts of those who hear you, awakening grief or joy, laughter or anger.'
    },

    "Guild Artisan": {
        skillProficiencies: ['insight', 'persuasion'],
        toolProficiencies: ['One type of artisan\'s tools'],
        languages: 1, // Choose 1 language
        startingGold: 15,
        equipment: [
            'Set of artisan\'s tools (one of your choice)',
            'Letter of introduction from guild',
            'Traveler\'s clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'Guild Membership',
            description: 'As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings. Guilds often wield tremendous political power. If you are accused of a crime, your guild will support you if a good case can be made for your innocence or the crime is justifiable. You can also gain access to powerful political figures through the guild, if you are a member in good standing. Such connections might require the donation of money or magic items to the guild\'s coffers. You must pay dues of 5 gp per month to the guild. If you miss payments, you must make up back dues to remain in the guild\'s good graces.'
        },
        guildBusiness: [
            'Alchemists & apothecaries', 'Armorers, locksmiths, & finesmiths',
            'Brewers, distillers, & vintners', 'Calligraphers, scribes, & scriveners',
            'Carpenters, roofers, & plasterers', 'Cartographers, surveyors, & chart-makers',
            'Cobblers & shoemakers', 'Cooks & bakers', 'Glassblowers & glaziers',
            'Jewelers & gemcutters', 'Leatherworkers, skinners, & tanners',
            'Masons & stonecutters', 'Painters, limners, & sign-makers',
            'Potters & tile-makers', 'Shipwrights & sailmakers',
            'Smiths & metal-forgers', 'Tinkers, pewterers, & casters',
            'Wagon-makers & wheelwrights', 'Weavers & dyers', 'Woodcarvers, coopers, & bowyers'
        ],
        description: 'You are a member of an artisan\'s guild, skilled in a particular field and closely associated with other artisans. You are a well-established part of the mercantile world, freed by talent and wealth from the constraints of a feudal social order.'
    },

    "Hermit": {
        skillProficiencies: ['medicine', 'religion'],
        toolProficiencies: ['Herbalism kit'],
        languages: 1, // Choose 1 language
        startingGold: 5,
        equipment: [
            'Scroll case stuffed with notes from studies or prayers',
            'Winter blanket',
            'Common clothes',
            'Herbalism kit',
            'Belt pouch'
        ],
        feature: {
            name: 'Discovery',
            description: 'The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature. It could be a site that no one else has ever seen. You might have uncovered a fact that has long been forgotten, or unearthed some relic of the past that could rewrite history. It might be information that would be damaging to the people who consigned you to exile, and hence the reason for your return to society. Work with your DM to determine the details of your discovery and its impact on the campaign.'
        },
        reasonForSeclusion: [
            'I was searching for spiritual enlightenment',
            'I was communing with nature, far from civilization',
            'I was exiled for a crime I didn\'t commit',
            'I retreated from society after a life-altering event',
            'I needed quiet to work on my art, literature, music, or manifesto',
            'I needed to commune with the gods away from distraction',
            'I was looking for answers to a great mystery',
            'I was a pilgrim in search of a holy relic'
        ],
        description: 'You lived in seclusion—either in a sheltered community such as a monastery, or entirely alone—for a formative part of your life. In your time apart from the clamor of society, you found quiet, solitude, and perhaps some of the answers you were looking for.'
    },

    "Outlander": {
        skillProficiencies: ['athletics', 'survival'],
        toolProficiencies: ['One type of musical instrument'],
        languages: 1, // Choose 1 language
        startingGold: 10,
        equipment: [
            'Staff',
            'Hunting trap',
            'Trophy from animal you killed',
            'Traveler\'s clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'Wanderer',
            description: 'You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.'
        },
        origin: [
            'Forester', 'Trapper', 'Homesteader', 'Guide',
            'Exile or outcast', 'Bounty hunter', 'Pilgrim', 'Tribal nomad',
            'Hunter-gatherer', 'Tribal marauder'
        ],
        description: 'You grew up in the wilds, far from civilization and the comforts of town and technology. You\'ve witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction.'
    },

    "Sailor": {
        skillProficiencies: ['athletics', 'perception'],
        toolProficiencies: ['Navigator\'s tools', 'Vehicles (water)'],
        languages: 0,
        startingGold: 10,
        equipment: [
            'Belaying pin (club)',
            'Silk rope (50 feet)',
            'Lucky charm (rabbit foot or small stone with hole)',
            'Common clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'Ship\'s Passage',
            description: 'When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with (perhaps one captained by a former crewmate). Because you\'re calling in a favor, you can\'t be certain of a schedule or route that will meet your every need. Your DM will determine how long it takes to get where you need to go. In return for your free passage, you and your companions are expected to assist the crew during the voyage.'
        },
        description: 'You sailed on a seagoing vessel for years. In that time, you faced down mighty storms, monsters of the deep, and those who wanted to sink your craft to the bottomless depths. Your first love is the distant line of the horizon, but the time has come to try your hand at something new.'
    },

    "Urchin": {
        skillProficiencies: ['sleightOfHand', 'stealth'],
        toolProficiencies: ['Disguise kit', 'Thieves\' tools'],
        languages: 0,
        startingGold: 10,
        equipment: [
            'Small knife',
            'Map of city you grew up in',
            'Pet mouse',
            'Token to remember parents by',
            'Common clothes',
            'Belt pouch'
        ],
        feature: {
            name: 'City Secrets',
            description: 'You know the secret patterns and flow of cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.'
        },
        description: 'You grew up on the streets alone, orphaned, and poor. You had no one to watch over you or to provide for you, so you learned to provide for yourself. You fought fiercely over food and kept a constant watch out for other desperate souls who might steal from you.'
    }
};

// Helper: Get background by name
function getBackground(backgroundName) {
    return backgrounds[backgroundName] || null;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { backgrounds, getBackground };
}