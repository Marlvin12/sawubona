"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  { q: "What does Sawubona mean?", a: "It's a Zulu greeting — literally, \"I see you.\" Not just acknowledged, but truly perceived. The reply is Yebo, sawubona — I see you too. It's the posture we try to bring to every learner, every mentor, every founder." },
  { q: "What is hunhu / ubuntu?", a: "A Southern African philosophy — the belief that our humanity is bound together. I am because you are. It's the reason this whole thing works: people giving their time, freely, because the community is the thing." },
  { q: "Is it really free?", a: "Always. No tuition, no fees, no pay-if-you-get-a-job clauses. Volunteers give their time. Diaspora donors cover the infrastructure. Learners never pay a cent." },
  { q: "Who can learn with Sawubona?", a: "Young people across Southern Africa — high schoolers, university students, self-taught beginners. Some courses are open to everyone; more advanced tracks have light prerequisites so students are set up to succeed." },
  { q: "I'm in the diaspora — how do I volunteer?", a: "Sign up on the Volunteer page. An hour is enough to make a difference — introduce a class to ethical AI, walk a group through their first Python script, or take on a 1:1 mentee for six months. We handle the matching." },
  { q: "How does the Founders accelerator work?", a: "A 10-week cohort for aspiring founders building out of Southern Africa. Weekly reviews, mentor office hours, a demo day to diaspora investors, and warm intros for follow-on capital. Applications open twice a year." },
  { q: "Where are you based?", a: "Everywhere and nowhere. Volunteers are scattered across the US, UK, Europe and the Gulf. Learners are in Zimbabwe, South Africa, Zambia, Mozambique, Botswana and beyond. The internet is the classroom." },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="section" id="faq">
      <div className="section-kicker">
        <span className="section-kicker-rule" /> FAQ <span className="section-kicker-rule" />
      </div>
      <div className="section-title-center">
        <h2 className="h2">Questions we get a lot.</h2>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, idx) => (
          <div key={item.q} className={"faq-item " + (open === idx ? "open" : "")}>
            <button className="faq-q" onClick={() => setOpen(open === idx ? -1 : idx)}>
              <span>{item.q}</span>
              <span className="faq-plus" aria-hidden="true">{open === idx ? "–" : "+"}</span>
            </button>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
