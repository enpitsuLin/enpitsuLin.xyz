import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    darkMode: 'class',
    extract: {
        include: ['**/*.{jsx,tsx,css}'],
        exclude: ['node_modules', '.git', '.next'],
    },
})