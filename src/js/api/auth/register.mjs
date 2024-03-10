import { API_SOCIAL_URL } from "../constants.mjs";
import { showErrorModal } from "../../utils/errorModal.mjs";
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../../utils/loadingIndicator.mjs";

const action = "/auth/register";
const method = "post";

/**
 * Registers a new user by sending a POST request to the registration endpoint.
 *
 * @param {Object} profile - User profile object containing necessary information for registration.
 * @param {string} profile.username - User's desired username for registration.
 * @param {string} profile.email - User's email address for registration.
 * @param {string} profile.password - User's chosen password for registration.
 *
 * @throws {Error} Throws an error if the registration request fails.
 *
 * @returns {Promise<Object>} A promise that resolves with the registration result.
 *
 * @example
 * const newUserProfile = {
 *   username: 'newUser',
 *   email: 'newuser@example.com',
 *   password: 'newUserPassword',
 * };
 * try {
 *   const registrationResult = await register(newUserProfile);
 *   console.log('Registration successful:', registrationResult);
 * } catch (error) {
 *   console.error('Registration failed:', error);
 * }
 */

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
