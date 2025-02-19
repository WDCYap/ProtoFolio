# PROTO//FOLIO

A modern, responsive portfolio website template built with HTML, CSS, and vanilla JavaScript. All content is rendered dynamically from a single JSON file, making it easy to customize without touching the code.

## Features

- 🌓 Dark/Light mode with system preference detection and persistence
- 📱 Fully responsive design with mobile-first approach
- 💾 Single JSON file configuration for easy content management
- 📑 PDF viewer integration with download option
- 📋 Multiple section layouts (Split, Timeline, Carousel, List)
- 🔄 Dynamic CSS/JS loading for better performance
- 🎨 Custom section styling support
- ⚡ Smooth animations and transitions
- 🔍 Section-specific JavaScript overrides

## Quick Start

1. Clone the repository
2. Customize `assets/data.json` with your content
3. Replace images in `assets/img/`
4. (Optional) Add your resume at `assets/resume.pdf`
5. Deploy!

## File Structure

```
proto-folio/
├── assets/
│   ├── data.json       # Main configuration file
│   ├── resume.pdf      # Optional resume file
│   └── img/            # Image directory
├── css/
│   ├── main.css        # Core styles
│   ├── layouts/        # Layout-specific styles
│   └── sections/       # Section-specific styles (optional)
├── js/
│   ├── main.js         # Core JavaScript
│   ├── layouts/        # Layout modules
│   ├── sections/       # Section-specific modules (optional)
│   └── utils/          # Utility modules
└── index.html          # Main HTML file
```

## Configuration Guide

### Site Configuration

The `site` object in data.json controls global settings:

```jsonc
{
  "site": {
    "title": "Your Site Title", // Browser tab title
    "brand": "YOUR//BRAND", // Navbar and loading screen text
    "favicon": "path/to/favicon.ico", // Site favicon
    "footer": {
      "show": true, // Show/hide footer
      "text": "Your Footer Text" // Footer content
    }
  }
}
```

### Section Configuration

Each section in the `sections` array requires:

```jsonc
{
  "id": "about", // Unique identifier
  "show": true, // Show/hide section
  "nav": true, // Include in navigation
  "title": "About Me", // Section heading (optional)
  "layout": "split" // Layout type
  // Layout-specific content...
}
```

### Available Layouts

#### 1. Split Layout (`split`)

Two-column layout for about sections or skill displays:

```jsonc
{
  "id": "about",
  "layout": "split",
  "left": {
    "heading": "Hello!",
    "typingText": ["Developer", "Designer"], // Animated typing
    "description": ["Your description here"]
  },
  "right": {
    "image": {
      "light": "assets/img/light.jpg", // Theme-aware images
      "dark": "assets/img/dark.jpg"
    }
  }
}
```

Alternative split layout for skills:

```jsonc
{
  "layout": "split",
  "left": {
    "heading": "Technical Skills",
    "items": ["JavaScript", "React", "Node.js"] // Skill tags
  },
  "right": {
    "heading": "Soft Skills",
    "items": ["Leadership", "Communication"]
  }
}
```

#### 2. Timeline Layout (`timeline`)

Vertical timeline for experience or education:

```jsonc
{
  "layout": "timeline",
  "items": [
    {
      "title": "Position Title",
      "subtitle": "Company/Institution",
      "date": "2020 - Present",
      "details": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

#### 3. Carousel Layout (`carousel`)

Project showcase with images and details:

```jsonc
{
  "layout": "carousel",
  "items": [
    {
      "show": true,
      "title": "Project Name",
      "subtitle": "Project Type",
      "image": "assets/img/project.jpg",
      "details": ["Project description"],
      "tags": ["React", "Node.js"],
      "links": [
        {
          "url": "https://github.com/...",
          "text": "View Source",
          "show": true
        }
      ]
    }
  ]
}
```

#### 4. List Layout (`list`)

Contact information and links:

```jsonc
{
  "layout": "list",
  "items": [
    {
      "type": "email", // Determines icon
      "text": "Email Me", // Display text
      "value": "me@email.com", // Link value
      "show": true
    },
    {
      "type": "resume", // Special type for resume modal
      "text": "View Resume",
      "value": "assets/resume.pdf",
      "show": true
    }
  ]
}
```

### Custom Sections & Layouts

#### Creating a Custom Section

When you want to override a layout's default behavior for a specific section:

```javascript
// js/sections/customSection.js
export default async function createCustomSection(data) {
  // You can still use the default layout as base
  const layoutModule = await import("../layouts/split.js");
  const content = layoutModule.default(data);

  // Add custom elements or modify the content
  const customElement = document.createElement("div");
  customElement.className = "custom-element";
  customElement.textContent = "Custom content";

  content.appendChild(customElement);
  return content;
}
```

```css
/* css/sections/customSection.css */
.custom-element {
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 8px;
  margin-top: 1rem;
}
```

#### Creating a Custom Layout

When you want to create a reusable layout pattern:

```javascript
// js/layouts/custom.js
export default function createCustomLayout(data) {
  const container = document.createElement("div");
  container.className = `custom-layout ${data.id}-layout`;

  // Create content based on data structure
  data.items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "custom-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const content = document.createElement("p");
    content.textContent = item.content;

    card.append(title, content);
    container.appendChild(card);
  });

  return container;
}
```

```css
/* css/layouts/custom.css */
.custom-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.custom-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-5px);
}
```

Usage in data.json:

```jsonc
{
  "id": "customSection",
  "show": true,
  "nav": true,
  "layout": "custom",
  "items": [
    {
      "title": "Card Title",
      "content": "Card content goes here"
    }
  ]
}
```

#### Theme Support

Add theme-specific assets in your data:

```jsonc
{
  "image": {
    "light": "assets/img/light-version.jpg",
    "dark": "assets/img/dark-version.jpg"
  }
}
```

#### Animation System

Built-in animations include:

- Typing effect for text (`typingText` in split layout)
- Fade-in for sections (automatic)
- Slide effects for timeline items
- Staggered animations for lists and skills
- Theme transition effects
- Image swap animations


## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design support
- System theme detection

## License

MIT License - see the [LICENSE](LICENSE) file for details.
