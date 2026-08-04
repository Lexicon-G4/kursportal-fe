const BASE_URL = "http://localhost:5765";

async function ApiInteract(endpoint, options) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL}/${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: `Request failed: ${response.status}` }));
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");

  if (contentLength === "0" || !contentType) return null;
  if (contentType && contentType.includes("application/json"))
    return response.json();

  return null;
}

export async function ServerGet(endpoint, options) {
  return ApiInteract(endpoint, { ...options, method: "GET" });
}

export async function ServerPost(endpoint, data, options) {
  return ApiInteract(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function ServerPut(endpoint, data, options) {
  return ApiInteract(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

export async function ServerDelete(endpoint, options) {
  return ApiInteract(endpoint, { ...options, method: "DELETE" });
}
