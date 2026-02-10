const captchaText = document.getElementById("captchaText");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

let currentCaptcha = generateCaptcha();
captchaText.textContent = currentCaptcha;

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userCaptcha = document.getElementById("captchaInput").value;

  if (userCaptcha !== currentCaptcha) {
    message.style.color = "red";
    message.textContent = "Human verification failed.";
    currentCaptcha = generateCaptcha();
    captchaText.textContent = currentCaptcha;
    return;
  }

  message.style.color = "lightgreen";
  message.textContent = "Login successful (demo only).";
});
