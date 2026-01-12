# D&D Assistant - Progress Map

**🎯 Current Focus:** Race/Class Data Entry & Character Creation MVP

## ✅ Completed

### **State Management System**

- [x] Built `appState` object
- [x] Created `updateUIVisibility()` function
- [x] Refactored event listeners to use state
- [x] Added window resize handling

### **Character Class & Data Structures**

- [x] Refactored Character class to object-based constructor
- [x] Created Human race data object
- [x] Created Dwarf race data object (partial - needs subrace details)
- [x] Created Fighter class data object
- [x] Structured complete character properties

### **Character Overview**

- [x] Built real-time character overview display
- [x] Shows race/class data dynamically
- [x] Implemented modifier source pattern ("from Race", "from Class")
- [x] Added speed, size, hit die display
- [x] **FIXED:** Character overview now updates in real-time (resolved null event listener bug)

### **UI/UX Polish**

- [x] Added button `min-width: 100px` for consistency
- [x] Added `text-wrap: nowrap` to prevent wrapping
- [x] Reorganized CSS into logical sections with clear headers
- [x] Added favicon (d20 icon)
- [x] Added logo to header with spin animation
- [x] Made forms horizontally scrollable
- [x] Improved mobile responsiveness
- [x] Added `.button.secondary` style variant

### **Dice Roller - Complete & Functional** ✨

- [x] Created dice roller modal/alert box
- [x] Added dice icon buttons (d4-d20) with visual selection
- [x] Implemented dice selection UI with icon buttons
- [x] Built `rollDice()` function (pure, returns data object)
- [x] Built `displayDiceRolls()` function (handles all display logic)
- [x] Built `updateTotalColor()` helper function
- [x] Added individual dice roll display with click-to-drop feature
- [x] Color-coded results (blue for max, red for min, green for success)
- [x] Natural 20/1 detection
- [x] Max/min roll detection
- [x] DC (Difficulty Class) success/fail checking
- [x] Click individual dice to drop/un-drop (opacity change + recalculate total)
- [x] **ARCHITECTURE:** Clean separation of concerns (roll logic vs display logic)

---

## 🐛 Bug Fixes - This Session

### **Critical Bug Resolved**

- [x] **Fixed:** Null event listener crash
  - **Issue:** `nextOneButton.addEventListener()` was called on a null element (button was commented out in HTML)
  - **Impact:** Stopped all JavaScript execution after that line, breaking character overview updates
  - **Solution:** Commented out the entire event listener block
  - **Learning:** Always check if DOM elements exist before adding listeners, or use conditional checks: `if (element) { element.addEventListener(...) }`

### **Minor Bug Fixed**

- [x] **Fixed:** Bitwise operator typo in `rollDice()`
  - Changed `sides === 20 & rolls.includes(1)` to `sides === 20 && rolls.includes(1)`
  - Single `&` is bitwise AND, double `&&` is logical AND

---

## 📋 Next Up (Priority Order)

### **Phase 1B: Character Creation Data Entry** ⭐ CURRENT PRIORITY

#### Administrative Work - Foundation for Everything

#### Complete Race Data (9 PHB Races)

- [ ] **Dwarf** - Add subrace details (Hill, Mountain)
  - Hill Dwarf: +1 Wis, +1 HP per level
  - Mountain Dwarf: +2 Str, light & medium armor proficiency
- [ ] **Elf** - Add complete data + subraces (High, Wood, Dark/Drow)
  - High Elf: +1 Int, wizard cantrip, extra language
  - Wood Elf: +1 Wis, 35ft speed, mask of the wild
  - Dark Elf: +1 Cha, superior darkvision, drow magic, sunlight sensitivity
- [ ] **Halfling** - Add complete data + subraces (Lightfoot, Stout)
  - Lightfoot: +1 Cha, naturally stealthy
  - Stout: +1 Con, poison resistance
- [x] **Human** - Complete ✓
- [ ] **Dragonborn** - Add complete data
  - +2 Str, +1 Cha, breath weapon, damage resistance
- [ ] **Gnome** - Add complete data + subraces (Forest, Rock)
  - Forest Gnome: +1 Dex, natural illusionist, speak with small beasts
  - Rock Gnome: +1 Con, artificer's lore, tinker
- [ ] **Half-Elf** - Add complete data
  - +2 Cha, +1 to two other abilities, skill versatility
- [ ] **Half-Orc** - Add complete data
  - +2 Str, +1 Con, darkvision, relentless endurance, savage attacks
- [ ] **Tiefling** - Add complete data
  - +1 Int, +2 Cha, darkvision, hellish resistance, infernal legacy

**Race Data Template:**

```javascript
"RaceName": {
    abilityScoreModifiers: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    speed: 30,
    size: "Medium",
    darkvision: 0, // 0 if none, 60 for normal, 120 for superior
    languages: ["Common", "Dwarvish"],
    traits: [
        { name: "Trait Name", description: "..." }
    ],
    subraces: {
        "Subrace Name": {
            abilityScoreModifiers: { ... },
            traits: [ ... ]
        }
    } || null,
    description: "Lore text..."
}
```

#### Complete Class Data (12 PHB Classes)

- [ ] **Barbarian**
  - d12 hit die, Str primary, rage, unarmored defense
- [ ] **Bard**
  - d8 hit die, Cha primary, spellcasting, bardic inspiration
- [ ] **Cleric**
  - d8 hit die, Wis primary, spellcasting, channel divinity
- [ ] **Druid**
  - d8 hit die, Wis primary, spellcasting, wild shape
- [x] **Fighter** - Complete ✓
- [ ] **Monk**
  - d8 hit die, Dex/Wis primary, martial arts, ki
- [ ] **Paladin**
  - d10 hit die, Str/Cha primary, spellcasting, lay on hands, divine smite
- [ ] **Ranger**
  - d10 hit die, Dex/Wis primary, spellcasting, favored enemy, natural explorer
- [ ] **Rogue**
  - d8 hit die, Dex primary, sneak attack, expertise
- [ ] **Sorcerer**
  - d6 hit die, Cha primary, spellcasting, sorcery points, metamagic
- [ ] **Warlock**
  - d8 hit die, Cha primary, spellcasting (pact magic), eldritch invocations
- [ ] **Wizard**
  - d6 hit die, Int primary, spellcasting, arcane recovery

**Class Data Template:**

```javascript
"ClassName": {
    hitDie: "d10",
    primaryAbilities: ["Strength", "Dexterity"],
    savingThrowProficiencies: ["Strength", "Constitution"],
    armorProficiencies: ["Light armor", "Medium armor", "Shields"],
    weaponProficiencies: ["Simple weapons", "Martial weapons"],
    toolProficiencies: [], // if any
    skillChoices: {
        choose: 2,
        from: ["Acrobatics", "Animal Handling", ...]
    },
    startingEquipment: [
        "Equipment choice descriptions..."
    ],
    classFeatures: [
        { name: "Feature Name", level: 1, description: "..." }
    ],
    spellcasting: {
        ability: "Intelligence", // or null
        cantripsKnown: [0, 3, 3, 3, ...], // by level
        spellsKnown: [0, 6, 7, 8, ...], // by level (or null for prepared casters)
        spellSlots: {
            1: [0, 2, 3, 4, ...], // level 1 slots by character level
            2: [0, 0, 0, 2, ...], // etc
        }
    } || null
}
```

### **Phase 1C: Wire Up Race/Class Data to UI**

- [ ] Add subrace selection dropdown (conditional - only shows if race has subraces)
- [ ] Update character overview to show subrace
- [ ] Display racial traits in a collapsible section
- [ ] Display class features in a collapsible section
- [ ] Show ability score modifiers with breakdown
- [ ] Add "?" tooltip icons for trait/feature descriptions

### **Phase 1D: Ability Scores**

- [ ] Add ability score generation method selector
  - [ ] Standard Array (15, 14, 13, 12, 10, 8)
  - [ ] Point Buy system (27 points, costs table)
  - [ ] Manual entry
  - [ ] 4d6 drop lowest (roll) - **Can use existing dice roller!**
- [ ] Create ability score assignment UI (drag-and-drop or dropdown)
- [ ] Calculate ability modifiers: `Math.floor((score - 10) / 2)`
- [ ] Apply racial bonuses automatically
- [ ] Show final scores with breakdown: "14 (base) + 2 (Dwarf) = 16 (+3)"
- [ ] Update character overview with all 6 abilities

### **Phase 1E: Skills & Proficiencies**

- [ ] Display 18 skills with associated abilities
- [ ] Show available skill choices from class
- [ ] Limit selection to class maximum (e.g., Fighter gets 2)
- [ ] Show proficiency bonus (+2 at level 1)
- [ ] Calculate skill modifiers: `ability_modifier + proficiency_bonus (if proficient)`
- [ ] Display in character overview

### **Phase 1F: Starting Equipment**

- [ ] Display equipment choices from class data
- [ ] Create selection UI (radio buttons or dropdowns)
- [ ] Populate inventory array
- [ ] Display equipped items in overview
- [ ] Calculate AC from armor + Dex modifier
- [ ] Show weapon stats (damage die, properties)

---

## 🎯 Phase 2: Character Persistence (Supabase)

**Once Phase 1 is complete:**

- [ ] Set up Supabase client connection
- [ ] Design database schema (characters table)
- [ ] Implement authentication (email/password or magic link)
- [ ] Create "Save Character" functionality
- [ ] Build character list/dashboard UI
- [ ] Implement "Load Character" (currently disabled)
- [ ] Add "Delete Character" with confirmation
- [ ] Add character sharing (generate read-only public links)
- [ ] Handle offline mode / local storage fallback

---

## 🎨 Phase 3: Character Visualization

- [ ] Canvas/SVG character avatar generator
- [ ] Procedural generation based on race/class/equipment
- [ ] Color palette selector
- [ ] Customization options (hair, eyes, clothing)
- [ ] Export avatar as PNG/SVG
- [ ] Save avatar with character data

---

## 📜 Phase 4: Character Versioning System

### The "Sentimental History" Feature

- [ ] "Save Snapshot" button on character sheet
- [ ] Snapshot note input (e.g., "After defeating the dragon")
- [ ] Version timeline view (chronological list)
- [ ] Historical character sheet view (read-only, styled as "aged parchment")
- [ ] Side-by-side comparison tool
- [ ] Diff highlighting (what changed between versions)
- [ ] Restore from snapshot option

---

## 🎮 Phase 5: DM Portal (Future V2)

- [ ] Campaign creation/management
- [ ] Player invite system (email or share code)
- [ ] Party dashboard (see all player characters)
- [ ] Real-time character updates (WebSocket or polling)
- [ ] Condition/effect tracking (prone, poisoned, etc.)
- [ ] Initiative tracker with drag-and-drop
- [ ] Session notes with rich text editor
- [ ] NPC quick creation tool
- [ ] Combat encounter builder
- [ ] Treasure/loot distribution

---

## 🐛 Known Issues / Tech Debt

### **Critical**

- None currently! 🎉

### **Minor**

- [ ] No error handling for missing race/class data (returns null, but doesn't warn user)
- [ ] Console logs everywhere (clean up for production)
- [ ] Dice roller: Click-to-drop feature doesn't persist visual state on total color update
- [ ] No keyboard shortcuts (Enter to roll, Esc to close modal)

### **Polish**

- [ ] Add loading states for character overview
- [ ] Add smooth transitions/animations to form sections
- [ ] Improve mobile layout for dice roller (buttons too small)
- [ ] Add "Copy roll result" button for sharing
- [ ] Add roll history log (last 5 rolls)
- [ ] Dice roller: Add sound effects option

---

## 📝 Notes & Decisions

### **Architecture Wins This Session** 🏆

- **Clean dice roller architecture:** `rollDice()` is pure (no side effects), `displayDiceRolls()` handles all DOM manipulation, `updateTotalColor()` is a focused helper
- **Debugged null listener bug:** Learned importance of checking element existence before adding listeners
- **State management working well:** `appState` + `updateUIVisibility()` pattern scales nicely

### **User Personas (Priority Order)**

1. **New Player Nina** - Primary focus (needs guidance, tips, validation)
2. **Experienced Player Eric** - Secondary (wants speed, minimal hand-holding)
3. **DM Dana** - Phase 5 (party management, tracking)
4. **Casual Player Carlos** - Phase 2 (import, quick access)

### **Design Philosophy**

- "Fast access over completeness"
- "The thing I always need right now"
- 2-3 clicks max to any feature
- Low cognitive load
- **New:** "Show the data, explain the source" (modifier source pattern)

### **3 Core Modes (App Vision)**

1. **Creation Mode** - Character creation with contextual help
2. **Dice Mode** - Integrated dice roller with D&D mechanics ✓ Done!
3. **Parties Mode** - DM portal with real-time updates

### **Technical Decisions**

- Vanilla HTML/CSS/JS (learning project, no build step)
- Vercel for hosting
- Supabase for backend (auth + database)
- No frameworks until complexity demands it
- **Pattern:** Pure functions for logic, separate functions for display

---

## 🎯 Current Sprint Goal

### Complete Race & Class Data Entry (Get to Character Creation MVP)

**Success Criteria:**

- All 9 PHB races fully documented with subraces
- All 12 PHB classes fully documented with features
- Character overview shows complete race/class information
- User can select any race/class combination and see accurate stats

**Estimated Time:** 3-4 sessions (this is data entry heavy work)

**Recommended Approach:**

1. Start with most popular races/classes (Human, Elf, Dwarf, Fighter, Wizard, Rogue)
2. Use PHB PDF as reference (link in resources)
3. Copy data structure from existing Human/Fighter as template
4. Test each addition by creating a character with that race/class

---

## 📚 Resources

- [2014 Player's Handbook PDF (iCloud)](https://www.icloud.com/iclouddrive/038Q_O68o-2ZotnK_zij2LSiA#Player's_Handbook_2014_5e)
- [D&D 5e SRD (Open Game License)](https://dnd.wizards.com/resources/systems-reference-document)
- [D&D Beyond](https://www.dndbeyond.com/) - Reference for formatting/presentation
- [GitHub Repository](https://github.com/CaptainJunsan/dndassist/tree/main)

---

## 🚀 Velocity Tracking

**This Session:**

- ✅ Fixed critical null listener bug
- ✅ Fixed bitwise operator typo
- ✅ Confirmed dice roller architecture is solid
- ✅ Real-time character overview working perfectly

**Next Session Target:**

- Complete 3 races (Elf, Halfling, Dragonborn)
- Complete 2 classes (Wizard, Rogue)
- Update character overview to handle subraces

---

**Last Updated:** January 2026 - Bug Fix & Progress Review Session  
**Next Session Focus:** Race/Class data entry (Elf, Halfling, Dragonborn, Wizard, Rogue)  
**Current Blocker:** None - ready to proceed! 🎲
