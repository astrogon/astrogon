import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const testParam = url.searchParams.get("test");

  return new Response(
    JSON.stringify({
      url: request.url,
      testParam,
      searchParams: url.search,
      pathname: url.pathname,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
