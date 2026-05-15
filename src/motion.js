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
          '[data-reveal], [data-hero-part], .headline-line, .motion-readout, .motion-console, .hero-floater, .triad-card, .preview-card, .gallery-card',
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
            '.motion-readout, .motion-console',
            {
              x: (index) => (index === 0 ? -32 : 32),
              opacity: 0,
              duration: 0.48,
              stagger: 0.1,
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

        gsap.utils.toArray('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 42,
            opacity: 0.74,
            scale: 0.98,
            duration: 0.62,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 94%',
              once: true,
            },
          });
        });

        gsap.to('.manifesto__rule', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.manifesto',
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: 0.6,
          },
        });

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

        gsap.to('.motion-console__row i', {
          scaleX: 0.42,
          transformOrigin: 'left center',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 1.8,
          stagger: 0.22,
        });

        gsap.to('.hero-portrait__mask', {
          y: -12,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 4.2,
        });

        gsap.to('.motion-readout', {
          y: (index) => (index === 0 ? 8 : -8),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 3.4,
          stagger: 0.4,
        });

        gsap.from('.triad-card', {
          y: 28,
          opacity: 0.88,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.triad__cards',
            start: 'top 80%',
            once: true,
          },
        });

        gsap.from('.triad-card__progress', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.triad__cards',
            start: 'top 80%',
            once: true,
          },
        });

        gsap.to('.triad-card__icon-ring', {
          y: -7,
          rotate: 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 2.2,
          stagger: 0.18,
        });

        gsap.from('.preview-card', {
          y: 46,
          opacity: 0.9,
          scale: 0.94,
          rotateX: -12,
          duration: 0.82,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.preview-grid',
            start: 'top 78%',
            once: true,
          },
        });

        gsap.from('.preview-card__icon', {
          scale: 0.62,
          opacity: 0.82,
          rotate: -10,
          duration: 0.62,
          ease: 'back.out(1.7)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.preview-grid',
            start: 'top 78%',
            once: true,
          },
        });

        gsap.to('.triad__scan', {
          xPercent: 18,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          duration: 3.4,
        });

        gsap.utils.toArray('.gallery-card').forEach((card, index) => {
          const image = card.querySelector('img');

          if (image) {
            gsap.from(image, {
              scale: 1.08,
              duration: 0.95,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
                once: true,
              },
            });
          }

          gsap.to(card, {
            yPercent: index % 2 === 0 ? -10 : 10,
            ease: 'none',
            scrollTrigger: {
              trigger: '.motion-gallery',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
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

        gsap.from('.triad-card', {
          y: 22,
          opacity: 0.9,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.triad__cards',
            start: 'top 82%',
            once: true,
          },
        });

        gsap.from('.triad-card__progress', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.56,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.triad__cards',
            start: 'top 82%',
            once: true,
          },
        });

        gsap.from('.preview-card', {
          y: 28,
          opacity: 0.92,
          duration: 0.62,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.preview-grid',
            start: 'top 84%',
            once: true,
          },
        });

        gsap.from('.preview-card__icon', {
          scale: 0.7,
          opacity: 0.84,
          duration: 0.5,
          ease: 'back.out(1.5)',
          stagger: 0.06,
          scrollTrigger: {
            trigger: '.preview-grid',
            start: 'top 84%',
            once: true,
          },
        });

        return undefined;
      });

      return () => mm.revert();
    },
    { scope },
  );
}
