import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ext_background: "#0E0F11",
                ext_light_background: "#141617",
                ext_foreground: "#ffffff",
                ext_light_foreground: "#ffffff12",
                ext_yellow: "#eef35f",
                ext_indigo: "#b6abff",
                ext_green: "#8eda75",
                ext_red: "#ff978f",
                ext_blue: "#5fa6fa",
                ext_orange: "#ffd687"

                //background: "var(--background)",
                //foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
} satisfies Config;
