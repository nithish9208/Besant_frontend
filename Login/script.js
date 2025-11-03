let users = [
  { username: "arun", password: "1234" },
  { username: "divya", password: "abcd" }
];

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const title = document.getElementById("title");
const jsonData = document.getElementById("jsonData");

function updateJSONView() {
  jsonData.textContent = JSON.stringify(users, null, 2);
}

window.onload = () => {
  const stored = localStorage.getItem("usersData");
  if (stored) users = JSON.parse(stored);
  updateJSONView();
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const uname = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const userFound = users.find(u => u.username === uname);

  if (userFound) {
    if (userFound.password === pass) {
      alert("Vanakkam, " + uname + "! Login successful!");
      localStorage.setItem("currentUser", uname);
      window.location.href = "home.html";
    } else {
      alert("Wrong password! Try again.");
    }
  } else {
    alert("User not found! Please register below.");
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    title.textContent = "Register New User";
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = document.getElementById("newUser").value.trim();
  const newPass = document.getElementById("newPass").value.trim();

  const already = users.find(u => u.username === newUser);
  if (already) {
    alert("Username already exists!");
    return;
  }

  users.push({ username: newUser, password: newPass });
  localStorage.setItem("usersData", JSON.stringify(users));
  localStorage.setItem("currentUser", newUser);
  updateJSONView();

  alert("Welcome " + newUser + "! Registration successful!");
  window.location.href = "home.html";
});
