A "lightweight" 
(It's 830 lines someone please improve me code wit a pull request, ya boi is mentally challenged)
animated 3D console widget that types "system input" and reveals styled "system output".  
Live demo: https://justcalljon.pro

Why use this
- Eye catching console animation for landing pages and hero sections.
- Easy to embed and customize colors, messages, and sizing in JavaScript.
- Literally works, just include the script before your body, no questions asked, just WORKS
- It's one file that just works twin, idk what to tell you!

Quick start

1. Include the script in any HTML page (place before </body>):
```html
<script src="flipBox.js"></script>
```

2. Open the page to see the widget auto-initialize on DOMContentLoaded.

Customize
- Edit the displayed lines in the [`messages`](flipBox.js) array.
- Adjust responsive sizing via [`getResponsiveConfig`](flipBox.js) and reapply with [`applyResponsiveStyles`](flipBox.js).
- Line-wrapping and sizing are handled by [`splitIntoLines`](flipBox.js) and [`calculateBoxHeight`](flipBox.js).
- The typing + rotation lifecycle runs from [`showInputThenOutput`](flipBox.js) and [`startConsoleRotation`](flipBox.js).

Files
- [flipBox.js](flipBox.js): main widget script.

Notes
- The component injects CSS and the DOM structure automatically when loaded.
- Works responsively; tweak values in [`getResponsiveConfig`](flipBox.js) for different breakpoints.
- For embedding into frameworks, call the same initialization sequence after mounting the DOM.

Required attribution (must be visible on pages that use this code)
- You must include a visible footer or page-bottom credit linking to https://justcalljon.pro using the exact wording:
  "flipBox animation made with love by JustCallJon.pro"
- Example footer (copy/paste):
```html
<footer style="text-align:center; padding:1rem;">
  <a href="https://justcalljon.pro" target="_blank" rel="noopener noreferrer">
    flipBox animation made with love by JustCallJon.pro
  </a>
</footer>
```
- Embedding this script without the above visible credit/link is not permitted - You may make it grey or slightly harder to see but it must be visible and not the same color as the footer! 
