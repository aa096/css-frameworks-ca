import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../../utils/loadingIndicator.mjs";

const action = "/profiles";
const action2 = "/posts";

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
