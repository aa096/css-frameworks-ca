import * as listners from "./handlers/index.mjs";
import { showPosts, showProfile } from "./display.mjs";

export function router() {
const path = location.pathname;

switch (path) {
    case "/index.html":
        listners.setLoginFormListener()
        return;
    case "/profile/register/":
        listners.setRegisterFormListener()
        return;
    case "/post/create/":
        listners.setCreatePostFormListener()
        return;
    case "/post/edit/":
        listners.setUpdatePostFormListener()
        return;
    case "/profile/edit/":
        listners.setUpdateProfileFormListener()
        return;
    case "/posts/":
        listners.setCreatePostFormListener()
        showPosts()
        return;
    case "/profile/":
        showProfile()
        return;
    }
}
   
