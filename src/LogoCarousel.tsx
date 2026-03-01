const logos = [
    { src: '/Logo/rolex.svg', alt: 'Rolex' },
    { src: '/Logo/patek.svg', alt: 'Patek Philippe' },
    { src: '/Logo/omega-watches.svg', alt: 'Omega' },
    { src: '/Logo/cartier.svg', alt: 'Cartier' },
    { src: '/Logo/casio.svg', alt: 'Casio' },
    { src: '/Logo/titan.svg', alt: 'Titan' },
];

const LogoCarousel = () => {
    return (
        <section className="logo-section">
            <div className="logo-marquee">
                <div className="logo-marquee-track">
                    {[0, 1].map((group) => (
                        <div key={group} className="logo-group">
                            {logos.map((logo, i) => (
                                <img
                                    key={i}
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="brand-logo"
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoCarousel;
