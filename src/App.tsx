import { useEffect, useRef, useState } from 'react';
import LogoCarousel from './LogoCarousel';
import { motion, useScroll, useTransform } from 'framer-motion';

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Playback failed:", e));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const watchRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const handRotation1 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const handRotation2 = useTransform(scrollYProgress, [0, 1], [0, -4320]);
  const watchY = useTransform(scrollYProgress, [0, 1], [250, -250]);

  const textOpacity1 = useTransform(scrollYProgress, [0.3, 0.45, 0.55], [0, 1, 0]);
  const textOpacity2 = useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0, 1, 0]);

  const opacityOffset = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={`loader-overlay ${!loading ? 'fade-out' : ''}`}>
        <div className="loader-logo">A<span>T</span>C</div>
        <div className="loader-progress-text">{loadProgress}%</div>
        <div className="loader-progress-line">
          <div className="loader-progress-fill" style={{ width: `${loadProgress}%` }}></div>
        </div>
      </div>

      <header className={`fixed-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>ATC</a>
        <nav>
          <ul className="nav-links">
            <li><a href="#stewardship" onClick={(e) => { e.preventDefault(); scrollTo('stewardship'); }} className="nav-link">Stewardship</a></li>
            <li><a href="#atelier" onClick={(e) => { e.preventDefault(); scrollTo('atelier'); }} className="nav-link">Atelier</a></li>
            <li><a href="#kinetics" onClick={(e) => { e.preventDefault(); scrollTo('kinetics'); }} className="nav-link">Kinetics</a></li>
            <li><a href="#calibre" onClick={(e) => { e.preventDefault(); scrollTo('calibre'); }} className="nav-link">Calibre</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero-new" id="hero">
        <div className="hero-new-left">
          <div className="hero-new-text-content">
            <div className="hero-new-tagline">
              <span className="hero-new-tagline-line"></span>
              <span className="hero-new-tagline-text">Stewardship of precision</span>
            </div>
            <h1 className="hero-new-title">Beyond Time. Beyond Ordinary.</h1>
            <p className="hero-new-desc">
              Designed with intention.<br />
              Crafted with precision.<br />
              Built for those who live with distinction.
            </p>
          </div>
        </div>

        <div className="hero-new-right">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="hero-new-video"
            src="/images/video.mp4"
            disablePictureInPicture
          />
        </div>
      </section>

      <section id="stewardship" className="stewardship">
        <div className="container split-layout">
          <div className="split-text">
            <h2 className="subheading">Trusted With Time</h2>
            <h3 className="heading-secondary text-gold" style={{ marginBottom: "2rem" }}>The Philosophy of Time</h3>
            <p className="body-copy">
              What began as a passion for fine timepieces has grown into a trusted destination for buying, repairing, and restoring watches.
            </p>
            <p className="body-copy">
              Through years of hands-on expertise, Angel Time Centre has refined the art of precision servicing and thoughtful curation. Whether selecting the perfect new watch or reviving a decades-old classic, every piece is handled with care and respect.
            </p>
            <p className="body-copy" style={{ fontStyle: "italic", marginBottom: "3rem" }}>
              Because time deserves nothing less.
            </p>
            <div className="pillars">
              <span className="pillar">Authentic Collections</span>
              <span className="pillar">Precision Repairs</span>
              <span className="pillar">Restoration with Care</span>
            </div>
          </div>
          <div className="split-image-container" style={{ overflow: 'visible', perspective: '1600px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="carousel-3d">
              {[
                "/images/0170e16b3159a2f1094dcfc1893f14a6.jpg",
                "/images/8de0f26e30a6f6d7505a32786106ce58.jpg",
                "/images/9e3b2a6074b07bd4d5b9bc6fd3bf69cf.jpg",
                "/images/1442884bced3abae1506fb0e2f93fc41.jpg",
                "/images/23a73c25d02a693f83d519c684b9b349.jpg",
                "/images/2bda750aeab08baa53bcbd81f4ba7583.jpg",
                "/images/e943f01c41ca41fc7b51e55132e0f357.jpg"
              ].map((src, i, arr) => (
                <div
                  key={i}
                  className="carousel-item"
                  style={{ transform: `rotateY(${i * (360 / arr.length)}deg) translateZ(340px)` }}
                >
                  <div className="carousel-item-inner">
                    <img src={src} alt={`Carousel Item ${i}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="atelier" className="atelier">
        <div className="atelier-panel">
          <img src="/images/c09637b737853bccb25e41b7fe68be1b.jpg" alt="Presence" className="atelier-bg" />
          <div className="atelier-content">
            <span className="atelier-exhibit">Exhibit I — Presence</span>
            <h4 className="atelier-poem text-gold">Composure without compromise.<br />Understated. Intentional. Absolute.</h4>
            <p className="atelier-desc">Time, refined to its purest form.</p>
          </div>
        </div>

        <div className="atelier-panel">
          <img src="/images/f663cca36e0f212d5ab210da097e61b1.jpg" alt="Depth" className="atelier-bg" />
          <div className="atelier-content">
            <span className="atelier-exhibit">Exhibit II — Depth</span>
            <h4 className="atelier-poem text-gold">Silence beneath the surface.<br />Strength without spectacle.</h4>
            <p className="atelier-desc">Built for those who move where others hesitate.</p>
          </div>
        </div>

        <div className="atelier-panel">
          <img src="/images/bd17337fea5719cb42198592a77b0e71.jpg" alt="Ascent" className="atelier-bg" />
          <div className="atelier-content">
            <span className="atelier-exhibit">Exhibit III — Ascent</span>
            <h4 className="atelier-poem text-gold">Clarity at altitude.<br />Precision in every measure.</h4>
            <p className="atelier-desc">For those who rise beyond expectation.</p>
          </div>
        </div>
      </section>

      <LogoCarousel />

      <section id="kinetics" className="kinetics">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="kinetics-bg"
          src="/images/13358288_1920_1080_30fps.mp4"
          disablePictureInPicture
        />
        <div className="kinetics-content">
          <h2 className="heading-secondary">Kinetics of Precision</h2>
          <div className="stills-divider" style={{ margin: "2rem auto" }}></div>
          <div className="features-grid container">
            <div className="feature-item">Scratch-Resistant Sapphire Crystal</div>
            <div className="feature-item">Precision Movement</div>
            <div className="feature-item">Hand-Polished Chamfers</div>
            <div className="feature-item">Premium Stainless Steel Case</div>
          </div>
        </div>
      </section>

      <section id="calibre" ref={scrollRef} className="calibre">
        <div className="calibre-sticky">
          <motion.div style={{ opacity: opacityOffset, y: watchY }} className="calibre-watch-container">
            {/* The Calibre Background Engine (spins forward) */}
            <motion.div style={{ rotateZ: watchRotation, width: '100%', height: '100%', position: 'absolute' }}>

            </motion.div>

            {/* Premium Clock Face - Hands */}
            <div className="clock-center-pin" style={{ position: 'absolute', width: '14px', height: '14px', background: '#ccc', borderRadius: '50%', zIndex: 10, boxShadow: 'inset 0 0 4px #000, 0 0 5px rgba(0,0,0,0.8)' }}></div>
            <div className="clock-center-pin-cap" style={{ position: 'absolute', width: '6px', height: '6px', background: 'var(--accent-gold)', borderRadius: '50%', zIndex: 11, boxShadow: 'inset 0 0 2px #000' }}></div>

            {/* Hour Hand (Anticlockwise) */}
            <motion.div style={{ rotateZ: handRotation1, transformOrigin: 'bottom center', width: '8px', height: '22vh', background: 'linear-gradient(to right, #ccc 0%, #fff 50%, #ccc 100%)', position: 'absolute', bottom: '50%', borderRadius: '4px 4px 0 0', boxShadow: '0 0 15px rgba(0,0,0,0.8)', zIndex: 8, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '4vh', background: 'linear-gradient(to right, #ccc 0%, #fff 50%, #ccc 100%)', borderRadius: '0 0 4px 4px' }}></div>
            </motion.div>

            {/* Minute Hand (Anticlockwise) */}
            <motion.div style={{ rotateZ: handRotation2, transformOrigin: 'bottom center', width: '4px', height: '35vh', background: 'linear-gradient(to right, #b58d20 0%, #d4af37 50%, #b58d20 100%)', position: 'absolute', bottom: '50%', borderRadius: '2px 2px 0 0', boxShadow: '0 0 15px rgba(0,0,0,0.8)', zIndex: 9 }}>
              <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '6vh', background: 'linear-gradient(to right, #b58d20 0%, #d4af37 50%, #b58d20 100%)', borderRadius: '0 0 2px 2px' }}></div>
            </motion.div>
          </motion.div>

          <div className="calibre-text-overlay">
            <motion.h3 style={{ opacity: textOpacity1, y: useTransform(textOpacity1, [0, 1], [30, 0]) }} className="calibre-poem">Precision in motion.</motion.h3>
          </div>
          <div className="calibre-text-overlay">
            <motion.h3 style={{ opacity: textOpacity2, y: useTransform(textOpacity2, [0, 1], [30, 0]) }} className="calibre-poem">Every gear, perfectly aligned.</motion.h3>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="footer-bg-video"
          src="/images/1dbb06f8a3350960384c203ed0e31e83.mp4"
          disablePictureInPicture
        />
        <div className="footer-logo">
          A<span>T</span>C
        </div>
        <div className="footer-info">
          <div>
            <strong>Address:</strong><br />
            133A, Angel Time Centre, Mettupalayam
          </div>
          <div>
            <strong>Email:</strong><br />
            atclawrence128@gmail.com
          </div>
          <div>
            <strong>Phone:</strong><br />
            +91 9345049128
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 ATC Watches.
        </div>
      </footer>
    </>
  );
}

export default App;
