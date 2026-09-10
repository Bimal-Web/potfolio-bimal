import { PropsWithChildren, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./styles/Landing.css";
import "./styles/FallingLeaves.css";
import FallingLeaves from "./FallingLeaves";

const Landing = ({ children }: PropsWithChildren) => {
  const [isIlamHovered, setIsIlamHovered] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!badgeRef.current) return;
      const rect = badgeRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setIsIlamHovered(inside);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isDonateOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDonateOpen(false);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDonateOpen]);

  return (
    <>
      <FallingLeaves active={isIlamHovered} />
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <div className="landing-badge">
              <span className="badge-dot"></span>
              <span>Available for projects</span>
            </div>
            <h2>Hello! I'm</h2>
            <h1 className={`landing-name${isIlamHovered ? " landing-name--highlighted" : ""}`}>BIMAL</h1>
            <div className="landing-location">
              <span>from</span>
              <span
                className="ilam-badge-container"
                ref={badgeRef}
              >
                <span className={`ilam-text ${isIlamHovered ? "english" : "nepali"}`}>
                  {isIlamHovered ? "Ilam" : "इलाम"}
                </span>
                <span className="ilam-leaf-icon">🍃</span>
              </span>
              <span className="nepal-flag-text">Nepal 🇳🇵</span>
            </div>
            
            <button className="donate-btn" onClick={() => setIsDonateOpen(true)}>
              <span>☕ Donate ME</span>
            </button>
          </div>
          <div className="landing-info">
            <div className="landing-role-pairs">
              <div className="landing-role-pair">
                <div className="pair-top">Security</div>
                <div className="pair-bottom">Researcher</div>
              </div>
              <div className="landing-role-pair">
                <div className="pair-top">Web</div>
                <div className="pair-bottom">Developer</div>
              </div>
              <div className="landing-role-pair">
                <div className="pair-top">Creative</div>
                <div className="pair-bottom">Designer</div>
              </div>
              <div className="landing-role-pair">
                <div className="pair-top">IoT</div>
                <div className="pair-bottom">Engineer</div>
              </div>
              <div className="landing-role-pair">
                <div className="pair-top">Animator</div>
                <div className="pair-bottom">2D/3D</div>
              </div>
              <div className="landing-role-pair">
                <div className="pair-top">AI Automation</div>
                <div className="pair-bottom">Workflows</div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>

      {isDonateOpen && createPortal(
        <div className="donate-modal-overlay" onClick={() => setIsDonateOpen(false)}>
          <div className="donate-modal-content" onClick={e => e.stopPropagation()}>
            <div className="donate-modal-header">
              <button 
                className="donate-modal-close" 
                onClick={() => setIsDonateOpen(false)}
                aria-label="Close donation modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <h3 className="donate-modal-title">Support My Work ☕</h3>
              <p className="donate-modal-desc">Your contributions help me keep building awesome projects!</p>
            </div>
            
            <div className="donate-modal-body">
              <div className="donate-options">
                <div className="donate-option">
                  <h4>🇳🇵 For Nepal (eSewa & Khalti)</h4>
                  <div className="qr-group">
                    <div className="qr-container">
                      <a href="/images/eswea.jpeg" download="eSewa-QR-Bimal.jpeg" className="qr-download-link" title="Click to download eSewa QR">
                        <img src="/images/eswea.jpeg" alt="eSewa QR" className="donate-qr-img" />
                        <span className="qr-download-icon">⬇ Download</span>
                      </a>
                      <span className="qr-label">eSewa</span>
                    </div>
                    <div className="qr-container">
                      <a href="/images/khalti.jpeg" download="Khalti-QR-Bimal.jpeg" className="qr-download-link" title="Click to download Khalti QR">
                        <img src="/images/khalti.jpeg" alt="Khalti QR" className="donate-qr-img" />
                        <span className="qr-download-icon">⬇ Download</span>
                      </a>
                      <span className="qr-label">Khalti</span>
                    </div>
                  </div>
                </div>
                
                <div className="donate-option">
                  <h4>🌍 International (Payoneer)</h4>
                  <div className="qr-group">
                    <div className="qr-container">
                      <a href="/images/paynooer.png" download="Payoneer-QR-Bimal.png" className="qr-download-link" title="Click to download Payoneer QR">
                        <img src="/images/paynooer.png" alt="Payoneer QR" className="donate-qr-img" />
                        <span className="qr-download-icon">⬇ Download</span>
                      </a>
                      <span className="qr-label">Payoneer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="donate-modal-footer">
              <button 
                type="button" 
                className="donate-modal-footer-btn" 
                onClick={() => setIsDonateOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Landing;
