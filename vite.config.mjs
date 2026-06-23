import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    nunjucks({
      templatesDir: path.resolve(process.cwd(), 'templates')
    })
  ],
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: path.resolve(process.cwd(), 'index.html'),
        sub_page: path.resolve(process.cwd(), 'sub_page.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
