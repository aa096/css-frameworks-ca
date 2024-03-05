import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs"; 
import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/index.mjs"


document.addEventListener("DOMContentLoaded", () => {  
    const path = location.pathname;

    if (path === "/profile/login/index.html") {
        setLoginFormListener()
    } else if (path === "/profile/register/index.html") {
        setRegisterFormListener()
    }
});

async function testTemplate() {
    const posts = await postMethods.getPosts()
    const post = posts[45]
    const container = document.querySelector("#post-container");
    templates.renderPostTemplates(posts, container)
}

testTemplate()