import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  // Animate "Hello! I'm" + "BIMAL"
  var landingText = new SplitText(
    [".landing-intro h2", ".landing-intro h1"],
    { type: "chars,lines", linesClass: "split-line" }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  // Fade in navbar, badge, location + icons
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade", ".landing-badge", ".landing-location"],
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
  );

  // Start role-pair cycling after intro anim
  setTimeout(() => LoopRolePairs(), 1400);
}

function LoopRolePairs() {
  const pairEls = Array.from(
    document.querySelectorAll<HTMLElement>(".landing-role-pair")
  );
  if (!pairEls.length) return;

  // Split chars for every pair
  const allCharsList = pairEls.map((pair) => {
    const topEl = pair.querySelector<HTMLElement>(".pair-top");
    const botEl = pair.querySelector<HTMLElement>(".pair-bottom");
    const top = topEl ? new SplitText(topEl, { type: "chars" }) : null;
    const bot = botEl ? new SplitText(botEl, { type: "chars" }) : null;
    return [...(top?.chars ?? []), ...(bot?.chars ?? [])];
  });

  // Make container visible; hide every pair's wrapper completely
  gsap.set(".landing-role-pairs", { opacity: 1 });
  pairEls.forEach((el) => gsap.set(el, { visibility: "hidden" }));

  const inDur = 0.9;
  const hold = 2.2;
  const outDur = 0.6;
  let current = 0;

  function showPair() {
    // Hide ALL pair wrappers — this is 100% reliable regardless of char state
    pairEls.forEach((el) => gsap.set(el, { visibility: "hidden" }));

    const el = pairEls[current];
    const chars = allCharsList[current];

    // Make only this pair visible then animate its chars
    gsap.set(el, { visibility: "visible" });

    gsap
      .timeline({
        onComplete: () => {
          current = (current + 1) % pairEls.length;
          showPair();
        },
      })
      .fromTo(
        chars,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: inDur, ease: "power3.out", stagger: 0.04 }
      )
      .to({}, { duration: hold }) // hold pause
      .to(chars, {
        opacity: 0,
        y: -70,
        duration: outDur,
        ease: "power3.in",
        stagger: 0.03,
      });
  }

  showPair();
}
