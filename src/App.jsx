import React, { useState } from "react";
import {
  Archive,
  Camera,
  Clapperboard,
  Gamepad2,
  Menu,
  MessageCircle,
  Monitor,
  MoreHorizontal,
  ShoppingCart,
  Sparkles,
  Tv,
  X,
} from "lucide-react";
import logoUrl from "../Flashback Logo.png";
import businessCardUrl from "../Flashback Business Card.png";
import gameFrontUrl from "../Crown Jewel Item.jpeg";
import gameBackUrl from "../Crown Jewel Item 2.jpeg";
import cardPacksUrl from "../Example Item For Sale.jpeg";
import mascotUrl from "../Flashback Mascot.jpeg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Items", href: "#items" },
  { label: "Archive", href: "#archive" },
  { label: "Videos", href: "#videos" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  {
    title: "Vintage Tech",
    href: "#items",
    copy: "Classic electronics and game gear from the past.",
    color: "green",
    image: gameFrontUrl,
    Icon: Tv,
  },
  {
    title: "Collectibles",
    href: "#items",
    copy: "Games, sealed pieces, toys, cards, and nostalgia.",
    color: "teal",
    image: cardPacksUrl,
    Icon: Gamepad2,
  },
  {
    title: "Antiques",
    href: "#archive",
    copy: "Timeless objects with stories worth keeping.",
    color: "gold",
    image: mascotUrl,
    Icon: Archive,
  },
  {
    title: "Media & More",
    href: "#videos",
    copy: "Photos, videos, stories, and shelf-ready finds.",
    color: "blue",
    image: businessCardUrl,
    Icon: Clapperboard,
  },
  {
    title: "Explore Archive",
    href: "#archive",
    copy: "Rare finds from the Vero Flashback collection.",
    color: "green",
    image: gameBackUrl,
    Icon: Archive,
  },
];

const items = [
  {
    title: "Pokemon Yellow Graded Display",
    tag: "Crown Jewel",
    image: gameFrontUrl,
    href: "mailto:hello@veroflashback.com?subject=Pokemon%20Yellow%20Graded%20Display",
  },
  {
    title: "Pokemon Fossil Pack Pair",
    tag: "Collectible",
    image: cardPacksUrl,
    href: "mailto:hello@veroflashback.com?subject=Pokemon%20Fossil%20Pack%20Pair",
  },
  {
    title: "Vero Flashback Mascot",
    tag: "Archive Find",
    image: mascotUrl,
    href: "mailto:hello@veroflashback.com?subject=Vero%20Flashback%20Mascot",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="viewer-shell" id="home">
      <div className="round-controls" aria-label="Page controls">
        <a className="round-button" href="#home" aria-label="Back to top">
          <X size={54} strokeWidth={2.5} />
        </a>
        <button
          className="round-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <Menu size={44} /> : <MoreHorizontal size={58} strokeWidth={3} />}
        </button>
      </div>

      {menuOpen ? (
        <nav className="quick-menu" aria-label="Quick links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}

      <section className="site-frame" aria-label="Vero Flashback storefront">
        <header className="site-header">
          <a className="brand-badge" href="#home" aria-label="Vero Flashback home">
            <span>Vero</span>
            <strong>Flashback</strong>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="shop-button" href="#items">
            <ShoppingCart size={25} strokeWidth={2.8} />
            <span>Shop Now!</span>
          </a>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <p>
              <span>Classic Finds.</span>
              <strong>Timeless Stories.</strong>
              <em>Brought Back</em>
              <b>To Life.</b>
            </p>
            <div className="blue-rule" />
            <span className="intro">
              Vintage tech, antiques, collectibles, media, and forgotten objects brought back to life.
            </span>
            <div className="hero-actions">
              <a className="primary-action" href="#items">
                Shop Items
                <ShoppingCart size={18} />
              </a>
              <a className="secondary-action" href="#archive">
                Explore Archive
                <Archive size={18} />
              </a>
            </div>
          </div>

          <div className="hero-logo" aria-label="Vero Flashback">
            <img src={logoUrl} alt="Vero Flashback logo" />
          </div>

          <div className="hero-product" aria-label="Featured collection">
            <div className="static-tv">
              <div className="screen" />
              <i />
              <i />
            </div>
            <img className="product-card game" src={gameFrontUrl} alt="Graded Pokemon Yellow Game Boy item" />
            <img className="product-card packs" src={cardPacksUrl} alt="Pokemon trading card packs" />
          </div>
        </section>

        <section className="category-strip" aria-label="Shop categories">
          {categories.map(({ title, href, copy, color, image, Icon }) => (
            <a key={title} className={`category-card ${color}`} href={href}>
              <span className="category-icon">
                <Icon size={30} strokeWidth={2.6} />
              </span>
              <img src={image} alt="" />
              <span className="category-text">
                <strong>{title}</strong>
                <small>{copy}</small>
              </span>
            </a>
          ))}
        </section>
      </section>

      <section className="content-band" id="items">
        <div className="section-heading">
          <span>Fresh Finds</span>
          <h2>Featured Items</h2>
        </div>
        <div className="item-grid">
          {items.map((item) => (
            <a className="item-card" key={item.title} href={item.href}>
              <img src={item.image} alt={item.title} />
              <span>{item.tag}</span>
              <strong>{item.title}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="content-band split" id="archive">
        <div>
          <span className="section-kicker">Archive</span>
          <h2>Objects with proof, personality, and a little shelf magic.</h2>
        </div>
        <a className="outline-link" href="mailto:hello@veroflashback.com?subject=Archive%20Question">
          <Sparkles size={19} />
          Ask About the Archive
        </a>
      </section>

      <section className="content-band contact-band" id="videos">
        <div>
          <span className="section-kicker">Videos</span>
          <h2>Watch the finds, stories, and before-and-after moments.</h2>
        </div>
        <a className="outline-link" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <Camera size={19} />
          Visit Videos
        </a>
      </section>

      <section className="content-band split" id="about">
        <div>
          <span className="section-kicker">About</span>
          <h2>Vero Flashback brings vintage finds back into the light.</h2>
        </div>
        <p>
          The collection focuses on retro games, old electronics, oddball antiques, and media pieces that feel like
          they came with a story already attached.
        </p>
      </section>

      <section className="content-band contact-band" id="contact">
        <div>
          <span className="section-kicker">Contact</span>
          <h2>Looking for a piece or ready to claim one?</h2>
        </div>
        <a className="outline-link" href="mailto:hello@veroflashback.com">
          <MessageCircle size={19} />
          Contact Vero Flashback
        </a>
      </section>
    </main>
  );
}
