# D&D Assistant - Progress Map

## 🎯 Current Focus: Dice Roller Polish & Character Creation MVP

---

## ✅ Completed

### **State Management System**
- [x] Built `appState` object
- [x] Created `updateUIVisibility()` function
- [x] Refactored event listeners to use state
- [x] Added window resize handling

### **Character Class & Data Structures**
- [x] Refactored Character class to object-based constructor
- [x] Created Human race data object
- [x] Created Fighter class data object
- [x] Structured complete character properties

### **Character Overview**
- [x] Built real-time character overview display
- [x] Shows race/class data dynamically
- [x] Implemented modifier source pattern ("from Race", "from Class")
- [x] Added speed, size, hit die display

### **UI/UX Polish**
- [x] Added button `min-width: 100px` for consistency
- [x] Added `text-wrap: nowrap` to prevent wrapping
- [x] Reorganized CSS into logical sections
- [x] Added favicon (d20 icon)
- [x] Added logo to header
- [x] Made forms horizontally scrollable
- [x] Improved mobile responsiveness

### **Dice Roller Foundation**
- [x] Created dice roller modal/alert box
- [x] Added dice icon buttons (d4-d20)
- [x] Implemented dice selection UI
- [x] Built basic `rollDice()` function
- [x] Added individual dice roll display
- [x] Color-coded results (blue/red/green)
- [x] Natural 20/1 detection for single dice
- [x] Max/min roll detection

---

## 🔧 In Progress

### **Dice Roller Refactoring**
- [ ] **HIGH PRIORITY:** Refactor `rollDice()` to be pure function (no DOM manipulation)
  - Current issue: DOM elements accessed inside roll function
  - Solution: Return data object, let caller handle display
- [ ] Create `displayDiceRolls(result, allowDrop)` function for display logic
- [ ] Extract color determination into `updateTotalColor()` helper
- [ ] Add **clickable dice drop feature** for ability score rolling (4d6 drop lowest)
- [ ] Add proper CSS classes (remove inline styles)
- [ ] Test edge cases (10d20, overflow handling)

**Target Architecture:**
```javascript
// Pure roll function - no side effects
function rollDice(count, sides, dc = 0) {
    // Returns: { 
    //   rolls: [4, 3, 6, 2], 
    //   total: 15, 
    //   dc: 0, 
    //   status: 'none', 
    //   sides: 6,
    //   count: 4,
    //   hasNatural20: false, 
    //   hasNatural1: false 
    // }
}

// Display function with optional drop functionality
function displayDiceRolls(result, allowDrop = false) {
    // Creates dice spans
    // Adds click handlers if allowDrop = true
    // Handles drop/un-drop logic
    // Recalculates total on drop
}

// Color helper
function updateTotalColor(total, result) {
    // Determines and applies appropriate background color
}

// Optional: Auto-drop lowest
function displayDiceRollsWithAutoDrop(result, numToDrop = 0) {
    // Automatically drops lowest N dice
    // Useful for "4d6 drop lowest" ability score generation
}
```

**Clickable Dice Drop Feature:**
- Click individual dice to toggle "dropped" state
- Dropped dice: 50% opacity + line-through
- Total recalculates automatically (excludes dropped dice)
- Click again to un-drop
- Enable with `displayDiceRolls(result, true)`
- **Use Case:** Ability score generation (4d6 drop lowest)
- **Use Case:** Any roll where you need to exclude certain dice

**Implementation Status:**
- [ ] Refactor `rollDice()` to pure function
- [ ] Implement `displayDiceRolls()` with drop feature
- [ ] Add `updateTotalColor()` helper
- [ ] Update test roll button to use new functions
- [ ] Add CSS for `.per-dice-roll` with hover states
- [ ] Test drop functionality
- [ ] (Optional) Implement auto-drop feature

---

## 📋 Next Up (Priority Order)

### **Phase 1A: Complete Dice Roller**
1. [ ] Implement refactored roll functions (see above)
2. [ ] Add CSS classes for:
   - `.icon-button` (dice selection buttons)
   - `.icon-button.selected` (active state)
   - `.per-dice-roll` (individual roll display)
   - `#roll-results-container` (results wrapper)
3. [ ] Add advantage/disadvantage option (future enhancement)
4. [ ] Make dice roller reusable for combat system

### **Phase 1B: Character Creation Data Entry** 
**Administrative Work - Foundation for Everything**

#### Complete Race Data (9 PHB Races)
- [ ] Dwarf (with subraces: Hill, Mountain)
- [ ] Elf (with subraces: High, Wood, Dark/Drow)
- [ ] Halfling (with subraces: Lightfoot, Stout)
- [x] Human (complete)
- [ ] Dragonborn
- [ ] Gnome (with subraces: Forest, Rock)
- [ ] Half-Elf
- [ ] Half-Orc
- [ ] Tiefling

**Each race needs:**
```javascript
{
    abilityScoreModifiers: { ... },
    speed: 30,
    size: "Medium",
    languages: ["Common", ...],
    traits: [ ... ],
    subraces: { ... } or null,
    description: "..."
}
```

#### Complete Class Data (12 PHB Classes)
- [ ] Barbarian
- [ ] Bard
- [ ] Cleric
- [ ] Druid
- [x] Fighter (complete)
- [ ] Monk
- [ ] Paladin
- [ ] Ranger
- [ ] Rogue
- [ ] Sorcerer
- [ ] Warlock
- [ ] Wizard

**Each class needs:**
```javascript
{
    hitDie: "d10",
    primaryAbilities: ["Strength", "Dexterity"],
    savingThrowProficiencies: ["Strength", "Constitution"],
    armorProficiencies: [...],
    weaponProficiencies: [...],
    skillChoices: { choose: 2, from: [...] },
    startingEquipment: [...],
    classFeatures: [{ name: "...", level: 1, description: "..." }],
    spellcasting: null or { ... }
}
```

### **Phase 1C: Wire Up Race/Class Data**
- [ ] Update character overview to use complete race data
- [ ] Display racial traits in tips sidebar or overview
- [ ] Display class features in tips sidebar or overview
- [ ] Add subrace selection (conditional dropdown)

### **Phase 1D: Ability Scores**
- [ ] Add ability score generation method selector
  - Standard Array (15, 14, 13, 12, 10, 8)
  - Point Buy system
  - Manual entry
  - 4d6 drop lowest (roll)
- [ ] Create ability score assignment UI
- [ ] Calculate ability modifiers
- [ ] Apply racial bonuses automatically
- [ ] Show final scores with breakdown ("14 base +1 from Race")

### **Phase 1E: Skills & Proficiencies**
- [ ] Display available skills based on class
- [ ] Limit selection to class maximum
- [ ] Show proficiency bonus
- [ ] Calculate and display skill modifiers

### **Phase 1F: Starting Equipment**
- [ ] Display equipment choices from class
- [ ] Let user select options
- [ ] Populate inventory
- [ ] Display in character overview

---

## 🎯 Phase 2: Character Persistence (Supabase)

**Once Phase 1 is complete:**
- [ ] Set up Supabase client
- [ ] Implement authentication (email/password)
- [ ] Create character save functionality
- [ ] Build character list/dashboard
- [ ] Implement load character
- [ ] Add character sharing (read-only links)

---

## 🎨 Phase 3: Character Visualization

- [ ] Canvas/SVG character avatar generator
- [ ] Procedural generation based on race/class
- [ ] Customization options
- [ ] Export avatar as image

---

## 📜 Phase 4: Character Versioning System

**The "Sentimental History" Feature**
- [ ] "Save Snapshot" button
- [ ] Snapshot note input
- [ ] Version timeline view
- [ ] Historical character sheet view (read-only)
- [ ] Side-by-side comparison
- [ ] Diff highlighting

---

## 🎮 Phase 5: DM Portal

**Future V2 Features**
- [ ] Campaign creation/management
- [ ] Player invite system
- [ ] Party dashboard
- [ ] Real-time character updates
- [ ] Condition/effect tracking
- [ ] Initiative tracker
- [ ] Session notes
- [ ] NPC quick creation

---

## 🐛 Known Issues / Tech Debt

### **Critical**
- [ ] Dice roller has DOM manipulation in logic function (blocking polish)

### **Minor**
- [ ] Next button validation is commented out (intentional?)
- [ ] Natural 20/1 detection only works for single dice currently
- [ ] No error handling for missing race/class data
- [ ] Console logs everywhere (clean up for production)

### **Polish**
- [ ] Add loading states for character overview
- [ ] Add transitions/animations to form sections
- [ ] Improve mobile layout for dice roller
- [ ] Add keyboard shortcuts (Enter to roll, Esc to close modal)

---

## 📝 Notes & Decisions

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

### **3 Core Modes (App Vision)**
1. **Creation Mode** - Character creation with contextual help
2. **Dice Mode** - Integrated dice roller with D&D mechanics
3. **Parties Mode** - DM portal with real-time updates

### **Technical Decisions**
- Vanilla HTML/CSS/JS (learning project)
- Vercel for hosting
- Supabase for backend
- No frameworks until complexity demands it

---

## 🎯 Current Sprint Goal

**Complete Dice Roller Polish + Start Race/Class Data Entry**

**Success Criteria:**
- Dice roller is fully functional with clean architecture
- At least 3 races fully documented in code
- At least 3 classes fully documented in code
- Can create a Human Fighter with all stats displayed

**Time Estimate:** 2-3 sessions

---

## 📚 Resources

- [2014 Player's Handbook (iCloud)](https://www.icloud.com/iclouddrive/038Q_O68o-2ZotnK_zij2LSiA#Player's_Handbook_2014_5e)
- [D&D 5e SRD (Open Game License)](https://dnd.wizards.com/resources/systems-reference-document)
- [PRD.md](./PRD.md) - Full product requirements document

---

**Last Updated:** Session with Claude - Dice Roller Refactoring Discussion  
**Next Session Focus:** Implement dice roller refactor, start race data entry