import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Crosshair,
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
import portraitPhoto from './assets/images/dra-andrea-seria-DR8MG9gh.jpeg';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/K5YkdBXKjlr4hZWWsFmiss?mode=gi_t';
const LEAD_ENDPOINT = '/api/submit-lead';

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

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateLead(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('saving');

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          professionalArea: formData.professionalArea.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Lead submission failed');
      }

      setStatus('success');
      window.setTimeout(() => {
        window.location.assign(WHATSAPP_GROUP_URL);
      }, 700);
    } catch {
      setStatus('submit-error');
    }
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
            <button className="nav-cta" type="button" onClick={openDrawer}>
              Grupo VIP
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </header>

        <div className="hero__grid" id="topo">
          <div className="hero__copy">
            <div className="eyebrow" data-hero-part>
              <Sparkles size={16} aria-hidden="true" />
              Aula gratuita para profissionais
            </div>
            <h1 id="hero-title" data-hero-part>
              <span className="headline-line">Aula ao vivo de</span>
              <span className="headline-line">Toxina Botulínica</span>
              <span className="headline-line">gratuita</span>
            </h1>
            <p className="hero__lead" data-hero-part>
              Entre para o Grupo VIP e seja avisado em primeira mão sobre a próxima aula de Botox.
            </p>
            <div className="hero__actions" data-hero-part>
              <button className="button button--primary" type="button" onClick={openDrawer}>
                <MessageCircle size={20} aria-hidden="true" />
                Entrar no Grupo VIP
              </button>
              <button className="button button--secondary" type="button" onClick={openDrawer}>
                Se inscreva agora
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="hero__disclaimer" data-hero-part>
              Conteúdo educacional direcionado a profissionais habilitados conforme a legislação vigente.
            </p>
          </div>

          <div className="hero-portrait" aria-label="Dra. Andrea Alves" data-hero-part>
            <div className="hero-portrait__mask">
              <img src={portraitPhoto} alt="Dra. Andrea Alves em retrato profissional" />
            </div>
            <div className="hero-portrait__caption">
              <span>Com Dra. Andrea Alves</span>
              <strong>28 anos de formação em Farmácia e 7 anos de atuação na área da Estética Avançada.</strong>
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
                  <strong id="lead-drawer-title">Inscrição gratuita</strong>
                  <span>Preencha seus dados para entrar no Grupo VIP da aula.</span>
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
                {status === 'saving' ? 'Enviando...' : 'Enviar inscrição e entrar no grupo'}
              </button>

              {status === 'error' && (
                <p className="form-status form-status--error" role="alert">
                  Revise os campos destacados antes de continuar.
                </p>
              )}

              {status === 'submit-error' && (
                <p className="form-status form-status--error" role="alert">
                  Não foi possível enviar sua inscrição agora. Tente novamente em alguns instantes.
                </p>
              )}

              {status === 'success' && (
                <div className="form-success" role="status">
                  <CheckCircle2 size={22} aria-hidden="true" />
                  <div>
                    <strong>Inscrição enviada.</strong>
                    <span>Você será direcionado para o Grupo VIP no WhatsApp.</span>
                  </div>
                  <a className="button button--primary" href={WHATSAPP_GROUP_URL} rel="noreferrer noopener">
                    <MessageCircle size={18} aria-hidden="true" />
                    Entrar no Grupo VIP
                  </a>
                </div>
              )}

              <p className="form-note">
                Seus dados serão enviados para a equipe da Dra. Andrea Alves. Em seguida, você acessa o grupo oficial no WhatsApp.
              </p>
            </form>
          </aside>
        </div>
      )}

      <button className="floating-whatsapp" type="button" onClick={openDrawer} aria-label="Entrar no Grupo VIP pelo WhatsApp">
        <MessageCircle size={22} aria-hidden="true" />
      </button>

      <div className="reduced-motion-note" aria-hidden="true">
        <PlayCircle size={16} />
        Motion reduzido ativo
      </div>
    </main>
  );
}

export default App;
