import Link from "next/link";
import { NAV } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-head">
      <div className="wrap bar">
        <Link href="/" className="logo" aria-label="503MD home">
          <span className="n">503</span><span className="m">MD</span>
          <span className="d">PEPTIDE REFERENCE</span>
        </Link>
        <nav className="links" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
          <Link className="btn btn-lime" href="/providers">For Providers →</Link>
        </nav>
      </div>
    </header>
  );
}
