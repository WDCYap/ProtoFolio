function initializeTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeIcon(theme);
    updateProfileImage(theme);
  }

  function handleSystemThemeChange(e) {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    }
  }

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const theme = prefersDark.matches ? "dark" : "light";
    setTheme(theme);
  }

  prefersDark.addEventListener("change", handleSystemThemeChange);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector(".theme-toggle i");
  icon.classList.remove("fa-sun", "fa-moon");
  icon.classList.add(theme === "dark" ? "fa-sun" : "fa-moon");
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);

  updateProfileImage(newTheme);
}

document.addEventListener("DOMContentLoaded", initializeTheme);

function typeLoadingText() {
  return fetch("assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      const text = data.site.brand || "PROTO//FOLIO";
      const loadingText = document.getElementById("loading-text");
      let index = 0;

      return new Promise((resolve) => {
        function type() {
          if (index < text.length) {
            loadingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
          } else {
            setTimeout(resolve, 500);
          }
        }
        type();
      });
    });
}

function showPage() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.opacity = "0";
  loadingScreen.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loadingScreen.style.display = "none";
    startPageAnimations();

    const typedTextElement = document.getElementById("typed-text");
    if (typedTextElement && typedTextElement.dataset.texts) {
      const texts = JSON.parse(typedTextElement.dataset.texts);
      typeText(texts);
    }
  }, 500);
}

function startPageAnimations() {
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.classList.add("animate");
  }

  const typedTextElement = document.getElementById("typed-text");
  if (typedTextElement) {
    fetch("assets/data.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.about && data.about.titles) {
          typeText(data.about.titles);
        }
      });
  }

  handleSectionVisibility();
}

function loadImages() {
  return new Promise((resolve) => {
    fetch("assets/data.json")
      .then((response) => response.json())
      .then((data) => {
        const imagesToLoad = [];

        if (data.about && data.about.image) {
          imagesToLoad.push(data.about.image.light);
          imagesToLoad.push(data.about.image.dark);
        }

        if (data.projects && data.projects.items) {
          data.projects.items.forEach((project) => {
            if (project.image) {
              imagesToLoad.push(project.image);
            }
          });
        }

        const imagePromises = imagesToLoad.map((imageSrc) => {
          return new Promise((resolveImage) => {
            const img = new Image();
            img.onload = resolveImage;
            img.onerror = resolveImage;
            img.src = imageSrc;
          });
        });

        Promise.all(imagePromises).then(resolve);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        resolve();
      });
  });
}

Promise.all([
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener("load", resolve)),
  loadImages(),
  typeLoadingText(),
]).then(showPage);

const themeToggle = document.querySelector(".theme-toggle");
const icon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", toggleTheme);

function typeText(texts) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextElement = document.getElementById("typed-text");

  typedTextElement.textContent = texts[textIndex] + "\u00A0";

  typedTextElement.style.overflow = "hidden";
  typedTextElement.style.whiteSpace = "nowrap";
  typedTextElement.style.display = "inline-block";

  function type() {
    typedTextElement.textContent =
      texts[textIndex].substring(0, charIndex) + "\u00A0";

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    if (!isDeleting && charIndex === texts[textIndex].length) {
      setTimeout(() => (isDeleting = true), 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(type, typingSpeed);
  }

  type();
}

function renderContent(data) {
  const sectionsContainer = document.getElementById("sections-container");

  if (data.sections) {
    data.sections.forEach((section) => {
      if (section.show) {
        const sectionElement = createSection(section);
        sectionsContainer.appendChild(sectionElement);
      }
    });
  }
}

function createSection(sectionData) {
  const section = document.createElement("section");
  section.id = sectionData.id;

  const container = document.createElement("div");
  container.className = "container";

  if (sectionData.title) {
    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = sectionData.title;
    container.appendChild(title);
  }

  const content = createSectionContent(sectionData);
  container.appendChild(content);
  section.appendChild(container);

  return section;
}

function createSectionContent(sectionData) {
  switch (sectionData.layout) {
    case "split":
      return createSplitLayout(sectionData.content);
    case "timeline":
      return createTimelineLayout(sectionData.items);
    case "carousel":
      return createCarouselLayout(sectionData.items);
    case "list":
      return createListLayout(sectionData.items);
    default:
      return createDefaultLayout(sectionData.items);
  }
}

function createElement(elementData) {
  if (!elementData.type) return null;

  const element = document.createElement(elementData.type);

  if (elementData.id) element.id = elementData.id;
  if (elementData.class) element.className = elementData.class;
  if (elementData.content) element.textContent = elementData.content;
  if (elementData.href) element.href = elementData.href;

  if (elementData.data) {
    if (elementData.type === "img") {
      const theme =
        document.documentElement.getAttribute("data-theme") || "light";
      element.src = elementData.data[theme];
      element.alt = "Profile";
    }
    if (elementData.id === "typed-text") {
      element.dataset.texts = JSON.stringify(elementData.data);
    }
  }

  if (elementData.items) {
    elementData.items.forEach((item) => {
      const childElement = createElement(item);
      if (childElement) element.appendChild(childElement);
    });
  }

  return element;
}

function updateSiteMetadata(siteData) {
  if (siteData.title) {
    document.getElementById("site-title").textContent = siteData.title;
    document.title = siteData.title;
  }
  if (siteData.brand) {
    document.querySelector(".navbar-brand").textContent = siteData.brand;
  }
  if (siteData.favicon) {
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    favicon.type = "image/x-icon";
    favicon.rel = "icon";
    favicon.href = siteData.favicon;
    if (!document.querySelector("link[rel='icon']")) {
      document.head.appendChild(favicon);
    }
  }
  if (siteData.footer) {
    const footer = document.querySelector("footer");
    if (siteData.footer.show) {
      footer.className = siteData.footer.class || "text-center py-4";
      footer.innerHTML = "";
      const small = document.createElement("small");
      small.className = siteData.footer.textClass || "text";
      small.textContent = siteData.footer.content;
      footer.appendChild(small);
    } else {
      footer.style.display = "none";
    }
  }
}

function updateNavigation(sections) {
  const navList = document.querySelector(".navbar-nav");
  const themeToggle = navList.querySelector(".nav-item");
  navList.innerHTML = "";

  sections.forEach((section) => {
    if (section.show && section.navOption) {
      const li = document.createElement("li");
      li.className = "nav-item";

      const a = document.createElement("a");
      a.className = "nav-link";
      a.href = `#${section.id}`;
      a.textContent =
        section.navText ||
        section.title ||
        section.id.charAt(0).toUpperCase() + section.id.slice(1);

      li.appendChild(a);
      navList.appendChild(li);
    }
  });

  navList.appendChild(themeToggle);
}

fetch("assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetched Data:", data);

    if (data.site) {
      updateSiteMetadata(data.site);
    }
    if (data.sections) {
      updateNavigation(data.sections);
    }

    renderContent(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function updateProfileImage(theme) {
  fetch("assets/data.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.about && data.about.image) {
        const profileImage = document.querySelector(".profile-image");
        if (profileImage) {
          profileImage.classList.remove("animate");
          profileImage.style.opacity = "0";

          setTimeout(() => {
            profileImage.src = data.about.image[theme];
            void profileImage.offsetWidth;
            profileImage.style.opacity = "1";
            profileImage.classList.add("animate");
          }, 300);
        }
      }
    });
}

function initializeNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const scrollThreshold = 50;

  function updateNavbar() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar);
  updateNavbar();
}

function handleSectionVisibility() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    aboutSection.classList.add("visible");
  }

  sections.forEach((section) => {
    if (section.id !== "about") {
      observer.observe(section);
    }
  });
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "text-center py-4";

  const small = document.createElement("small");
  small.className = "text";
  small.textContent = "PROTO//FOLIO by William Yap";

  footer.appendChild(small);
  document.body.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeNavbarScroll();
  handleSectionVisibility();
  createResumeModal();
  createFooter();
});

function createSplitLayout(content) {
  const row = document.createElement("div");
  row.className = "row align-items-center";

  content.forEach((column) => {
    const columnElement = createElement(column);
    if (columnElement) row.appendChild(columnElement);
  });

  return row;
}

function createTimelineLayout(items) {
  const timeline = document.createElement("div");
  timeline.className = "timeline";

  items.forEach((item) => {
    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";

    const title = document.createElement("h4");
    title.textContent = item.title;

    const subtitle = document.createElement("p");
    subtitle.className = "institution";
    subtitle.textContent = item.subtitle;

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = item.date;

    const description = document.createElement("div");
    item.description.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      description.appendChild(p);
    });

    timelineItem.append(title, subtitle, date, description);
    timeline.appendChild(timelineItem);
  });

  return timeline;
}

function createCarouselLayout(items) {
  const carousel = document.createElement("div");
  carousel.className = "carousel slide";
  carousel.id = "projectCarousel";
  carousel.setAttribute("data-bs-ride", "carousel");

  const indicators = document.createElement("div");
  indicators.className = "carousel-indicators";

  const inner = document.createElement("div");
  inner.className = "carousel-inner";

  const visibleItems = items.filter((item) => item.show);

  visibleItems.forEach((item, index) => {
    const indicator = document.createElement("button");
    indicator.setAttribute("data-bs-target", "#projectCarousel");
    indicator.setAttribute("data-bs-slide-to", index.toString());
    if (index === 0) indicator.classList.add("active");
    indicators.appendChild(indicator);

    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    const content = document.createElement("div");
    content.className = "project-content";

    const imageSection = document.createElement("div");
    imageSection.className = "project-image";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    imageSection.appendChild(img);

    const details = document.createElement("div");
    details.className = "project-details";

    const title = document.createElement("h3");
    title.className = "mb-3";
    title.textContent = item.title;

    const description = document.createElement("div");
    description.className = "mb-4";
    item.description.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      description.appendChild(p);
    });

    const tools = document.createElement("ul");
    tools.className = "project-tools";
    item.tools.forEach((tool) => {
      const li = document.createElement("li");
      li.textContent = tool;
      tools.appendChild(li);
    });

    details.append(title, description, tools);

    if (item.links) {
      const links = document.createElement("div");
      links.className = "project-links mt-3";

      item.links.forEach((link) => {
        if (link.show) {
          const a = document.createElement("a");
          a.href = link.url;
          a.className = "btn btn-primary me-2 mb-2";
          a.textContent = link.text;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          links.appendChild(a);
        }
      });

      details.appendChild(links);
    }

    content.append(imageSection, details);
    carouselItem.appendChild(content);
    inner.appendChild(carouselItem);
  });

  const controls = `
    <button class="carousel-control-prev" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#projectCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  `;

  carousel.append(indicators, inner);
  carousel.insertAdjacentHTML("beforeend", controls);

  return carousel;
}

function createListLayout(items) {
  const list = document.createElement("div");
  list.className = "row g-4";

  const col = document.createElement("div");
  col.className = "col-md-6";

  items.forEach((item) => {
    if (item.show) {
      if (item.type === "resume") {
        const link = document.createElement("a");
        link.href = "#";
        link.className = "contact-info";
        link.setAttribute("data-bs-toggle", "modal");
        link.setAttribute("data-bs-target", "#resumeModal");

        const icon = document.createElement("i");
        icon.className = item.icon;

        const span = document.createElement("span");
        span.textContent = item.content;

        link.append(icon, span);

        // Update modal
        document.getElementById("resume-preview").src = item.file;
        document.getElementById("resume-download").href = item.file;

        col.appendChild(link);
      } else {
        const link = document.createElement("a");
        link.href = item.href;
        link.className = "contact-info";

        const icon = document.createElement("i");
        icon.className = item.icon;

        const span = document.createElement("span");
        span.textContent = item.content;

        link.append(icon, span);
        col.appendChild(link);
      }
    }
  });

  list.appendChild(col);
  return list;
}

function createDefaultLayout(items) {
  const container = document.createElement("div");
  items.forEach((item) => {
    const element = createElement(item);
    if (element) container.appendChild(element);
  });
  return container;
}

function createResumeModal() {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "resumeModal";
  modal.tabIndex = -1;

  modal.innerHTML = `
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Resume</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <iframe id="resume-preview" width="100%" height="600px"></iframe>
        </div>
        <div class="modal-footer">
          <a id="resume-download" href="#" class="btn btn-primary" download>
            <i class="fas fa-download me-2"></i>Download PDF
          </a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}
