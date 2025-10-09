import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'

// Carga las variables de entorno desde .env
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
