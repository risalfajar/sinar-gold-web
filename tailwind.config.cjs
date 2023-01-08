const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',

    content: [
        "./src/**/*.{html,js,svelte,ts}",
        require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
    ],

    plugins: [
        require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans]
            },
            transitionProperty: {
                'width': 'width'
            }
        },
    },
}
