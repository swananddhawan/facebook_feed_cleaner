function removeUnfollowedPosts() {
  // Find the main content area
  const mainDiv = document.querySelector('div[role="main"]');

  if (!mainDiv) {
    console.error("Main div with role='main' not found.");
    return;
  }

  // Find all sub-divs inside the main content area
  const posts = mainDiv.querySelectorAll('div');

  posts.forEach(post => {
    // Check if the post contains a span with the text "Follow"
    const followElement = post.querySelector('span');

    if (followElement && followElement.innerText === "Follow") {
      const postToDelete = followElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
      const feed = postToDelete.parentElement;

      feed.removeChild(postToDelete);

      console.log("deleted node");
    }
  });
}

// Run the function when the page is loaded
document.addEventListener("DOMContentLoaded", removeUnfollowedPosts);
console.error("in content.js")

// MutationObserver to check for new posts in the feed and apply the filtering
const observer = new MutationObserver(removeUnfollowedPosts);

const mainDiv = document.querySelector('div[role="main"]');
if (mainDiv) {
  observer.observe(mainDiv, { childList: true, subtree: true });
} else {
  console.error("Main div with role='main' not found for observing.");
}
