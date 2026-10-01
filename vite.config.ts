import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Render の Web Service として `npm start` で配信する際に外部ホストを許可
  preview: { allowedHosts: true },
})
