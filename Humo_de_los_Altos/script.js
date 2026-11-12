// Humo de los Altos — búsqueda y filtros del menú

const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const searchInput = document.getElementById("menu-search");
const resultsMessage = document.getElementById("results-message");
const noResults = document.getElementById("no-results");
const clearSearchButton = document.getElementById("clear-search");

let activeFilter = "todos";

function updateMenu() {
    const searchTerm = searchInput.value.trim().toLocaleLowerCase("es");
    let visibleCards = 0;
    let visibleItems = 0;

    menuCards.forEach((card) => {
        const categoryMatches =
            activeFilter === "todos" || card.dataset.category === activeFilter;

        const items = card.querySelectorAll(".menu-item");
        let itemsInCard = 0;

        items.forEach((item) => {
            const itemName = item.querySelector("span").textContent.toLocaleLowerCase("es");
            const matchesSearch = itemName.includes(searchTerm);
            const shouldShow = categoryMatches && matchesSearch;

            item.hidden = !shouldShow;

            if (shouldShow) {
                itemsInCard++;
                visibleItems++;
            }
        });

        const showCard = categoryMatches && itemsInCard > 0;
        card.hidden = !showCard;

        if (showCard) {
            visibleCards++;
        }
    });

    noResults.hidden = visibleItems > 0;

    if (searchTerm) {
        resultsMessage.textContent =
            visibleItems === 1
                ? "Se encontró 1 platillo"
                : `Se encontraron ${visibleItems} platillos`;
    } else if (activeFilter === "todos") {
        resultsMessage.textContent = "Mostrando todo el menú";
    } else {
        const activeButton = document.querySelector(".filter-button.is-active");
        resultsMessage.textContent = `Categoría: ${activeButton.textContent}`;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((item) => {
            item.classList.remove("is-active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");
        activeFilter = button.dataset.filter;
        updateMenu();
    });
});

searchInput.addEventListener("input", updateMenu);

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    activeFilter = "todos";

    filterButtons.forEach((button) => {
        const isAll = button.dataset.filter === "todos";
        button.classList.toggle("is-active", isAll);
        button.setAttribute("aria-pressed", String(isAll));
    });

    updateMenu();
    searchInput.focus();
});

// Permite que los enlaces internos se desplacen suavemente.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
