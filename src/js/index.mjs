import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs"; 
import { createPost } from "./api/posts/index.mjs";

import * as posts from "./api/posts/index.mjs";

document.addEventListener("DOMContentLoaded", () => {  
    const path = location.pathname;

    if (path === "/profile/login/index.html") {
        setLoginFormListener()
    } else if (path === "/profile/register/index.html") {
        setRegisterFormListener()
    }
});

createPost( {
    title: "Example Post",
    body: "Also an example"
})

