import { defineConfig, type UserConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        coverage: {
            provider: 'v8'
        },
        setupFiles: './vitest.setup.js',
    }
} as UserConfig) 
