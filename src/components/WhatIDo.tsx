import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>CYBERSECURITY</h3>
              <h4>Web App Pentesting & Network Security</h4>
              <p>
                5+ years in cybersecurity, specializing in web application
                penetration testing, OWASP Top 10, network analysis, and
                vulnerability assessment with real-world engagements.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Burp Suite</div>
                <div className="what-tags">Nmap &amp; Wireshark</div>
                <div className="what-tags">Hydra</div>
                <div className="what-tags">OWASP ZAP</div>
                <div className="what-tags">Metasploit</div>
                <div className="what-tags">Python &amp; Bash</div>
                <div className="what-tags">OWASP Top 10</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>WEB DEVELOPMENT</h3>
              <h4>Frontend &amp; Full-Stack Projects</h4>
              <p>
                3 years building responsive websites and web apps for local and
                online clients using modern frontend frameworks with a focus on
                clean UI/UX design.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">HTML5 &amp; CSS3</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Bootstrap</div>
                <div className="what-tags">Figma &amp; Canva</div>
                <div className="what-tags">Git / GitHub</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN &amp; ANIMATION</h3>
              <h4>Creative Production &amp; Motion Graphics</h4>
              <p>
                7 years of graphic design, video production, and animation—from
                photo/video editing and branding to 3D character animation and
                promotional content using industry-standard tools.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Blender &amp; Maya</div>
                <div className="what-tags">Adobe Photoshop / AE</div>
                <div className="what-tags">Premiere Pro</div>
                <div className="what-tags">DaVinci Resolve</div>
                <div className="what-tags">FlipaClip &amp; Prisma3D</div>
                <div className="what-tags">Motion Graphics</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 3)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>IoT &amp; EMBEDDED</h3>
              <h4>Arduino, ESP8266 &amp; Automation</h4>
              <p>
                Hands-on experience building IoT devices, robotic systems, wireless
                communication prototypes, and automation tools using Arduino,
                ESP8266, and various sensors.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Arduino</div>
                <div className="what-tags">ESP8266</div>
                <div className="what-tags">Circuit Design</div>
                <div className="what-tags">Selenium &amp; Playwright</div>
                <div className="what-tags">n8n &amp; Docker</div>
                <div className="what-tags">PCB Electronics</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
