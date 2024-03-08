import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const action2 = "/posts"

export async function getProfiles() {
  const updateProfileURL = `${API_SOCIAL_URL}${action}`;

  const response = await authFetch(updateProfileURL)

  return await response.json();
}

export async function getProfile(name) {
    if (!name) {
        throw new Error("Get requires a name");
    }

    const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;
  
    const response = await authFetch(getProfileURL)
  
    return await response.json();
  }

  export async function getProfilePost(profileData) {
    if (!profileData.name) {
        throw new Error("Get requires a name");
    }

    const getProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}${action2}?_author=true`;
  
    const response = await authFetch(getProfileURL)
  
    return await response.json();
  }

