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
            <a href="#">Harare</a>
            <a href="#">Bulawayo</a>
            <a href="#">Johannesburg</a>
            <a href="#">Cape Town</a>
            <a href="#">Online</a>
          </div>
          <div>
            <div className="fcol-h">Contact</div>
            <a href="#">Press kit</a>
            <a href="#">Annual report &apos;25</a>
          </div>
        </div>
      </div>
      <div className="footer-bot">
        <div>© 2026 Sawubona Foundation · Registered 501(c)(3)</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Code of conduct</a>
          <a href="#">Financials</a>
        </div>
      </div>
    </footer>
  );
}
