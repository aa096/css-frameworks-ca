import { setRegisterFormListener } from "./handlers/register.mjs";
import { setLoginFormListener } from "./handlers/login.mjs"; 

document.addEventListener("DOMContentLoaded", () => {  
    const path = location.pathname;

    if (path === "/profile/login/index.html") {
        setLoginFormListener()
    } else if (path === "/profile/register/index.html") {
        setRegisterFormListener()
    }
});


