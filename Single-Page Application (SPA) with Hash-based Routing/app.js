// Define the routes and their corresponding content
const routes = {
  home: {
    title: "Home",
    content:
      "<h1>Welcome to the Home Page</h1><p>This is the main page of the Single Page Application.</p>",
  },
  about: {
    title: "About",
    content: "<h1>About Us</h1><p>Learn more about me.</p>",
  },
  contact: {
    title: "Contact",
    content: "<h1>Contact Us</h1><p>Get in touch with me.</p>",
  },
};

// Function to handle route changes
function handleRoute() {
  // Get the current hash, default to 'home' if empty
  const hash = window.location.hash.slice(1) || "home";

  // Get the content element
  const contentElement = document.getElementById("content");

  // Update the page details
  document.title = routes[hash]?.title || "SPA with Hash Routing";
  contentElement.innerHTML =
    routes[hash]?.content || "<h1>404 - Page Not Found</h1>";
}

// Add event listener for hash changes
window.addEventListener("hashchange", handleRoute);

// Initialize the app with the current route
window.addEventListener("load", handleRoute);
