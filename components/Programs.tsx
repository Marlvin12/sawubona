"use client";

import { useState } from "react";
import { ProgramIllus } from "./Illustrations";
import { useApplication } from "./ApplicationProvider";

const PROGRAMS = [
  {
    id: "cs-hs", track: "Foundations", level: "High school", title: "Intro to CS",
    blurb: "A gentle on-ramp into programming and problem-solving, taught by diaspora volunteers. No prior experience, no prerequisites — just curiosity and one hour of somebody's time.",
    duration: "Open", commitment: "1 hr sessions", format: "Online, live", cohort: "Rolling",
    illus: "code", bg: "var(--sage)",
  },
  {
    id: "web", track: "Foundations", level: "All learners", title: "Web Design & Development",
    blurb: "Build your first website and learn the craft behind it — HTML, CSS, JavaScript, and the real mechanics of shipping something online.",
    duration: "Self-paced", commitment: "4 hrs / week", format: "Online", cohort: "Year-round",
    illus: "stack", bg: "var(--butter)",
  },
  {
    id: "game", track: "Creative", level: "All learners", title: "Game Development",
    blurb: "Design and ship a playable game with a volunteer who's shipped games before. A favourite among younger learners.",
    duration: "8 weeks", commitment: "3 hrs / week", format: "Online", cohort: "Rolling",
    illus: "flag", bg: "var(--butter)",
  },
  {
    id: "ai", track: "AI / Data", level: "Intermediate", title: "Ethical AI & ML",
    blurb: "From the basics of machine learning to the ethics of building it responsibly. A senior volunteer might drop in for just one hour, or stay the whole way through.",
    duration: "12 weeks", commitment: "6 hrs / week", format: "Online", cohort: "Oct 2026",
    illus: "neural", bg: "var(--lilac)",
  },
  {
    id: "data", track: "AI / Data", level: "Intermediate", title: "Data Science",
    blurb: "Learn to ask good questions of data — statistics, Python, visualisation, and the judgement to know when the numbers are lying.",
    duration: "10 weeks", commitment: "5 hrs / week", format: "Online", cohort: "Sept 2026",
    illus: "book", bg: "var(--paper)",
  },
  {
    id: "robotics", track: "Robotics", level: "All learners", title: "Robotics",
    blurb: "Embedded systems, sensors, and control — hosted with partner schools across Harare, Bulawayo, Jozi and Cape Town.",
    duration: "24 weeks", commitment: "8 hrs / week", format: "In-person chapters", cohort: "Jan 2027",
    illus: "robot", bg: "var(--sky)",
  },
  {
    id: "mentorship", track: "Mentorship", level: "All learners", title: "1:1 Mentorship",
    blurb: "Matched with a diaspora engineer, researcher or founder who knows your name, reads your code, and shows up every week.",
    duration: "6–12 months", commitment: "1 hr / week", format: "Online", cohort: "Rolling",
    illus: "hands", bg: "var(--blush)",
  },
  {
    id: "founders", track: "Founders", level: "Aspiring founders", title: "Founders Accelerator",
    blurb: "A cohort-based programme for founders building out of Southern Africa. Sharpen the idea, build the pitch, and meet diaspora investors ready to back you.",
    duration: "10 weeks", commitment: "20 hrs / week", format: "Hybrid · Harare + Jozi", cohort: "Mar 2027",
    illus: "seedling", bg: "var(--sage)",
  },
];

const TRACKS = ["All", "Foundations", "Creative", "AI / Data", "Robotics", "Mentorship", "Founders"];

export function Programs() {
  const [filter, setFilter] = useState("All");
  const { openApplication } = useApplication();
  const visible = filter === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.track === filter);

  return (
    <section className="section" id="programs">
      <div className="section-kicker">
        <span className="section-kicker-rule" /> Programs <span className="section-kicker-rule" />
      </div>
      <div className="section-title-center">
        <h2 className="h2">Pick the path that excites you.</h2>
        <p className="sub">Every course is free, taught by volunteers who've done the work. Learners choose their own direction — from a one-hour intro to a full ten-week cohort.</p>
      </div>
      <div className="filters">
        {TRACKS.map((t) => (
          <button
            key={t}
            className={"chip " + (filter === t ? "chip-on" : "")}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="programs-grid">
        {visible.map((p) => (
          <article className="program-card" key={p.id}>
            <div className="pc-illus" style={{ background: p.bg }}>
              <ProgramIllus kind={p.illus} />
            </div>
            <div className="pc-body">
              <div className="pc-track-row">
                <span>{p.track}</span>
                <span className="sep">·</span>
                <span className="level">{p.level}</span>
              </div>
              <h3 className="pc-title">{p.title}</h3>
              <p className="pc-blurb">{p.blurb}</p>
              <dl className="pc-meta">
                <div><dt>Duration</dt><dd>{p.duration}</dd></div>
                <div><dt>Commitment</dt><dd>{p.commitment}</dd></div>
                <div><dt>Format</dt><dd>{p.format}</dd></div>
                <div><dt>Next cohort</dt><dd>{p.cohort}</dd></div>
              </dl>
              <button
                className="pc-apply-btn"
                onClick={() => openApplication(p.id)}
              >
                Apply now →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
