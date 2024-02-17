/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                'ember-light' : ['amazon-ember-lt', 'sans-serif'],  
                'ember-regular' : ['amazon-ember-rg', 'sans-serif'],
                'ember-bold' : ['amazon-ember-bd', 'sans-serif'],
                'ember-heavy' : ['amazon-ember-he', 'sans-serif'],
            },
            colors: {
                'daraz-orange': '#f85606',
            }
        }
    },
};
