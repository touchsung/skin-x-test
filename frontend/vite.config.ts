import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    preview: {
      host: true,
      port: Number(process.env.VITE_PORT) || 3000,
      strictPort: true,
    },
    server: {
      host: true,
      port: Number(process.env.VITE_PORT) || 3000,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },
    define: {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
      VITE_PORT: process.env.VITE_PORT,
    },
  });
});
