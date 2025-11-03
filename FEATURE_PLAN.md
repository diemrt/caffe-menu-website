# Feature Plan

## Config Data
Author `menu.json` with the exact sections, products, and prices currently hard-coded in `index.html`, preserving production labels. Each section carries `title`, optional `subtitle`, and an `items` array storing `name` plus numeric `price` in euros (add `description` later if copy appears). Use this data for the sections, products, and prices so the dynamic render matches production today. Document in `README` that euro (`€`) is the canonical currency and that decimals use dots (e.g., `1.8`) while display formatting handles locale-specific commas. Run a quick JSON lint before committing to keep the file editor-friendly.

```json
{
  "sections": [
    {
      "title": "COFFEE",
      "items": [
        { "name": "Caffè Normale", "price": 1.0 },
        { "name": "Caffè Macchiato", "price": 1.0 },
        { "name": "Caffè Deca", "price": 1.5 },
        { "name": "Caffè Latte", "price": 2.0 },
        { "name": "Cappuccino", "price": 1.8 },
        { "name": "Ginseng", "price": 1.8 },
        { "name": "Orzo", "price": 1.5 }
      ]
    },
    {
      "title": "NON COFFEE",
      "items": [
        { "name": "Tè Caldo", "price": 2.0 },
        { "name": "Cioccolata Calda Classica", "price": 2.5 },
        { "name": "Acqua Naturale 500 ml", "price": 1.0 },
        { "name": "Succo Di Frutta", "price": 2.5 }
      ]
    },
    {
      "title": "SNACKS",
      "items": [
        { "name": "Biscotti Lotus", "price": 0.2 },
        { "name": "Brioche", "price": 1.4 }
      ]
    }
  ]
}
```

## Client Wiring
Append `<script src="main.js" defer></script>` near the bottom of `index.html` so markup renders instantly before logic runs. Defer avoids blocking and preserves future bundler swaps; keep path relative and unique to bust caches. Confirm legacy inline scripts, if any, do not rely on synchronous execution order. Document the dependency in README for editors working offline.

```html
<body>
  <!-- static layout -->
  <div data-menu class="menu-sections"></div>
  <script src="main.js" defer></script>
</body>
```

## Data Fetch & Render
Initialize logic on `DOMContentLoaded`, fetch `menu.json`, and guard against network or parse failures with console warnings plus optional placeholder messaging. Use a document fragment to assemble sections, h2 headings, and product listings before swapping them into the `[data-menu]` container via `replaceChildren`. Always clear previous content to prevent duplication and format prices as euros with `toLocaleString("it-IT", { style: "currency", currency: "EUR" })` so dots become commas automatically.

```js
document.addEventListener("DOMContentLoaded", async () => {
  const wrap = document.querySelector("[data-menu]");
  if (!wrap) return console.warn("Menu container missing");
  try {
    const res = await fetch("menu.json");
    const { sections = [] } = await res.json();
    const frag = document.createDocumentFragment();
    sections.forEach(({ title, items = [] }) => {
      const section = document.createElement("section");
      section.className = "menu-section";
      const heading = document.createElement("h2");
      heading.textContent = title;
      section.append(heading);
      items.forEach(({ name, price }) => {
        const row = document.createElement("div");
        row.className = "menu-item";
        row.innerHTML = `
          <span class="item-name">${name}</span>
          <span class="item-price">${price.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}</span>
        `;
        section.append(row);
      });
      frag.append(section);
    });
    wrap.replaceChildren(frag);
  } catch (err) {
    console.error("Menu load failed", err);
  }
});
```

## Layout Guardrails
Restrict DOM writes to the inner menu list so existing wrappers, grids, and ARIA hooks remain untouched. If helper classes are required, reuse current naming to avoid CSS drift. Snapshot the current HTML structure before modifications so regressions can be spotted quickly during review.