
// Check login status on load for all pages
window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if ((currentPage.includes("index") || currentPage.endsWith("/")) && loggedInUser) {
    window.location.href = "dashboard.html";
  }

  if ((currentPage.includes("login") || currentPage.includes("signup")) && loggedInUser) {
    window.location.href = "dashboard.html";
  }

  if (currentPage.includes("dashboard") && !loggedInUser) {
    window.location.href = "login.html";
  }
});

// Signup logic (only applies if on signup page)
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
      alert("Email already registered.");
      return;
    }

    const newUser = { name: firstName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    alert("Signup successful!");
    window.location.href = "dashboard.html";
  });
}

// Login logic (only applies if on login page)
const loginForm = document.querySelector("form");
if (loginForm && window.location.pathname.includes("login")) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const match = users.find(user => user.name === username && user.password === password);

    if (!match) {
      alert("Invalid credentials");
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(match));
      window.location.href = "dashboard.html";
    }
  });
}

// Dashboard logic
if (window.location.pathname.includes("dashboard")) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (user) {
    document.querySelector(".welcome-text").textContent = `Hello, ${user.name}`;
    const userList = document.getElementById("user-list");
    userList.innerHTML = allUsers.map(u => `<p>👤 ${u.name} (${u.email})</p>`).join("");
  }
}
