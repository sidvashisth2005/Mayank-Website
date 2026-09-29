"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const assets = [
  { id: "MX/024", name: "Kite Analytics", category: "Code + Product", route: "Native transfer", price: "₹1,85,000", status: "Evidence reviewed", tone: "mineral", description: "React analytics workspace, interface system and deployment documentation." },
  { id: "MX/031", name: "Northstar", category: "Domain + Identity", route: "Documented assignment", price: "₹78,000", status: "Route documented", tone: "clay", description: "Dot-com domain, naming system and editable original identity files." },
  { id: "MX/038", name: "Relay System", category: "Design System", route: "Exclusive licence", price: "₹42,000", status: "Evidence ready", tone: "moss", description: "Figma library, design tokens and production component guidance." },
  { id: "MX/043", name: "Atlas Portal", category: "Complete Product", route: "Native transfer", price: "₹2,40,000", status: "Evidence reviewed", tone: "steel", description: "Next.js support portal with searchable documentation and deployment notes." },
];

const demoStates = {
  Overview: { label: "Active accounts", value: "1,284", bars: [38, 61, 48, 79, 66, 88] },
  Cohorts: { label: "90-day retention", value: "68%", bars: [89, 77, 68, 59, 52, 47] },
  Accounts: { label: "Healthy accounts", value: "84%", bars: [55, 71, 68, 87, 78, 92] },
};

function ProductDemo({ compact = false }: { compact?: boolean }) {
  const [view, setView] = useState<keyof typeof demoStates>("Overview");
  const state = demoStates[view];
  return <div className={`product-demo ${compact ? "compact-demo" : ""}`} aria-label="Interactive sample of Kite Analytics">
    <div className="demo-rail"><strong>KITE</strong><div className="demo-nav" aria-label="Product demo views">{(Object.keys(demoStates) as Array<keyof typeof demoStates>).map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{item}</button>)}</div><span>Settings</span></div>
    <div className="demo-workspace"><div className="demo-heading"><strong>{view}</strong><span>Last 30 days</span></div><div className="demo-content"><div className="demo-chart"><span className="eyebrow">{state.label}</span><div className="bars" aria-label={`${state.label}: ${state.value}`}>{state.bars.map((height, index) => <i key={`${view}-${index}`} style={{ height: `${height}%` }} />)}</div></div><div className="demo-reading"><span className="eyebrow">Current reading</span><strong>{state.value}</strong><small>Illustrative product state</small></div></div></div>
  </div>;
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<(typeof assets)[number] | null>(null);
  const [formSent, setFormSent] = useState(false);
  const filteredAssets = useMemo(() => assets.filter((asset) => `${asset.name} ${asset.category} ${asset.route}`.toLowerCase().includes(query.toLowerCase()) && (category === "All" || asset.category === category)), [query, category]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".opening-word span", { yPercent: 115, duration: 1.1, stagger: 0.08, ease: "power4.out" });
      gsap.from(".hero-fragment", { clipPath: "inset(100% 0 0 0)", duration: 1.15, stagger: 0.13, ease: "power3.inOut", delay: 0.18 });
      gsap.utils.toArray<HTMLElement>(".reveal-cut").forEach((element) => gsap.from(element, { clipPath: "inset(0 0 100% 0)", y: 36, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } }));
      if (reelRef.current && window.innerWidth > 900) {
        const track = reelRef.current;
        gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth + 72), ease: "none", scrollTrigger: { trigger: ".reel-scene", start: "top top", end: () => `+=${track.scrollWidth}`, scrub: 0.7, pin: true, invalidateOnRefresh: true } });
      }
      gsap.utils.toArray<HTMLElement>(".anatomy-step").forEach((step) => ScrollTrigger.create({ trigger: step, start: "top center", end: "bottom center", toggleClass: { targets: step, className: "is-current" } }));
    }, root);
    return () => context.revert();
  }, []);

  function submitInterest(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setFormSent(true); }

  return <main ref={rootRef} className="site-shell">
    <header className="topbar"><a className="wordmark" href="#top" aria-label="Mayank home">MAYANK</a><nav aria-label="Primary navigation"><a href="#exchange">Exchange</a><a href="#transfer">How assets move</a><a href="#list">List an asset</a></nav><a className="header-cta" href="#market">Open market</a></header>

    <section id="top" className="opening-scene"><div className="opening-meta"><span>Independent digital asset exchange</span><span>Edition 001 / Sample inventory</span></div><h1 className="opening-word" aria-label="Built once. Useful again."><span>BUILT</span><span className="serif-word">once.</span><span>USEFUL</span><span className="cut-word">again.</span></h1><p className="opening-copy">A curated market for acquiring, licensing and continuing original startup-built products, code, domains and design systems.</p><div className="hero-composition" aria-label="Featured sample assets"><article className="hero-fragment fragment-demo"><ProductDemo compact /></article><article className="hero-fragment fragment-identity"><span className="eyebrow">MX/031 · Identity</span><strong>NORTH<br/>STAR</strong><small>Domain + naming system</small></article><article className="hero-fragment fragment-record"><span className="eyebrow">Transfer condition</span><strong>Evidence<br/>before access.</strong><small>Seller identity remains private until a request is approved.</small></article><a className="hero-fragment fragment-action" href="#market"><span>04 sample assets</span><strong>Enter the exchange</strong></a></div><div className="opening-status"><span>Available 03</span><span>In discussion 01</span><span>Restricted assets blocked</span></div></section>

    <section id="exchange" className="reel-scene"><div className="scene-label"><span>01</span><span>Asset reveal</span></div><div className="reel-track" ref={reelRef}><article className="reel-intro"><span className="eyebrow">Selected work</span><h2>See the product<br/>before the pitch.</h2><p>Every public record begins with the working asset, its present condition and the proposed transfer route.</p></article>{assets.map((asset, index) => <article className={`asset-frame ${asset.tone}`} key={asset.id}><div className="frame-index"><span>{asset.id}</span><span>0{index + 1}/04</span></div>{index === 0 ? <ProductDemo compact /> : <div className="abstract-preview"><span>{asset.name.slice(0, 2).toUpperCase()}</span><i/><i/><i/></div>}<div className="frame-copy"><div><span className="eyebrow">{asset.category}</span><h3>{asset.name}</h3></div><div><p>{asset.description}</p><strong>{asset.price}</strong></div></div></article>)}</div></section>

    <section id="transfer" className="anatomy-scene"><div className="scene-label"><span>02</span><span>Transfer anatomy</span></div><div className="anatomy-heading reveal-cut"><span className="eyebrow">Condition / Evidence / Transfer</span><h2>Nothing moves<br/>on a vague promise.</h2></div><div className="anatomy-layout"><div className="anatomy-visual"><div className="transfer-object"><span>MX/024</span><strong>KITE</strong><small>Native transfer</small></div><div className="transfer-axis" aria-hidden="true"><i/><i/><i/><i/></div></div><div className="anatomy-steps"><article className="anatomy-step"><span>01</span><div><h3>Identity</h3><p>The seller is checked privately. Public records never expose personal contact details.</p></div></article><article className="anatomy-step"><span>02</span><div><h3>Ownership</h3><p>Repository history, registrar records and original files support the ownership claim.</p></div></article><article className="anatomy-step"><span>03</span><div><h3>Condition</h3><p>What works, what needs attention and what is excluded are recorded before an enquiry.</p></div></article><article className="anatomy-step"><span>04</span><div><h3>Handover</h3><p>The buyer receives a defined transfer route, expected duration and support period.</p></div></article></div></div></section>

    <section id="market" className="market-scene"><div className="scene-label"><span>03</span><span>Live exchange / Sample data</span></div><div className="market-heading reveal-cut"><h2>Available work</h2><p>Prototype listings are clearly marked as sample inventory.</p></div><div className="market-tools"><label><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Asset, technology or route"/></label><label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{Array.from(new Set(assets.map((asset) => asset.category))).map((item) => <option key={item}>{item}</option>)}</select></label><span className="market-count">{filteredAssets.length.toString().padStart(2, "0")} records</span></div><div className="market-table" aria-live="polite"><div className="table-head"><span>Record</span><span>Asset</span><span>Transfer route</span><span>Asking</span><span>Condition</span></div>{filteredAssets.map((asset) => <button className="market-row" key={asset.id} onClick={() => setSelected(asset)}><span>{asset.id}</span><span><strong>{asset.name}</strong><small>{asset.category}</small></span><span>{asset.route}</span><span>{asset.price}</span><span>{asset.status}</span></button>)}{filteredAssets.length === 0 && <div className="empty-state"><strong>No matching assets.</strong><span>Try another category or transfer route.</span></div>}</div></section>

    <section id="list" className="listing-scene"><div className="listing-title reveal-cut"><span className="eyebrow">04 / Founder listing studio</span><h2>Put the work<br/>back to work.</h2><p>Start with the asset itself. Ownership and transfer eligibility are reviewed before publication.</p></div><form className="listing-form" onSubmit={submitInterest}>{!formSent ? <><label><span>Asset name</span><input required placeholder="A clear, specific name"/></label><label><span>Closest category</span><select defaultValue=""><option value="" disabled>Select category</option><option>Code or complete product</option><option>Domain and identity</option><option>Design system or template</option><option>Provider-dependent asset</option></select></label><label className="wide-field"><span>Present condition</span><textarea required placeholder="What works today, what needs attention and when it was last maintained"/></label><label><span>Professional email</span><input required type="email" placeholder="founder@company.com"/></label><button type="submit">Create private draft</button></> : <div className="success-state" role="status"><span>Draft created locally</span><strong>Next: establish ownership.</strong><p>This prototype does not send or store your information.</p><button type="button" onClick={() => setFormSent(false)}>Start another draft</button></div>}</form></section>

    <section className="standards-scene"><div className="scene-label"><span>05</span><span>Market standards</span></div><div className="standards-copy reveal-cut"><h2>Clear limits make<br/>a stronger market.</h2><p>Personal accounts, customer data, credentials, disputed intellectual property and non-transferable credits are not accepted.</p><a href="/restricted-assets">Read restricted asset policy</a></div><div className="standards-band"><span>Seller identity checked privately</span><span>Ownership evidence reviewed</span><span>Transfer route documented</span><span>Independent due diligence remains required</span></div></section>

    <footer><div><a className="wordmark" href="#top">MAYANK</a><p>Startup-built assets, ready for their next operator.</p></div><div><a href="#market">Exchange</a><a href="#transfer">How assets move</a><a href="#list">List an asset</a></div><div><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/restricted-assets">Restricted Assets</Link></div><div><span>[FOUNDER NAME]</span><span>[PROFESSIONAL EMAIL]</span><span>[FOUNDER LINKEDIN]</span></div></footer>

    {selected && <div className="asset-modal" role="dialog" aria-modal="true" aria-labelledby="asset-title"><button className="modal-backdrop" aria-label="Close asset detail" onClick={() => setSelected(null)}/><article><div className="modal-head"><span>{selected.id} · Sample inventory</span><button onClick={() => setSelected(null)}>Close</button></div><h2 id="asset-title">{selected.name}</h2><p>{selected.description}</p>{selected.id === "MX/024" ? <ProductDemo/> : <div className={`modal-art ${selected.tone}`}><span>{selected.name.slice(0, 2).toUpperCase()}</span></div>}<div className="modal-record"><span>Transfer route</span><strong>{selected.route}</strong><span>Asking</span><strong>{selected.price}</strong><span>Condition</span><strong>{selected.status}</strong><span>Customer data</span><strong>Not included</strong></div><button className="modal-cta">Request private access</button><small>Prototype only. No enquiry is sent.</small></article></div>}
  </main>;
}
