import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWaitlist } from '@/context/WaitlistContext';

export const FinalCTA = () => {
  const navigate = useNavigate();
  const { openWaitlist } = useWaitlist();

  return (
    <section className="relative py-24 lg:py-32 bg-brand-navy text-white overflow-hidden">
      {/* Decorative chart fragments */}
      <div aria-hidden className="pointer-events-none absolute inset-0 mask-fade-radial">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 600" preserveAspectRatio="none">
          {[120, 240, 360, 480].map((y) => (
            <line key={y} x1="0" y1={y} x2="1600" y2={y} stroke="white" strokeWidth="0.5" opacity="0.06" strokeDasharray="2 8" />
          ))}
          <polyline
            fill="none"
            stroke="hsl(25 80% 56%)"
            strokeWidth="1.5"
            strokeOpacity="0.22"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="80,420 200,400 320,360 440,310 560,330 680,260 800,280 920,200 1040,220 1160,150 1280,170 1400,90"
          />
          <circle cx="1400" cy="90" r="4" fill="hsl(25 80% 56%)" opacity="0.4" />
        </svg>
        <div className="absolute inset-0 bg-dots-faint opacity-[0.04]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-white/50 mb-5">
            Ostatni krok
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.025em] text-white leading-[1.1] max-w-4xl">
            Twoja konkurencja analizuje ceny teraz.
            <br />
            <span className="text-[hsl(25_80%_72%)]">Ty też powinieneś.</span>
          </h2>

          <p className="mt-7 text-lg text-white/70 leading-relaxed max-w-2xl">
            Każdy dzień bez analizy to utracona marża. Dołącz do ponad 200 sprzedawców na Allegro,
            którzy każdego ranka wiedzą dokładnie, co zmienić, i robią to zanim zrobi to konkurent.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              onClick={openWaitlist}
              className="
                group inline-flex items-center justify-center gap-2
                bg-accent-brand text-accent-brand-foreground
                font-semibold text-sm sm:text-base px-5 sm:px-7 py-3.5 rounded-xl
                shadow-medium hover:shadow-strong hover:bg-accent-brand-hover
                transition-all w-full sm:w-auto
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
                text-white font-medium text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-xl
                ring-1 ring-white/25 hover:ring-white/55 hover:bg-white/[0.04]
                transition-all w-full sm:w-auto
              "
            >
              Zobacz przykładowy raport
            </motion.button>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
            {['Bez karty kredytowej', 'Pierwsze 2 tygodnie gratis', 'Konfiguracja w 5 minut', 'Anuluj kiedy chcesz'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
                <span>{t}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
