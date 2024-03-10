import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

/**
 * Updates a user profile with the provided data by sending a PUT request to the social media API.
 *
 * @param {Object} profileData - The data object containing information about the profile to be updated.
 * @param {string} [profileData.avatar] - The updated URL of the profile avatar or image.
 * @param {string} [profileData.banner] - The updated URL of the profile banner image.
 *
 * @throws {Error} If the provided profileData is missing the required 'name' property.
 * @throws {Error} If there is an issue updating the profile or parsing the response.
 *
 * @returns {Object} The updated profile data retrieved from the API.
 *
 * @example
 * try {
 *   const updatedProfileData = await updateProfile({
 *     avatar: "https://example.com/avatar.jpg",
 *     bannerImage: "https://example.com/cover.jpg",
 *   });
 *   console.log("Profile updated successfully:", updatedProfileData);
 * } catch (error) {
 *   console.error("Error updating profile:", error.message);
 * }
 */

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update requires a name");
  }

  const updateProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}/media`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  return await response.json();
}
