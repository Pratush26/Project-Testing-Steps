tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
};

(function () {
  const root = document.documentElement;

  function getPreferred() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    root.classList.toggle("dark", theme === "dark");
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      const icon = btn.querySelector("[data-theme-icon]");
      const label = btn.querySelector("[data-theme-label]");
      if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
      if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
    });
  }

  function init() {
    const theme = getPreferred();
    apply(theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = root.classList.contains("dark") ? "light" : "dark";
        localStorage.setItem("theme", next);
        apply(next);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
