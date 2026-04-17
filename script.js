/* =============================================
   Background Color Generator
   Main JavaScript File
   ============================================= */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Application initialized');
    initializeApp();
});

/* =============================================
   APPLICATION INITIALIZATION
   ============================================= */

/**
 * Initialize the application
 * Sets up event listeners and initial state
 */
function initializeApp() {
    const colorInput = document.getElementById('colorInput');
    
    // Set up input validation listeners
    if (colorInput) {
        // Real-time validation as user types
        colorInput.addEventListener('input', handleInputChange);
        
        // Handle paste events
        colorInput.addEventListener('paste', handlePasteEvent);
        
        // Optional: prevent typing beyond 6 digits
        colorInput.addEventListener('keydown', handleKeyDown);
    }
    
    // Set up scroll listener for input animation
    window.addEventListener('scroll', handleScroll);
    
    // Set up reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetPage);
    }
    
    // Set up random color button
    const randomBtn = document.getElementById('randomBtn');
    if (randomBtn) {
        randomBtn.addEventListener('click', generateRandomColor);
    }
    
    // Set up copy button
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyColorCode);
    }
    
    // Initialize display with default values
    initializeDisplay();
}

/* =============================================
   INPUT VALIDATION SECTION
   Validation logic and error handling
   ============================================= */

/**
 * Validates the input value
 * Checks: length (exactly 6), only digits (0-9)
 * 
 * @param {string} inputValue - The value to validate
 * @returns {object} - { isValid: boolean, error: string }
 * 
 * Examples:
 * validateInput("123456") → { isValid: true, error: "" }
 * validateInput("12345") → { isValid: false, error: "Please enter 6 digits (current: 5/6)" }
 * validateInput("12345A") → { isValid: false, error: "Only digits 0-9 are allowed" }
 */
function validateInput(inputValue) {
    // If empty, don't show error (user is still typing)
    if (inputValue === "") {
        return {
            isValid: false,
            error: ""
        };
    }

    // Check if length is less than 6
    if (inputValue.length < 6) {
        return {
            isValid: false,
            error: `Please enter 6 digits (current: ${inputValue.length}/6)`
        };
    }

    // Check if length is more than 6
    if (inputValue.length > 6) {
        return {
            isValid: false,
            error: "Too many digits! Maximum is 6"
        };
    }

    // Check if all characters are digits (0-9)
    // Regular expression: ^[0-9]{6}$ means "exactly 6 digits"
    if (!/^[0-9]{6}$/.test(inputValue)) {
        return {
            isValid: false,
            error: "Only digits 0-9 are allowed"
        };
    }

    // All validation passed
    return {
        isValid: true,
        error: ""
    };
}

/**
 * Displays or hides error messages and updates input styling
 * 
 * @param {string} errorMessage - The error message to display
 */
function displayError(errorMessage) {
    const errorElement = document.getElementById('errorMessage');
    
    if (!errorElement) {
        console.error('Error message element not found');
        return;
    }

    if (errorMessage === "") {
        // Hide error message
        errorElement.classList.add('hidden');
        errorElement.textContent = "";
    } else {
        // Show error message
        errorElement.classList.remove('hidden');
        errorElement.textContent = errorMessage;
    }
}

/**
 * Updates input field styling based on validation state
 * Adds/removes error class for visual feedback
 * 
 * @param {boolean} isValid - Whether input is valid
 */
function updateInputStyle(isValid) {
    const colorInput = document.getElementById('colorInput');
    
    if (!colorInput) {
        console.error('Input element not found');
        return;
    }

    if (isValid) {
        // Remove error class - show valid state
        colorInput.classList.remove('invalid');
        colorInput.classList.add('valid');
    } else {
        // Add error class - show invalid state
        colorInput.classList.remove('valid');
        colorInput.classList.add('invalid');
    }
}

/* =============================================
   EVENT HANDLERS
   ============================================= */

/**
 * Handle input change event (user typing or pasting)
 * Validates input in real-time
 * 
 * This function is called on 'input' event which fires:
 * - When user types a character
 * - When user pastes text
 * - When user deletes a character
 */
function handleInputChange(event) {
    const inputValue = event.target.value;
    
    // Validate the input
    const { isValid, error } = validateInput(inputValue);
    
    // Update error message display
    displayError(error);
    
    // Update input field styling
    updateInputStyle(isValid);
    
    // If valid, update the color display
    if (isValid) {
        onValidInput(inputValue);
    }
    
    // Debug log
    console.log(`Input: "${inputValue}" | Valid: ${isValid} | Error: "${error}"`);
}

/**
 * Handle paste event
 * Validates and cleans up pasted content
 * 
 * @param {event} event - The paste event
 */
function handlePasteEvent(event) {
    // Prevent default paste behavior
    event.preventDefault();
    
    // Get pasted text from clipboard
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
    
    // Clean up pasted text: remove spaces, only keep digits
    const cleanedText = pastedText.replace(/\D/g, ''); // \D matches non-digits
    
    // Trim to 6 digits maximum
    const trimmedText = cleanedText.substring(0, 6);
    
    // Set the input value to cleaned/trimmed text
    const colorInput = document.getElementById('colorInput');
    colorInput.value = trimmedText;
    
    // Trigger validation
    const { isValid, error } = validateInput(trimmedText);
    displayError(error);
    updateInputStyle(isValid);
    
    // Debug log
    console.log(`Pasted: "${pastedText}" | Cleaned: "${trimmedText}" | Valid: ${isValid}`);
}

/**
 * Handle keydown event
 * Prevents typing beyond 6 digits
 * 
 * @param {event} event - The keydown event
 */
function handleKeyDown(event) {
    const colorInput = document.getElementById('colorInput');
    const currentValue = colorInput.value;
    
    // If already at 6 digits, prevent typing more (but allow special keys)
    // Special keys: Backspace, Delete, Tab, Enter, Arrow keys, etc.
    const isSpecialKey = [
        'Backspace', 'Delete', 'Tab', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End', 'Escape'
    ].includes(event.key);
    
    const isCtrlKey = event.ctrlKey || event.metaKey; // Ctrl+A, Ctrl+C, Ctrl+V, etc.
    
    // If at max length and trying to type a character, prevent it
    if (currentValue.length >= 6 && !isSpecialKey && !isCtrlKey) {
        event.preventDefault();
        console.log('Max digits reached, typing prevented');
    }
}

/* =============================================
   COLOR CONVERSION SECTION
   (To be implemented in Phase 6)
   ============================================= */

/**
 * Convert 6-digit number to hex color code
 * Example: 123456 → #123456
 * 
 * @param {string} colorNumber - 6-digit number
 * @returns {string} - Hex color code (#XXXXXX)
 */
function convertNumberToHex(colorNumber) {
    if (!colorNumber || colorNumber.length !== 6) {
        return '#000000'; // Default to black if invalid
    }
    return `#${colorNumber.toUpperCase()}`;
}

/**
 * Calculate the brightness of a color to determine text color contrast
 * Uses relative luminance formula
 * 
 * @param {string} hexColor - Hex color code (e.g., "#123456")
 * @returns {string} - "light" or "dark"
 */
function getContrastColor(hexColor) {
    // Remove the # if present
    const hex = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness using standard luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // If color is bright, use dark text; if dark, use light text
    return brightness > 128 ? 'dark' : 'light';
}

/**
 * Apply background color to page container
 * Updates the page background with smooth transition
 * Also adjusts text color for readability
 * 
 * @param {string} hexColor - Hex color code (e.g., "#123456")
 */
function applyBackgroundColor(hexColor) {
    const pageContainer = document.querySelector('.page-container');
    
    if (!pageContainer) {
        console.error('Page container not found');
        return;
    }
    
    // Apply the color to background
    pageContainer.style.backgroundColor = hexColor;
    
    // Determine text color contrast
    const textColor = getContrastColor(hexColor);
    
    // Update display elements text color for readability
    const displays = document.querySelectorAll('.color-display, .hex-display, .rgb-display');
    displays.forEach(element => {
        if (textColor === 'light') {
            element.style.color = '#ffffff';
        } else {
            element.style.color = '#2c3e50'; // Dark color
        }
    });
    
    // Update footer text color
    const footer = document.querySelector('.page-footer');
    if (footer) {
        if (textColor === 'light') {
            footer.style.color = '#ffffff';
        } else {
            footer.style.color = '#2c3e50';
        }
    }
}

/**
 * Update the display text showing the current color
 * Updates both the number display and hex code display
 * 
 * @param {string} colorNumber - 6-digit number (e.g., "123456")
 * @param {string} hexColor - Hex color code (e.g., "#123456")
 */
function updateDisplayText(colorNumber, hexColor) {
    // Update color number display
    const colorDisplay = document.getElementById('colorDisplay');
    if (colorDisplay) {
        colorDisplay.textContent = colorNumber.toUpperCase();
    }
    
    // Update hex code display
    const hexDisplay = document.getElementById('hexDisplay');
    if (hexDisplay) {
        hexDisplay.textContent = hexColor;
    }
    
    // Calculate and display RGB value
    const hexStr = hexColor.replace('#', '');
    const r = parseInt(hexStr.substring(0, 2), 16);
    const g = parseInt(hexStr.substring(2, 4), 16);
    const b = parseInt(hexStr.substring(4, 6), 16);
    
    const rgbDisplay = document.getElementById('rgbDisplay');
    if (rgbDisplay) {
        rgbDisplay.textContent = `rgb(${r}, ${g}, ${b})`;
    }
    
    // Update footer with current color
    const currentColorSpan = document.getElementById('currentColor');
    if (currentColorSpan) {
        currentColorSpan.textContent = `Color: ${hexColor}`;
    }
}

/**
 * Initialize display with default values
 * Called on page load
 */
function initializeDisplay() {
    const defaultColor = '#000000';
    updateDisplayText('000000', defaultColor);
    applyBackgroundColor(defaultColor);
}

/**
 * Coordinate all actions when valid input is provided
 * This is the main function that ties everything together
 * 
 * @param {string} inputValue - The validated 6-digit color number
 */
function onValidInput(inputValue) {
    // Convert number to hex format
    const hexColor = convertNumberToHex(inputValue);
    
    // Apply color to page background
    applyBackgroundColor(hexColor);
    
    // Update all display text
    updateDisplayText(inputValue, hexColor);
    
    // Store as last valid input (for potential future use)
    window.lastValidColor = {
        number: inputValue,
        hex: hexColor,
        timestamp: new Date()
    };
    
    console.log(`Color applied: ${hexColor}`);
}

/* =============================================
   EVENT LISTENERS SECTION
   Button and interaction handlers
   (To be implemented in Phase 6)
   ============================================= */

/**
 * Handle scroll event
 * Moves input field to top-left when scrolling down
 * CSS class handles the animation
 */
function handleScroll() {
    const inputSection = document.querySelector('.input-section');
    
    if (!inputSection) return;
    
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    // Add scrolled class when user scrolls down 200px
    if (scrollPosition > 200) {
        inputSection.classList.add('scrolled');
    } else {
        inputSection.classList.remove('scrolled');
    }
}

/**
 * Reset button click handler
 * Resets the color generator to default state
 */
function resetPage() {
    const colorInput = document.getElementById('colorInput');
    
    // Clear input field
    if (colorInput) {
        colorInput.value = '';
    }
    
    // Clear error message
    displayError('');
    
    // Reset input styling
    updateInputStyle(false);
    
    // Reset display to default
    initializeDisplay();
    
    // Clear last valid color
    window.lastValidColor = null;
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus on input for next entry
    if (colorInput) {
        colorInput.focus();
    }
    
    console.log('Page reset to default state');
}

/**
 * Generate a random 6-digit color
 */
function generateRandomColor() {
    // Generate 6 random digits
    const randomNumber = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');
    
    // Set the input value
    const colorInput = document.getElementById('colorInput');
    if (colorInput) {
        colorInput.value = randomNumber;
    }
    
    // Trigger validation and color update
    const { isValid, error } = validateInput(randomNumber);
    displayError(error);
    updateInputStyle(isValid);
    
    if (isValid) {
        onValidInput(randomNumber);
    }
    
    console.log(`Random color generated: ${randomNumber}`);
}

/**
 * Copy color code to clipboard
 */
function copyColorCode() {
    if (!window.lastValidColor) {
        alert('Please enter a valid color first');
        return;
    }
    
    const hexColor = window.lastValidColor.hex;
    
    // Copy to clipboard
    navigator.clipboard.writeText(hexColor).then(() => {
        // Show feedback
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
        
        console.log(`Copied to clipboard: ${hexColor}`);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */

/**
 * Debug/log function for development
 * @param {string} message - Message to log
 */
function debugLog(message) {
    console.log(`[ColorGenerator] ${message}`);
}
