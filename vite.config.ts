import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@headlessui/react', 'framer-motion'],
          'vendor-markdown': ['react-markdown', 'remark-math', 'remark-gfm', 'rehype-katex', 'rehype-prism-plus'],
          'vendor-syntax': ['prismjs'],
          'vendor-icons': ['lucide-react'],
          'vendor-utils': ['clsx', 'tailwind-merge']
        }
      }
    }
  }
});