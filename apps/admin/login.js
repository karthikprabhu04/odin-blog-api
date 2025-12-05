document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("error").textContent = data.error || "Login failed";
      return;
    }

    // store JWT
    localStorage.setItem("token", data.token);

    // redirect to admin dashboard
    window.location.href = "/admin/dashboard.html";

  } catch (err) {
    console.log(err);
    document.getElementById("error").textContent = "Networks error";
  }
});
