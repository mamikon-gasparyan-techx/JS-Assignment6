const inputName = document.getElementById("name");
const inputEmail = document.getElementById("mail");
const text = document.getElementById("text");
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");
const btn4 = document.getElementById("button4");
const btn5 = document.getElementById("button5");
const btn6 = document.getElementById("button6");
const btn7 = document.getElementById("button7");
const btn8 = document.getElementById("button8");
const countdown = document.getElementById("countdown");
const joke = document.getElementById("joke");
const tick = document.getElementById("tick");
let cookieTask = document.getElementById("task3");
let interval;

window.addEventListener("DOMContentLoaded", () => {
  const info = localStorage.getItem("info");
  if (info) {
    console.log(JSON.parse(info));
  }
  const txt = sessionStorage.getItem("text");
  if (txt) {
    text.value = JSON.parse(txt);
  }
  if (document.cookie.includes("consent=true")) {
    cookieTask.style.display = "none";
  }
});

btn1.addEventListener("click", () => {
  const info = {
    name: inputName.value,
    email: inputEmail.value,
  };
  localStorage.setItem("info", JSON.stringify(info));
  inputName.value = "";
  inputEmail.value = "";
});

btn2.addEventListener("click", () => {
  sessionStorage.setItem("text", JSON.stringify(text.value));
  text.value = "";
});

btn3.addEventListener("click", () => {
  document.cookie =
    "consent=true; expires=Fri, 01 Aug 2025 12:00:00 UTC; path=/;";
  cookieTask.style.display = "none";
});

btn4.addEventListener("click", () => {
  localStorage.clear();
  sessionStorage.clear();
  document.cookie =
    "consent=true; expires=Fri, 01 Aug 2020 12:00:00 UTC; path=/;";
  console.log("All storage cleared!");
  cookieTask.style.display = "flex";
});

async function getJoke() {
  try {
    const request = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    const response = await request.json();
    return response.joke;
  } catch (err) {
    throw new Error("Failed to fetch a joke.");
  }
}

btn5.addEventListener("click", async () => {
  try {
    joke.textContent = await getJoke();
  } catch (err) {
    joke.textContent = err.message;
  }
});

countdown.style.display = "none";
function count() {
  countdown.style.display = "flex";
  if (countdown.innerText > 0) {
    countdown.innerText--;
    setTimeout(count, 1000);
  } else {
    countdown.innerText = "GO!";
  }
}

btn6.addEventListener("click", () => {
  count();
});

function startTicking() {
  interval = setInterval(() => {
    if (tick.style.display === "none") {
      tick.style.display = "flex";
    } else {
      tick.style.display = "none";
    }
  }, 1000);
}

function stopTicking() {
  clearInterval(interval);
  tick.style.display = "flex";
}

btn7.addEventListener("click", () => {
  startTicking();
});

btn8.addEventListener("click", () => {
  stopTicking();
});
