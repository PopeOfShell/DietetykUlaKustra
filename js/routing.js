const routes = {
    "/": "home-template",
    "/o-mnie": "about-template",
    "/kontakt": "contact-template",
    "/uslugi": "services-template",
    "/kalkulator": "calculator-template"
};

function getTemplate(templateId) {
    return document.querySelector(`#${templateId}`);
}

function updateActiveLink(menuLinks, path) {
    menuLinks.forEach((link) => {
        const isActive = link.dataset.route === path;
        link.setAttribute("aria-current", isActive ? "page" : "false");
    });
}

function renderRoute(app, menuLinks, path, onRouteRendered) {
    const templateId = routes[path] || "not-found-template";
    const template = getTemplate(templateId);

    if (!template) {
        return;
    }

    app.replaceChildren(template.content.cloneNode(true));
    updateActiveLink(menuLinks, path);
    onRouteRendered?.(path, app);
}

export function initRouting({ onRouteRendered } = {}) {
    const app = document.querySelector("#app");
    const menuLinks = document.querySelectorAll(".menuBtn[data-route]");

    if (!app || menuLinks.length === 0) {
        return;
    }

    function navigateTo(path) {
        history.pushState({}, "", path);
        renderRoute(app, menuLinks, path, onRouteRendered);
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            navigateTo(link.dataset.route);
        });
    });

    window.addEventListener("popstate", () => {
        renderRoute(app, menuLinks, window.location.pathname, onRouteRendered);
    });

    renderRoute(app, menuLinks, window.location.pathname, onRouteRendered);
}