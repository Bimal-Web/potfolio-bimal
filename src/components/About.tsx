import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-tag">
          <span className="about-tag-dot" />
          ABOUT ME
        </div>
        <h2 className="about-heading">
          Passionate about <span>Technology</span> &amp; <span>Creativity</span>
        </h2>
        <div className="about-text-content">
          <p>
            Namaste! I'm <strong>Bimal</strong>, bringing over <strong>7+ years</strong> of
            combined experience in <strong>Web Development</strong>, <strong>Cybersecurity</strong>,{" "}
            <strong>Graphic Design</strong>, and <strong>Animation</strong>.
          </p>
          <p>
            My expertise spans full-stack web applications, web penetration testing, network security,
            3D/2D animation, and IoT embedded systems — building scalable solutions and creative assets.
          </p>
          <p>
            Actively working as a freelancer, content creator, and educator with a hands-on,
            self-taught approach to problem solving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
