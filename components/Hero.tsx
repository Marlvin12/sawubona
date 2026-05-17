"use client";

import Image from "next/image";
import { useApplication } from "./ApplicationProvider";

export function Hero() {
  const { openApplication } = useApplication();
  return (
    <header className="hero" id="top">
      <div className="hero-eyebrow-center">
        A Southern African initiative · Rooted in hunhu · ubuntu
      </div>
      <h1 className="hero-display-center">Sawubona. I see you.</h1>
      <div className="hero-subline">
        Free technology education, taught by the diaspora — for young people back home.
      </div>
      <div className="hero-photo">
        <Image
          src="/students.jpg"
          alt="Two young students sharing a laptop, sitting against an orange wall."
          fill
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
          priority
        />
      </div>
      <div className="hero-ctas-center">
        <button className="btn btn-primary btn-lg" onClick={() => openApplication()}>
          Start learning
        </button>
        <a className="btn btn-ghost btn-lg" href="#involve">Volunteer an hour</a>
      </div>
    </header>
  );
}
