import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as listners from "./handlers/index.mjs";

    const path = location.pathname;

    if (path === "/profile/login/") {
        listners.setLoginFormListener()
    } else if (path === "/profile/register/") {
        listners.setRegisterFormListener()
    } else if (path === "/post/create/") {
        listners.setCreatePostFormListener()
    } else if (path === "/post/edit/") {
        listners.setUpdatePostFormListener()
    }

async function testTemplate() {
    const posts = await postMethods.getPosts()
    const post = posts[45]
    const container = document.querySelector("#post-container");
    templates.renderPostTemplates(posts, container)
}

testTemplate()