# 🕷️ Spider-Man | Enter the Spider-Verse

<div align="center">

![Spider-Verse Banner](https://img.shields.io/badge/Spider--Man-Enter%20the%20Spider--Verse-e63946?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==)
![Three.js](https://img.shields.io/badge/Three.js-r128-00f0ff?style=for-the-badge&logo=threedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-CDN-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-e34f26?style=for-the-badge&logo=html5&logoColor=white)

**A cinematic Marvel-inspired landing page with immersive 3D effects, interactive animations, and a dark futuristic UI — built entirely with vanilla web technologies.**

[🌐 Live Demo](#) · [🐛 Report Bug](#) · [✨ Request Feature](#)

</div>

---

## 📸 Preview

```
╔══════════════════════════════════════════════════╗
║   ░░░  MARVEL CINEMATIC UNIVERSE  ░░░            ║
║                                                  ║
║         ENTER THE                                ║
║         SPIDER     ← glowing red neon            ║
║         VERSE      ← electric blue glow          ║
║                                                  ║
║      [ Explore the Multiverse ]                  ║
║                                                  ║
║   🕷️ Rotating 3D mask + 800 web particles        ║
╚══════════════════════════════════════════════════╝
```

---

## ✨ Features

### 🎭 3D Hero Section
- Rotating **3D Spider-Man mask** built with Three.js geometries
- **800-particle** floating web system with directional bounce
- **Floating spider logo** with animated legs
- **3D city skyline** backdrop with depth layers
- **Mouse-driven camera parallax** — scene reacts to cursor movement
- Pulsing **red & blue dynamic lighting**

### 🕸️ Web Shooting Animation
- Procedural **canvas-drawn web threads** shooting from screen corners
- Threads **follow your cursor** in real time
- **Branching sub-threads** with randomized curves
- Alternating red and electric blue color palette

### ⚡ Powers Section
- **4 ability cards** with 3D perspective tilt on mouse move
- **Radial glow** follows cursor inside each card
- Animated **progress bars** triggered on scroll reveal
- Floating icon animations with staggered delays

### 🌌 Spider-Verse Characters
- **3D flip cards** (CSS `rotateY`) revealing character details on hover
- Peter Parker · Miles Morales · Spider-Gwen · Spider-Man 2099
- Glowing red borders and box-shadow on card back face

### 📜 Parallax Scroll
- **Hero text drifts** upward as you scroll
- **City skyline** moves at a separate scroll speed
- Multi-layer depth creates cinematic feel

### 🖱️ Interactive Cursor
- Custom **spider-sight SVG cursor** replaces the default
- **Cyan web trail** drawn on a fixed canvas layer
- Trail fades with alpha over 30 tracked points

### 🔝 Sticky Navbar
- Glassmorphism blur background
- **Spider web SVG logo**
- **Red glowing underline** on hover
- Becomes opaque on scroll

### 🦶 Footer
- **Animated web background** drawn with Canvas 2D (concentric rings + spokes)
- GitHub · Instagram · Twitter social icons
- Neon glow hover on social buttons

---

## 🗂️ Project Structure

```
spider-verse/
│
├── index.html       # Semantic HTML structure, CDN links
├── style.css        # All styles — variables, animations, components
└── script.js        # All JavaScript — Three.js, Canvas, interactions
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Custom properties, keyframes, 3D transforms |
| **Tailwind CSS** (CDN) | Utility classes for layout helpers |
| **Three.js r128** (CDN) | WebGL 3D hero scene |
| **Canvas 2D API** | Web shooting animation + cursor trail + footer web |
| **Vanilla JavaScript** | All interactivity, observers, parallax |
| **Google Fonts** | Orbitron (display) + Rajdhani (body) |
| **IntersectionObserver** | Scroll reveal animations |

---

## 🚀 Getting Started

### Prerequisites
No build tools, no npm, no dependencies to install. Just a browser.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/spider-verse.git

# 2. Navigate into the project
cd spider-verse

# 3. Open in browser
open index.html
# — or —
# Drag index.html into any modern browser
```

> ⚠️ **Note:** For the best experience, serve the files through a local server rather than opening directly as `file://`. You can use:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then open `http://localhost:8000` in your browser.

---

## 📁 File Breakdown

### `index.html`
- Clean semantic structure with zero inline styles
- Loads Three.js and Tailwind from CDN
- Links `style.css` in `<head>` and `script.js` before `</body>`
- All sections: Navbar → Hero → Powers → Characters → Parallax → Footer

### `style.css`
```
CSS Variables (colors, glows)
Reset & base body styles
Noise overlay + scan line effects
Custom cursor
Navbar (sticky + scrolled state)
Hero section + title animations
Web canvas overlay
Section base styles
Powers grid + 3D tilt cards + progress bars
Characters grid + flip cards
Parallax section + city skyline
Footer + web canvas
Scroll reveal (.reveal / .visible)
Keyframes: fadeUp, float, scrollPulse
Responsive breakpoints (768px, 480px)
```

### `script.js`
```
1. Custom cursor + canvas web trail
2. Navbar scroll behaviour
3. Three.js hero scene (mask, particles, lights, city, animation loop)
4. Web shooting animation (Canvas 2D)
5. Power cards 3D tilt effect
6. Footer web background (Canvas 2D)
7. Scroll reveal (IntersectionObserver)
8. Parallax on scroll
```

---

## 🎨 Design System

### Color Palette
```css
--red:  #e63946   /* Spider-Man red  */
--blue: #00f0ff   /* Electric cyan   */
--dark: #050810   /* Deep space bg   */
--mid:  #0a0f1e   /* Section mid bg  */
```

### Typography
| Role | Font | Weight |
|---|---|---|
| Display / Headings | Orbitron | 400, 700, 900 |
| Body / UI Text | Rajdhani | 300, 400, 600, 700 |

### Glow Effects
```css
--glow-red:  0 0 20px #e63946, 0 0 60px #e63946aa;
--glow-blue: 0 0 20px #00f0ff, 0 0 60px #00f0ffaa;
```

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Responsive |
| Mobile Safari | ✅ Responsive |

> WebGL must be enabled for the Three.js hero scene to render.

---

## 📱 Responsive Design

- **Desktop (1024px+):** Full 4-column powers grid, 4-column character grid, custom cursor visible
- **Tablet (768px):** 2-column grids, navbar links hidden
- **Mobile (480px):** 1-column stacked layout, touch-friendly cards

---

## ⚙️ Customisation

### Change Colors
Edit CSS variables at the top of `style.css`:
```css
:root {
  --red:  #e63946;  /* Change hero/accent red  */
  --blue: #00f0ff;  /* Change glow/border blue */
  --dark: #050810;  /* Change background       */
}
```

### Add a Character Card
Copy any `.char-card` block in `index.html` and update the emoji, name, universe, and gradient background:
```html
<div class="char-card reveal">
  <div class="char-inner">
    <div class="char-front">
      <div class="char-bg" style="background: linear-gradient(...);">🦸</div>
      <div class="char-overlay">
        <div class="char-name">Your Character</div>
        <div class="char-universe">Earth-000</div>
      </div>
    </div>
    <div class="char-back">
      <div class="char-back-icon">🦸</div>
      <div class="char-back-name">HERO NAME</div>
      <div class="char-back-power">Special ability description.</div>
      <div class="char-back-badge">Earth-000</div>
    </div>
  </div>
</div>
```

### Change Particle Count
In `script.js`, find the hero scene initializer:
```js
const particleCount = 800; // increase for more particles
```

---

## 🏷️ Topics

`html` `css` `javascript` `threejs` `tailwindcss` `spider-man` `marvel` `animation` `3d` `canvas` `parallax` `webgl` `landing-page` `dark-theme` `interactive`

---

## 📄 License

This project is for educational and portfolio purposes only.  
Spider-Man and all related characters are trademarks of **Marvel Entertainment, LLC**.

---

## 🙌 Acknowledgements

- [Three.js](https://threejs.org/) — 3D WebGL rendering
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Google Fonts](https://fonts.google.com/) — Orbitron & Rajdhani typefaces
- [Marvel](https://www.marvel.com/) — The universe that inspired it all

---

<div align="center">

**"With great power comes great responsibility."**  
*— Uncle Ben*

⭐ Star this repo if you liked it!

</div>
