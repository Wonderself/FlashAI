/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        primary: {50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81"},
        surface: {50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},
        accent: {400:"#22d3ee",500:"#0ea5e9",600:"#0284c7"},
        neon: {blue:"#00f0ff",purple:"#bf00ff",pink:"#ff006e",green:"#00ff87",orange:"#ff8c00",gold:"#ffd700",cyan:"#06b6d4"}
      },
      fontFamily: {
        display: ["Space Grotesk","system-ui","sans-serif"],
        body: ["Inter","system-ui","sans-serif"],
        mono: ["JetBrains Mono","monospace"]
      }
    }
  },
  plugins: [],
}
