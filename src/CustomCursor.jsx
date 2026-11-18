import { useEffect, useRef } from "react";

// Anything the cursor should "grow" over
const INTERACTIVE = 'a, button, [role="button"], label, summary, input[type="submit"], input[type="checkbox"], input[type="radio"]';
// Text fields keep the normal I-beam cursor so typing still feels natural
const TEXT_FIELDS = 'input:not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]';

// Custom cursor: a small gradient dot that sits exactly on the mouse, and a
// ring that glides after it. The ring grows over links and buttons and
// shrinks while clicking.
//
// Only for real mice (not touch screens) and not for visitors who turn off
// animations. Positions are set straight on the elements (no React re-render
// on every mouse move). Styles live in index.css (.cursor-*).
export default function CustomCursor() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const root = rootRef.current;
    const html = document.documentElement;
    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let frame = 0;
    let started = false;

    // The ring moves 20% of the remaining distance each frame, so it trails smoothly
    const follow = () => {
      ring.x += (mouse.x - ring.x) * 0.2;
      ring.y += (mouse.y - ring.y) * 0.2;
      ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      frame = requestAnimationFrame(follow);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      if (!started) {
        // Hide the normal cursor only once ours is actually following the mouse
        started = true;
        ring.x = mouse.x;
        ring.y = mouse.y;
        html.classList.add("has-custom-cursor");
        frame = requestAnimationFrame(follow);
      }
      root.dataset.visible = "true";
    };

    const onOver = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      root.dataset.text = String(!!target?.closest(TEXT_FIELDS));
      root.dataset.hover = String(!!target?.closest(INTERACTIVE));
    };

    const onDown = () => (root.dataset.down = "true");
    const onUp = () => (root.dataset.down = "false");
    const onLeave = () => (root.dataset.visible = "false");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" data-visible="false" aria-hidden="true">
      <div ref={ringRef} className="cursor-follower">
        <div className="cursor-ring" />
      </div>
      <div ref={dotRef} className="cursor-follower">
        <div className="cursor-dot" />
      </div>
    </div>
  );
}
