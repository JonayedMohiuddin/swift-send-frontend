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
                'primary': '#0071dc',
                'primary-complementary': '#DC6B00',
                'primary-light': '#4995DB',
                'primary-dark': '#004f9a',

                'secondary': '#00B7DB',
                'third': '#00BEDF',
                'fourth': '#00DAB3',
                'fifth': '#00DAB3',
                'sixth': '#87EE85',
                'seventh': '#F9F871',


                'accent': '#f2f2f2',
                'writing-primary': '#000000',
                'writing-secondary': '#ffffff',
                'writing-important': '#2a8703',
                'writing-unimportant': '#90a8c0',
                'warning': '#ff0000',
            }
        }
    },
};
