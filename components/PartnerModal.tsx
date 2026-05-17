"use client";

import { useState, useEffect, useRef } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────

const PARTNERSHIP_TYPES = [
  {
    value: "cohort-sponsor",
    label: "Sponsor a Cohort / Track",
    sub: "Fund the operational and infrastructure costs for a specific class — e.g. Ethical AI or Web Dev",
  },
  {
    value: "hardware",
    label: "Hardware Ecosystem Sponsor",
    sub: "Fund laptops, internet bundles, or robotics kits for local chapters (Harare, Bulawayo, Jozi, Cape Town)",
  },
  {
    value: "capital",
    label: "Capital Pipeline for Alumni",
    sub: "Provide follow-on capital, grants, or pre-seed checks to startups from the Founders Accelerator",
  },
  {
    value: "hiring",
    label: "Hiring / Internship Pipeline",
    sub: "Offer remote or local employment and internship opportunities to top Sawubona graduates",
  },
];

const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $25,000",
  "$25,000 – $100,000",
  "$100,000+",
  "Prefer to discuss on a call",
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface PartnerForm {
  fullName: string; email: string;
  organization: string; roleTitle: string; website: string;
  partnershipTypes: string[];
  geoTrackFocus: string;
  budgetScale: string;
  primaryGoal: string;
}

const EMPTY: PartnerForm = {
  fullName: "", email: "",
  organization: "", roleTitle: "", website: "",
  partnershipTypes: [],
  geoTrackFocus: "",
  budgetScale: "",
  primaryGoal: "",
};

type StepId = "identity" | "intent" | "scope";

const STEP_LABELS: Record<StepId, string> = {
  identity: "Your organisation",
  intent:   "Partnership intent",
  scope:    "Scope & next steps",
};

const STEPS: StepId[] = ["identity", "intent", "scope"];

function validateStep(step: StepId, f: PartnerForm): boolean {
  switch (step) {
    case "identity": return !!(f.fullName.trim() && f.email.trim() && f.organization.trim() && f.roleTitle.trim());
    case "intent":   return f.partnershipTypes.length > 0;
    case "scope":    return !!f.primaryGoal.trim();
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

function PartnerTypeCheckbox({ options, values, onChange }: {
  options: typeof PARTNERSHIP_TYPES;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  return (
    <div className="radio-group">
      {options.map(o => {
        const on = values.includes(o.value);
        return (
          <button key={o.value} type="button"
            className={"radio-chip partner-type-chip " + (on ? "selected" : "")}
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
              <div className="radio-chip-label" style={{ fontWeight: 600 }}>{o.label}</div>
              <div className="radio-chip-sub">{o.sub}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

type Setter = <K extends keyof PartnerForm>(k: K, v: PartnerForm[K]) => void;

function StepIdentity({ f, set }: { f: PartnerForm; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">About you</div>
      <h2 className="form-step-title">Let's start with who you are.</h2>
      <p className="form-step-sub">We keep this brief — a couple of minutes to give us enough context to prepare a meaningful conversation.</p>

      <div className="form-row">
        <Field label="Full name" required>
          <input className="form-input" placeholder="Your full name"
            value={f.fullName} onChange={e => set("fullName", e.target.value)} />
        </Field>
        <Field label="Professional email" required>
          <input className="form-input" type="email" placeholder="you@fund.com"
            value={f.email} onChange={e => set("email", e.target.value)} />
        </Field>
      </div>

      <div className="form-row">
        <Field label="Organisation / Fund / Company" required>
          <input className="form-input" placeholder="Acme Ventures, Google.org…"
            value={f.organization} onChange={e => set("organization", e.target.value)} />
        </Field>
        <Field label="Your role / title" required>
          <input className="form-input" placeholder="General Partner, CSR Director…"
            value={f.roleTitle} onChange={e => set("roleTitle", e.target.value)} />
        </Field>
      </div>

      <Field label="Website or fund link" sub="Optional">
        <input className="form-input" placeholder="https://yourfund.com"
          value={f.website} onChange={e => set("website", e.target.value)} />
      </Field>
    </div>
  );
}

function StepIntent({ f, set }: { f: PartnerForm; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">How you want to back us</div>
      <h2 className="form-step-title">What kind of partnership are you envisioning?</h2>
      <p className="form-step-sub">Select all that apply — partnerships often span more than one category.</p>

      <Field label="Partnership type(s)" required>
        <PartnerTypeCheckbox
          options={PARTNERSHIP_TYPES}
          values={f.partnershipTypes}
          onChange={v => set("partnershipTypes", v)}
        />
      </Field>

      <Field label="Are there specific geographies or technical tracks your organisation focuses on?"
        sub="Optional — helps us tailor the proposal to your mandate">
        <textarea className="form-input" style={{ minHeight: 80 }}
          placeholder="e.g. Southern Africa only · AI / Data Science tracks · Zimbabwe specifically"
          value={f.geoTrackFocus} onChange={e => set("geoTrackFocus", e.target.value)} />
      </Field>
    </div>
  );
}

function StepScope({ f, set }: { f: PartnerForm; set: Setter }) {
  return (
    <div className="form-step">
      <div className="form-step-kicker">Scope & next steps</div>
      <h2 className="form-step-title">Help us prepare a meaningful conversation.</h2>
      <p className="form-step-sub">This goes directly to our partnerships team — the more context you give, the better we can match your mandate to our needs.</p>

      <Field label="Approximate scale or budget of partnership envisioned" sub="Optional — helps us prioritise and route your enquiry">
        <select className="form-input" value={f.budgetScale}
          onChange={e => set("budgetScale", e.target.value)}>
          <option value="">Prefer not to say / discuss on a call</option>
          {BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>

      <Field label="What is your primary goal or mandate for this partnership?" required
        sub="e.g. ESG / impact metrics · sourcing untapped tech talent · expanding deal flow in Southern Africa">
        <textarea className="form-input" style={{ minHeight: 120 }}
          placeholder="Tell us what success looks like for your organisation after 12 months of partnership…"
          value={f.primaryGoal} onChange={e => set("primaryGoal", e.target.value)} />
      </Field>
    </div>
  );
}

function SuccessScreen({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <div className="form-success">
      <div className="form-success-icon">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="27" stroke="var(--ink)" strokeWidth="2" />
          <path d="M17 28 L25 36 L39 20" stroke="var(--ink)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="form-success-title">Let's build together, {name.split(" ")[0]}.</h2>
      <p className="form-success-sub">
        Your partnership enquiry is with our team. We'll reply within 2 business days to explore how we can work together.
      </p>
      <p className="form-success-quote">
        <em>Sawubona. I see you.</em>
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <a
          className="btn btn-primary btn-lg"
          href="https://cal.com/sawubona/partnership"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a discovery call →
        </a>
        <button className="btn btn-ghost" onClick={onClose}>Back to Sawubona</button>
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function PartnerModal({ onClose }: { onClose: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<PartnerForm>(EMPTY);
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
      case "identity": return <StepIdentity f={form} set={set} />;
      case "intent":   return <StepIntent f={form} set={set} />;
      case "scope":    return <StepScope f={form} set={set} />;
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" ref={cardRef}>
        {submitted ? (
          <SuccessScreen name={form.fullName} onClose={onClose} />
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
                    Send enquiry
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
