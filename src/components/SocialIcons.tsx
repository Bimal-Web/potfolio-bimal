import {
  FaGithub,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const updateRect = () => {
        const rect = elem.getBoundingClientRect();
        return {
          width: rect.width || 44,
          height: rect.height || 44,
          left: rect.left,
          top: rect.top
        };
      };

      let r = updateRect();
      let mouseX = r.width / 2;
      let mouseY = r.height / 2;
      let currentX = mouseX;
      let currentY = mouseY;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        r = updateRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = r.width / 2;
          mouseY = r.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://linkedin.com/in/bimal-bbb7662a6" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://github.com/Bimal-Web" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://wa.me/+9779805638207" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/bimal56902?igsh=Z3RlMjAwOXpoMzd1" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </span>
        <span>
          <a href="https://www.facebook.com/profile.php?id=61593299496584" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
        </span>
        <span>
          <a href="https://www.youtube.com/@kindgaming9352" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Bimal_Resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span><TbNotes /></span>
      </a>
    </div>
  );
};

export default SocialIcons;
