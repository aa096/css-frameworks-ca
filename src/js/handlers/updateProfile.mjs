import { getProfile, updateProfile } from "../api/profiles/index.mjs";
import { load } from "../storage/index.mjs";

export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#editProfile");

  const { name, email } = load("profile");
  document.getElementById("profileName").textContent = name;

  if (form) {
    form.name.value = name;
    form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile(name);

    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    const updateButtonState = () => {
      const avatarValue = form.avatar.value.trim();
      const bannerValue = form.banner.value.trim();
      button.disabled = !avatarValue && !bannerValue;
    };

    form.avatar.addEventListener("input", updateButtonState);
    form.banner.addEventListener("input", updateButtonState);

    updateButtonState();

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      profile.email = email;

      try {
        const updatedProfile = await updateProfile(profile);

        if (updatedProfile) {
          window.location.href = "/profile";
        } else {
          console.error("Update failed");
        }
      } catch (error) {
        console.error("Error updating profile", error);
      }
    });
  }
}
