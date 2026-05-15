# TASK-DRA-ANDREA-MOTION-002 Validation

## Scope

- Target repo: `project/dra-andrea-grupo-vip-motion/`
- No-go repo respected: `project/dra-andrea-curso-toxina/` was read/copied from only.
- External writes: none.
- WhatsApp CTA: `https://chat.whatsapp.com/K5YkdBXKjlr4hZWWsFmiss?mode=gi_t`

## Implementation Evidence

- Vite + React app created.
- GSAP, `@gsap/react`, ScrollTrigger and `lucide-react` installed.
- GSAP setup uses `useGSAP()` with scoped selectors and registers `ScrollTrigger`.
- Brand assets copied locally into `src/assets/images/`.
- Desktop triad stays non-pinned to avoid the prior scroll bug; ScrollTrigger is used for reveals and lightweight parallax only.
- Mobile uses stacked sections and carousel-style gallery without heavy pinning.
- `prefers-reduced-motion` disables heavy motion and pinning.
- Pre-registration drawer validates locally and then offers WhatsApp CTA.
- Urgent motion pass added visible hero floaters, motion console, CTA shimmer/pulse, animated triad icon rings, preview-card pulses and final CTA signal.

## Verification

- `npm install`: passed, 0 vulnerabilities.
- `npm run build`: passed.
- `npm run test:smoke`: passed, 4 tests.
- Browser smoke: passed with no captured app console errors.
- Form validation smoke: empty submit shows local validation; valid data shows success state and WhatsApp CTA.
- Reduced motion smoke: hero remains visible; triad min-height collapses to mobile-safe/non-pinned behavior.

## Screenshot Evidence

- `docs/evidence/desktop-1440.png`
- `docs/evidence/mobile-390.png`
- `docs/evidence/desktop-triad-1440.png`
- `docs/evidence/urgent-motion-desktop-hero.png`
- `docs/evidence/urgent-motion-mobile-hero.png`
- `docs/evidence/urgent-motion-desktop-triad.png`

## Operator Test Packet

1. Run `npm install`.
2. Run `npm run dev -- --port 5176`.
3. Open `http://localhost:5176/`.
4. Confirm the first fold shows the WhatsApp CTA.
5. Click `Entrar no Grupo VIP` and confirm the href points to the WhatsApp group URL.
6. Click `Ver pré-cadastro`.
7. Submit empty form and confirm validation errors.
8. Fill valid name, email, WhatsApp and professional area.
9. Submit again and confirm success state plus WhatsApp CTA.
10. On mobile viewport, confirm the hero CTA remains visible and the page scrolls without pinned motion.

## Review Notes

- Code review: pass for scoped repo ownership, React state ownership, GSAP lifecycle pattern and CTA consistency.
- QA release: pass for build, primary route smoke, desktop/mobile screenshots, form states and reduced motion smoke.
- Residual risk: visual approval still depends on human preference because this is an alternative creative direction.
