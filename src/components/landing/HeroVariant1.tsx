import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroDashboardMockup } from './HeroDashboardMockup';
import { HeroDecoration } from './HeroDecoration';
import { useWaitlist } from '@/context/WaitlistContext';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0 },
};

export const HeroVariant1 = () => {
  const navigate = useNavigate();
  const { openWaitlist } = useWaitlist();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-hero pt-20 pb-24 lg:pt-28 lg:pb-32">
      <HeroDecoration />

      <div className="container relative z-10">
        {/* Slight bias toward the copy column so text reads first, mockup supports */}
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-20 items-center">
          {/* ─── LEFT: copy column ─── */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-7"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-foreground/65">
                Wczesny dostęp · Dla sprzedawców na Allegro
              </span>
            </motion.div>

            {/* Headline — fluidly scales: 30px mobile → 60px xl */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[1.875rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.025em] text-brand-navy break-words"
            >
              Przestań zgadywać.
              <br />
              <span className="text-primary">Zacznij zarabiać więcej.</span>
            </motion.h1>

            {/* Mission line — official UVP tagline from the kompendium */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-5 text-base sm:text-lg lg:text-2xl text-foreground/80 leading-snug font-medium tracking-[-0.01em] max-w-2xl"
            >
              Inteligentna analiza konkurencji dostępna dla każdego.
            </motion.p>

            {/* LEDE — supporting value statement */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground max-w-2xl"
            >
              Shoppalyzer to Twój automatyczny analityk cen na Allegro.
              Zamiast godzin w&nbsp;Excelu, dostajesz gotowe wnioski:
            </motion.p>

            {/* Bullet list — chip-led, balanced spacing */}
            <motion.ul
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-7 space-y-3.5 max-w-2xl"
            >
              {[
                { variant: 'raise',  text: 'Co podnieść, by zwiększyć marżę.' },
                { variant: 'lower',  text: 'Co obniżyć, by pokonać konkurencję.' },
                { variant: 'hold',   text: 'Czego nie ruszać, by zachować stabilną sprzedaż.' },
              ].map(({ variant, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className={`
                    mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full
                    text-[11px] font-semibold ring-1 ring-inset
                    ${variant === 'raise'  ? 'bg-success-soft text-success ring-success/25' : ''}
                    ${variant === 'lower'  ? 'bg-danger-soft  text-danger  ring-danger/25'  : ''}
                    ${variant === 'hold'   ? 'bg-warning-soft text-[hsl(38_92%_30%)] ring-warning/30' : ''}
                  `}>
                    {variant === 'raise' ? '↑' : variant === 'lower' ? '↓' : '◐'}
                  </span>
                  <span className="text-[1.05rem] text-foreground/90 leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onClick={openWaitlist}
                className="
                  group inline-flex items-center justify-center gap-2
                  bg-accent-brand text-accent-brand-foreground
                  font-semibold text-sm sm:text-base px-5 sm:px-7 py-3.5 rounded-xl
                  shadow-medium hover:shadow-strong
                  transition-shadow w-full sm:w-auto
                "
              >
                Wypróbuj Shoppalyzer za darmo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onClick={() => { navigate('/sample-report'); window.scrollTo(0, 0); }}
                className="
                  group inline-flex items-center justify-center gap-1.5
                  text-foreground font-medium text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-xl
                  ring-1 ring-border hover:ring-foreground/30 hover:bg-surface-muted
                  transition-all w-full sm:w-auto
                "
              >
                Zobacz przykładowy raport
                <ChevronRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {[
                'Bez karty kredytowej',
                'Pierwsze 2 tygodnie gratis',
                'Wyniki już po 1. raporcie',
                'Anuluj kiedy chcesz',
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
                  <span>{t}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: dashboard mockup (hidden on mobile — table too wide) ─── */}
          <div className="relative hidden md:block">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>

      {/* Soft transition strip into next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};
