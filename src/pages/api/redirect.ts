import type { APIRoute } from "astro";
import { getLinkById, incrementClickCount } from "@/lib/redirectService";

export const GET: APIRoute = async ({ request, redirect }) => {
  // Parse URL from request
  const requestUrl = new URL(request.url);
  const id = requestUrl.searchParams.get("id");

  if (!id) {
    return new Response("Link ID required", { status: 400 });
  }

  try {
    const link = await getLinkById(id);

    if (!link) {
      return redirect("/404", 302);
    }

    // Increment click count in background - don't wait for it
    incrementClickCount(id).catch(error => {
      console.error("Failed to increment click count:", error);
    });

    // For affiliate links, redirect to info page with query params
    if (link.affiliate) {
      // Pass the original referrer as return URL
      const referrer = requestUrl.searchParams.get('return') || request.headers.get('referer') || '';
      const returnParam = referrer ? `&return=${encodeURIComponent(referrer)}` : '';
      return redirect(`/redirect-info?id=${id}${returnParam}`, 302);
    }

    // For non-affiliate links, redirect directly
    return redirect(link.targetUrl, 302);
  } catch (error) {
    console.error("Redirect error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
