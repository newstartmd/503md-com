import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot">
          <div className="fl">
            <div className="logo"><span className="n">503</span><span className="m">MD</span></div>
            <p>
              A verified reference for clinical peptides and metabolic therapies.
              Educational information for licensed providers and informed patients — not medical advice.
            </p>
          </div>
          <nav aria-label="Footer">
            <div>
              <h4>Library</h4>
              <Link href="/compounds">All compounds</Link>
              <Link href="/compounds?goal=weight-loss">By goal</Link>
              <Link href="/compounds">By class</Link>
              <Link href="/evidence">Evidence grades</Link>
            </div>
            <div>
              <h4>Learn</h4>
              <Link href="/evidence#framework">503A vs 503B</Link>
              <Link href="/evidence">How we rate</Link>
              <Link href="/about">About</Link>
            </div>
            <div>
              <h4>Providers</h4>
              <Link href="/providers">Provider portal</Link>
              <Link href="/providers#register">Register your practice</Link>
              <a href={`mailto:${SITE.email}`}>Contact</a>
            </div>
          </nav>
        </div>
        <div className="disc">{SITE.domain} · {SITE.disclaimer}</div>
      </div>
    </footer>
  );
}
