async function setLanguage(lang) {
    const response = await fetch("/languages/" + lang + ".json");
    const data = await response.json();
    document.getElementById("div1").innerText = data.data;
    document.getElementById("main-card").innerText = data.main_card;
}