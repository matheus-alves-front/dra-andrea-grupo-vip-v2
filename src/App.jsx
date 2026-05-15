import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Crosshair,
  Layers,
  Leaf,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  X,
} from 'lucide-react';
import { useLandingMotion } from './motion.js';

import logo from './assets/images/logo-new-CMQBKH-6.jpeg';
import consultationPhoto from './assets/images/dra-andrea-1-BYcPPUbz-optimized.jpeg';
import portraitPhoto from './assets/images/dra-andrea-seria-DR8MG9gh.jpeg';
import syringePhoto from './assets/images/dra-andrea-seringa-DO3CC2bu.jpeg';
import standingPhoto from './assets/images/dra-andrea-3-DkLH9xxV.jpeg';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/K5YkdBXKjlr4hZWWsFmiss?mode=gi_t';

const triadItems = [
  {
    icon: ShieldCheck,
    label: '01',
    title: 'Segurança',
    kicker: 'Critério antes de qualquer ponto',
    text: 'A aula parte da leitura facial e dos sinais de risco para organizar decisões com mais responsabilidade clínica.',
  },
  {
    icon: Crosshair,
    label: '02',
    title: 'Precisão',
    kicker: 'Marcação como raciocínio, não ritual',
    text: 'Pontos, dose e estratégia aparecem como consequência do diagnóstico estético e da comunicação com o paciente.',
  },
  {
    icon: Leaf,
    label: '03',
    title: 'Naturalidade',
    kicker: 'Expressão preservada como objetivo',
    text: 'O resultado desejado é planejado para reduzir excessos e manter coerência com anatomia, expectativa e contexto.',
  },
];

const heroFloaters = [
  {
    icon: ShieldCheck,
    label: 'Segurança',
    className: 'hero-floater--shield',
  },
  {
    icon: Crosshair,
    label: 'Precisão',
    className: 'hero-floater--precision',
  },
  {
    icon: Leaf,
    label: 'Naturalidade',
    className: 'hero-floater--natural',
  },
  {
    icon: Stethoscope,
    label: 'Clínica',
    className: 'hero-floater--clinic',
  },
];

const consoleItems = [
  {
    icon: ShieldCheck,
    label: 'segurança',
    value: 'risco mapeado',
  },
  {
    icon: Crosshair,
    label: 'precisão',
    value: 'marcação guiada',
  },
  {
    icon: Leaf,
    label: 'naturalidade',
    value: 'expressão preservada',
  },
];

const previewCards = [
  {
    icon: Stethoscope,
    title: 'Leitura facial clínica',
    text: 'Como observar assimetrias, expressão e objetivo antes de escolher a conduta.',
  },
  {
    icon: ClipboardCheck,
    title: 'Mapa de decisão',
    text: 'O que considerar para indicação, contraindicação, marcação e orientação.',
  },
  {
    icon: Layers,
    title: 'Sequência de aplicação',
    text: 'Uma lógica de atendimento para sair do improviso e ganhar previsibilidade.',
  },
  {
    icon: BadgeCheck,
    title: 'Resultado responsável',
    text: 'Naturalidade, comunicação e segurança como parte do mesmo padrão técnico.',
  },
];

const galleryItems = [
  {
    src: portraitPhoto,
    title: 'Autoridade clínica',
    text: 'Presença sóbria e didática para profissionais da estética.',
  },
  {
    src: syringePhoto,
    title: 'Técnica em foco',
    text: 'O gesto técnico aparece dentro de um contexto de segurança.',
  },
  {
    src: consultationPhoto,
    title: 'Raciocínio visual',
    text: 'Antes da aplicação existe análise, escuta e planejamento.',
  },
  {
    src: standingPhoto,
    title: 'Experiência guiada',
    text: 'Aula, avisos e materiais concentrados no Grupo VIP.',
  },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  professionalArea: '',
};

function validateLead(formData) {
  const errors = {};
  const phoneNumbers = formData.phone.replace(/\D/g, '');

  if (formData.name.trim().length < 2) {
    errors.name = 'Informe seu nome completo.';
  }

  if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (phoneNumbers.length < 10 || phoneNumbers.length > 13) {
    errors.phone = 'Informe um WhatsApp com DDD.';
  }

  if (formData.professionalArea.trim().length < 3) {
    errors.professionalArea = 'Informe sua área de atuação.';
  }

  return errors;
}

function App() {
  const appRef = useRef(null);
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useLandingMotion(appRef);

  useEffect(() => {
    if (!drawerOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeDrawer();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusable = Array.from(drawerRef.current.querySelectorAll(focusableSelector)).filter(
        (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [drawerOpen]);

  function openDrawer() {
    setDrawerOpen(true);
    setStatus('idle');
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setFormData(initialForm);
    setErrors({});
    setStatus('idle');
  }

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    if (status !== 'idle') setStatus('idle');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateLead(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('saving');
    window.setTimeout(() => {
      setStatus('success');
    }, 420);
  }

  return (
    <main ref={appRef} className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kinetic" aria-hidden="true">
          <div className="kinetic-grid" />
          <div className="kinetic-orbit kinetic-orbit--outer" />
          <div className="kinetic-orbit kinetic-orbit--middle" />
          <div className="kinetic-orbit kinetic-orbit--inner" />
          <div className="kinetic-scan" />
          <span className="kinetic-node kinetic-node--one" />
          <span className="kinetic-node kinetic-node--two" />
          <span className="kinetic-node kinetic-node--three" />
        </div>
        <div className="hero-floaters" aria-hidden="true">
          {heroFloaters.map((item) => {
            const Icon = item.icon;

            return (
              <div className={`hero-floater ${item.className}`} key={item.label}>
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
        <div className="hero-line hero-line--top" aria-hidden="true" />
        <div className="hero-line hero-line--bottom" aria-hidden="true" />

        <header className="topbar" data-hero-part>
          <a className="brand-mark" href="#topo" aria-label="Voltar ao topo">
            <img src={logo} alt="Dra. Andrea Alves Estética Avançada" />
          </a>
          <nav className="topbar__actions" aria-label="Ações principais">
            <button className="ghost-link" type="button" onClick={openDrawer}>
              Pré-cadastro
            </button>
            <a className="nav-cta" href={WHATSAPP_GROUP_URL} target="_blank" rel="noreferrer noopener">
              Grupo VIP
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </header>

        <div className="hero__grid" id="topo">
          <div className="hero__copy">
            <div className="eyebrow" data-hero-part>
              <Sparkles size={16} aria-hidden="true" />
              Aula gratuita para profissionais
            </div>
            <h1 id="hero-title" data-hero-part>
              <span className="headline-line">Aula ao vivo</span>
              <span className="headline-line">Toxina Botulínica</span>
              <span className="headline-line">gratuita</span>
            </h1>
            <p className="hero__lead" data-hero-part>
              Entre no Grupo VIP da Dra. Andrea Alves para receber o link da aula, lembretes
              e conteúdos de aquecimento sobre segurança, precisão e naturalidade.
            </p>
            <div className="hero__actions" data-hero-part>
              <a className="button button--primary" href={WHATSAPP_GROUP_URL} target="_blank" rel="noreferrer noopener">
                <MessageCircle size={20} aria-hidden="true" />
                Entrar no Grupo VIP
              </a>
              <button className="button button--secondary" type="button" onClick={openDrawer}>
                Ver pré-cadastro
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="hero__disclaimer" data-hero-part>
              Conteúdo educacional direcionado a profissionais habilitados conforme a legislação vigente.
            </p>
            <div className="motion-console" aria-hidden="true" data-hero-part>
              <div className="motion-console__header">
                <span>mapa da aula</span>
                <Sparkles size={14} />
              </div>
              {consoleItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="motion-console__row" key={item.label}>
                    <Icon size={16} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <i />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hero-portrait" aria-label="Dra. Andrea Alves" data-hero-part>
            <div className="motion-readout motion-readout--top" aria-hidden="true">
              <span>01</span>
              <strong>segurança</strong>
            </div>
            <div className="hero-portrait__mask">
              <img src={portraitPhoto} alt="Dra. Andrea Alves em retrato profissional" />
            </div>
            <div className="motion-readout motion-readout--bottom" aria-hidden="true">
              <span>03</span>
              <strong>naturalidade</strong>
            </div>
            <div className="hero-portrait__caption">
              <span>Com Dra. Andrea Alves</span>
              <strong>Planejamento, técnica e expressão natural.</strong>
            </div>
          </div>
        </div>

        <div className="kinetic-marquee" aria-hidden="true">
          <div className="kinetic-marquee__track">
            <span>segurança</span>
            <span>precisão</span>
            <span>naturalidade</span>
            <span>raciocínio clínico</span>
            <span>grupo vip</span>
            <span>segurança</span>
            <span>precisão</span>
            <span>naturalidade</span>
            <span>raciocínio clínico</span>
            <span>grupo vip</span>
          </div>
        </div>
      </section>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="section-kicker" data-reveal>
          <span>Manifesto</span>
          <span>01 / 05</span>
        </div>
        <h2 id="manifesto-title" data-reveal>
          Menos improviso. Mais critério clínico.
        </h2>
        <p data-reveal>
          A estética avançada não começa na seringa. Começa na observação, na escuta, na
          escolha responsável e na técnica aplicada com intenção.
        </p>
        <div className="manifesto__rule" aria-hidden="true" />
      </section>

      <section className="triad" aria-labelledby="triad-title">
        <div className="triad__stage">
          <div className="triad__intro" data-reveal>
            <div className="section-kicker">
              <span>Triade da aula</span>
              <span>02 / 05</span>
            </div>
            <h2 id="triad-title">Segurança, precisão e naturalidade no mesmo raciocínio.</h2>
            <p>
              Três decisões que sustentam uma prática mais organizada: avaliar o contexto,
              aplicar com intenção e preservar expressão.
            </p>
          </div>

          <div className="triad__visual" aria-hidden="true">
            <div className="triad__scan" />
            <span>segurança</span>
            <span>precisão</span>
          </div>

          <div className="triad__cards">
            {triadItems.map((item) => {
              const Icon = item.icon;

              return (
                <article className="triad-card" key={item.title}>
                  <div className="triad-card__meta">
                    <span>{item.label}</span>
                    <span className="triad-card__icon-ring">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <strong>{item.kicker}</strong>
                  <p>{item.text}</p>
                  <div className="triad-card__track" aria-hidden="true">
                    <div className="triad-card__progress" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="preview" aria-labelledby="preview-title">
        <div className="section-heading" data-reveal>
          <div className="section-kicker">
            <span>Prévia da aula</span>
            <span>03 / 05</span>
          </div>
          <h2 id="preview-title">Uma prévia do que será trabalhado no encontro.</h2>
        </div>

        <div className="preview-grid">
          {previewCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article className="preview-card" key={card.title} data-reveal>
                <span className="preview-card__pulse" aria-hidden="true" />
                <span className="preview-card__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="preview-card__icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="motion-gallery" aria-labelledby="gallery-title">
        <div className="section-heading section-heading--wide" data-reveal>
          <div className="section-kicker">
            <span>Presença clínica</span>
            <span>04 / 05</span>
          </div>
          <h2 id="gallery-title">Presença clínica, recortes editoriais e movimento controlado.</h2>
          <p>
            A galeria usa os assets reais da marca para sustentar autoridade sem recorrer a
            imagens genéricas.
          </p>
        </div>

        <div className="gallery-rail" aria-label="Galeria da Dra. Andrea Alves">
          {galleryItems.map((item) => (
            <figure className="gallery-card" key={item.title} data-reveal>
              <img src={item.src} alt={`${item.title} da Dra. Andrea Alves`} loading="lazy" decoding="async" />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="registration-panel" aria-labelledby="registration-title">
        <div data-reveal>
          <div className="section-kicker">
            <span>Pré-cadastro opcional</span>
            <span>05 / 05</span>
          </div>
          <h2 id="registration-title">Prefere deixar seus dados antes de entrar no grupo?</h2>
          <p>
            Esta etapa ajuda a avaliar um caminho com pré-cadastro. A ação oficial da campanha
            continua sendo a entrada no Grupo VIP.
          </p>
        </div>
        <button className="button button--secondary" type="button" onClick={openDrawer} data-reveal>
          Abrir pré-cadastro
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <div className="final-cta__signal" aria-hidden="true">
          <MessageCircle size={24} />
          <Sparkles size={16} />
          <ArrowRight size={18} />
        </div>
        <div>
          <div className="section-kicker section-kicker--light">
            <span>Grupo VIP oficial</span>
            <span>WhatsApp</span>
          </div>
          <h2 id="final-title">Receba os avisos da aula pelo canal certo.</h2>
          <p>
            Entre no grupo para acompanhar link, lembretes, materiais de aquecimento e próximos
            passos da campanha.
          </p>
        </div>
        <a className="button button--primary button--light" href={WHATSAPP_GROUP_URL} target="_blank" rel="noreferrer noopener">
          <MessageCircle size={21} aria-hidden="true" />
          Entrar no Grupo VIP
        </a>
      </section>

      {drawerOpen && (
        <div className="drawer-backdrop" role="presentation" onClick={closeDrawer}>
          <aside
            ref={drawerRef}
            className="lead-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-drawer-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="drawer-close"
              type="button"
              aria-label="Fechar pré-cadastro"
              onClick={closeDrawer}
            >
              <X size={21} aria-hidden="true" />
            </button>

            <form className="lead-form" onSubmit={handleSubmit} noValidate>
              <div className="lead-form__heading">
                <Users size={22} aria-hidden="true" />
                <div>
                  <strong id="lead-drawer-title">Pré-cadastro opcional</strong>
                  <span>Confira seus dados nesta tela; a entrada real acontece no WhatsApp.</span>
                </div>
              </div>

              <label>
                Nome
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span className="field-error" id="name-error">
                    {errors.name}
                  </span>
                )}
              </label>

              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="contato@email.com"
                  value={formData.email}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span className="field-error" id="email-error">
                    {errors.email}
                  </span>
                )}
              </label>

              <label>
                WhatsApp
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <span className="field-error" id="phone-error">
                    {errors.phone}
                  </span>
                )}
              </label>

              <label>
                Área de atuação
                <input
                  name="professionalArea"
                  type="text"
                  autoComplete="organization-title"
                  placeholder="Ex.: biomédica, médica, dentista"
                  value={formData.professionalArea}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.professionalArea)}
                  aria-describedby={errors.professionalArea ? 'area-error' : undefined}
                />
                {errors.professionalArea && (
                  <span className="field-error" id="area-error">
                    {errors.professionalArea}
                  </span>
                )}
              </label>

              <button className="button button--primary form-submit" type="submit" disabled={status === 'saving'}>
                {status === 'saving' ? 'Validando...' : 'Validar pré-cadastro'}
              </button>

              {status === 'error' && (
                <p className="form-status form-status--error" role="alert">
                  Revise os campos destacados antes de continuar.
                </p>
              )}

              {status === 'success' && (
                <div className="form-success" role="status">
                  <CheckCircle2 size={22} aria-hidden="true" />
                  <div>
                    <strong>Dados validados nesta tela.</strong>
                    <span>Nada foi enviado ou armazenado. Entre no Grupo VIP para receber os avisos reais da campanha.</span>
                  </div>
                  <a className="button button--primary" href={WHATSAPP_GROUP_URL} target="_blank" rel="noreferrer noopener">
                    <MessageCircle size={18} aria-hidden="true" />
                    Entrar no Grupo VIP
                  </a>
                </div>
              )}

              <p className="form-note">
                A entrada oficial da campanha acontece pelo botão do Grupo VIP no WhatsApp.
              </p>
            </form>
          </aside>
        </div>
      )}

      <a className="floating-whatsapp" href={WHATSAPP_GROUP_URL} target="_blank" rel="noreferrer noopener" aria-label="Entrar no Grupo VIP pelo WhatsApp">
        <MessageCircle size={22} aria-hidden="true" />
      </a>

      <div className="reduced-motion-note" aria-hidden="true">
        <PlayCircle size={16} />
        Motion reduzido ativo
      </div>
    </main>
  );
}

export default App;
