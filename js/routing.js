const routes = {
    home: "home-template",
    about: "about-template",
    contact: "contact-template",
    services: "services-template",
    calculator: "calculator-template"
};

const defaultView = "home";

function getTemplate(templateId) {
    return document.querySelector(`#${templateId}`);
}

function updateActiveItem(menuItems, view) {
    menuItems.forEach((item) => {
        const isActive = item.dataset.view === view;
        item.setAttribute("aria-pressed", String(isActive));
    });
}

function renderView(app, menuItems, view, onRouteRendered) {
    const templateId = routes[view];
    const template = getTemplate(templateId);

    if (!template) {
        return;
    }

    app.replaceChildren(template.content.cloneNode(true));
    updateActiveItem(menuItems, view);
    onRouteRendered?.(view, app);
}

export function initRouting({ onRouteRendered } = {}) {
    const app = document.querySelector("#app");
    const menuItems = document.querySelectorAll(".menuBtn[data-view]");

    if (!app || menuItems.length === 0) {
        return;
    }

    function showView(view) {
        renderView(app, menuItems, view, onRouteRendered);
    }

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            showView(item.dataset.view);
        });
    });

    renderView(app, menuItems, defaultView, onRouteRendered);
}