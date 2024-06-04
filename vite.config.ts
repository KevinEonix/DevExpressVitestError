/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(function () {
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      modulePreload: { resolveDependencies: (_, deps) => deps.filter(d => !d.includes('Admin')) }
    },
    resolve: {
      alias: {
        'tailwind.config.js': path.resolve(__dirname, 'tailwind.config.js'),
        '@': path.resolve(__dirname, './src')
      },
      mainFields: ['module', 'browser', 'jsnext:main', 'jsnext']
    },
    optimizeDeps: { include: [path.resolve(__dirname, 'tailwind.config.js')] },
    server: {
      watch: {
        usePolling: true,
        ignored: ['!**/__mocks__/**', '**/*.test.*', '**/*.spec.*']
      },
      host: true,
      strictPort: true,
      port: 5173
    },
    test: {
      globals: true,
      testTimeout: 20000,
      environment: 'jsdom',
      setupFiles: ['./src/setupTest.ts'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/__mocks__/**',
        'src/pages/main'
      ],
      typecheck: { include: ['src/**/*.test.(ts|tsx)'] },
      coverage: {
        provider: 'istanbul',
        reporter: ['json', 'lcov', 'text', 'clover', 'cobertura', 'html'],
        exclude: [
          'node_modules/',
          'src/setupTest.ts',
          '**/__mocks__/**',
          'src/store/',
          'src/app'
        ]
      },
      pool: "forks"
    }
  };
});
