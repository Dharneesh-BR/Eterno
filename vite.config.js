import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: '/',
    plugins: [
      react({
        // Use modern JSX transform
        jsxImportSource: 'react',
        // Enable fast refresh in development
        fastRefresh: !isProduction,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      minify: 'terser',
      chunkSizeWarningLimit: 1000,
      target: 'esnext', // Target modern browsers
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@sanity/client'],
            ui: ['@heroicons/react', 'react-icons'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          },
        },
        // Remove unused exports
        treeshake: 'smallest',
        // Externalize Firebase modules if needed
        external: (id) => {
          return false; // Keep Firebase bundled for now
        },
      },
      // Optimize assets
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      // Modern build optimization
      cssMinify: true,
      // Remove console logs in production
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
        sourceMap: !isProduction, // Enable source maps in development
      },
    },
    server: {
      port: 3000,
      // No proxy needed when using CDN directly
      cors: true, // Enable CORS for development
      open: true,
    },
  };
});
