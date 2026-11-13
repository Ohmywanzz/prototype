# Portfolio Case Study

Static case study portfolio project. No package installation or build step is required.

## Project files

- `index.html` contains the page structure and fixed copy. Edit its headings, paragraphs, labels, links, and project details directly in VS Code.
- `css/styles.css` contains colors, typography, spacing, and responsive layout.
- `js/app.js` handles image/video previews, section navigation, and the text used by newly added media slots.
- `assets/images/` is for permanent project images.
- `assets/videos/` is for permanent project videos.

## Run

Open `index.html` in a browser, or use the VS Code Live Server extension while editing.

## Add media

The "Tambah foto" control accepts multiple image files at once, and the cover image slot accepts one image. The "Tambah video" control previews a selected video. Browser previews are temporary and disappear when the page is refreshed.

For media that should remain part of the project, place the files in `assets/images/` or `assets/videos/`, then add them in `index.html` using normal HTML:

```html
<img src="./assets/images/project-screen.jpg" alt="Desktop project screen">
```

```html
<video controls src="./assets/videos/design-process.mp4"></video>
```