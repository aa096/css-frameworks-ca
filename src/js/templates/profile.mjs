import { removePost } from "../api/posts/delete.mjs";

const profileContainer = document.getElementById("profileContainer");

export function profileTemplate(profileData) {
  let containerDiv;

  if (profileData.length > 0) {
    const userProfile = profileData[0].author;

    document.getElementById("profileName").textContent = userProfile.name;

    const mainContainer = document.createElement("div");
    mainContainer.className = "justify-content-center";

    containerDiv = document.createElement("div");
    containerDiv.className = "d-lg-flex flex-md-column flex-nowrap banner";

    const profileDiv = document.createElement("div");
    profileDiv.className =
      "col-12 d-flex flex-column gap-3 align-items-center justify-content-center profile darker";

    if (userProfile.banner) {
      const profileBanner = document.createElement("div");
      profileBanner.classList.add("profileBanner");

      profileBanner.style.backgroundImage = `url('${userProfile.banner}')`;
      profileBanner.style.backgroundSize = "cover";
      profileDiv.appendChild(profileBanner);
    }

    const followerText = document.createElement("p");
    followerText.className = "text-primary text-center mt-5";
    followerText.textContent = userProfile.email;
    userProfile.email;

    if (userProfile.avatar) {
      const profileImage = document.createElement("img");
      profileImage.src = userProfile.avatar;
      profileImage.alt = `avatar of user ${userProfile.name}`;
      profileImage.className = "avatarUser";

      if (!userProfile.banner) {
        profileImage.style.position = "relative";
        profileImage.style.marginTop = "0px";
      }

      profileDiv.appendChild(profileImage);
    }

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn-primary mb-3";
    editButton.textContent = "Edit Profile";

    editButton.addEventListener("click", () => {
      window.location.href = "/profile/edit";
    });

    profileDiv.appendChild(followerText);
    profileDiv.appendChild(editButton);

    containerDiv.appendChild(profileDiv);

    profileData.forEach((profileData) => {
      const idLink = document.createElement("a");
      idLink.href = "/post/?id=" + profileData.id;

      const bgDiv = document.createElement("div");
      bgDiv.className = "col-lg-11 bg-dark mt-3 mb-3 p-3 mx-auto text-center";

      const postDiv = document.createElement("div");
      postDiv.className = "d-md-flex flex-md-row justify-content-center";

      const postContainer = document.createElement("div");
      postContainer.className = "p-2";

      if (profileData.media) {
        const img = document.createElement("img");
        img.src = profileData.media;
        img.alt = `Image from ${profileData.title}`;
        idLink.appendChild(img);
      }

      const dateObject = new Date(profileData.created);
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

      const postTitle = document.createElement("h2");
      postTitle.className = "text-center";
      postTitle.textContent = profileData.title;

      const postContent = document.createElement("p");
      postContent.textContent = profileData.body;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "btn btn-primary";
      deleteButton.textContent = "Delete ";

      const trashIcon = document.createElement("i");
      trashIcon.className = "fa-solid fa-trash";

      deleteButton.appendChild(trashIcon);

      deleteButton.addEventListener("click", () => {
        // Show a Bootstrap modal for confirmation
        const modal = new bootstrap.Modal(
          document.getElementById("deleteConfirmationModal")
        );
        modal.show();

        const confirmationButton = document.getElementById(
          "confirmDeleteButton"
        );
        confirmationButton.addEventListener("click", async () => {
          try {
            await removePost(profileData.id);
            window.location.reload(); 
          } catch (error) {
            console.error("Error deleting post", error);
          } finally {
            modal.hide();
          }
        });
      });

      const editPostButton = document.createElement("button");
      editPostButton.type = "button";
      editPostButton.className = "btn btn-primary m-2";
      editPostButton.textContent = "Edit ";

      const editIcon = document.createElement("i");
      editIcon.className = "fa-solid fa-pen-to-square";

      editPostButton.appendChild(editIcon);

      editPostButton.addEventListener("click", () => {
        window.location.href = `/post/edit/?id=${profileData.id}`;
      });

      idLink.appendChild(postTitle);
      idLink.appendChild(postContent);
      idLink.appendChild(published);
      postContainer.appendChild(idLink);
      postContainer.appendChild(editPostButton);
      postContainer.appendChild(deleteButton);
      postDiv.appendChild(postContainer);
      bgDiv.appendChild(postDiv);
      containerDiv.appendChild(bgDiv);
      mainContainer.appendChild(containerDiv);
    });

    return mainContainer;
  }
}

export function renderProfileTemplates(profileData) {
  profileContainer.append(profileTemplate(profileData));
}
