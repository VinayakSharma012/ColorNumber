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
    
    // Debug log (remove in production if desired)
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
function numberToHex(colorNumber) {
    // Placeholder - will be implemented in Phase 6
    return `#${colorNumber}`;
}

/**
 * Convert hex color to RGB format
 * Example: #FF5733 → rgb(255, 87, 51)
 * 
 * @param {string} hex - Hex color code
 * @returns {string} - RGB format
 */
function hexToRgb(hex) {
    // Placeholder - will be implemented in Phase 6
    return `rgb(0, 0, 0)`;
}

/* =============================================
   EVENT LISTENERS SECTION
   Button and interaction handlers
   (To be implemented in Phase 6)
   ============================================= */

/**
 * Reset button click handler
 * Resets the color generator to default state
 */
function handleResetClick() {
    // Placeholder - will be implemented in Phase 6
    console.log('Reset button clicked');
}

/**
 * Random button click handler
 * Generates a random 6-digit color
 */
function handleRandomClick() {
    // Placeholder - will be implemented in Phase 6
    console.log('Random button clicked');
}

/**
 * Copy button click handler
 * Copies the current color code to clipboard
 */
function handleCopyClick() {
    // Placeholder - will be implemented in Phase 6
    console.log('Copy button clicked');
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
