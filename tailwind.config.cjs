const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',

    content: [
        "./src/**/*.{html,js,svelte,ts}",
        require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
    ],

    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
        ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
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
