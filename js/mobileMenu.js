export function initMobileMenu() {
	const menuSticky = document.querySelector(".menuSticky");
	const menuToggle = document.querySelector(".menuToggle");
	const menuLinks = document.querySelectorAll(".menuBtn[data-view]");
	const mobileBreakpoint = window.matchMedia("(max-width: 560px)");

	if (!menuSticky || !menuToggle || menuLinks.length === 0) {
		return;
	}

	function closeMenu() {
		menuSticky.classList.remove("menuOpen");
		menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.setAttribute("aria-label", "Otwórz menu");
	}

	function toggleMenu() {
		const isOpen = menuSticky.classList.toggle("menuOpen");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Zamknij menu" : "Otwórz menu");
	}

	menuToggle.addEventListener("click", () => {
		if (!mobileBreakpoint.matches) {
			return;
		}

		toggleMenu();
	});

	menuLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (mobileBreakpoint.matches) {
				closeMenu();
			}
		});
	});

	mobileBreakpoint.addEventListener("change", (event) => {
		if (!event.matches) {
			closeMenu();
		}
	});

	closeMenu();
}