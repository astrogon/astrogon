// @ts-nocheck
async function loadLinkInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    showError();
    return;
  }

  try {
    // Fetch link info from API
    const response = await fetch(`/api/link-info?id=${id}`);
    const link = await response.json();

    if (!response.ok || link.error) {
      showError();
      return;
    }

    showLinkInfo(link);

    // Auto-redirect after delay
    const redirectDelay = link.affiliate ? 3000 : 2000;
    setTimeout(() => {
      window.location.href = link.targetUrl;
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
