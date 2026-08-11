type Presentation = {
  day: string;
  shortDay: string;
  date: string;
  slot: string;
  speaker: string;
  topic: string;
  teamsUrl: string;
};

const presentations: Presentation[] = [
  {
    day: "Segunda-feira",
    shortDay: "SEG",
    date: "10/08",
    slot: "09h00",
    speaker: "Nome do apresentador",
    topic: "Tema da palestra em breve",
    teamsUrl: "",
  },
  {
    day: "Terça-feira",
    shortDay: "TER",
    date: "11/08",
    slot: "10h00",
    speaker: "Nome do apresentador",
    topic: "Tema da palestra em breve",
    teamsUrl: "",
  },
  {
    day: "Quarta-feira",
    shortDay: "QUA",
    date: "12/08",
    slot: "14h00",
    speaker: "Nome do apresentador",
    topic: "Tema da palestra em breve",
    teamsUrl: "",
  },
  {
    day: "Quinta-feira",
    shortDay: "QUI",
    date: "13/08",
    slot: "15h00",
    speaker: "Nome do apresentador",
    topic: "Tema da palestra em breve",
    teamsUrl: "",
  },
  {
    day: "Sexta-feira",
    shortDay: "SEX",
    date: "14/08",
    slot: "11h00",
    speaker: "Nome do apresentador",
    topic: "Tema da palestra em breve",
    teamsUrl: "",
  },
];

const socialLinks = [
  {
    label: "X",
    mark: "X",
    url: "https://x.com/falcaobauer",
  },
  {
    label: "Instagram",
    mark: "◎",
    url: "https://www.instagram.com/falcaobauer/",
  },
  {
    label: "Facebook",
    mark: "f",
    url: "https://www.facebook.com/falcaobauerqualidade/",
  },
  {
    label: "LinkedIn",
    mark: "in",
    url: "https://www.linkedin.com/company/falcao-bauer/home/",
  },
];

const contactInfo = {
  phone: "(11) 3611-0833",
  phoneLink: "tel:+551136110833",
  address: "Rua Aquinos, 111, Água Branca, São Paulo / SP 05036-070",
};

const brandPlaceholder = {
  name: "Falcão Bauer",
  note: "logo oficial em breve",
};

const scrollRevealScript = `
(() => {
  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shell = document.querySelector(".site-shell");
    const sections = shell ? [...shell.querySelectorAll(".snap-section")] : [];

    if (!shell || sections.length === 0) return;

    document.documentElement.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.58) {
            entry.target.classList.add("is-revealed");
          } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.18) {
            entry.target.classList.remove("is-revealed");
          }
        });
      },
      { root: shell, threshold: [0, 0.18, 0.58] },
    );

    window.setTimeout(() => {
      sections.forEach((section) => observer.observe(section));
    }, 350);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
`;

export default function Home() {
  return (
    <>
      <div className="loading-screen" aria-hidden="true">
        <div className="loading-brand">
          <span className="loading-monogram">FB</span>
          <span className="loading-name">Falcão Bauer</span>
        </div>
      </div>

      <main className="site-shell">
      <section className="hero snap-section" aria-labelledby="hero-title">
        <div className="hero-ring" aria-hidden="true" />
        <div className="hero-block" aria-hidden="true" />
        <h1 id="hero-title">semana do plástico</h1>
      </section>

      <section
        className="program-section snap-section"
        aria-labelledby="program-title"
      >
        <div className="program-grid">
          <div className="agenda-column">
            <header className="section-header">
              <p className="eyebrow">programação</p>
              <h2 id="program-title">Uma semana para transformar ideias.</h2>
              <p className="section-intro">
                Cinco encontros, um assunto em movimento e espaço para novas
                perspectivas.
              </p>
            </header>

            <div className="presentation-list" aria-label="Apresentações da semana">
              {presentations.map((presentation, index) => (
                <article
                  className="presentation-card"
                  key={`${presentation.shortDay}-${index}`}
                >
                  <div
                    className="presentation-day"
                    aria-label={`${presentation.day}, ${presentation.date}`}
                  >
                    <span>{presentation.shortDay}</span>
                    <strong>{presentation.date}</strong>
                  </div>

                  <div
                    className="speaker-photo"
                    role="img"
                    aria-label={`Foto provisória de ${presentation.speaker}`}
                  >
                    <span>FB</span>
                  </div>

                  <div className="presentation-copy">
                    <p className="presentation-slot">{presentation.slot}</p>
                    <h3>{presentation.speaker}</h3>
                    <p className="presentation-topic">{presentation.topic}</p>
                  </div>

                  <button
                    className="team-button"
                    type="button"
                    disabled={!presentation.teamsUrl}
                    title={
                      presentation.teamsUrl
                        ? "Abrir palestra no Teams"
                        : "Link do Teams será adicionado"
                    }
                  >
                    <span className="team-button-label">Assistir no Teams</span>
                    <span className="team-button-icon" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>

          <footer className="social-footer" aria-label="Redes sociais e contatos">
            <div className="social-footer-orbit" aria-hidden="true" />

            <div className="brand-placeholder">
              <a
                className="brand-link"
                href="https://falcaobauer.com.br"
                target="_blank"
                rel="noreferrer"
                aria-label={`Visitar o site ${brandPlaceholder.name}`}
              >
                <span className="brand-monogram" aria-hidden="true">
                  FB
                </span>
                <span className="brand-copy">
                  <strong>{brandPlaceholder.name}</strong>
                  <small>{brandPlaceholder.note}</small>
                </span>
              </a>

              <div className="contact-block">
                <a className="contact-phone" href={contactInfo.phoneLink}>
                  {contactInfo.phone}
                </a>
                <address>{contactInfo.address}</address>
              </div>
            </div>

            <div className="social-content">
              <nav className="social-list" aria-label="Redes sociais">
                {socialLinks.map((social) => (
                  <a
                    className="social-link"
                    href={social.url}
                    key={social.label}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir ${social.label} da Falcão Bauer`}
                  >
                    <span className="social-mark" aria-hidden="true">
                      {social.mark}
                    </span>
                  </a>
                ))}
              </nav>
            </div>

          </footer>
        </div>
      </section>
    </main>
      <script dangerouslySetInnerHTML={{ __html: scrollRevealScript }} />
    </>
  );
}
