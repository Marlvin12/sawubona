const STEPS = [
  { n: "01", t: "Someone shows up", d: "A diaspora engineer signs up to teach. An hour, a month, or a whole cohort — whatever they can give." },
  { n: "02", t: "A learner raises their hand", d: "Young people across Southern Africa pick the topics that excite them. No fees, no gatekeeping." },
  { n: "03", t: "We match and meet", d: "We handle the pairing and scheduling. Sessions happen live, online — real people, real time." },
  { n: "04", t: "The circle keeps turning", d: "Learners become mentors. Mentees become founders. The next cohort is waiting on the other side." },
];

export function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="section-kicker">
        <span className="section-kicker-rule" /> How it works <span className="section-kicker-rule" />
      </div>
      <div className="section-title-center">
        <h2 className="h2">It just takes showing up.</h2>
      </div>
      <div className="how-grid">
        {STEPS.map((s) => (
          <div key={s.n} className="how-card">
            <div className="how-n">{s.n}</div>
            <div className="how-t">{s.t}</div>
            <p className="how-d">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
