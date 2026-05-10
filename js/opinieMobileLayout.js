export function initOpinieMobileLayout(root = document) {
	const opinieDiv = root.querySelector(".opinieDiv");
	const mobileBreakpoint = window.matchMedia("(max-width: 560px)");

	if (!opinieDiv) {
		return () => {};
	}

	function syncLayout(isMobile) {
		opinieDiv.classList.toggle("opinieDivMobile", isMobile);
	}

	function handleBreakpointChange(event) {
		syncLayout(event.matches);
	}

	syncLayout(mobileBreakpoint.matches);
	mobileBreakpoint.addEventListener("change", handleBreakpointChange);

	return () => {
		mobileBreakpoint.removeEventListener("change", handleBreakpointChange);
	};
}