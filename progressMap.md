# Next steps

- Fix the issue of multiple die being added as total and not shown individually. Each dice's value should be shown above in small text, with the sum total big below.

How to fix?

3 * d20

[15] [9] [12]

     36

---

**Excellent analysis!** You've identified the core issue perfectly. Let me help you architect this properly.

---

## 🎯 The Problem

Currently `rollDice()` does this:
```javascript
for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);  // Stores each roll
    total += roll;      // Sums them
}
// But then only returns the total, losing individual roll data
```

You're **generating** individual rolls but **discarding** them before they're useful.

---

## ✅ Refactored Solution: Return an Object

Instead of returning a single value, return an **object** with all the data:

```javascript
function rollDice(count, sides, dc = 0) {
    const rolls = [];
    let total = 0;

    // Roll each die
    for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        total += roll;
    }

    // Determine success/failure
    let status = 'none'; // 'success', 'fail', or 'none'
    if (dc > 0) {
        status = total >= dc ? 'success' : 'fail';
    }

    // Check for natural 20/1 (only on d20s)
    const hasNatural20 = sides === 20 && rolls.includes(20);
    const hasNatural1 = sides === 20 && rolls.includes(1);

    // Return everything
    return {
        rolls: rolls,           // [18, 3, 12]
        total: total,           // 33
        dc: dc,                 // 15
        status: status,         // 'success'
        diceType: `d${sides}`,  // 'd20'
        count: count,           // 3
        hasNatural20: hasNatural20,
        hasNatural1: hasNatural1
    };
}
```

---

## 📊 Formatting Function

Create a separate function to format the output:

```javascript
function formatRollOutput(rollResult) {
    const { rolls, total, dc, status, diceType, count, hasNatural20, hasNatural1 } = rollResult;
    
    let output = '';
    
    // Show individual rolls if more than 1 die
    if (count > 1) {
        const rollsDisplay = rolls.map(r => {
            if (r === 20 && diceType === 'd20') return `<strong style="color: blue;">[${r}]</strong>`; // Natural 20
            if (r === 1 && diceType === 'd20') return `<strong style="color: red;">[${r}]</strong>`;   // Natural 1
            return `[${r}]`;
        }).join(' + ');
        
        output += `<div style="font-size: 18px; margin-bottom: 10px;">Rolled: ${rollsDisplay}</div>`;
    }
    
    // Show total
    output += `<div style="font-size: 32px; font-weight: bold;">Total: ${total}</div>`;
    
    // Show DC result if applicable
    if (dc > 0) {
        const resultText = status === 'success' 
            ? `✓ Success! (needed ${dc}+)` 
            : `✗ Failed (needed ${dc}+)`;
        const resultColor = status === 'success' ? 'green' : 'red';
        
        output += `<div style="color: ${resultColor}; font-size: 18px; margin-top: 10px;">${resultText}</div>`;
    }
    
    // Special messages for natural 20/1
    if (hasNatural20) {
        output += `<div style="color: blue; font-size: 16px; margin-top: 10px;">🎲 Natural 20!</div>`;
    }
    if (hasNatural1) {
        output += `<div style="color: red; font-size: 16px; margin-top: 10px;">💀 Natural 1!</div>`;
    }
    
    return output;
}
```

---

## 🔧 Update Your Event Listener

Replace lines 358-374 with this:

```javascript
testRollButton.addEventListener('click', () => {
    console.log('Test roll dice button pressed');

    if (testDiceType.value === 'Select a dice') {
        testResultOutput.style.fontSize = '14px';
        testResultOutput.style.marginTop = '25px';
        testResultOutput.innerHTML = 'Please select a dice type to roll.';
        testResultOutput.style.color = 'black';
        return;
    }

    // Roll the dice
    const result = rollDice(
        parseInt(testDiceCount.value),
        parseInt(testDiceType.value),
        parseInt(testDifficulty.value)
    );

    // Format and display
    testResultOutput.innerHTML = formatRollOutput(result);
    testResultOutput.style.fontSize = '';  // Reset to default
    testResultOutput.style.marginTop = '20px';
    testResultOutput.style.color = '';     // Reset, formatting function handles colors

    console.log('Test roll completed:', result);
});
```

---

## 🎨 Example Output

### **Rolling 3d20 with DC 15:**

**If rolls are [18, 3, 12]:**
```
Rolled: [18] + [3] + [12]
Total: 33
✓ Success! (needed 15+)
```

**If rolls are [20, 5, 8]:**
```
Rolled: [20] + [5] + [8]
Total: 33
✓ Success! (needed 15+)
🎲 Natural 20!
```

**If rolls are [1, 2, 3]:**
```
Rolled: [1] + [2] + [3]
Total: 6
✗ Failed (needed 15+)
💀 Natural 1!
```

---

## 💡 Benefits of This Approach

1. **Separation of concerns:** Rolling logic separate from display logic
2. **Reusable:** Other parts of your app can use `rollDice()` without needing display code
3. **Testable:** Easy to unit test the roll function
4. **Extensible:** Easy to add features like advantage/disadvantage later
5. **Individual roll visibility:** Players see each die result, not just total

---

## 🚀 Future Enhancement: Advantage/Disadvantage

Later, you can add:

```javascript
function rollDice(count, sides, dc = 0, advantage = false, disadvantage = false) {
    // ... existing code ...
    
    if (advantage || disadvantage) {
        // Roll again
        const secondRolls = [];
        let secondTotal = 0;
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            secondRolls.push(roll);
            secondTotal += roll;
        }
        
        // Choose better/worse roll
        if (advantage && secondTotal > total) {
            return { /* use secondRolls */ };
        }
        if (disadvantage && secondTotal < total) {
            return { /* use secondRolls */ };
        }
    }
    
    // ... rest of function ...
}
```

---

**Ready to implement this? Try it out and let me know if you hit any snags!** 🎲