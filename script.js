document.addEventListener("DOMContentLoaded", function () {
  fetch("meals.txt") // Fetch the menu data from the text file
    .then((response) => response.text()) // Read the text response
    .then((txt) => {
      const menuData = {};
      const blocks = txt.split("\n\n");
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const lines = block.split("\n");
        const category = lines[0];
        menuData[category] = [];
        for (let index = 1; index < lines.length; index += 2) {
          const name = lines[index];
          const desc = lines[index + 1];
          menuData[category].push({ name: name, description: desc });
        }
      }
      return menuData;
    }) // Parse the JSON response
    .then((menuData) => {
      const menuList = document.getElementById("menu-list"); // The container for the menu items

      // Loop through each category (e.g., breakfast, lunch)
      for (const category in menuData) {
        // Create a section for the category
        const categorySection = document.createElement("section");
        categorySection.classList.add("menu-category");
        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent =
          category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the category name
        categorySection.appendChild(categoryTitle);

        // Loop through each item in the category
        menuData[category].forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.classList.add("menu-item");

          // Construct the menu item HTML
          menuItem.innerHTML = `
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">${item.price}</p>
                </div>
            `;

          categorySection.appendChild(menuItem); // Append the menu item to the category section
        });

        menuList.appendChild(categorySection); // Append the category section to the main menu list
      }
    })
    .catch((error) => {
      console.error("Error loading menu:", error);
    });
});
