import * as storage from "../storage/index.mjs"

document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the logout link
    const logoutLink = document.getElementById("logoutLink");
  
    if (logoutLink) {
      logoutLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of the anchor link
        handleLogout(); // Call your logout function
      });
    }
  });
  
  export function handleLogout() {
    // Clear token and profile from storage
    storage.remove("token");
    storage.remove("profile");
  
    // Redirect to the login page
    window.location.href = "/";
  }