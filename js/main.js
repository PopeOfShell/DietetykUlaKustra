import { initBmiCalculator } from "./bmiCalculator.js";
import { initContactActions } from "./contactActions.js";
import { initEasterEgg } from "./easterEgg.js";
import { initMobileMenu } from "./mobileMenu.js";
import { initOpinieMobileLayout } from "./opinieMobileLayout.js";
import { initRouting } from "./routing.js";
import { initHomeSlider } from "./homeSlider.js";

initEasterEgg();

let cleanupOpinieMobileLayout = null;

initRouting({
	onRouteRendered(view, app) {
		cleanupOpinieMobileLayout?.();
		cleanupOpinieMobileLayout = null;

		if (view === "calculator") {
			initBmiCalculator(app);
		}

		if (view === "contact") {
			initContactActions(app);
		}

		if (view === "home") {
			initHomeSlider(app);
			cleanupOpinieMobileLayout = initOpinieMobileLayout(app);
		}
	}
});

initMobileMenu();