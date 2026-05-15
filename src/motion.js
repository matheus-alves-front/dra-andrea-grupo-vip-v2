import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useLandingMotion(scope) {
  useGSAP(
    () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        gsap.set(
          '[data-hero-part], .headline-line, .hero-floater',
          {
            clearProps: 'all',
          },
        );
        return undefined;
      }

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.kinetic-grid', {
            opacity: 0,
            scale: 0.9,
            skewY: -16,
            duration: 0.65,
          })
          .from(
            '.kinetic-orbit',
            {
              opacity: 0,
              scale: 0.72,
              duration: 0.78,
              stagger: 0.12,
            },
            '-=0.48',
          )
          .from(
            '.kinetic-scan, .kinetic-node, .hero-floater',
            {
              opacity: 0,
              scale: 0.64,
              y: 18,
              duration: 0.46,
              stagger: 0.08,
            },
            0.18,
          )
          .from('[data-hero-part]', {
            y: 34,
            opacity: 0,
            duration: 0.58,
            stagger: 0.09,
          }, 0.14)
          .from(
            '.headline-line',
            {
              y: 34,
              opacity: 0,
              filter: 'blur(8px)',
              duration: 0.62,
              stagger: 0.11,
            },
            0.24,
          )
          .from(
            '.hero-portrait__mask',
            {
              clipPath: 'inset(16% 12% 16% 12% round 34px)',
              scale: 1.035,
              duration: 0.78,
            },
            0.5,
          )
          .from(
            '.hero-portrait__caption',
            {
              x: 26,
              opacity: 0,
              duration: 0.48,
            },
            0.72,
          )
          .from(
            '.hero-line',
            {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 0.62,
              stagger: 0.08,
            },
            0.18,
          );

        return undefined;
      });

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('.hero-floater', {
          y: (index) => (index % 2 === 0 ? -16 : 14),
          x: (index) => (index % 2 === 0 ? 8 : -10),
          rotate: (index) => (index % 2 === 0 ? 3 : -3),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 3.2,
          stagger: 0.22,
        });

        gsap.to('.hero-portrait__mask', {
          y: -12,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 4.2,
        });

        return undefined;
      });

      mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('.hero-floater--shield, .hero-floater--precision', {
          y: -8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 2.8,
          stagger: 0.24,
        });

        return undefined;
      });

      return () => mm.revert();
    },
    { scope },
  );
}
