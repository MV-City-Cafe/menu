document.addEventListener('DOMContentLoaded', function() {
    fetch('menu.json')
        .then(response => response.json())
        .then(menuData => {
            const menuList = document.getElementById('menu-list');
            menuData.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                menuItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                `;
                menuList.appendChild(menuItem);
            });
        })
        .catch(error => console.error('Error loading menu:', error));
});