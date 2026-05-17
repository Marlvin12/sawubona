"use client";

import { useState } from "react";
import Link from "next/link";

export function Nav() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <Link href="/" className="wordmark">SAWUBONA</Link>
      <div className="nav-right">
        <div className="nav-links">
          <Link href="/our-story">Our story</Link>
          <button onClick={() => scrollTo("programs")}>Learn</button>
          <button onClick={() => scrollTo("mentors")}>Volunteers</button>
          <button onClick={() => scrollTo("stories")}>Stories</button>
          <button onClick={() => scrollTo("faq")}>FAQ</button>
        </div>
        <div className="nav-cta">
          <button className="btn btn-primary" onClick={() => scrollTo("involve")}>Get involved</button>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile">
          <Link href="/our-story" onClick={() => setOpen(false)}>Our story</Link>
          <button onClick={() => scrollTo("programs")}>Learn</button>
          <button onClick={() => scrollTo("mentors")}>Volunteers</button>
          <button onClick={() => scrollTo("stories")}>Stories</button>
          <button onClick={() => scrollTo("faq")}>FAQ</button>
        </div>
      )}
    </nav>
  );
}
