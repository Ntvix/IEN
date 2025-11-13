
document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => observer.observe(el));

  const body = document.body;
  const toggle = document.querySelector(".theme-toggle");
  const saved = window.localStorage.getItem("ien-theme");
  if (saved === "dark") {
    body.classList.add("dark");
  } else if (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark");
  }
  if (toggle) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      window.localStorage.setItem("ien-theme", body.classList.contains("dark") ? "dark" : "light");
    });
  }

  const progress = document.getElementById("scroll-progress");
  const backTop = document.getElementById("back-to-top");
  const updateScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = scrolled + "%";
    if (backTop) {
      if (scrollTop > 300) backTop.classList.add("show");
      else backTop.classList.remove("show");
    }
  };
  window.addEventListener("scroll", updateScroll);
  updateScroll();

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
