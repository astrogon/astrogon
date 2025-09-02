// Client-side redirect handler for URLs like /redirect/[id]
// This replaces the server-side dynamic routing for GitHub Pages compatibility

(function () {
  // Only run on redirect pages
  if (!window.location.pathname.startsWith("/redirect/")) {
    return;
  }

  // Extract ID from URL path
  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  if (!id || id === "index.html" || id === "") {
    // No ID in URL, let the page handle it normally
    return;
  }

  // Redirect to the redirect handler with query parameter
  const newUrl = `/redirect/?id=${encodeURIComponent(id)}`;

  // Preserve any query parameters
  if (window.location.search) {
    newUrl += "&" + window.location.search.substring(1);
  }

  // Preserve hash
  if (window.location.hash) {
    newUrl += window.location.hash;
  }

  // Redirect immediately
  window.location.replace(newUrl);
})();
