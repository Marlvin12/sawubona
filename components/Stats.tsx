const STATS = [
  { value: "1,420", label: "Learners across Southern Africa" },
  { value: "180", label: "Diaspora volunteers, 14 countries" },
  { value: "11", label: "Founders funded out of Cohort 01" },
  { value: "$0", label: "Cost to every learner, always" },
];

export function Stats() {
  return (
    <section className="section-full section-stats">
      <div className="stats-inner">
        <div className="stats-row">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-val">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
