import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { showErrorModal } from "../../utils/errorModal.mjs";
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../../utils/loadingIndicator.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    showLoadingIndicator();

    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      showErrorModal(
        errorResponse?.errors?.[0]?.message || "Login failed. Please try again."
      );

      throw new Error(
        errorResponse?.errors?.[0]?.message || "Login failed. Please try again."
      );
    }
    hideLoadingIndicator();

    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);

    window.location.href = "/posts/";
  } catch (error) {
    hideLoadingIndicator();
    console.error("Login error:", error);
  }
}
