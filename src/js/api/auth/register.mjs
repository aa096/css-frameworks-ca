import { API_SOCIAL_URL } from "../constants.mjs";
import { showErrorModal } from "../../utils/errorModal.mjs";
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../../utils/loadingIndicator.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    showLoadingIndicator();

    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      showErrorModal(
        errorResponse?.errors?.[0]?.message ||
          "Registration failed. Please try again."
      );

      throw new Error(
        errorResponse?.errors?.[0]?.message ||
          "Registration failed. Please try again."
      );
    }
    hideLoadingIndicator();

    redirectToLogin();

    const result = await response.json();
    return result;
  } catch (error) {
    hideLoadingIndicator();
    console.error("Registration error:", error);
  }
}

function redirectToLogin() {
  window.location.href = "/";
}
