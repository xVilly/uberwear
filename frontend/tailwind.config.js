/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary-color)',
          secondary: 'var(--secondary-color)',
        }
      },
    },
    plugins: [require('@tailwindcss/forms')],
  };
