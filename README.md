# 🎨 Background Color Generator

An interactive web application that changes the background color based on 6-digit number input. Built with pure HTML5, CSS3, and vanilla JavaScript as an internship assignment.

**Live Demo:** https://vinayaksharma012.github.io/ColorNumber/

---

## ✨ Features

### Core Functionality
- ✅ **Real-time Input Validation** - Validates 6-digit numbers as user types
- ✅ **Dynamic Background Color** - Changes background color instantly from input
- ✅ **Color Display** - Shows entered number, hex code, and RGB values
- ✅ **Error Messaging** - Clear, user-friendly error messages for invalid input
- ✅ **Smooth Transitions** - 0.5s smooth color fade-in effect

### Interactive Features
- ✅ **Reset Button** - Clears input and returns to default (black) background
- ✅ **Random Color Generator** - Generate random colors with one click
- ✅ **Copy to Clipboard** - Copy hex color code with feedback
- ✅ **Scroll Animation** - Input field moves to top-left when scrolling down

### Design & UX
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **CSS Grid Layout** - Modern, centered layout using CSS Grid
- ✅ **Entry Animations** - Smooth cascade animations on page load
- ✅ **Hover Effects** - Interactive button and input field animations
- ✅ **Text Contrast** - Automatic text color adjustment for readability on any background

### Accessibility
- ✅ **Semantic HTML** - Proper use of HTML5 semantic elements
- ✅ **ARIA Labels** - Accessibility attributes for screen readers
- ✅ **Keyboard Navigation** - Full keyboard support for all features
- ✅ **Focus States** - Clear visual focus indicators
- ✅ **Color Contrast** - WCAG compliant contrast ratios

---

## �️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Responsive design, Grid layout, animations, transitions |
| **Vanilla JavaScript** | Input validation, color conversion, DOM manipulation |
| **No Frameworks** | Pure, lightweight implementation |

---

## 📦 Installation

### Option 1: Direct File Opening (Easiest)
```bash
# Navigate to project folder
cd ColorNumber

# Open in your default browser (macOS)
open index.html

# Or on Windows
start index.html

# Or on Linux
xdg-open index.html
```

### Option 2: Clone from GitHub
```bash
# Clone the repository
git clone https://github.com/VinayakSharma012/ColorNumber.git

# Navigate to folder
cd ColorNumber

# Open index.html in your browser
```

### Option 3: Using a Local Server
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 🎮 Usage

### Basic Usage
1. **Open** `index.html` in your web browser
2. **Enter** a 6-digit number (0-9 only) in the input field
3. **Watch** the background color change smoothly
4. **View** the color in multiple formats:
   - 6-digit number (e.g., 123456)
   - Hex code (e.g., #123456)
   - RGB values (e.g., rgb(18, 52, 86))

### Examples of Valid Colors
| Number | Result | Color |
|--------|--------|-------|
| 000000 | #000000 | Black |
| FFFFFF | #FFFFFF | White |
| FF0000 | #FF0000 | Red |
| 00FF00 | #00FF00 | Green |
| 0000FF | #0000FF | Blue |
| FFFF00 | #FFFF00 | Yellow |
| FF00FF | #FF00FF | Magenta |
| 3498DB | #3498DB | Light Blue |

### Buttons
- **Reset Color** - Clear input and return to default (black) background
- **Random Color** - Generate a random 6-digit color instantly
- **Copy Code** - Copy the hex color code to clipboard (feedback shows "Copied!")

### Keyboard Shortcuts
- **Tab** - Navigate through input and buttons
- **Enter** - (Can type normally, no special Enter behavior)
- **Backspace** - Delete characters from input
- **Paste** - Automatically cleans and validates pasted content

---

## 💻 Browser Support

| Browser | Support | Status |
|---------|---------|--------|
| Chrome/Chromium | ✅ Latest | Fully Tested |
| Firefox | ✅ Latest | Fully Tested |
| Safari | ✅ Latest | Fully Tested |
| Edge | ✅ Latest | Fully Tested |
| Mobile Chrome | ✅ Latest | Fully Tested |
| Mobile Safari (iOS) | ✅ Latest | Fully Tested |

**Note:** Uses modern CSS Grid, CSS Variables, and ES6 JavaScript. Requires modern browser (IE not supported).

---

## 📱 Responsive Design

### Breakpoints
- **Mobile** (320px - 480px)
  - Single column layout
  - Large touch-friendly buttons
  - Readable text sizes

- **Tablet** (481px - 768px)
  - 2 buttons per row (Random, Copy)
  - Reset button full width below
  - Optimized spacing

- **Desktop** (769px - 1024px+)
  - 3 buttons in row
  - Maximum width container
  - Spacious layout

### Features
- ✅ No horizontal scrolling
- ✅ Touch-friendly input fields
- ✅ Responsive font sizing
- ✅ Flexible grid layout
- ✅ Mobile-first CSS approach

---

## 🎁 Bonus Features Implemented

### Animation Features
- 🎬 **Entry Animations** - Cascade fade-in effects on page load
- 🎬 **Smooth Color Fade** - 0.5s background color transition
- 🎬 **Scroll Animation** - Input field moves to top-left when scrolling
- 🎬 **Hover Effects** - Buttons lift up with shadow on hover
- 🎬 **Active States** - Press-down animation on button click
- 🎬 **Error Animation** - Subtle shake animation on invalid input

### Interactive Features
- 🎯 **Random Color Generator** - One-click random color generation
- 🎯 **Copy to Clipboard** - Copy hex code with visual feedback
- 🎯 **Paste Support** - Auto-cleans pasted content (removes non-digits)
- 🎯 **Automatic Text Contrast** - Text color adjusts for readability

### Code Quality
- 📝 **Comprehensive Comments** - Every function documented
- 📝 **Clean Code** - Well-organized sections and functions
- 📝 **No Console Errors** - Production-ready code
- 📝 **Error Handling** - Graceful handling of edge cases

---

## 📁 Repository Structure

```
ColorNumber/
├── index.html          # Main HTML file (semantic structure)
├── styles.css          # All CSS (Grid, animations, responsive)
├── script.js           # All JavaScript (validation, color conversion)
├── README.md           # This file
└── .git/               # Git version control
```

### File Details

**index.html** (188 lines)
- Semantic HTML5 structure
- Proper meta tags for responsiveness
- ARIA labels for accessibility
- Well-organized sections

**styles.css** (1,279 lines)
- CSS variables for colors and spacing
- CSS Grid layout (3-row template)
- Mobile-first responsive design
- 6 @keyframe animations
- Hover/focus/active states
- Accessibility features

**script.js** (546 lines)
- Input validation with error messaging
- Color conversion functions
- DOM manipulation and updates
- Scroll animation handler
- Button click handlers
- Comprehensive JSDoc comments

---

## 🧪 Testing & Quality Assurance

### Functionality Testing
✅ Input validation (6 digits, numbers only)  
✅ Error messages (too short, too long, non-numeric)  
✅ Valid input triggers color change  
✅ Display updates (number, hex, RGB)  
✅ Reset button clears everything  
✅ Random color generator works  
✅ Copy to clipboard works  
✅ Edge cases (#000000, #FFFFFF, etc.)  

### Browser Compatibility
✅ Chrome/Edge (Chromium)  
✅ Firefox  
✅ Safari (macOS and iOS)  
✅ Mobile browsers  

### Responsive Testing
✅ iPhone (375px)  
✅ iPad (768px)  
✅ Desktop (1024px+)  
✅ No horizontal scroll  
✅ Touch-friendly on mobile  

### Performance
✅ Smooth animations (60fps)  
✅ No lag when typing  
✅ Instant color updates  
✅ No console errors  
✅ Optimized with will-change  

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- **HTML5 Semantics** - Proper use of semantic elements and ARIA attributes
- **CSS3 Features** - Grid, Flexbox, animations, transitions, variables
- **Vanilla JavaScript** - DOM manipulation, event handling, validation, color conversion
- **Responsive Design** - Mobile-first approach with media queries
- **Accessibility** - WCAG compliance and inclusive design
- **Git & Version Control** - Meaningful commits and collaboration
- **Code Organization** - Clean, well-commented, production-ready code

---

## 📚 How to Use This Repository for Learning

1. **Understand the Structure** - Read through each file to see how features are organized
2. **Study the Validation** - See real-time input validation in action
3. **Analyze the CSS Grid** - Learn modern layout techniques
4. **Review the Animations** - Understand @keyframes and transitions
5. **Examine the JavaScript** - See DOM manipulation and event handling
6. **Test Responsiveness** - Try on different devices using DevTools

---

## 🤝 Contributing

This project was created as an internship assignment. If you'd like to:
- **Report Issues** - Create an issue on GitHub
- **Suggest Features** - Fork and create a pull request
- **Improve Code** - Submit improvements with detailed descriptions

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 🎉 Credits & Notes

**Created:** April 17, 2026  
**Purpose:** Internship Assignment - Web Development Fundamentals  
**Tools:** HTML5, CSS3, Vanilla JavaScript, Git  
**Status:** ✅ Complete and Tested

---

## 🔗 Links

- **GitHub Repository:** https://github.com/VinayakSharma012/ColorNumber
- **Live Demo:** https://vinayaksharma012.github.io/ColorNumber/
- **Creator:** Vinayak Sharma

---

## 📞 Questions or Feedback?

Feel free to:
- 📧 Check the GitHub repository for issues
- 🔍 Review the code and suggest improvements
- 🎨 Experiment with the application
- 📚 Use it as a learning resource

---

**Happy Color Generating! 🎨**
