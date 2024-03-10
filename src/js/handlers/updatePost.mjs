import { getPost, updatePost } from "../api/posts/index.mjs";

export async function setUpdatePostFormListener() {
  const form = document.querySelector("#editPost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const button = form.querySelector("button");
    button.disabled = true;

    const post = await getPost(id);

    form.title.value = post.title;
    form.body.value = post.body;
    form.media.value = post.media;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const updatedPost = Object.fromEntries(formData.entries());
      updatedPost.id = id;

      try {
        await updatePost(updatedPost);

        window.location.href = `/post/?id=${id}`;
      } catch (error) {
        console.error("Error updating post", error);
      }
    });
  }
}
