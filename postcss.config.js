import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'

export default {
    plugins: [
        tailwind(tailwindConfig),
        autoprefixer({overrideBrowserslist: ['defaults and last 4 versions']}),
        postcssImport(),
    ],
}
