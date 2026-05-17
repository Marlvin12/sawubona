import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "I am because you are. The story behind Sawubona — a Southern African initiative rooted in hunhu · ubuntu, giving back through free technology education.",
  openGraph: {
    title: "Our Story — Sawubona",
    description:
      "I am because you are. The story behind Sawubona — a Southern African initiative rooted in hunhu · ubuntu, giving back through free technology education.",
    images: [{ url: "/students.jpg", width: 1200, height: 630, alt: "Two young students sharing a laptop." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Sawubona",
    description:
      "I am because you are. The story behind Sawubona — a Southern African initiative rooted in hunhu · ubuntu, giving back through free technology education.",
    images: ["/students.jpg"],
  },
};

export default function OurStory() {
  return (
    <>
      <nav className="nav">
        <Link href="/" className="wordmark">SAWUBONA</Link>
        <div className="nav-right">
          <div className="nav-links">
            <Link href="/our-story">Our story</Link>
            <Link href="/#programs">Learn</Link>
            <Link href="/#mentors">Volunteers</Link>
            <Link href="/#stories">Stories</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="nav-cta">
            <Link className="btn btn-primary" href="/#involve">Get involved</Link>
          </div>
        </div>
      </nav>
      <main>
        <section className="section" style={{ maxWidth: 800 }}>
          <div className="section-kicker" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
            <span className="section-kicker-rule" /> Our story <span className="section-kicker-rule" />
          </div>
          <h1 className="h2" style={{ textAlign: "center", marginBottom: 48 }}>
            <em>I am because you are.</em>
          </h1>
          <div style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(18px,1.5vw,21px)",
            lineHeight: 1.65,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
          }}>
            <p style={{ marginBottom: 24 }}>
              Sawubona is rooted in the spirit of <strong>hunhu</strong>, or <strong>ubuntu</strong>: the Southern African belief that our humanity is bound together. That I am because you are.
            </p>
            <p style={{ marginBottom: 24 }}>
              We exist to give back. To share the skills we wish we'd had access to growing up, starting with technology.
            </p>
            <p style={{ marginBottom: 24 }}>
              Through Sawubona, computer science graduates and professionals from the diaspora (Zimbabweans, South Africans, and others living in the US and abroad) volunteer their time to teach and mentor young people back home. A senior volunteer might give just one hour to introduce high schoolers to ethical AI. Another might walk a group through the basics of game development. It costs nothing. It just takes showing up.
            </p>
            <p style={{ marginBottom: 24 }}>
              Learners choose their own path. They pick the topics that excite them: game development, web design, data science, AI, and more. Some courses are open to everyone; others have prerequisites to make sure students are set up to succeed.
            </p>
            <p style={{ marginBottom: 24 }}>
              But this isn't only about technology. Sawubona is about being your brother's keeper. It's about truly seeing someone and deciding to invest in their potential.
            </p>
            <p style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid var(--line-2)",
              textAlign: "center",
              fontSize: "clamp(20px,1.8vw,24px)",
              fontStyle: "italic",
              color: "var(--ink)",
            }}>
              Sawubona. I see you. And because I see you, I show up for you.
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: 64 }}>
            <Link className="btn btn-primary btn-lg" href="/#programs">Browse programs</Link>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-bot" style={{ paddingTop: 0, borderTop: "none" }}>
          <div>© 2026 Sawubona Foundation · Registered 501(c)(3)</div>
          <div className="footer-links">
            <span className="footer-link-plain">Privacy</span>
            <span className="footer-link-plain">Code of conduct</span>
          </div>
        </div>
      </footer>
    </>
  );
}
