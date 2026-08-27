let req = $request;

delete req.headers["If-None-Match"];
delete req.headers["if-none-match"];
delete req.headers["Segments"];
delete req.headers["segments"];

$done({ request: req });
