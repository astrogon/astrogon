// @ts-nocheck
// Client-side link management for GitHub Pages compatibility
let linkMappings = null;

// Initialize link mappings from static JSON
async function initializeLinkMappings() {
  try {
    const response = await fetch("/data/link-mappings.json");
    linkMappings = await response.json();
  } catch (error) {
    console.error("Failed to load link mappings:", error);
    linkMappings = {
      links: {},
      analytics: {
        totalClicks: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    };
  }
}

// Get link by ID
function getLinkById(id) {
  if (!linkMappings) {
    console.error("Link mappings not initialized");
    return null;
  }

  const link = linkMappings.links[id];
  if (!link) {
    return null;
  }

  // Handle legacy links without openInNewTab property
  return {
    ...link,
    openInNewTab: link.openInNewTab ?? true, // Default to true
  };
}

// Increment click count (client-side storage)
function incrementClickCount(id) {
  if (!linkMappings) {
    console.error("Link mappings not initialized");
    return;
  }

  if (!linkMappings.links[id]) {
    console.error("Link not found:", id);
    return;
  }

  // Get current counts from localStorage
  const stored = localStorage.getItem("linkClickCounts");
  const clickCounts = stored ? JSON.parse(stored) : {};

  // Increment count
  clickCounts[id] = (clickCounts[id] || 0) + 1;

  // Store back to localStorage
  localStorage.setItem("linkClickCounts", JSON.stringify(clickCounts));

  // Update total clicks
  const totalClicks = Object.values(clickCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  localStorage.setItem("totalLinkClicks", totalClicks.toString());
  localStorage.setItem(
    "lastLinkUpdate",
    new Date().toISOString().split("T")[0]
  );
}

async function loadLinkInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    showError();
    return;
  }

  try {
    // Initialize link mappings
    await initializeLinkMappings();

    // Get link info from static data
    const link = getLinkById(id);

    if (!link) {
      showError();
      return;
    }

    // Increment click count
    incrementClickCount(id);

    showLinkInfo(link);

    // Auto-redirect after delay
    const redirectDelay = link.affiliate ? 3000 : 2000;
    setTimeout(() => {
      if (link.openInNewTab) {
        window.open(link.targetUrl, "_blank");
      } else {
        window.location.href = link.targetUrl;
      }
    }, redirectDelay);
  } catch (error) {
    console.error("Error loading link info:", error);
    showError();
  }
}

function showLinkInfo(link) {
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");

  if (loading) loading.style.display = "none";
  if (content) {
    content.className = "glass glass-hover rounded-xl p-8 text-center";
    content.innerHTML = `
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2">Weiterleitung</h1>
        <p class="text-gray-600 dark:text-gray-300">
          Du wirst in wenigen Sekunden weitergeleitet...
        </p>
      </div>

      <div class="bg-white/10 rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-2">${link.title}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-3">${link.description}</p>
        
        <div class="flex items-center justify-center gap-4 text-sm">
          <span class="px-3 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full">
            ${link.provider}
          </span>
          <span class="px-3 py-1 bg-gray-500/20 text-gray-600 dark:text-gray-400 rounded-full">
            ${link.category}
          </span>
        </div>
      </div>

      ${
        link.affiliate
          ? `
      <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
        <p class="text-sm text-yellow-700 dark:text-yellow-300">
          <strong>Hinweis:</strong> Dies ist ein Affiliate-Link. Wenn du über diesen Link etwas kaufst, 
          erhalte ich eine kleine Provision, ohne dass für dich zusätzliche Kosten entstehen.
        </p>
      </div>
      `
          : ""
      }

      <div class="space-y-4">
        <a 
          href="${link.targetUrl}"
          class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          rel="${link.affiliate ? "nofollow sponsored" : "nofollow"}"
          target="_blank"
        >
          Jetzt zu ${link.provider} →
        </a>
        
        <p class="text-xs text-gray-500">
          Oder warte, du wirst automatisch weitergeleitet.
        </p>
      </div>
    `;
    content.style.display = "block";
  }
}

function showError() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  if (loading) loading.style.display = "none";
  if (error) error.style.display = "block";
}

// Load link info when page loads
document.addEventListener("DOMContentLoaded", loadLinkInfo);
