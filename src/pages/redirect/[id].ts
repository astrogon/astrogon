import type { APIRoute } from "astro";
import { getLinkById, incrementClickCount } from "@/lib/redirectService";

// Enable server-side rendering for dynamic routes
export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
  const { id } = params;

  if (!id) {
    return new Response("Link ID required", { status: 400 });
  }

  try {
    const link = await getLinkById(id);

    if (!link) {
      return redirect("/404", 302);
    }

    // Increment click count
    await incrementClickCount(id);

    // For affiliate links, redirect to a generic info page with query params
    if (link.affiliate) {
      return redirect(`/redirect-info?id=${id}`, 302);
    }

    // For non-affiliate links, redirect directly
    return redirect(link.targetUrl, 302);
  } catch (error) {
    console.error("Redirect error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
