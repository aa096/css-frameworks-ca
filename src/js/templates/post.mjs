export function postTemplate(postData) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("justify-content-center");

    const div1 = document.createElement("div");
    div1.classList.add("col-lg-11", "mx-auto", "bg-dark", "mt-3", "mb-3", "p-3");

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("d-md-flex", "flex-md-row", "flex-md-column", "justify-content-center");

    const p2Div = document.createElement("div");
    p2Div.classList.add("p-2", "text-center");

    const h2Title = document.createElement("h2");
    h2Title.textContent = postData.title;
    h2Title.classList.add("text-center");

    const pText = document.createElement("p");
    pText.textContent = postData.body;
    pText.classList.add("text-center");

    const userDiv = document.createElement("div");
    userDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "gap-3", "user");

    const h3User = document.createElement("h3");
    h3User.classList.add("display-5");
    h3User.textContent = "Posted by:";

    // const imgAvatar = document.createElement("img");
    // imgAvatar.src = postData.author && postData.author.avatar ? postData.author.avatar : "";
    // imgAvatar.alt = "avatar of user";

    // const h3UserName = document.createElement("h3");
    // h3UserName.classList.add("display-4");
    // h3UserName.textContent = postData.author && postData.author.name ? postData.author.name : "";

    userDiv.appendChild(h3User);
    // userDiv.appendChild(imgAvatar);
    // userDiv.appendChild(h3UserName);

    if (postData.media) {
        const img = document.createElement("img")
        img.src = postData.media;
        img.alt = `Image from ${postData.title}`;
        p2Div.appendChild(img);
    }

    p2Div.appendChild(h2Title);
    p2Div.appendChild(pText);
    p2Div.appendChild(userDiv);

    innerDiv.appendChild(p2Div);
    div1.appendChild(innerDiv);

    postContainer.appendChild(div1);

    return postContainer;
}

export function renderPostTemplate(postData, parent) {
    parent.append(postTemplate(postData))
}

export function renderPostTemplates(postDataList, parent) {
    parent.append(...postDataList.map(postTemplate))
}