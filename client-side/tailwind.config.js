module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './index.html',
  ],
  theme: {
    container: {
      padding: '1rem',
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: '1500px',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1200px',
      'xl': '1500px'
    },
    fontFamily: {
      'sans': ['Nanum Gothic', 'sans-serif'],
      'display': ['Nanum Gothic', 'sans-serif'],
      'body': ['Nanum Gothic', 'sans-serif'],
    },
    extend: {
      colors: {
        "primary" : "#FFD369",
        "secondary" : "#393E46",
        "tertiary" : "#222831",
        "white": "#EEEEEE"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}