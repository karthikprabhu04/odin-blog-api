import { authHeaders } from "./api.js";

async function createPost() {
  const res = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      title: document.querySelector("#title").value,
      content: document.querySelector("#content").value,
    })
  });

  console.log(await res.json());
}
