# Angolo Caffè - Single Page Menu

This project is a single-page, mobile-first website for the "Angolo Caffè" menu. It was created as a minimal-code example, designed to replicate a specific UI/UX image provided by the user.

The entire website is contained within a **single `index.html` file**, making it extremely lightweight and perfect for simple, free deployment on platforms like [Netlify](https://www.netlify.com/).

## Project Analysis & Design Philosophy

The primary goal was to replicate the provided menu design using the simplest approach possible.

* **Mobile-First:** The layout is designed for a narrow (mobile) screen by default and uses `max-width` to constrain the content for easy readability. It includes a simple media query to adapt slightly for larger screens.
* **Minimal Code:** No external frameworks or build tooling are used. A single lightweight script renders the menu from `menu.json`, keeping load times fast without sacrificing flexibility.
* **Single File Deployment:** To make deployment trivial, all CSS is inlined within a `<style>` tag in the `<head>`. Decorative images (croissant, coffee cup) are embedded directly into the HTML as Base64 data, eliminating the need for an `images` folder.
* **UI/UX Replication:**
    * **Fonts:** Uses Google Fonts (`Montserrat` for body text and `Playfair Display` for the main "MENU" title) to match the style.
    * **Color Palette:** Uses CSS variables (`:root`) to define and reuse the exact color scheme from the image (light pink background, dark brown text, accents).
    * **Layout:** Uses modern CSS (Flexbox) for a clean alignment of menu items and their prices. Decorative elements are placed using `position: absolute` to float in the background as seen in the design.

## Tech Stack

* **HTML5**
* **CSS3** (with CSS Variables, Flexbox, and Google Fonts)

## Project Structure

The project consists of the following files:

```cmd
\
├── index.html
├── main.js
├── menu.json
└── README.md
```

## Menu Data & Currency

* The canonical source for menu sections, products, and prices is `menu.json`. Each price is stored as a numeric euro value using dot decimals (e.g. `1.8`).
* Client-side rendering in `main.js` formats prices with `toLocaleString("it-IT", { style: "currency", currency: "EUR" })`, which automatically displays commas for cents while preserving consistent data storage.
* When editing offline, keep `main.js` referenced in `index.html` because it fetches `menu.json` at runtime. The site can continue to run locally by serving the three files from the same directory.

## Commit Guide

Keep commits focused and write the message in the form `type: summary`. Common types include `feat` (new feature), `fix` (bug fix), and `chore` (maintenance/cleanup). Always write commit messages in English, use the imperative mood, and keep the summary between 20 and 50 words. A good default workflow is:

1. Stage only the files you intend to ship: `git add <file>`.
2. Double-check the staging area: `git status`.
3. Commit with a conventional message, for example: `git commit -m "feat: This is a description under 20-50 words"`.
4. Push once the commit looks good: `git push`.

## How to Deploy to Netlify (Simple Drag & Drop)

This project is perfectly optimized for Netlify's "drag and drop" deployment.

1.  **Save the File:** Ensure you have the complete `index.html` file (provided in the previous step) saved on your computer.
2.  **Log in to Netlify:** Open your [Netlify dashboard](https://app.netlify.com/).
3.  **Drag & Drop:** Drag your `index.html` file *directly* onto the "Want to deploy a new site without connecting to Git?" area on your dashboard.
4.  **Done:** That's it. Netlify will take a few seconds to upload and deploy the file, then provide you with a live URL (e.g., `https://random-name.netlify.app`) where you can see your menu.

## Design Reference

The UI and UX of this project are based on the user-provided image: `Menu Angolo Caffè.png`.
