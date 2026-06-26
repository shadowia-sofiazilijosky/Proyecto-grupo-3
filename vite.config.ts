import { defineConfig } from 'vite';
import path from "node:path";
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  base: '/Proyecto-grupo-3/',
})