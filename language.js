function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState == 4 && rawFile.status == "200") {
            return rawFile.resonseText;
        }
    }
    rawFile.send(null);
}

function setLanguage(lang) {
    if (lang == "ru") {
        document.getElementById("div1").innerText = "РУССКАЯ ИНФА ТУТ";
        document.getElementById("main-card").innerText = "JAN КАРТА";
    }
    if (lang == "en") {
        document.getElementById("div1").innerText = "ENGLISH INFO HERE";
        document.getElementById("main-card").innerText = "JAN CARD";
    }
}