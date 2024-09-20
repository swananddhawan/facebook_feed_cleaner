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
    const followElement = post.querySelector('span');

    if (isUnfollowedPage(followElement)) {
      removeUnfollowedPageNode(followElement);
    } else if (isReelsAndShortsSection(followElement)) {
      removeReelsAndShortsSection(followElement);
    }
  });
}

function isUnfollowedPage(followElement) {
  return followElement && followElement.innerText === "Follow";
}

function isReelsAndShortsSection(followElement) {
  return followElement && followElement.innerText === "Reels and short videos";
}

function getPostToDelete(followElement, depth) {
  let currentElement = followElement;
  let steps = 0;

  // Traverse up the DOM tree until the desired ancestor is reached
  while (currentElement && steps < depth) {
    currentElement = currentElement.parentElement;
    steps++;
  }

  return currentElement;
}

function removeUnfollowedPageNode(followElement) {
  const depthFromFeed = 26;
  const postToDelete = getPostToDelete(followElement, depthFromFeed);
  const feed = postToDelete.parentElement;

  feed.removeChild(postToDelete);
  console.log("deleted unfollowed node");

  return;
}

function removeReelsAndShortsSection(followElement) {
  const depthFromFeed = 22;
  const postToDelete = getPostToDelete(followElement, depthFromFeed);
  const feed = postToDelete.parentElement;

  feed && feed.removeChild(postToDelete);
  console.log("deleted reels and short video section");

  return;
}

// Run the function when the page is loaded
document.addEventListener("DOMContentLoaded", removeUnfollowedPosts);
console.error("in content.js"); // For debugging

// MutationObserver to check for new posts in the feed and apply the filtering
const observer = new MutationObserver(removeUnfollowedPosts);

const mainDiv = document.querySelector('div[role="main"]');
if (mainDiv) {
  observer.observe(mainDiv, { childList: true, subtree: true });
} else {
  console.error("Main div with role='main' not found for observing.");
}
