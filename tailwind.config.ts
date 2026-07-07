import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0D0B",      // oiled iron — page base
        coal: "#181613",     // raised surfaces
        coal2: "#201D19",    // hover surfaces
        bone: "#EDE6D6",     // chalk dust — primary text
        sand: "#C4A876",     // cotton webbing — secondary accent
        ember: "#E8482B",    // stitching red — the one hot accent
        faded: "#8C8577",    // muted captions
        line: "rgba(237,230,214,0.14)",
      },
      fontFamily: {
        display: ["var(--font-changa)", "sans-serif"],
        body: ["var(--font-plex)", "sans-serif"],
      },
      boxShadow: {
        lift: "0 24px 60px -24px rgba(0,0,0,0.7)",
        ember: "0 8px 32px -8px rgba(232,72,43,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
