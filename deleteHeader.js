let url = $request.url || "";
let headers = $request.headers || {};

if (url.includes("/subscribers/")) {
  delete headers["X-RevenueCat-ETag"];
  delete headers["x-RevenueCat-etag"];

}

$done({ headers });