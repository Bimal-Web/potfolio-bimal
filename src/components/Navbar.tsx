import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const scrollToTop = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    if (smoother) {
      smoother.scrollTo(0, true, "top top");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const landing = document.getElementById("landingDiv");
    if (landing) {
      landing.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      speed: 1,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
      smoothTouch: 0.1,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const logo = document.querySelector(".navbar-title");
    const onLogoClick = (e: Event) => {
      e.preventDefault();
      scrollToTop();
    };
    logo?.addEventListener("click", onLogoClick);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let targetElem = e.currentTarget as HTMLAnchorElement;
        let section = targetElem.getAttribute("data-href");
        if (section && smoother) {
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    const onResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", onResize);

    return () => {
      logo?.removeEventListener("click", onLogoClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a
          href="#landingDiv"
          className="navbar-title"
          onClick={scrollToTop}
          aria-label="Back to top"
          data-cursor="disable"
        >
          <div className="profile-logo-wrapper">
            <img
              src="/images/Bimalpic.jpeg"
              alt="Bimal Profile"
              className="profile-logo-img"
            />
          </div>
          <span className="navbar-title-text">BIMAL-WEB</span>
        </a>
        <a
          href="https://linkedin.com/in/bimal-bbb7662a6"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/bimal-bbb7662a6
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
