// GitHub Pages serves 404.html for unknown paths. Copying the app shell there
// lets client-side routes like /about load directly.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
