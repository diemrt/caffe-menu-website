document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("[data-menu]");
  if (!container) {
    console.warn("Menu container missing");
    return;
  }

  try {
    const response = await fetch("menu.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const sections = Array.isArray(data.sections) ? data.sections : [];
    const fragment = document.createDocumentFragment();

    sections.forEach(({ title, subtitle, items = [] }) => {
      const section = document.createElement("section");
      section.className = "menu-section";

      const heading = document.createElement("h2");
      heading.textContent = title;
      section.append(heading);

      if (subtitle) {
        const subHeading = document.createElement("p");
        subHeading.className = "menu-subtitle";
        subHeading.textContent = subtitle;
        section.append(subHeading);
      }

      items.forEach(({ name, price }) => {
        const row = document.createElement("div");
        row.className = "menu-item";

        const itemName = document.createElement("span");
        itemName.className = "item-name";
        itemName.textContent = name;

        const itemPrice = document.createElement("span");
        itemPrice.className = "item-price";
        const numericPrice = typeof price === "number" ? price : Number(price);
        if (Number.isFinite(numericPrice)) {
          itemPrice.textContent = numericPrice.toLocaleString("it-IT", {
            style: "currency",
            currency: "EUR"
          });
        } else {
          itemPrice.textContent = "";
          console.warn("Invalid price for menu item", { name, price });
        }

        row.append(itemName, itemPrice);
        section.append(row);
      });

      fragment.append(section);
    });

    if (!fragment.childNodes.length) {
      container.textContent = "Menu temporaneamente indisponibile.";
      console.warn("Menu sections missing in menu.json");
      return;
    }

    container.replaceChildren(fragment);
  } catch (error) {
    container.textContent = "Menu temporaneamente indisponibile.";
    console.error("Menu load failed", error);
  }
});
