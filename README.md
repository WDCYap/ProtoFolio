# PROTO//FOLIO

A modern, responsive portfolio website template built with HTML, CSS, and vanilla JavaScript. All content is rendered from a single JSON file, making it easy to customize without touching the code.

## Features

- 🌓 Dark/Light mode with system preference
- 📱 Fully responsive design
- 💾 Single JSON file configuration
- 📑 PDF viewer integration
- 🎠 Project showcase
- 📋 Multiple section layouts

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
│   ├── data.json     # Main configuration file
│   ├── resume.pdf    # Optional resume file
│   └── img/          # Image directory
├── css/
│   └── styles.css    # Styling file
├── js/
│   └── main.js       # Main JavaScript file
└── index.html        # Main HTML file
```

## Customization

### Basic Structure

The data.json file contains two main objects:

1. site: Global configurations
2. sections: Content sections

### Site Configuration

```jsonc
{
  "site": {
    "title": "Your Site Title",
    "brand": "YOUR//BRAND", // Also used in loading screen
    "favicon": "path/to/favicon.ico",
    "footer": {
      "show": true,
      "content": "Your Footer Text",
      "class": "text-center py-4",
      "textClass": "text"
    }
  }
}
```

### Section Configuration

Each section requires:

- `id`: Unique identifier
- `show`: Visibility toggle
- `navOption`: Navigation menu toggle
- `navText`: Custom navigation text (optional)
- `layout`: Content structure type
- `title`: Section heading (optional)

```jsonc
{
  "id": "newSection",
  "show": true,
  "navOption": true,
  "navText": "Nav Title", // Optional, defaults to title or capitalized ID
  "title": "Section Title",
  "layout": "split",
  "content": []
}
```

### Layout Types

1. **Split Layout** - Two-column content
2. **Timeline Layout** - Date-based vertical timeline
3. **Carousel Layout** - Project showcase with images
4. **List Layout** - Contact information and links

See [examples](#layout-examples) below.

### Special Features

1. **Theme Support**

```jsonc
{
  "type": "img",
  "class": "profile-image",
  "data": {
    "light": "assets/img/picture.jpg",
    "dark": "assets/img/picture-dark.jpg"
  }
}
```

2. **Typing Animation**

```jsonc
{
  "type": "div",
  "id": "typed-text",
  "class": "h4 mb-4",
  "data": ["First text", "Second text"]
}
```

3. **Styling**

- Supports Bootstrap classes
- Font Awesome 6 icons

```jsonc
{
  "type": "link",
  "icon": "fas fa-envelope",
  "class": "d-flex align-items-center"
}
```

### Layout Examples

<details>
<summary>Click to view layout examples</summary>

1. **Split Layout**

```jsonc
{
  "layout": "split",
  "content": [
    {
      "type": "div",
      "class": "col-lg-6",
      "items": [
        {
          "type": "h1",
          "content": "Your Heading"
        }
      ]
    }
  ]
}
```

2. **Timeline Layout**

```jsonc
{
  "layout": "timeline",
  "items": [
    {
      "title": "Position Title",
      "subtitle": "Company Name",
      "date": "2020-2024",
      "description": ["Description point 1"]
    }
  ]
}
```

3. **Carousel Layout**

```jsonc
{
  "layout": "carousel",
  "items": [
    {
      "show": true,
      "title": "Project Name",
      "image": "assets/img/project.jpg",
      "description": ["Project description"],
      "tools": ["Tool 1"],
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

4. **List Layout**

```jsonc
{
  "layout": "list",
  "items": [
    {
      "type": "link",
      "icon": "fas fa-envelope",
      "content": "email@example.com",
      "href": "mailto:email@example.com",
      "show": true
    }
  ]
}
```

</details>

### Customization Tips

1. **Adding a New Section**

   - Copy an existing section structure
   - Change the ID and other properties
   - Choose an appropriate layout
   - Add your content

2. **Mobile Optimization**

   - Use Bootstrap's responsive classes (col-lg-6, col-md-12, etc.)
   - Images automatically resize for mobile
   - Navigation collapses into hamburger menu

3. **Animations**
   - Sections fade in on scroll
   - Profile image has fade-in animation
   - Skills tags have staggered animation
   - Typing animation speed can be adjusted in the code

### Troubleshooting

1. **Images Not Loading**

   - Ensure image paths in data.json are correct
   - Check that both light/dark versions exist for profile image
   - Verify image formats are supported (jpg, png, etc.)

2. **Resume Not Working**

   - Verify resume.pdf exists in assets folder
   - Check file permissions
   - Ensure PDF is web-compatible

3. **Navigation Issues**
   - Verify section IDs match navigation links
   - Check navOption and show properties
   - Ensure unique IDs for each section

## Dependencies

- Bootstrap 5.3.2
- Font Awesome 6.0.0
- Google Fonts (Space Mono)

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT License - see the [LICENSE](LICENSE) file for details.
