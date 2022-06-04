import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    define: {
        __APP_NAME__: JSON.stringify('niklas'),
    },
    plugins: [react()],
})
