import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ampliOwned: fileURLToPath(new URL('./ampli-owned.html', import.meta.url)),
        unifiedClient: fileURLToPath(new URL('./unified-client.html', import.meta.url)),
      },
    },
  },
});
