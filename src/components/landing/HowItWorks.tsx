import { motion } from 'framer-motion';
import { Upload, ScanSearch, FileBarChart2, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const allegroUrl =
  'https://allegro.pl/pomoc/aktualnosci/pobierz-plik-z-ofertami-latwiej-zarzadzaj-sprzedaza-5Lna5EqRxSZ?srsltid=AfmBOoruKM26zkG_dpXYsNNqHujkLx67ZssI7992cQEs523pTz6Dy97p';

type Step = {
  Icon: LucideIcon;
  title: string;
  desc?: string;
  hasInstructionLink?: boolean;
};

const steps: Step[] = [
  {
    Icon: Upload,
    title: 'Wgraj swoje produkty',
    hasInstructionLink: true,
  },
  {
    Icon: ScanSearch,
    title: 'Analizujemy rynek za Ciebie',
    desc: 'Shoppalyzer automatycznie identyfikuje Twoją konkurencję na Allegro i zbiera dane o cenach, pozycjach i zapasach.',
  },
  {
    Icon: FileBarChart2,
    title: 'Dostajesz gotowy raport',
    desc: 'Konkretne rekomendacje: na którym produkcie zmienić cenę, co promować, czego się pozbyć. Eksport do CSV lub PDF jednym kliknięciem.',
  },
];

export const HowItWorks = () => (
  <section id="jak-to-dziala" className="relative py-24 lg:py-32 bg-surface-muted/40">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
      >
        <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-muted-foreground mb-5">
          02 · Jak to działa
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-[-0.025em] text-brand-navy leading-[1.08]">
          Od zera do gotowego raportu
          <br />
          <span className="text-primary">w 3 prostych krokach.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
          Bez IT. Bez developera. Bez żadnej konfiguracji technicznej.
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Connecting horizontal line — fades in */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          className="hidden md:block absolute top-[58px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-border to-transparent origin-left"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.65, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Step number - floating outside card */}
              <div className="absolute -top-2 right-4 text-[60px] font-bold text-primary/8 leading-none select-none pointer-events-none">
                0{i + 1}
              </div>

              <div className="relative p-7 rounded-2xl bg-surface ring-1 ring-border hover:ring-primary/25 hover:shadow-medium transition-all duration-300">
                {/* Icon halo */}
                <div className="
                  relative inline-flex h-12 w-12 items-center justify-center rounded-xl
                  bg-primary text-primary-foreground shadow-soft mb-5
                ">
                  <s.Icon className="h-5 w-5" strokeWidth={2} />
                  <span aria-hidden className="absolute inset-0 rounded-xl ring-4 ring-primary/10 -m-1" />
                </div>

                <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-accent-brand mb-2">
                  Krok {i + 1}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 leading-snug tracking-tight">
                  {s.title}
                </h3>

                {s.hasInstructionLink ? (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Wczytaj plik CSV zawierający dane SKU Twojego sklepu. Instrukcja jak to zrobić:{' '}
                    <a
                      href={allegroUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-1
                        text-primary font-medium
                        underline decoration-primary/30 underline-offset-2
                        hover:decoration-primary
                        transition-colors
                      "
                    >
                      Instrukcja pobierania
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
