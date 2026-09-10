import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Cybersecurity Tools",
    category: "Web App Penetration Testing",
    filterTag: "CYBERSECURITY",
    tag: "CYBERSECURITY",
    tools: "Python, Bash, Burp Suite, Nmap, OWASP ZAP, Metasploit",
    image: "/images/cybersecurity.jpg",
    imgFit: "cover" as const,
    imgPosition: "center center",
    link: "https://github.com/Bimal-Web/Recon-Framework",
  },
  {
    title: "ESP32 Obstacle-Avoiding Car",
    category: "IoT & Embedded Systems Project",
    filterTag: "IOT",
    tag: "IOT PROJECTS",
    tools: "Sensor, ESP8266, Wireless Communication, Circuit Design",
    image: "/images/_A_playful_yet_professional_3D_c (2).png",
    imgFit: "cover" as const,
    imgPosition: "center center",
    link: "https://github.com/Bimal-Web/-ESP32-Obstacle-Avoiding-Car",
  },
  {
    title: "3D/2D Animation",
    category: "Brand & Educational Animations",
    filterTag: "ANIMATION",
    tag: "ANIMATION",
    tools: "Blender, Adobe After Effects, Autodesk Maya, Adobe Animate CC",
    image: "/images/animation.jpg",
    imgFit: "cover" as const,
    imgPosition: "center center",
    link: "https://www.instagram.com/bimal56902?igsh=Z3RlMjAwOXpoMzd1",
  },
  {
    title: "Netflix Clone",
    category: "Frontend Project with API Integration",
    filterTag: "WEB",
    tag: "WEB",
    tools: "HTML5, CSS3, JavaScript, React, Bootstrap, Figma",
    image: "/images/_A_premium_3D_cartoon-style_port.webp",
    imgFit: "cover" as const,
    imgPosition: "top center",
    link: "https://netclone3.netlify.app/",
  },
  {
    title: "Miscellaneous — Design",
    category: "Graphic Design & Creative Works",
    filterTag: "DESIGN",
    tag: "DESIGN",
    description:
      "Includes: T-shirt Mockups, E-Book Design, Logo Design, Motion Graphic Videos, Illustrator Design, Sticker Design, Photo Editing, Brand Mockup Design, and others.",
    tools: "Adobe Photoshop, Illustrator, After Effects, Canva, Figma",
    image: "/images/_A_premium_3D-rendered_dashboard.webp",
    imgFit: "cover" as const,
    imgPosition: "top center",
    link: "https://drive.google.com/drive/folders/1cYbGCOcRfb5wt9GwwVnzwmqL-CyOv8hO?usp=sharing",
  },
  {
    title: "MEDHA-AI",
    category: "AI Talent Marketplace Platform",
    filterTag: "WEB",
    tag: "WEB",
    description:
      "Designed and built the platform for Medha AI — a marketplace connecting businesses with vetted AI builders and automation specialists across n8n, Make, OpenAI, and the modern AI stack. Includes services showcase, community matching process, client testimonials, and lead-capture contact flow.",
    tools: "React, Vite, Spline 3D, Formspree, Netlify",
    image: "/images/medha-ai.jpg",
    imgFit: "cover" as const,
    imgPosition: "top center",
    link: "https://medha-ai.netlify.app",
  },
  {
    title: "Vidyasetu",
    category: "Unified Free Digital Education Platform",
    filterTag: "WEB",
    tag: "WEB",
    description:
      "A free, centralized education platform for Nepal — covering SEE, NEB 11/12, Bachelor faculties, and competitive exams. Features notes, MCQ quizzes, past-year question banks, bookmarking, and contributor panels.",
    tools: "Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Vercel",
    image: "/images/vidyasetu_original.jpg",
    imgFit: "cover" as const,
    imgPosition: "top center",
  },
  {
    title: "KrishiBhandar",
    category: "NEPAL'S FREE AGRI GLOSSARY PLATFORM",
    filterTag: "WEB",
    tag: "WEB",
    description:
      "A unified digital glossary for Nepal’s farmers — covering crops, livestock, soil health, and modern agri practices. Features searchable terms, farmer‑friendly definitions, localized Nepali translations, and AI‑assisted support for diagnostics and learning.",
    tools: "Next.js, TypeScript, Tailwind CSS, shadcn/ui, react, Vercel",
    image: "/images/krishibhandar_hd.png",
    imgFit: "cover" as const,
    imgPosition: "center center",
    link: "https://krishi-bhandar.vercel.app/",
  },
  {
    title: "Mero Karkhana",
    category: "NEPAL'S INDUSTRIAL RESOURCE PLATFORM",
    filterTag: "WEB",
    tag: "WEB",
    description:
      "A unified digital hub for Nepal’s builders — covering steel, TMT reinforcement, and cement knowledge. Features product glossaries, process guides, dealer networks, and AI‑assisted support for quality assurance and project planning.",
    tools: "Next.js, TypeScript, Tailwind CSS, shadcn/ui, Formspree, Vercel",
    image: "/images/merokarkhana_hd.jpg",
    imgFit: "cover" as const,
    imgPosition: "center center",
    link: "https://mero-karkhana.vercel.app/",
  },
  {
    title: "Certifications",
    category: "Professional Certification & Achievements",
    filterTag: "CERTIFICATIONS",
    tag: "ACHIEVEMENTS",
    description:
      "A curated collection of professional certifications and achievements spanning cybersecurity, web development, IoT engineering, AI automation, and creative design — earned through accredited platforms and real-world project completions.",
    image: "/images/certificates.png",
    imgFit: "contain" as const,
    imgPosition: "center center",
    link: "https://drive.google.com/drive/folders/1qYb45OtvhKHf3kjcM253e8xuU-OpKv0-?usp=drive_link",
  },
];


const filterCategories = [
  { label: "ALL", value: "ALL" },
  { label: "WEB", value: "WEB" },
  { label: "CYBERSECURITY", value: "CYBERSECURITY" },
  { label: "IOT PROJECTS", value: "IOT" },
  { label: "ANIMATION", value: "ANIMATION" },
  { label: "DESIGN", value: "DESIGN" },
  { label: "CERTIFICATIONS", value: "CERTIFICATIONS" },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((p) => (p as any).filterTag === activeFilter);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    setCurrentIndex(0);
  };

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, filteredProjects.length]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, filteredProjects.length]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        {/* Category Filter Toggles */}
        <div className="work-filters">
          {filterCategories.map((cat) => (
            <button
              key={cat.value}
              className={`work-filter-btn ${activeFilter === cat.value ? "work-filter-active" : ""}`}
              onClick={() => handleFilterChange(cat.value)}
              data-cursor="disable"
            >
              {activeFilter === cat.value && <span className="filter-dot" />}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {filteredProjects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>{String(index + 1).padStart(2, "0")}</h3>
                      </div>
                      <div className="carousel-details">
                        {(project as any).tag && (
                          <div className="carousel-tag">{(project as any).tag}</div>
                        )}
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        {(project as any).description && (
                          <p className="carousel-description">
                            {(project as any).description}
                          </p>
                        )}
                        {project.tools && (
                          <div className="carousel-tools">
                            <span className="tools-label">Tools & Features</span>
                            <p>{project.tools}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {!(project as any).hideImage && (project as any).image && (
                      <div className="carousel-image-wrapper">
                        <WorkImage
                          image={(project as any).image}
                          alt={project.title}
                          link={(project as any).link}
                          imgFit={(project as any).imgFit}
                          imgPosition={(project as any).imgPosition}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators + Mobile Nav */}
          <div className="carousel-dots">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>

          {/* Mobile-only arrow row — below the dots */}
          <div className="carousel-mobile-nav">
            <button
              className="carousel-arrow-mobile"
              onClick={goToPrev}
              aria-label="Previous project"
              data-cursor="disable"
            >
              <MdArrowBack />
            </button>
            <span className="carousel-mobile-counter">
              {currentIndex + 1} / {filteredProjects.length}
            </span>
            <button
              className="carousel-arrow-mobile"
              onClick={goToNext}
              aria-label="Next project"
              data-cursor="disable"
            >
              <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
