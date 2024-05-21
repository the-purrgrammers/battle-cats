import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/auth" : "http://localhost:3000",
      "/api/game" : "http://localhost:3000",
      "/api/game/endturn" : "http://localhost:3000"
    }
  }
})