import { login } from "../api/auth/login.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#login-form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // Send it to the API
      try {
        await login(profile);
        window.location.href = "/posts/";
      } catch (error) {
        console.error("Login error:", error);
      }
    });
  }
}
