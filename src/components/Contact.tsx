import {
  MdArrowOutward,
  MdCopyright,
  MdEmail,
  MdPhone,
} from "react-icons/md";

import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      {/* Ambient background orbs */}
      <div className="contact-orb contact-orb-1" />
      <div className="contact-orb contact-orb-2" />

      <div className="contact-container">

        {/* ── Header ── */}
        <div className="contact-headline">
          <div className="contact-availability-badge">
            <span className="contact-badge-dot" />
            Available for work
          </div>
          <h3>Let's Build <span>Something</span> Great Together</h3>
          <p className="contact-headline-desc">
            Open to freelance projects, collaborations, and full-time
            opportunities. Let's create impactful digital experiences.
          </p>
        </div>

        {/* ── Main CTA Row ── */}
        <div className="contact-cta-row">
          <a
            href="mailto:bimalweb842@gmail.com"
            className="contact-cta-btn"
            data-cursor="disable"
          >
            <MdEmail className="contact-cta-icon" />
            <span>Send Me an Email</span>
            <MdArrowOutward className="contact-cta-arrow" />
          </a>
          <a
            href="tel:+9779805638207"
            className="contact-cta-btn contact-cta-btn--outline"
            data-cursor="disable"
          >
            <MdPhone className="contact-cta-icon" />
            <span>+977-980-5638207</span>
          </a>
        </div>

        {/* ── Info Grid ── */}
        <div className="contact-grid">

          {/* Column 1 — Collaboration */}
          <div className="contact-card contact-card--info">
            <div className="contact-card-label">
              <span className="contact-label-line" />
              Collaboration
            </div>
            <p className="contact-collab-text">
              I'm open to collaboration — on active projects, business ventures, product builds, or new ideas. Let's work together and bring it to life.
            </p>
          </div>

          {/* Column 2 — Education Timeline */}
          <div className="contact-card contact-card--edu">
            <div className="contact-card-label">
              <span className="contact-label-line" />
              Education & Background
            </div>
            <div className="contact-timeline">
              <div className="contact-timeline-item">
                <div className="contact-timeline-marker">
                  <div className="contact-timeline-dot" />
                  <div className="contact-timeline-bar" />
                </div>
                <div className="contact-timeline-body">
                  <div className="contact-timeline-period">2024 — Present</div>
                  <div className="contact-timeline-title">Advanced Tech & Applied Studies</div>
                  <div className="contact-timeline-sub">
                    Full-Stack, AI & Security · Nepal
                  </div>
                  <div className="contact-timeline-badge">Active</div>
                </div>
              </div>

              <div className="contact-timeline-item">
                <div className="contact-timeline-marker">
                  <div className="contact-timeline-dot contact-timeline-dot--done" />
                  <div className="contact-timeline-bar" />
                </div>
                <div className="contact-timeline-body">
                  <div className="contact-timeline-period">Completed</div>
                  <div className="contact-timeline-title">Higher Secondary (Grade 12)</div>
                  <div className="contact-timeline-sub">
                    Devi School, Birtamode, Jhapa
                  </div>
                  <div className="contact-timeline-badge contact-timeline-badge--done">Completed</div>
                </div>
              </div>

              <div className="contact-timeline-item">
                <div className="contact-timeline-marker">
                  <div className="contact-timeline-dot contact-timeline-dot--done" />
                </div>
                <div className="contact-timeline-body">
                  <div className="contact-timeline-period">Completed</div>
                  <div className="contact-timeline-title">Fundamental education</div>
                  <div className="contact-timeline-sub">
                    Samata School, इलाम
                  </div>
                  <div className="contact-timeline-badge contact-timeline-badge--done">Completed</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="contact-section-divider" />

        {/* ── Footer ── */}
        <div className="contact-footer">
          <p className="contact-footer-credit">
            Designed &amp; Developed by <span>BIMAL</span>
          </p>
          <div className="contact-footer-center">
            <span className="contact-footer-dot" />
            <span className="contact-footer-dot" />
            <span className="contact-footer-dot" />
          </div>
          <p className="contact-footer-copy">
            <MdCopyright /> 2026 · All rights reserved
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
