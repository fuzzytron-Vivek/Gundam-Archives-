import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plain Vite + React. `npm run build` outputs static files to /dist,
// which the existing Nginx image can serve unchanged.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
});
