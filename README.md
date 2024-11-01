# PROTO//FOLIO

A modern, responsive portfolio website built with HTML, CSS, and vanilla JavaScript.

## Features

- Responsive design that works on all devices
- Automatic dark/light theme that follows system preferences
- Smooth animations and transitions
- Dynamic content loading from JSON
- Loading screen with typing animation
- Image optimization and lazy loading
- Interactive project carousel
- PDF resume viewer
- Mobile-friendly navigation sidebar

## Technologies Used

- HTML
- CSS
- Vanilla JavaScript
- Bootstrap 5
- Font Awesome Icons
- Google Fonts (Space Mono)

## Project Structure

```text
protofolio/
├── assets/
│   ├── data.json     # Content configuration
│   ├── img/          # Images and media
│   └── resume.pdf    # Resume file
├── css/
│   └── styles.css    # Stylesheet
├── js/
│   └── main.js       # JavaScript functionality
└── index.html        # Main HTML file
```

## Setup

1. Clone the repository
2. Update `assets/data.json` with your personal information
3. Replace images in `assets/img/` with your own
   - Provide both light and dark versions of profile images
   - Name them consistently with your data.json configuration
4. Update `assets/resume.pdf` with your resume
5. Deploy to your preferred hosting service

## Customization

The website can be easily customized by modifying:

- `assets/data.json` for content
- `css/styles.css` for styling
- Color schemes in CSS variables
- Images and media assets

### Theme Configuration

The website automatically adapts to your system's color scheme preferences:

- Light mode during day/light system theme
- Dark mode during night/dark system theme
- Smooth transitions between themes
- Different profile images for each theme

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
