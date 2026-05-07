const bmiCategories = [
    { max: 18.5, label: "Niedowaga" },
    { max: 25, label: "Waga prawidłowa" },
    { max: 30, label: "Nadwaga" },
    { max: Number.POSITIVE_INFINITY, label: "Otyłość" }
];

const bmrOffsets = {
    female: -161,
    male: 5
};

function resolveCategory(bmiValue) {
    return bmiCategories.find((category) => bmiValue < category.max)?.label || "Brak kategorii";
}

function formatBmi(bmiValue) {
    return bmiValue.toFixed(1).replace(".", ",");
}

function formatCalories(value) {
    return `${Math.round(value).toLocaleString("pl-PL")} kcal`;
}

function calculateGoals(cpmValue) {
    return {
        cut: cpmValue * 0.85,
        maintain: cpmValue,
        gain: cpmValue * 1.1
    };
}

export function initBmiCalculator(root = document) {
    const form = root.querySelector("[data-bmi-form]");
    const resultsPanel = root.querySelector("[data-bmi-result]");

    if (!form || !resultsPanel) {
        return;
    }

    const bmiResultValue = resultsPanel.querySelector("[data-result-bmi]");
    const bmiResultCategory = resultsPanel.querySelector("[data-result-bmi-category]");
    const bmrResultValue = resultsPanel.querySelector("[data-result-bmr]");
    const cpmResultValue = resultsPanel.querySelector("[data-result-cpm]");
    const cutResultValue = resultsPanel.querySelector("[data-result-cut]");
    const maintainResultValue = resultsPanel.querySelector("[data-result-maintain]");
    const gainResultValue = resultsPanel.querySelector("[data-result-gain]");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const weight = Number(formData.get("weight"));
        const heightInCm = Number(formData.get("height"));
        const age = Number(formData.get("age"));
        const sex = String(formData.get("sex"));
        const activity = Number(formData.get("activity"));

        if (!weight || !heightInCm || !age || !activity || weight <= 0 || heightInCm <= 0 || age <= 0 || !bmrOffsets[sex]) {
            bmiResultValue.textContent = "--";
            bmiResultCategory.textContent = "Podaj poprawne wartości większe od zera.";
            bmrResultValue.textContent = "--";
            cpmResultValue.textContent = "--";
            cutResultValue.textContent = "--";
            maintainResultValue.textContent = "--";
            gainResultValue.textContent = "--";
            return;
        }

        const heightInMeters = heightInCm / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        const bmrValue = (10 * weight) + (6.25 * heightInCm) - (5 * age) + bmrOffsets[sex];
        const cpmValue = bmrValue * activity;
        const goals = calculateGoals(cpmValue);

        bmiResultValue.textContent = formatBmi(bmiValue);
        bmiResultCategory.textContent = `Interpretacja: ${resolveCategory(bmiValue)}.`;
        bmrResultValue.textContent = formatCalories(bmrValue);
        cpmResultValue.textContent = formatCalories(cpmValue);
        cutResultValue.textContent = formatCalories(goals.cut);
        maintainResultValue.textContent = formatCalories(goals.maintain);
        gainResultValue.textContent = formatCalories(goals.gain);
    });
}