import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import path from 'path';

export default defineConfig({
  plugins: [
    nunjucks({
      templatesDir: path.resolve(process.cwd(), 'templates')
    })
  ],
  server: {
    port: 3000,
    open: true
  }
});
