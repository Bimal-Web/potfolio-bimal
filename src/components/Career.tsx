import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My Journey to
          <br /> Tech
        </h2>
        <div className="career-info">

          {/* 2026 – Present */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineer & Full-Stack Dev</h4>
                <h5>Open Source · Community</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Focused on AI engineering, intelligent automation, open-source development,
              full-stack web development, cybersecurity, digital content creation, and
              educational technology. Passionate about sharing knowledge and building
              impactful solutions aligned with the future of technology.
            </p>
          </div>

          {/* 2024–2025 – Bachelor's Degree & Advanced Technologies */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelancer & Tech Explorer</h4>
                <h5>Fiverr · Upwork · Freelancer</h5>
              </div>
              <h3>2024–2025</h3>
            </div>
            <p>
              Explored AI, automation, AI agents, open-source software, web development,
              bug bounty hunting, and web penetration testing in this time frame.
              Delivered technology and creative solutions to clients worldwide as a freelancer.
            </p>
          </div>

          {/* 2023–2024 – Electronics, Mobile & Hardware Repair */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Electronics & HW Technician</h4>
                <h5>Repair Center · Practical Work</h5>
              </div>
              <h3>2023–2024</h3>
            </div>
            <p>
              Worked at an electronics, mobile, and computer hardware repair center.
              Gained deep exposure to hardware/software diagnostics, firmware installation,
              custom ROM flashing, kernel modifications, OS installation, and device repair.
            </p>
          </div>


          {/* 2022 – Programming, Cybersecurity & Linux */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Dev & Cybersecurity</h4>
                <h5>Independent · Self-Study</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Learned C, JavaScript, Python, and batch scripting while building projects
              and strengthening problem-solving skills. Explored cybersecurity, embedded
              systems, and Linux—gaining practical knowledge of OS architecture and
              secure software practices.
            </p>
          </div>

          {/* 2020 – Content Creation & Creative Design */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Content Creator</h4>
                <h5>YouTube · Digital Media</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Produced gaming content on YouTube, gaining proficiency in digital media
              production, graphic design, photo editing, and video editing. Used tools
              such as PixelLab, Photoshop Express (PSCC), Adobe Lightroom, and KineMaster.
            </p>
          </div>

          {/* 2018 – Beginning the Journey */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IoT & Electronics Hobbyist</h4>
                <h5>School · Self-Taught</h5>
              </div>
              <h3>2018</h3>
            </div>
            <p>
              Began exploring electronics and building IoT projects as a school student.
              Built RC cars, hydroelectricity models, drones, and ship models while
              learning electronic components, circuits, sensors, and embedded systems.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
