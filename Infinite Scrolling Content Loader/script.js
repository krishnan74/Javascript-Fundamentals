// Container for the posts
const postsContainer = document.getElementById("posts-container");
// Loader Container
const loadContainer = document.querySelector(".loader");

// Set limit for the number of posts in a page
const limit = 5;

// Set the initial page number
let page = 1;

// Fetch the posts from external API
async function fetchPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = res.json();

  return data;
}

// Display the posts in the container
async function showPosts() {
  const posts = await fetchPosts();
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <div class="post-content">
          <div class="post-header">
            <span class="post-id">#${post.id}</span>
            <h2 class="post-title">${post.title}</h2>
          </div>
          <div class="post-body">
            <p>${post.body}</p>
          </div>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Load the initial posts
showPosts();

// Add an event listener on scroll to load more posts
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Check if the user has scrolled to the bottom of the page
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadContainer.classList.add("show");

    setTimeout(() => {
      loadContainer.classList.remove("show");

      setTimeout(() => {
        page++; // Increment the page number
        showPosts();
      }, 300); // Delay to simulate loading time
    }, 1000);
  }
});
