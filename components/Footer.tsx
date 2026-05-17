import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-wrap">
          <Link href="/" className="wordmark">SAWUBONA</Link>
          <p className="footer-tag">
            <em>Sawubona.</em> I see you. And because I see you, I show up for you.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <div className="fcol-h">Learn</div>
            <a href="#programs">Intro to CS</a>
            <a href="#programs">Web &amp; Game Dev</a>
            <a href="#programs">Data &amp; AI</a>
            <a href="#programs">Robotics</a>
            <a href="#programs">Founders track</a>
          </div>
          <div>
            <div className="fcol-h">Community</div>
            <Link href="/our-story">Our story</Link>
            <a href="#mentors">Volunteers</a>
            <a href="#stories">Stories</a>
            <a href="#involve">Get involved</a>
          </div>
          <div>
            <div className="fcol-h">Chapters</div>
            <span className="footer-link-plain">Harare</span>
            <span className="footer-link-plain">Bulawayo</span>
            <span className="footer-link-plain">Johannesburg</span>
            <span className="footer-link-plain">Cape Town</span>
            <span className="footer-link-plain">Online</span>
          </div>
          <div>
            <div className="fcol-h">Contact</div>
            <span className="footer-link-plain">Press kit</span>
            <span className="footer-link-plain">Annual report &apos;25</span>
          </div>
        </div>
      </div>
      <div className="footer-bot">
        <div>© 2026 Sawubona Foundation</div>
        <div className="footer-links">
          <span className="footer-link-plain">Privacy</span>
          <span className="footer-link-plain">Code of conduct</span>
          <span className="footer-link-plain">Financials</span>
        </div>
      </div>
    </footer>
  );
}
