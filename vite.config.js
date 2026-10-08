import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Allow access through tunnels such as ngrok (any host name).
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
});
