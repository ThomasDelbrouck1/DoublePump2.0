const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop the form from submitting automatically
  const formData = new FormData(loginForm);
  const loginData = Object.fromEntries(formData);

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.href = "/avatar";
    } else {
      alert(`${data.error}`);
    }
  } catch (err) {
    console.log(err);
  }
});