const MENTORS = [
  { name: "Tendai Moyo", role: "Senior Engineer · Google, NYC", initials: "TM", tags: ["Web", "Mentorship"], av: "sage", from: "Harare → NYC" },
  { name: "Nomsa Dube", role: "ML Research · DeepMind, London", initials: "ND", tags: ["AI/ML", "Ethics"], av: "blush", from: "Bulawayo → London" },
  { name: "Sipho Nkosi", role: "Staff Engineer · Stripe, SF", initials: "SN", tags: ["Systems"], av: "sky", from: "Jozi → SF" },
  { name: "Chiedza Mapfumo", role: "Founder · fintech alum, Nairobi", initials: "CM", tags: ["Founders"], av: "butter", from: "Mutare → Nairobi" },
  { name: "Thabo Mahlangu", role: "Game Developer · indie studio, Berlin", initials: "TM", tags: ["Games"], av: "lilac", from: "Cape Town → Berlin" },
  { name: "Rumbi Chikore", role: "Data Scientist · World Bank, DC", initials: "RC", tags: ["Data"], av: "paper", from: "Gweru → DC" },
];

export function Mentors() {
  return (
    <section className="section" id="mentors">
      <div className="section-kicker">
        <span className="section-kicker-rule" /> Mentors <span className="section-kicker-rule" />
      </div>
      <div className="section-title-center">
        <h2 className="h2">Brothers and sisters from the diaspora.</h2>
        <p className="sub">Engineers, researchers and founders who came up the hard way — now giving their hours to the next ones coming through.</p>
      </div>
      <div className="mentors-grid">
        {MENTORS.map((m) => (
          <div className="mentor-card" key={m.name + m.from}>
            <div className={`mentor-avatar m-av-${m.av}`} aria-hidden="true">{m.initials}</div>
            <div>
              <div className="mentor-name">{m.name}</div>
              <div className="mentor-role">{m.role}</div>
              <div className="mentor-from">{m.from}</div>
              <div className="mentor-tags">
                {m.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
