import {defineConfig} from "vite"
import {svelte} from "@sveltejs/vite-plugin-svelte"
import {minify} from "html-minifier"
import preprocess from "svelte-preprocess"
import tsconfigPaths from 'vite-tsconfig-paths'
import postcss from './postcss.config'

export default defineConfig(({mode}) => {
    const isProduction = mode === 'production'

    return {
        root: './',
        optimizeDeps: {
            exclude: ['@roxi/routify'],
        },
        css: {postcss},
        plugins: [svelte({preprocess: preprocess()}), tsconfigPaths(), isProduction && minifyHtml()],
        build: {
            minify: isProduction,
        },
    }
})

const minifyHtml = () => {
    return {
        name: 'html-transform',
        transformIndexHtml(html) {
            return minify(html, {collapseWhitespace: true})
        },
    }
}
