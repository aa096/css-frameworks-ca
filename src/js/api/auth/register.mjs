import { API_SOCIAL_URL } from "../constants.mjs";
import { showErrorModal } from "../../utils/errorModal.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_SOCIAL_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      // Handle the case where registration fails
      const errorResponse = await response.json();

      // Display error in the modal
      showErrorModal(errorResponse?.errors?.[0]?.message || "Registration failed. Please try again.");

      throw new Error(errorResponse?.errors?.[0]?.message || "Registration failed. Please try again.");
    }

    // If registration is successful, perform necessary actions
    // For example, save data or update the UI

    // Redirect to login after a successful registration
    redirectToLogin();

    // Return the result if needed
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Registration error:", error);
  }
}

function redirectToLogin() {
  // Redirect to the login page
  window.location.href = "/";
}

