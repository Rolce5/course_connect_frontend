/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      colors: {
        gris: {
          50: "#FBF9F9",
          100: "#C4C4C4",
          300: "#696F79",
          400: "#4A4A4A",
          800: "#181B1A",
          900: "#000000",
        },
        primary: {
          200: "#1565D8",
          400: "#1935CA",
        },
        red: {
          400: "#A70F0F",
        },
        green: {
          400: "#6FD181",
        },
        gray: {
          400: "#B3B6B6",
        },
        "custom-dark": "#511D28",
        "custom-mid": "rgba(108, 40, 53, 0)",
        "custom-light": "rgba(92, 26, 36, 0.69)",
        // New colors for the sidebar
        sidebar: {
          bg: "#2c3e50", // Sidebar background
          hover: "#34495e", // Hover state
          active: "#3498db", // Active link
          text: "#ffffff", // Text color
          icon: "#bdc3c7", // Icon color
        },
      },
      width: {
        "calc-100-minus-250": "calc(100% - 250px)",
        "calc-100-minus-60": "calc(100% - 60px)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #511D28 15.1%, rgba(108, 40, 53, 0) 48.44%, rgba(92, 26, 36, 0.69) 100%)",
        "custom-gradient-1":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 51.04%, rgba(0, 0, 0, 0.2) 100%)",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      // Custom animations
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
      },
      // Custom shadows
      boxShadow: {
        sidebar:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "sidebar-active":
          "0 4px 6px -1px rgba(52, 152, 219, 0.3), 0 2px 4px -1px rgba(52, 152, 219, 0.2)",
      },
      // Custom spacing
      spacing: {
        sidebar: "250px", // Sidebar width
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};