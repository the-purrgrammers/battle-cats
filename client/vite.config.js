import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth" : "http://localhost:3000",
      "/game" : "http://localhost:3000",
      "/game/endturn" : "http://localhost:3000"
    }
  }
})


