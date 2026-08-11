(() => {
  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shell = document.querySelector(".site-shell");
    const sections = shell ? [...shell.querySelectorAll(".snap-section")] : [];

    if (!shell || sections.length === 0) return;

    document.documentElement.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.58) {
            entry.target.classList.add("is-revealed");
          } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.18) {
            entry.target.classList.remove("is-revealed");
          }
        });
      },
      { root: shell, threshold: [0, 0.18, 0.58] },
    );

    window.setTimeout(() => {
      sections.forEach((section) => observer.observe(section));
    }, 350);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
