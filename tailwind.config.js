const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
    ],

    plugins: [
        require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
        require('@tailwindcss/forms'),
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
