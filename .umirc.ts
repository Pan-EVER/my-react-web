import { defineConfig } from "umi";
import routes from "./config/routes";
import proxy from "./config/proxy";

export default defineConfig({
  routes: routes,
  npmClient: "npm",
  proxy,
});
