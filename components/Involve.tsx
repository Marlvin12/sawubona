"use client";

import { useApplication } from "./ApplicationProvider";

export function Involve() {
  const { openApplication, openVolunteer, openPartner } = useApplication();
  return (
    <section className="section" id="involve">
      <div className="section-kicker">
        <span className="section-kicker-rule" /> Get involved <span className="section-kicker-rule" />
      </div>
      <div className="section-title-center">
        <h2 className="h2">Build with us, mentor, or fund a cohort.</h2>
      </div>
      <div className="involve-grid">
        <div className="involve-card involve-primary" id="apply">
          <div className="ic-eyebrow">For learners back home</div>
          <h3 className="ic-title">Start learning, free.</h3>
          <p className="ic-body">Pick a course that excites you. Meet your volunteer teacher next week. Build the future you want, from wherever you are.</p>
          <button className="btn btn-primary btn-lg" onClick={() => openApplication()}>
            Browse courses →
          </button>
        </div>
        <div className="involve-card">
          <div className="ic-eyebrow">For the diaspora</div>
          <h3 className="ic-title">Teach an hour.</h3>
          <p className="ic-body">One hour. One class. One student. Whatever you can give — we'll find a learner ready to receive it.</p>
          <button className="link-arrow" onClick={() => openVolunteer()}>
            Volunteer sign-up <span>→</span>
          </button>
        </div>
        <div className="involve-card">
          <div className="ic-eyebrow">For founders &amp; funders</div>
          <h3 className="ic-title">Back a cohort.</h3>
          <p className="ic-body">Fund a class of founders, sponsor hardware for a chapter, or offer follow-on capital to alumni shipping real companies.</p>
          <button className="link-arrow" onClick={() => openPartner()}>
            Partner with us <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
