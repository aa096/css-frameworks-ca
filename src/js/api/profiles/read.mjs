import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../../utils/loadingIndicator.mjs";

const action = "/profiles";
const action2 = "/posts";

/**
 * Fetches a list of profiles from the social media API.
 *
 * @throws {Error} If there is an issue fetching profiles or parsing the response.
 *
 * @returns {Array} An array containing profile data retrieved from the API.
 *
 * @example
 * try {
 *   const profiles = await getProfiles();
 *   console.log("Profiles fetched successfully:", profiles);
 * } catch (error) {
 *   console.error("Error fetching profiles:", error.message);
 * }
 */

export async function getProfiles() {
  try {
    showLoadingIndicator();
    const updateProfileURL = `${API_SOCIAL_URL}${action}`;

    const response = await authFetch(updateProfileURL);

    if (!response.ok) {
      throw new Error("Error, unable to fetch profile");
    }
    hideLoadingIndicator();

    return await response.json();
  } catch (error) {
    hideLoadingIndicator();
    throw error;
  }
}

/**
 * Fetches a specific profile by name from the social media API.
 *
 * @param {string} name - The name of the profile to be fetched.
 *
 * @throws {Error} If the provided name is empty or if there is an issue fetching the profile or parsing the response.
 *
 * @returns {Object} The profile data for the specified name retrieved from the API.
 *
 * @example
 * try {
 *   const profile = await getProfile("example_username");
 *   console.log("Profile fetched successfully:", profile);
 * } catch (error) {
 *   console.error("Error fetching profile:", error.message);
 * }
 */

export async function getProfile(name) {
  try {
    showLoadingIndicator();

    if (!name) {
      throw new Error("Get requires a name");
    }

    const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;

    const response = await authFetch(getProfileURL);
    hideLoadingIndicator();

    return await response.json();
  } catch (error) {
    hideLoadingIndicator();
    throw error;
  }
}

/**
 * Fetches posts associated with a specific profile from the social media API.
 *
 * @param {Object} profileData - The data object containing information about the profile.
 * @param {string} profileData.name - The name of the profile for which to fetch posts.
 *
 * @throws {Error} If the provided profileData is missing the required 'name' property or if there is an issue fetching posts or parsing the response.
 *
 * @returns {Array} An array containing post data associated with the specified profile retrieved from the API.
 *
 * @example
 * try {
 *   const profilePosts = await getProfilePost({ name: "example_username" });
 *   console.log("Profile posts fetched successfully:", profilePosts);
 * } catch (error) {
 *   console.error("Error fetching profile posts:", error.message);
 * }
 */

export async function getProfilePost(profileData) {
  try {
    showLoadingIndicator();

    if (!profileData.name) {
      throw new Error("Get requires a name");
    }

    const getProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}${action2}?_author=true`;

    const response = await authFetch(getProfileURL);
    hideLoadingIndicator();

    return await response.json();
  } catch (error) {
    hideLoadingIndicator();
    throw error;
  }
}
