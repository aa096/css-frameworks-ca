import * as templates from "./templates/index.mjs"
import * as postMethods from "./api/posts/index.mjs"
import { getProfilePost } from "./api/profiles/read.mjs";
import { showError } from "./utils/error.mjs";
import { load } from "./storage/index.mjs";

export async function showPosts() {
    try { 
        const posts = await postMethods.getPosts();
        templates.renderPostTemplates(posts);
        } 

        catch (error) {
            showError (error.message, "#post-container");
        }
}

export async function showProfile() {
    try {
        const profileName = load("profile");

        if (!profileName) {
            throw new Error("Profile name not found in localStorage");
        }

        const profile = await getProfilePost(profileName);
        templates.renderProfileTemplates(profile);
    } catch (error) {
        showError(error.message, "#profileContainer");
    }
}