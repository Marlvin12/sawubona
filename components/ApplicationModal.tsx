"use client";

import { useState, useEffect, useRef } from "react";

// ── Track config ─────────────────────────────────────────────────────────────

const TRACK_BY_ID: Record<string, string> = {
  "cs-hs":      "Intro to CS",
  web:          "Web Design & Development",
  game:         "Game Development",
  ai:           "Ethical AI & ML",
  data:         "Data Science",
  robotics:     "Robotics",
  mentorship:   "1:1 Mentorship",
  founders:     "Founders Accelerator",
};

type PrereqType = "data-ai" | "robotics" | "founders" | null;

interface TrackConfig {
  isShort: boolean;
  prereq: PrereqType;
  commitment: string;
}

const TRACK_CONFIG: Record<string, TrackConfig> = {
  "Intro to CS":              { isShort: true,  prereq: null,       commitment: "1 hr / session, rolling" },
  "Web Design & Development": { isShort: true,  prereq: null,       commitment: "4 hrs / week, self-paced" },
  "Game Development":         { isShort: false, prereq: null,       commitment: "3 hrs / week for 8 weeks" },
  "Ethical AI & ML":          { isShort: false, prereq: "data-ai",  commitment: "6 hrs / week for 12 weeks" },
  "Data Science":             { isShort: false, prereq: "data-ai",  commitment: "5 hrs / week for 10 weeks" },
  "Robotics":                 { isShort: false, prereq: "robotics", commitment: "8 hrs / week for 24 weeks" },
  "1:1 Mentorship":           { isShort: false, prereq: null,       commitment: "1 hr / week for 6–12 months" },
  "Founders Accelerator":     { isShort: false, prereq: "founders", commitment: "~20 hrs / week for 10 weeks" },
};

type StepId = "core" | "readiness" | "motivation" | "prereqs" | "wrapup";

function computeSteps(track: string): StepId[] {
  const cfg = TRACK_CONFIG[track];
  if (!cfg) return ["core", "readiness", "wrapup"];
  const s: StepId[] = ["core", "readiness"];
  if (!cfg.isShort) s.push("motivation");
  if (!cfg.isShort && cfg.prereq) s.push("prereqs");
  s.push("wrapup");
  return s;
}

const STEP_LABELS: Record<StepId, string> = {
  core:       "About you",
  readiness:  "Setup",
  motivation: "Motivation",
  prereqs:    "Prerequisites",
  wrapup:     "Final step",
};

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
  fullName: string; email: string; whatsapp: string;
  city: string; country: string;
  academicStatus: string; track: string;
  device: string; internet: string;
  whyNow: string; ubuntuImpact: string; gritStory: string;
  pythonLevel: string; statsLevel: string;
  roboticsChapter: string;
  startupProblem: string; mvpStatus: string; teamInfo: string;
  howHeard: string; anythingElse: string;
}

const EMPTY: FormState = {
  fullName: "", email: "", whatsapp: "",
  city: "", country: "",
  academicStatus: "", track: "",
  device: "", internet: "",
  whyNow: "", ubuntuImpact: "", gritStory: "",
  pythonLevel: "", statsLevel: "",
  roboticsChapter: "",
  startupProblem: "", mvpStatus: "", teamInfo: "",
  howHeard: "", anythingElse: "",
};

function validateStep(step: StepId, f: FormState): boolean {
  switch (step) {
    case "core":
      return !!(f.fullName.trim() && f.email.trim() && f.city.trim() && f.academicStatus && f.track);
    case "readiness":
      return !!(f.device && f.internet);
    case "motivation":
      return !!(f.whyNow.trim() && f.ubuntuImpact.trim() && f.gritStory.trim());
    case "prereqs": {
      const p = TRACK_CONFIG[f.track]?.prereq;
      if (p === "data-ai")  return !!(f.pythonLevel && f.statsLevel);
      if (p === "robotics") return !!f.roboticsChapter;
      if (p === "founders") return !!(f.startupProblem.trim() && f.mvpStatus.trim() && f.teamInfo.trim());
      return true;
    }
    case "wrapup": return !!f.howHeard;
  }
}

// ── Shared mini-components ────────────────────────────────────────────────────

function Field({
  label, sub, required = false, children,
}: {
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

function RadioGroup({
  options, value, onChange,
}: {
  options: { value: string; label: string; sub?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="radio-group">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
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

// ── Step screens ──────────────────────────────────────────────────────────────

type Setter = (k: keyof FormState, v: string) => void;

function StepCore({ f, set }: { f: FormState; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">Who you are</div>
      <h2 className="form-step-title">Let's start with the basics.</h2>
      <p className="form-step-sub">No fee, no barrier. Just tell us a little about yourself.</p>

      <div className="form-row">
        <Field label="Full name" required>
          <input className="form-input" placeholder="Your full name" value={f.fullName}
            onChange={e => set("fullName", e.target.value)} />
        </Field>
        <Field label="Email address" required>
          <input className="form-input" type="email" placeholder="you@email.com" value={f.email}
            onChange={e => set("email", e.target.value)} />
        </Field>
      </div>

      <Field label="WhatsApp number" sub="Optional — useful for cohort coordination in Southern Africa">
        <input className="form-input" placeholder="+263 77 123 4567" value={f.whatsapp}
          onChange={e => set("whatsapp", e.target.value)} />
      </Field>

      <div className="form-row">
        <Field label="City" required>
          <input className="form-input" placeholder="Harare, Bulawayo, Jozi…" value={f.city}
            onChange={e => set("city", e.target.value)} />
        </Field>
        <Field label="Country" required>
          <input className="form-input" placeholder="Zimbabwe, South Africa…" value={f.country}
            onChange={e => set("country", e.target.value)} />
        </Field>
      </div>

      <Field label="I am currently a…" required>
        <RadioGroup
          value={f.academicStatus}
          onChange={v => set("academicStatus", v)}
          options={[
            { value: "high-school",  label: "High school student" },
            { value: "university",   label: "University student" },
            { value: "self-taught",  label: "Self-taught learner" },
            { value: "professional", label: "Working professional" },
          ]}
        />
      </Field>

      <Field label="Which path excites you?" required>
        <select className="form-input" value={f.track} onChange={e => set("track", e.target.value)}>
          <option value="">Select a program…</option>
          {Object.keys(TRACK_CONFIG).map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>
    </div>
  );
}

function StepReadiness({ f, set }: { f: FormState; set: Setter }) {
  const cfg = TRACK_CONFIG[f.track];
  return (
    <div className="form-step">
      <div className="form-step-kicker">Setup</div>
      <h2 className="form-step-title">What are you working with?</h2>
      <p className="form-step-sub">The internet is our classroom. We want to make sure you're set up to succeed from day one.</p>

      <Field label="What device will you primarily use?" required>
        <RadioGroup
          value={f.device}
          onChange={v => set("device", v)}
          options={[
            { value: "smartphone", label: "Smartphone only" },
            { value: "tablet",     label: "Tablet" },
            { value: "laptop",     label: "Laptop or Desktop computer" },
            { value: "lab",        label: "School or community lab", sub: "Shared access at a school, library, or community centre" },
          ]}
        />
      </Field>

      <Field label="How stable is your internet for live video sessions?" required>
        <RadioGroup
          value={f.internet}
          onChange={v => set("internet", v)}
          options={[
            { value: "stable",   label: "Very stable",              sub: "Unlimited data or reliable Wi-Fi" },
            { value: "moderate", label: "Moderate",                 sub: "Rely on mobile data bundles, occasional outages" },
            { value: "unstable", label: "Unstable / intermittent",  sub: "Load-shedding or limited connectivity is a reality" },
          ]}
        />
      </Field>

      {cfg && (
        <div className="form-commitment-box">
          <strong style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{f.track}</strong> requires{" "}
          <strong>{cfg.commitment}</strong> of your time.{" "}
          By continuing, you confirm you can meet this commitment.
        </div>
      )}
    </div>
  );
}

function StepMotivation({ f, set }: { f: FormState; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">Motivation</div>
      <h2 className="form-step-title">Tell us about you.</h2>
      <p className="form-step-sub">Sawubona is built on ubuntu — every learner eventually becomes a giver. We want to understand your why.</p>

      <Field label="Why do you want to learn this specific skill right now?" required
        sub="We're looking for genuine curiosity — not what you think we want to hear.">
        <textarea className="form-input" style={{ minHeight: 100 }}
          placeholder="What sparked your interest? What do you hope to be able to do?"
          value={f.whyNow} onChange={e => set("whyNow", e.target.value)} />
      </Field>

      <Field label="If you gain these technical skills, how do you hope to impact those around you?" required
        sub="Ubuntu: our humanity is bound together. Where does your learning circle back to your community?">
        <textarea className="form-input" style={{ minHeight: 120 }}
          placeholder="Your family, your neighbourhood, your country, the next generation of learners…"
          value={f.ubuntuImpact} onChange={e => set("ubuntuImpact", e.target.value)} />
      </Field>

      <Field label="Tell us about a time you tried to build, fix, or learn something on your own." required
        sub="What happened, and what did you learn from the experience?">
        <textarea className="form-input" style={{ minHeight: 100 }}
          placeholder="It doesn't have to be technical — resourcefulness and grit matter more than prior knowledge."
          value={f.gritStory} onChange={e => set("gritStory", e.target.value)} />
      </Field>
    </div>
  );
}

function StepPrereqs({ f, set }: { f: FormState; set: Setter }) {
  const prereq = TRACK_CONFIG[f.track]?.prereq;

  if (prereq === "data-ai") return (
    <div className="form-step">
      <div className="form-step-kicker">Prerequisites</div>
      <h2 className="form-step-title">A few quick checks.</h2>
      <p className="form-step-sub">These aren't pass/fail — they help us place you in the right cohort and pair you with the right mentor.</p>

      <Field label="Have you programmed in Python before?" required>
        <RadioGroup value={f.pythonLevel} onChange={v => set("pythonLevel", v)}
          options={[
            { value: "comfortable", label: "Yes, comfortably",      sub: "Written scripts, worked with libraries, comfortable debugging" },
            { value: "little",      label: "A little bit",          sub: "Followed tutorials, written basic scripts" },
            { value: "none",        label: "No — complete beginner", sub: "Never written a line of Python" },
          ]}
        />
      </Field>

      <Field label="What is your comfort level with basic statistics and algebra?" required>
        <RadioGroup value={f.statsLevel} onChange={v => set("statsLevel", v)}
          options={[
            { value: "high",     label: "High",     sub: "Comfortable with distributions, probability, linear algebra basics" },
            { value: "moderate", label: "Moderate", sub: "Familiar with the concepts, could use a refresher" },
            { value: "low",      label: "Low",      sub: "Not confident — I'll need foundational support" },
          ]}
        />
      </Field>
    </div>
  );

  if (prereq === "robotics") return (
    <div className="form-step">
      <div className="form-step-kicker">In-person chapters</div>
      <h2 className="form-step-title">Where can you show up?</h2>
      <p className="form-step-sub">Robotics is our only in-person track. We need to know which physical chapter you can commit to regularly.</p>

      <Field label="Which Sawubona chapter can you regularly commute to?" required>
        <RadioGroup value={f.roboticsChapter} onChange={v => set("roboticsChapter", v)}
          options={[
            { value: "harare",       label: "Harare",                sub: "Partner school in the greater Harare area" },
            { value: "bulawayo",     label: "Bulawayo" },
            { value: "johannesburg", label: "Johannesburg" },
            { value: "cape-town",    label: "Cape Town" },
            { value: "none",         label: "I can't attend in person", sub: "We'll waitlist you for a future online robotics track" },
          ]}
        />
      </Field>
    </div>
  );

  if (prereq === "founders") return (
    <div className="form-step">
      <div className="form-step-kicker">Your venture</div>
      <h2 className="form-step-title">Tell us about what you're building.</h2>
      <p className="form-step-sub">The Founders Accelerator is our most intensive track. We screen for genuine commitment and a real problem worth solving.</p>

      <Field label="What problem is your startup solving, and who is it for?" required
        sub="Keep it clear and specific — a one-paragraph pitch works well.">
        <textarea className="form-input" style={{ minHeight: 100 }}
          placeholder="e.g. We're building a platform that helps smallholder farmers in Zimbabwe access real-time soil data…"
          value={f.startupProblem} onChange={e => set("startupProblem", e.target.value)} />
      </Field>

      <Field label="Do you have a working prototype, MVP, or early traction?" required
        sub="e.g. WhatsApp-based product, active users, early revenue, pilot agreement">
        <textarea className="form-input" style={{ minHeight: 80 }}
          placeholder="Describe where you are today — no MVP is too small to mention."
          value={f.mvpStatus} onChange={e => set("mvpStatus", e.target.value)} />
      </Field>

      <Field label="Who is on your team, and what have you built together so far?" required
        sub="Name, background, role. Solo founders are welcome — just tell us about yourself.">
        <textarea className="form-input" style={{ minHeight: 80 }}
          placeholder="e.g. Kuda (developer, 3 yrs experience) and Lerato (business & finance)…"
          value={f.teamInfo} onChange={e => set("teamInfo", e.target.value)} />
      </Field>
    </div>
  );

  return null;
}

function StepWrapUp({ f, set }: { f: FormState; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">Last step</div>
      <h2 className="form-step-title">Almost there.</h2>
      <p className="form-step-sub">One or two final things, then you're done.</p>

      <Field label="How did you hear about Sawubona?" required>
        <RadioGroup value={f.howHeard} onChange={v => set("howHeard", v)}
          options={[
            { value: "friend",   label: "Friend or family" },
            { value: "social",   label: "Social media (Instagram, X, LinkedIn)" },
            { value: "school",   label: "University or school" },
            { value: "diaspora", label: "Diaspora community or organisation" },
            { value: "search",   label: "Google or online search" },
            { value: "other",    label: "Other" },
          ]}
        />
      </Field>

      <Field label="Is there anything else you'd like your diaspora mentors to know about you?" sub="Optional">
        <textarea className="form-input" style={{ minHeight: 100 }}
          placeholder="Anything that doesn't fit elsewhere — a constraint, an aspiration, a context that matters."
          value={f.anythingElse} onChange={e => set("anythingElse", e.target.value)} />
      </Field>
    </div>
  );
}

function SuccessScreen({ name, track, onClose }: { name: string; track: string; onClose: () => void }) {
  return (
    <div className="form-success">
      <div className="form-success-icon">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="27" stroke="var(--ink)" strokeWidth="2" />
          <path d="M17 28 L25 36 L39 20" stroke="var(--ink)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="form-success-title">
        Sawubona, {name.split(" ")[0]}.
      </h2>
      <p className="form-success-sub">
        Your application for <strong>{track}</strong> is in. Someone from our team will be in touch within 5–7 days to confirm your place and introduce your mentor.
      </p>
      <p className="form-success-quote">
        <em>Yebo, sawubona — I see you too.</em>
      </p>
      <button className="btn btn-primary btn-lg" onClick={onClose}>
        Back to Sawubona
      </button>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function ApplicationModal({
  programId,
  onClose,
}: {
  programId?: string;
  onClose: () => void;
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY,
    track: programId ? (TRACK_BY_ID[programId] ?? "") : "",
  }));
  const cardRef = useRef<HTMLDivElement>(null);

  const set: Setter = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const steps = computeSteps(form.track);
  const total = steps.length;
  const currentStep = steps[stepIdx];
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
  const submit = () => setSubmitted(true);

  const renderStep = () => {
    switch (currentStep) {
      case "core":       return <StepCore f={form} set={set} />;
      case "readiness":  return <StepReadiness f={form} set={set} />;
      case "motivation": return <StepMotivation f={form} set={set} />;
      case "prereqs":    return <StepPrereqs f={form} set={set} />;
      case "wrapup":     return <StepWrapUp f={form} set={set} />;
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-card" ref={cardRef}>
        {submitted ? (
          <SuccessScreen name={form.fullName} track={form.track} onClose={onClose} />
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
                  <button
                    className="btn btn-primary"
                    onClick={next}
                    disabled={!canContinue}
                    style={{ opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={submit}
                    disabled={!canContinue}
                    style={{ opacity: canContinue ? 1 : 0.4, cursor: canContinue ? "pointer" : "not-allowed" }}
                  >
                    Submit application
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
