import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ padding: "100px 0", textAlign: "center" }}>
      <div className="wrap">
        <div className="ey" style={{ justifyContent: "center" }}>Error 404</div>
        <h1 style={{ fontSize: 40, margin: "12px 0 10px" }}>Not in the reference.</h1>
        <p style={{ color: "var(--mut)", maxWidth: "34em", margin: "0 auto 26px" }}>
          That page doesn&apos;t exist. Try the compound index — every profile is one search away.
        </p>
        <Link className="btn btn-lime" href="/compounds">Browse compounds →</Link>
      </div>
    </section>
  );
}
