// TIME + DATE
function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const date = now.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
}

setInterval(updateTime, 1000);
updateTime();


// KEYBOARD
const keys = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");
const keyboard = document.getElementById("keyboard");
const input = document.getElementById("password");

keys.forEach(k => {
    const btn = document.createElement("div");
    btn.textContent = k;
    btn.classList.add("key");

    btn.onclick = () => {
        input.value += k;
    };

    keyboard.appendChild(btn);
});

// SAVE PASSWORD ATTEMPTS
input.addEventListener("change", () => {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(input.value);
    localStorage.setItem("history", JSON.stringify(history));

    if (input.value === "admin") {
        showHistory();
    }

    input.value = "";
});

function showHistory() {
    const historyDiv = document.getElementById("history");
    const history = JSON.parse(localStorage.getItem("history")) || [];

    historyDiv.classList.remove("hidden");
    historyDiv.innerHTML = "<b>Password Attempts:</b><br>" + history.join("<br>");
}


// INSTALL APP LOGIC
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

installBtn.addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
    }
});

// AUTO HIDE BUTTON AFTER 5 SECONDS
setTimeout(() => {
    installBtn.classList.add("hidden");
}, 5000);
