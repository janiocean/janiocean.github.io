let currentLanguage = "ru";

function updateLastUpdateCaption() {}

async function switchLanguage() {
    if (currentLanguage == "ru")
        currentLanguage = "en";
    else
        currentLanguage = "ru";

    const response = await fetch("/languages/" + currentLanguage + ".json");
    const data = await response.json();

    document.getElementById("language-switcher").innerText = data.language;
    document.getElementById("div1").innerText = data.data;
    document.getElementById("main-card").innerText = data.main_card;
    updateLastUpdateCaption();
}