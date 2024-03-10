import * as storage from "../storage/index.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const logoutLink = document.getElementById("logoutLink");

  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      handleLogout();
    });
  }
});

export function handleLogout() {
  storage.remove("token");
  storage.remove("profile");

  window.location.href = "/";
}
