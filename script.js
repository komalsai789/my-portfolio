
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the footer year
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const menuButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#site-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal elements when they enter the viewport
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Project category filters
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute(
          "aria-pressed",
          String(item === button)
        );
      });

      projects.forEach((project) => {
        const matches =
          selectedCategory === "all" ||
          project.dataset.category === selectedCategory;

        project.hidden = !matches;
      });
    });
  });
});
