# Global Theme System - Team Na$H

This document explains the global design system created for the Team Na$H Capstone Project. To ensure a cohesive, unified, and beautiful UI across all 6 applications in our suite (despite being built independently), we have centralized our design tokens and CSS variables into the `global-theme.css` file.

## 🎨 The Aesthetic

The theme features a **Light Glassmorphic** aesthetic, inspired by modern cloud-based tools. 
- **Backgrounds**: Soft, airy linear gradients resembling a light blue sky.
- **Cards & Elements**: Translucent white surfaces (`rgba(255, 255, 255, 0.65)`) with a strong background blur (`backdrop-filter: blur(16px)`).
- **Accents**: A vibrant, energetic cyan blue (`#0ab5f6`) to draw focus to interactive elements.
- **Typography**: Clean, readable sans-serif Google Fonts (`Outfit` for headings and `Inter` for body copy).

## 🚀 How To Apply The Theme

If you are a team member working on a branch project (e.g., Kanban Board, Quiz App, Expense Tracker), follow these steps to integrate the global theme into your app:

### 1. Copy the Theme File
Ensure that `global-theme.css` is present in your project directory. 

### 2. Link it in your HTML
In the `<head>` tag of your `index.html` file, link to the `global-theme.css` file **before** your local styles. The font imports are already included inside the theme file.

```html
<head>
  <meta charset="UTF-8">
  <title>Your App Name</title>
  
  <!-- 1. Link the Global Theme First -->
  <link rel="stylesheet" href="global-theme.css">
  
  <!-- 2. Link your app-specific styles -->
  <link rel="stylesheet" href="style.css">
</head>
```

### 3. Use the CSS Variables in your Stylesheet

Instead of hardcoding colors, use the provided CSS variables for backgrounds, text, and accents.

#### Available Variables:

**Backgrounds & Surfaces**
- `var(--bg-primary)`: The main sky-blue background gradient.
- `var(--bg-card)`: Solid white card background (if you prefer solid over glassmorphism).
- `var(--bg-input)`: Soft background color for input fields.

**Accents**
- `var(--accent)`: Primary cyan color (`#0ab5f6`) for buttons, links, and highlights.
- `var(--accent-hover)`: Darker cyan for hover states.
- `var(--success)`, `var(--error)`, `var(--warning)`: Standard semantic colors for toasts or alerts.

**Text**
- `var(--text-primary)`: Dark grey/black for primary headings and body text.
- `var(--text-secondary)`: Muted grey for descriptions or subtitles.

**Sizing & Effects**
- `var(--radius-card)`, `var(--radius-btn)`: Consistent border radiuses.
- `var(--shadow-card)`, `var(--shadow-glow)`: Consistent drop shadows to make elements pop.
- `var(--font-heading)`, `var(--font-body)`: Standardized fonts.

#### Example Usage:
```css
/* style.css */

body {
  /* Using the global background and fonts */
  background: var(--bg-primary);
  font-family: var(--font-body);
  color: var(--text-primary);
}

.submit-btn {
  /* Using the global accent and button radius */
  background: var(--accent);
  border-radius: var(--radius-btn);
  color: white;
  transition: all var(--transition);
}

.submit-btn:hover {
  background: var(--accent-hover);
}
```

By strictly adhering to these variables, our entire suite of apps will feel like a single, professionally designed enterprise product!
