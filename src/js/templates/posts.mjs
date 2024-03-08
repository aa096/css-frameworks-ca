import { load } from "../storage/index.mjs";
import { removePost } from "../api/posts/delete.mjs";

  const createPostButton = document.querySelector("#createPostButton");
  const createPostForm = document.getElementById("createPost");
  const caretIcon = document.getElementById("caretIcon");

  if (createPostButton) {
  createPostButton.addEventListener("click", function () {
    // Toggle the visibility of the createPost form
    createPostForm.classList.toggle("hidden");

    caretIcon.classList.toggle("fa-caret-up");
    caretIcon.classList.toggle("fa-caret-down");
  });
  }

const container1 = document.querySelector("#post-container");

export function postTemplate(postData) {
  const profile = load ("profile");

  const isOwner = profile && postData.author.email === profile.email;

  const postContainer = document.createElement("div");
  postContainer.classList.add("justify-content-center");

  const idLink = document.createElement("a");
  idLink.href = "/post/?id=" + postData.id;

  const bgDark = document.createElement("div");
  bgDark.classList.add("col-lg-11", "mx-auto", "bg-dark", "mt-3", "mb-3", "p-3");

  const innerDiv = document.createElement("div");
  innerDiv.classList.add(
    "d-md-flex",
    "flex-md-row",
    "flex-md-column",
    "justify-content-center"
  );

  const p2Div = document.createElement("div");
  p2Div.classList.add("p-2", "text-center");

  const h2Title = document.createElement("h2");
  h2Title.textContent = postData.title;
  h2Title.classList.add("text-center");

  const pText = document.createElement("p");
  pText.textContent = postData.body;
  pText.classList.add("text-center");

  const dateObject = new Date(postData.created);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = dateObject.toLocaleString(undefined, options);

  const published = document.createElement("p");
  published.textContent = `Published: ${formattedDate}`;
  published.classList.add("published");

  const userDiv = document.createElement("div");
  userDiv.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "gap-3",
    "user"
  );

  const h3User = document.createElement("h3");
  h3User.classList.add("display-5");
  h3User.textContent = "Posted by:";

  userDiv.appendChild(h3User);


  if (postData.author.avatar) {
    const imgAvatar = document.createElement("img");
    imgAvatar.src = postData.author.avatar;
    imgAvatar.alt = `avatar of user ${postData.author.name}`;
    userDiv.appendChild(imgAvatar);
  }

  const h3UserName = document.createElement("h3");
  h3UserName.classList.add("display-4");
  h3UserName.textContent = postData.author.name;
  userDiv.appendChild(h3UserName);

  if (postData.media) {
    const img = document.createElement("img");
    img.src = postData.media;
    img.alt = `Image from ${postData.title}`;
    idLink.appendChild(img);
  }


idLink.appendChild(h2Title);
idLink.appendChild(pText);
idLink.appendChild(published);
p2Div.appendChild(idLink); 

  if (isOwner) {
    const editPostButton = document.createElement("button");
    editPostButton.type = "button";
    editPostButton.className = "btn btn-primary m-2";
    editPostButton.textContent = "Edit ";

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square"; 

    editPostButton.appendChild(editIcon);

    editPostButton.addEventListener("click", () => {
      window.location.href = `/post/edit/?id=${postData.id}`;
    });

    p2Div.appendChild(editPostButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-primary";
    deleteButton.textContent = "Delete ";

    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";

    deleteButton.appendChild(trashIcon);

    deleteButton.addEventListener("click", () => {
      const modal = new bootstrap.Modal(
        document.getElementById("deleteConfirmationModal")
      );
      modal.show();

      const confirmationButton = document.getElementById("confirmDeleteButton");
      confirmationButton.addEventListener("click", async () => {
        try {
          await removePost(postData.id);
          window.location.reload();
        } catch (error) {
          console.error("Error deleting post", error);
        } finally {
          modal.hide();
        }
      });
    });

    p2Div.appendChild(deleteButton);
  }

innerDiv.appendChild(p2Div);
bgDark.appendChild(innerDiv);
bgDark.appendChild(userDiv);

postContainer.appendChild(bgDark);

  return postContainer;
}

export function renderPostTemplates(postDataList) {
  container1.append(...postDataList.map(postTemplate));
}
