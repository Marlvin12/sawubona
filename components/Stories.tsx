"use client";

import { useState, useEffect } from "react";

const STORIES = [
  { quote: "Someone in New York gave up an hour of their Saturday to teach me what a function was. A year later, I'm teaching the class that came in after me. That's what Sawubona does — it keeps moving.", name: "Tariro N.", where: "Chitungwiza · Intro to CS, '25" },
  { quote: "My mentor is a Zimbabwean engineer in Seattle. She knows where I'm calling from, she knows the load-shedding schedule. Having someone who sees me changed how I write code.", name: "Blessing K.", where: "University of Zimbabwe · AI track" },
  { quote: "The Founders cohort connected us to diaspora investors who actually understood the market. We closed our pre-seed six weeks after demo day.", name: "Kuda & Lerato", where: "Co-founders, agri-fintech · Jozi" },
];

export function Stories() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % STORIES.length), 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section-full section-stories" id="stories">
      <div className="stories-inner" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
        <div className="section-kicker">
          <span className="section-kicker-rule" /> Yebo, sawubona <span className="section-kicker-rule" />
        </div>
        <blockquote className="story-quote">{STORIES[i].quote}</blockquote>
        <div className="story-attr">
          <span className="story-name">{STORIES[i].name}</span>
          <span className="story-where">{STORIES[i].where}</span>
        </div>
        <div className="story-controls">
          {STORIES.map((_, k) => (
            <button
              key={k}
              className={"story-dot " + (k === i ? "on" : "")}
              onClick={() => setI(k)}
              aria-label={`Story ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
