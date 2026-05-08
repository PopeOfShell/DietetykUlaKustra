import { initBmiCalculator } from "./bmiCalculator.js";
import { initContactActions } from "./contactActions.js";
import { initEasterEgg } from "./easterEgg.js";
import { initMobileMenu } from "./mobileMenu.js";
import { initRouting } from "./routing.js";

initEasterEgg();

initRouting({
	onRouteRendered(view, app) {
		if (view === "calculator") {
			initBmiCalculator(app);
		}

		if (view === "contact") {
			initContactActions(app);
		}
	}
});

initMobileMenu();