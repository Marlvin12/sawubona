"use client";

import { useState, useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const TRACKS = [
  { value: "cs",        label: "Intro to CS",                  sub: "Foundations" },
  { value: "web",       label: "Web Design & Development",     sub: "Foundations" },
  { value: "game",      label: "Game Development",             sub: "Creative" },
  { value: "data-ai",   label: "Data Science / Ethical AI & ML", sub: "AI / Data" },
  { value: "robotics",  label: "Robotics",                     sub: "Hardware / Embedded Systems" },
  { value: "mentorship",label: "1:1 Mentorship",               sub: "Long-term, 6–12 months" },
  { value: "founders",  label: "Founders Accelerator",         sub: "Startup mentoring" },
];

const TIMEZONES = [
  { value: "UTC-8",  label: "UTC−8 · Pacific US (LA, Vancouver)" },
  { value: "UTC-7",  label: "UTC−7 · Mountain US (Denver, Phoenix)" },
  { value: "UTC-6",  label: "UTC−6 · Central US (Chicago, Dallas)" },
  { value: "UTC-5",  label: "UTC−5 · Eastern US (New York, Toronto)" },
  { value: "UTC-4",  label: "UTC−4 · Atlantic / Eastern DST" },
  { value: "UTC+0",  label: "UTC+0 · UK / Ireland / Ghana (London, Accra)" },
  { value: "UTC+1",  label: "UTC+1 · Central Europe / Nigeria (Berlin, Lagos)" },
  { value: "UTC+2",  label: "UTC+2 · South Africa / Eastern Europe (Jozi, Warsaw)" },
  { value: "UTC+3",  label: "UTC+3 · East Africa / Gulf (Nairobi, Dubai)" },
];

const COMMITMENT_OPTIONS = [
  {
    value: "spark",
    label: "The \"One Hour\" Spark",
    sub: "Drop in for a single guest lecture, code review, or AMA session",
  },
  {
    value: "cohort",
    label: "Cohort Contributor",
    sub: "Teach a specific module over a few weeks",
  },
  {
    value: "guide",
    label: "The Guide",
    sub: "Take on a 1:1 mentee for 6–12 months, 1 hour / week",
  },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface VolunteerForm {
  fullName: string; email: string; linkedin: string; whatsapp: string;
  city: string; country: string;
  role: string; organization: string;
  saConnection: string;
  tracks: string[];
  expertise: string;
  commitment: string;
  timezone: string;
  availability: string;
}

const EMPTY: VolunteerForm = {
  fullName: "", email: "", linkedin: "", whatsapp: "",
  city: "", country: "",
  role: "", organization: "",
  saConnection: "",
  tracks: [],
  expertise: "",
  commitment: "",
  timezone: "",
  availability: "",
};

type StepId = "profile" | "skills" | "commitment";

const STEP_LABELS: Record<StepId, string> = {
  profile:    "Your profile",
  skills:     "Skills & tracks",
  commitment: "Commitment",
};

const STEPS: StepId[] = ["profile", "skills", "commitment"];

function validateStep(step: StepId, f: VolunteerForm): boolean {
  switch (step) {
    case "profile":
      return !!(f.fullName.trim() && f.email.trim() && f.city.trim() && f.country.trim() && f.saConnection.trim());
    case "skills":
      return f.tracks.length > 0 && !!f.expertise.trim();
    case "commitment":
      if (!f.commitment) return false;
      if (f.commitment !== "spark") return !!(f.timezone);
      return true;
  }
}

// ── Mini-components ───────────────────────────────────────────────────────────

function Field({ label, sub, required = false, children }: {
  label: string; sub?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        {required && <span style={{ color: "var(--muted-2)", marginLeft: 4, fontWeight: 400 }}>*</span>}
        {sub && <span className="form-label-sub">{sub}</span>}
      </label>
      {children}
    </div>
  );
}

function RadioGroup({ options, value, onChange }: {
  options: { value: string; label: string; sub?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="radio-group">
      {options.map(o => (
        <button key={o.value} type="button"
          className={"radio-chip " + (value === o.value ? "selected" : "")}
          onClick={() => onChange(o.value)}
        >
          <div className="radio-chip-dot" />
          <div>
            <div className="radio-chip-label">{o.label}</div>
            {o.sub && <div className="radio-chip-sub">{o.sub}</div>}
          </div>
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, values, onChange }: {
  options: { value: string; label: string; sub?: string }[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  return (
    <div className="tracks-grid">
      {options.map(o => {
        const on = values.includes(o.value);
        return (
          <button key={o.value} type="button"
            className={"radio-chip " + (on ? "selected" : "")}
            onClick={() => toggle(o.value)}
          >
            <div className="checkbox-box">
              {on && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <div className="radio-chip-label">{o.label}</div>
              {o.sub && <div className="radio-chip-sub">{o.sub}</div>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

type Setter = <K extends keyof VolunteerForm>(k: K, v: VolunteerForm[K]) => void;

function StepProfile({ f, set }: { f: VolunteerForm; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">Your background</div>
      <h2 className="form-step-title">Who you are and where you're from.</h2>
      <p className="form-step-sub">We use this to match you to learners across the right time zones and build that relational bridge from day one.</p>

      <div className="form-row">
        <Field label="Full name" required>
          <input className="form-input" placeholder="Your full name"
            value={f.fullName} onChange={e => set("fullName", e.target.value)} />
        </Field>
        <Field label="Email address" required>
          <input className="form-input" type="email" placeholder="you@email.com"
            value={f.email} onChange={e => set("email", e.target.value)} />
        </Field>
      </div>

      <div className="form-row">
        <Field label="LinkedIn profile URL">
          <input className="form-input" placeholder="linkedin.com/in/yourname"
            value={f.linkedin} onChange={e => set("linkedin", e.target.value)} />
        </Field>
        <Field label="WhatsApp number" sub="Optional">
          <input className="form-input" placeholder="+1 212 000 0000"
            value={f.whatsapp} onChange={e => set("whatsapp", e.target.value)} />
        </Field>
      </div>

      <div className="form-row">
        <Field label="City" required>
          <input className="form-input" placeholder="New York, London, Dubai…"
            value={f.city} onChange={e => set("city", e.target.value)} />
        </Field>
        <Field label="Country" required>
          <input className="form-input" placeholder="USA, UK, Canada…"
            value={f.country} onChange={e => set("country", e.target.value)} />
        </Field>
      </div>

      <div className="form-row">
        <Field label="Current role">
          <input className="form-input" placeholder="Software Engineer"
            value={f.role} onChange={e => set("role", e.target.value)} />
        </Field>
        <Field label="Organization">
          <input className="form-input" placeholder="Google, DeepMind, Stripe…"
            value={f.organization} onChange={e => set("organization", e.target.value)} />
        </Field>
      </div>

      <Field label="What is your connection to Southern Africa?" required
        sub="This builds an immediate bridge with your students — even a brief phrase helps.">
        <input className="form-input"
          placeholder="e.g. Originally from Bulawayo · Diaspora ally · My partner is Zimbabwean"
          value={f.saConnection} onChange={e => set("saConnection", e.target.value)} />
      </Field>
    </div>
  );
}

function StepSkills({ f, set }: { f: VolunteerForm; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">What you bring</div>
      <h2 className="form-step-title">Where can you make the biggest impact?</h2>
      <p className="form-step-sub">Select everything you're qualified and excited to support — not just what you do day-to-day.</p>

      <Field label="Which track(s) can you support?" required>
        <CheckboxGroup
          options={TRACKS}
          values={f.tracks}
          onChange={v => set("tracks", v)}
        />
      </Field>

      <Field label="Core technical stack or area of expertise" required
        sub="Short phrases work best — e.g. Python, React, ML / NLP, Embedded C, Product Management, VC">
        <input className="form-input"
          placeholder="Python · scikit-learn · data viz · statistics"
          value={f.expertise} onChange={e => set("expertise", e.target.value)} />
      </Field>
    </div>
  );
}

function StepCommitment({ f, set }: { f: VolunteerForm; set: Setter }) {
  const notSpark = f.commitment && f.commitment !== "spark";
  return (
    <div className="form-step">
      <div className="form-step-kicker">Your commitment</div>
      <h2 className="form-step-title">How much can you give?</h2>
      <p className="form-step-sub">An hour is enough to change a life. Pick whatever fits your schedule — you can always do more later.</p>

      <Field label="Preferred level of involvement" required>
        <RadioGroup
          options={COMMITMENT_OPTIONS}
          value={f.commitment}
          onChange={v => set("commitment", v)}
        />
      </Field>

      {notSpark && (
        <>
          <Field label="Which time zone are you in?" required>
            <select className="form-input" value={f.timezone}
              onChange={e => set("timezone", e.target.value)}>
              <option value="">Select your time zone…</option>
              {TIMEZONES.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </Field>

          <Field label="When are you generally free to connect live?"
            sub="e.g. Saturday mornings, weekday evenings after 7 pm EST">
            <textarea className="form-input" style={{ minHeight: 80 }}
              placeholder="Give us a rough sense of your recurring availability…"
              value={f.availability} onChange={e => set("availability", e.target.value)} />
          </Field>
        </>
      )}

      {f.commitment === "spark" && (
        <div className="form-commitment-box">
          You'll receive a brief form to pick a single slot once we match you to an upcoming class. No recurring commitment needed.
        </div>
      )}
    </div>
  );
}

function SuccessScreen({ name, commitment, onClose }: {
  name: string; commitment: string; onClose: () => void;
}) {
  const labels: Record<string, string> = {
    spark:  "One Hour Spark volunteer",
    cohort: "Cohort Contributor",
    guide:  "Guide",
  };
  return (
    <div className="form-success">
      <div className="form-success-icon">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="27" stroke="var(--ink)" strokeWidth="2" />
          <path d="M17 28 L25 36 L39 20" stroke="var(--ink)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="form-success-title">Welcome to the family, {name.split(" ")[0]}.</h2>
      <p className="form-success-sub">
        You're registered as a <strong>{labels[commitment] ?? "volunteer"}</strong>. We'll be in touch within 5 days with your first match and a session brief.
      </p>
      <p className="form-success-quote">
        <em>Yebo, sawubona — I see you too.</em>
      </p>
      <button className="btn btn-primary btn-lg" onClick={onClose}>Back to Sawubona</button>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function VolunteerModal({ onClose }: { onClose: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<VolunteerForm>(EMPTY);
  const cardRef = useRef<HTMLDivElement>(null);

  const set: Setter = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const total = STEPS.length;
  const currentStep = STEPS[stepIdx];
  const progress = ((stepIdx + 1) / total) * 100;
  const canContinue = validateStep(currentStep, form);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const scrollCard = () =>
    requestAnimationFrame(() => cardRef.current?.scrollTo({ top: 0, behavior: "smooth" }));

  const next = () => { if (stepIdx < total - 1) { setStepIdx(s => s + 1); scrollCard(); } };
  const back = () => { if (stepIdx > 0)          { setStepIdx(s => s - 1); scrollCard(); } };

  const renderStep = () => {
    switch (currentStep) {
      case "profile":    return <StepProfile f={form} set={set} />;
      case "skills":     return <StepSkills f={form} set={set} />;
      case "commitment": return <StepCommitment f={form} set={set} />;
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" ref={cardRef}>
        {submitted ? (
          <SuccessScreen name={form.fullName} commitment={form.commitment} onClose={onClose} />
        ) : (
          <>
            <div className="modal-header">
              <span className="wordmark" style={{ fontSize: 15 }}>SAWUBONA</span>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="modal-step-label">{STEP_LABELS[currentStep]}</span>
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
              </div>
            </div>
            <div className="modal-progress-track">
              <div className="modal-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            {renderStep()}
            <div className="form-footer">
              <span className="form-step-count">Step {stepIdx + 1} of {total}</span>
              <div className="form-nav-btns">
                {stepIdx > 0 && (
                  <button className="btn btn-ghost" onClick={back}>← Back</button>
                )}
                {stepIdx < total - 1 ? (
                  <button className="btn btn-primary" onClick={next}
                    disabled={!canContinue}
                    style={{ opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}>
                    Continue →
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => setSubmitted(true)}
                    disabled={!canContinue}
                    style={{ opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}>
                    Sign me up
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
