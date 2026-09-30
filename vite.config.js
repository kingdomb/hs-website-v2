import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site lives under /hs-website-v2/; local dev stays at /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/hs-website-v2/' : '/',
  plugins: [react()],
}));
