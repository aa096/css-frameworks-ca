const profileContainer = document.getElementById("profileContainer");

export function profileTemplate(profileData) {
    document.getElementById("profileName").textContent = profileData.name;

    const profileDiv = document.createElement("div");
    profileDiv.className = 'col-lg-3 d-flex flex-column gap-3 align-items-center profile darker';

    const followerText = document.createElement("p");
    followerText.className = "text-primary text-center mt-5";
    followerText.textContent = "456 followers | 290 following";

    const profileImage = document.createElement('img');
    profileImage.src = profileData.avatar;
    profileImage.alt = `avatar of user ${profileData.name}`;
    profileImage.className = "profile";

    const editButton = document.createElement("button");
    editButton.type = "button"; 
    editButton.className = "btn btn-primary mb-3";
    editButton.textContent = "Edit Profile";

    profileDiv.appendChild(followerText);
    profileDiv.appendChild(profileImage);
    profileDiv.appendChild(editButton);

    return profileDiv;
}

export function renderProfileTemplates(profileData) {
    profileContainer.append(profileTemplate(profileData));
  }
  