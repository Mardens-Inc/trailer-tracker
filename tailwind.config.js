import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    primary: {
                        DEFAULT: "#f13848",
                        foreground: "#fff",
                    },
                    secondary: "#2b2b2b",
                    background: "#ffffff",

                }
            },
            dark: {
                colors: {
                    primary: {
                        DEFAULT: "hsl(20,95%,49%)",
                        foreground: "#fff",
                    },
                    background: {
                        "L200": "hsl(0,0%,13%)",
                        "L100": "hsl(0,0%,10%)",
                        DEFAULT: "hsl(0,0%,5%)",
                        "L-100": "hsl(0,0%,3%)",
                        "L-200": "hsl(0,0%,0%)",
                    },
                    error:{
                        DEFAULT: "#d03e32",
                        foreground: "#fff",
                    },
                    warning: {
                        DEFAULT: "#dfa129",
                        foreground: "#000",
                    }
                }
            },
        }
    })]
}