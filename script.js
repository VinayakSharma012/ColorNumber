// When page loads, setup everything
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Setup all event listeners and initial state
function initializeApp() {
    const colorInput = document.getElementById('colorInput');
    const resetBtn = document.getElementById('resetBtn');
    const randomBtn = document.getElementById('randomBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    
    // Input field listeners - validate as user types
    if (colorInput) {
        colorInput.addEventListener('input', handleInputChange);
        colorInput.addEventListener('paste', handlePasteEvent);
        colorInput.addEventListener('keydown', handleKeyDown);
    }
    
    // Button listeners
    if (resetBtn) resetBtn.addEventListener('click', resetPage);
    if (randomBtn) randomBtn.addEventListener('click', generateRandomColor);
    if (copyBtn) copyBtn.addEventListener('click', copyColorCode);
    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearColorHistory);
    
    // Scroll listener for input animation
    window.addEventListener('scroll', handleScroll);
    
    // Bonus features setup
    displayColorHistory();
    setupHexClickToCopy();
    
    // Show default color on load
    initializeDisplay();
}

// Check if input is valid (6 digits only)
function validateInput(inputValue) {
    // Empty = no error message yet
    if (inputValue === "") {
        return { isValid: false, error: "" };
    }

    // Too short
    if (inputValue.length < 6) {
        return { 
            isValid: false, 
            error: `Need ${6 - inputValue.length} more digits` 
        };
    }

    // Too long
    if (inputValue.length > 6) {
        return { isValid: false, error: "Only 6 digits allowed" };
    }

    // Check if all are numbers
    if (!/^[0-9]{6}$/.test(inputValue)) {
        return { isValid: false, error: "Only numbers (0-9)" };
    }

    // All good!
    return { isValid: true, error: "" };
}

// Show or hide error message
function displayError(errorMessage) {
    const errorElement = document.getElementById('errorMessage');
    if (!errorElement) return;

    if (errorMessage === "") {
        errorElement.classList.add('hidden');
        errorElement.textContent = "";
    } else {
        errorElement.classList.remove('hidden');
        errorElement.textContent = errorMessage;
    }
}

// Style input - red for invalid, green for valid
function updateInputStyle(isValid) {
    const colorInput = document.getElementById('colorInput');
    if (!colorInput) return;

    if (isValid) {
        colorInput.classList.remove('invalid');
        colorInput.classList.add('valid');
    } else {
        colorInput.classList.remove('valid');
        colorInput.classList.add('invalid');
    }
}

// When user types or pastes - validate and update
function handleInputChange(event) {
    const inputValue = event.target.value;
    const { isValid, error } = validateInput(inputValue);
    
    displayError(error);
    updateInputStyle(isValid);
    
    // If valid, update color
    if (isValid) {
        onValidInput(inputValue);
    }
}

// Clean up pasted content (remove letters/symbols, keep only 6 digits)
function handlePasteEvent(event) {
    event.preventDefault();
    
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
    const cleanedText = pastedText.replace(/\D/g, '').substring(0, 6);
    
    const colorInput = document.getElementById('colorInput');
    colorInput.value = cleanedText;
    
    // Validate the cleaned text
    const { isValid, error } = validateInput(cleanedText);
    displayError(error);
    updateInputStyle(isValid);
    
    if (isValid) {
        onValidInput(cleanedText);
    }
}

// Prevent typing more than 6 digits
function handleKeyDown(event) {
    const colorInput = document.getElementById('colorInput');
    const currentValue = colorInput.value;
    
    // Allow special keys
    const allowedKeys = [
        'Backspace', 'Delete', 'Tab', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End', 'Escape'
    ];
    
    const isSpecialKey = allowedKeys.includes(event.key);
    const isCtrlKey = event.ctrlKey || event.metaKey;
    
    // Block if already 6 digits and trying to type more
    if (currentValue.length >= 6 && !isSpecialKey && !isCtrlKey) {
        event.preventDefault();
    }
}

// Convert number to hex (e.g., 123456 → #123456)
function convertNumberToHex(colorNumber) {
    if (!colorNumber || colorNumber.length !== 6) {
        return '#000000';
    }
    return `#${colorNumber.toUpperCase()}`;
}

// Check if color is light or dark to pick text color
function getContrastColor(hexColor) {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // If bright, use dark text; if dark, use light text
    return brightness > 128 ? 'dark' : 'light';
}

// Apply background color to page
function applyBackgroundColor(hexColor) {
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) return;
    
    pageContainer.style.backgroundColor = hexColor;
    
    // Adjust text color for readability
    const textColor = getContrastColor(hexColor);
    const displays = document.querySelectorAll('.color-display, .hex-display, .rgb-display');
    
    displays.forEach(element => {
        element.style.color = textColor === 'light' ? '#ffffff' : '#2c3e50';
    });
    
    // Adjust footer color too
    const footer = document.querySelector('.page-footer');
    if (footer) {
        footer.style.color = textColor === 'light' ? '#ffffff' : '#2c3e50';
    }
}

// Update all display text (number, hex, RGB)
function updateDisplayText(colorNumber, hexColor) {
    const colorDisplay = document.getElementById('colorDisplay');
    const hexDisplay = document.getElementById('hexDisplay');
    const rgbDisplay = document.getElementById('rgbDisplay');
    
    if (colorDisplay) colorDisplay.textContent = colorNumber.toUpperCase();
    if (hexDisplay) hexDisplay.textContent = hexColor;
    
    // Calculate RGB from hex
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    if (rgbDisplay) rgbDisplay.textContent = `rgb(${r}, ${g}, ${b})`;
    
    // Update footer
    const currentColorSpan = document.getElementById('currentColor');
    if (currentColorSpan) currentColorSpan.textContent = `Color: ${hexColor}`;
    
    // Bonus features - update all displays
    updateColorName(r, g, b);
    updateBrightness(r, g, b);
    updateColorSwatch(hexColor);
    addToColorHistory(hexColor);
}

// Show default color on page load
function initializeDisplay() {
    updateDisplayText('000000', '#000000');
    applyBackgroundColor('#000000');
}

// Main function - when user enters valid color
function onValidInput(inputValue) {
    const hexColor = convertNumberToHex(inputValue);
    
    applyBackgroundColor(hexColor);
    updateDisplayText(inputValue, hexColor);
    
    // Store for later use (copy button, etc)
    window.lastValidColor = {
        number: inputValue,
        hex: hexColor,
        timestamp: new Date()
    };
}

// Move input to top-left when scrolling down
function handleScroll() {
    const inputSection = document.querySelector('.input-section');
    if (!inputSection) return;
    
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    if (scrollPosition > 200) {
        inputSection.classList.add('scrolled');
    } else {
        inputSection.classList.remove('scrolled');
    }
}

// Reset everything to default
function resetPage() {
    const colorInput = document.getElementById('colorInput');
    
    if (colorInput) colorInput.value = '';
    
    displayError('');
    updateInputStyle(false);
    initializeDisplay();
    
    window.lastValidColor = null;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (colorInput) colorInput.focus();
}

// Generate random 6-digit color
function generateRandomColor() {
    const randomNumber = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');
    
    const colorInput = document.getElementById('colorInput');
    if (colorInput) colorInput.value = randomNumber;
    
    const { isValid, error } = validateInput(randomNumber);
    displayError(error);
    updateInputStyle(isValid);
    
    if (isValid) {
        onValidInput(randomNumber);
    }
}

// Copy hex code to clipboard
function copyColorCode() {
    if (!window.lastValidColor) {
        alert('Please enter a valid color first');
        return;
    }
    
    const hexColor = window.lastValidColor.hex;
    
    navigator.clipboard.writeText(hexColor).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy');
    });
}

// Get color name based on hex value
function getColorName(hexValue) {
    const colorNames = {
        '000000': 'Black',
        'FFFFFF': 'White',
        'FF0000': 'Red',
        '00FF00': 'Lime',
        '0000FF': 'Blue',
        'FFFF00': 'Yellow',
        'FF00FF': 'Magenta',
        '00FFFF': 'Cyan',
        'FF6600': 'Orange',
        'FF00AA': 'Pink',
        '800080': 'Purple',
        '008000': 'Green',
        'FFC0CB': 'Light Pink',
        'A9A9A9': 'Gray',
        '808080': 'Dark Gray',
        'C0C0C0': 'Silver'
    };
    
    const normalized = hexValue.toUpperCase().replace('#', '');
    return colorNames[normalized] || 'Custom Color';
}

// Calculate brightness percentage (0-100)
function calculateBrightness(r, g, b) {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return Math.round((brightness / 255) * 100);
}

// Update color name display
function updateColorName(r, g, b) {
    const colorNameDisplay = document.getElementById('colorNameDisplay');
    const colorName = getColorName(`${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
    if (colorNameDisplay) {
        colorNameDisplay.textContent = colorName;
    }
}

// Update brightness display
function updateBrightness(r, g, b) {
    const brightness = calculateBrightness(r, g, b);
    const brightnessPercent = document.getElementById('brightnessPercent');
    const brightnessBar = document.getElementById('brightnessBar');
    
    if (brightnessPercent) brightnessPercent.textContent = brightness + '%';
    
    if (brightnessBar) {
        brightnessBar.style.setProperty('--brightness-position', (brightness / 100) * 100 + '%');
        const pseudo = brightnessBar.querySelector('::after');
        if (pseudo) pseudo.style.left = (brightness / 100) * 100 + '%';
        
        // Update bar position manually
        brightnessBar.style.background = `linear-gradient(to right, #000000 0%, #ffffff 100%)`;
        brightnessBar.setAttribute('data-brightness', brightness);
    }
}

// Update color swatch preview
function updateColorSwatch(hexValue) {
    const colorSwatch = document.getElementById('colorSwatch');
    if (colorSwatch) {
        colorSwatch.style.backgroundColor = hexValue;
    }
}

// Add color to history
function addToColorHistory(hexValue) {
    let history = JSON.parse(localStorage.getItem('colorHistory')) || [];
    
    // Remove if already exists (avoid duplicates)
    history = history.filter(color => color !== hexValue);
    
    // Add to beginning
    history.unshift(hexValue);
    
    // Keep only last 5
    if (history.length > 5) {
        history = history.slice(0, 5);
    }
    
    // Save to localStorage
    localStorage.setItem('colorHistory', JSON.stringify(history));
    
    // Display history
    displayColorHistory();
}

// Display color history
function displayColorHistory() {
    const historyContainer = document.getElementById('colorHistory');
    const clearBtn = document.getElementById('clearHistoryBtn');
    
    if (!historyContainer) return;
    
    let history = JSON.parse(localStorage.getItem('colorHistory')) || [];
    
    historyContainer.innerHTML = '';
    
    // Fill remaining slots with empty items
    for (let i = 0; i < 5; i++) {
        const item = document.createElement('div');
        item.className = history[i] ? 'history-item' : 'history-item empty';
        
        if (history[i]) {
            const hexColor = history[i];
            item.style.backgroundColor = hexColor;
            item.textContent = hexColor;
            
            // Click to use this color
            item.addEventListener('click', () => {
                const colorInput = document.getElementById('colorInput');
                if (colorInput) {
                    colorInput.value = hexColor.replace('#', '');
                    handleInputChange();
                }
            });
        } else {
            item.textContent = '-';
        }
        
        historyContainer.appendChild(item);
    }
    
    // Show/hide clear button
    if (clearBtn && history.length > 0) {
        clearBtn.style.display = 'block';
    }
}

// Clear color history
function clearColorHistory() {
    if (confirm('Clear all color history?')) {
        localStorage.removeItem('colorHistory');
        displayColorHistory();
        document.getElementById('clearHistoryBtn').style.display = 'none';
    }
}

// Make hex display clickable to copy
function setupHexClickToCopy() {
    const hexDisplay = document.getElementById('hexDisplay');
    if (hexDisplay) {
        hexDisplay.addEventListener('click', copyColorCode);
        hexDisplay.title = 'Click to copy';
    }
}
