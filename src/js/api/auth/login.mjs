import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { showErrorModal } from "../../utils/errorModal.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      // Handle the case where login fails
      const errorResponse = await response.json();

      // Display error in the modal
      showErrorModal(errorResponse?.errors?.[0]?.message || "Login failed. Please try again.");

      throw new Error(errorResponse?.errors?.[0]?.message || "Login failed. Please try again.");
    }

    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);

    window.location.href = "/posts/";
  } catch (error) {
    console.error("Login error:", error);
  }
}
