document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const featureCards = document.querySelectorAll(".feature-card");
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");
  const featuresSection = document.querySelector(".features-section");
  const featuresTitle = featuresSection.querySelector("h2");
  const navbar = document.querySelector(".navbar");

  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });

        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburgerMenu.classList.remove("active");
        }
      }
    });
  });

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    body.classList.add("dark-mode");
  }

  const setBodyPadding = () => {
    const navbarHeight = navbar.offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
  };

  const setNavbarScrollState = () => {
    if (window.scrollY < 10) {
      navbar.classList.add("at-top");
    } else {
      navbar.classList.remove("at-top");
    }
  };

  setNavbarScrollState();
  setBodyPadding();

  window.addEventListener("resize", setBodyPadding);

  themeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    setNavbarScrollState();
  });

  hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
  });

  featureCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("hero-content")) {
          heroContent.classList.add("animate");
          heroImage.classList.add("animate");
        } else if (entry.target.classList.contains("features-section")) {
          featuresTitle.classList.add("animate");
          entry.target
            .querySelectorAll(".feature-card")
            .forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = 1;
                card.style.transform = "translateY(0)";
              }, index * 350 + 700);
            });
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(heroContent);
  observer.observe(featuresSection);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.05}px)`;
    }
    if (heroImage) {
      heroImage.style.transform = `translateY(-${scrollY * 0.03}px)`;
    }
    setNavbarScrollState();
  });
});
