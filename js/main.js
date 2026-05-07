import { initBmiCalculator } from "./bmiCalculator.js";
import { initEasterEgg } from "./easterEgg.js";
import { initRouting } from "./routing.js";

initEasterEgg();


function initContactActions(app) {
	const copyButton = app.querySelector("[data-copy-email]");
	const emailElement = app.querySelector("[data-contact-email]");

	if (!copyButton || !emailElement) {
		return;
	}

	copyButton.addEventListener("click", async () => {
		const email = emailElement.textContent?.trim();
		const defaultLabel = "Skopiuj";

		if (!email) {
			return;
		}

		try {
			await navigator.clipboard.writeText(email);
			copyButton.textContent = "Skopiowano";
		} catch {
			copyButton.textContent = "Blad";
		}

		copyButton.disabled = true;

		window.setTimeout(() => {
			copyButton.textContent = defaultLabel;
			copyButton.disabled = false;
		}, 1600);
	});
}


initRouting({
	onRouteRendered(path, app) {
		if (path === "/kalkulator") {
			initBmiCalculator(app);
		}

		if (path === "/kontakt") {
			initContactActions(app);
		}
	}
});