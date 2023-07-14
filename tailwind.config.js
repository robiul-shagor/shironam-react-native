/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
        '3xl': '1600px',
    },
    extend: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                sm: '560px',
                md: '760px',
                lg: '980px',
                xl: '1200px',
                '2xl': '1270px',
            },
        },
        fontFamily: {
            sans: [
                "Inter, sans-serif",
            ],
            heading: [
                "'Noto Serif', serif"
            ],
            fontAwesome: [
                '"Font Awesome 5 Pro"'
            ]
        },
        colors: {
            'theme'         : '#F9020B',
            'theme_blue'    : '#3897F1',
            'dark'          : '#0D0D0D',
            'blue'          : '#0080FF',
        },
    },
  },
  plugins: [],
}

