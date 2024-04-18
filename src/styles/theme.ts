import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    breakpoints: {
        "2xl": "2560px",
        "xl": "1440px",
        "lg": "1024px",
        "md": "768px",
        "sm": "425px",
        "xs": "375px",
        "xxs": "320px",
    },
    fonts: {
        body: "'Quicksand', sans-serif",
        heading: "'Quicksand', sans-serif",
    },
    styles: {
        global: {
            "::-webkit-scrollbar": {
                backgroundColor: "#fafafa",
                width: "12px",
                height: "12px",
            },
            "::-webkit-scrollbar-thumb": {
                backgroundColor: "#296CB3",
                borderRadius: "80px",
            },
            "html": {
                scrollBehavior: "smooth",
            },
            body: {
                boxSizing: 'border-box',
                backgroundColor: "#fafafa",
                margin: 0,
                padding: 0

            }
        },
    },
});