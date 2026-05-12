import { motion } from 'framer-motion';
import { Coffee, TrendingUp, Trash2, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ChipVariant } from '@/components/RecommendationChip';
import { RecommendationChip } from '@/components/RecommendationChip';

type Benefit = {
  Icon: LucideIcon;
  chip: ChipVariant;
  chipLabel: string;
  title: string;
  desc: string;
};

const benefits: Benefit[] = [
  {
    Icon: Coffee,
    chip: 'raise',
    chipLabel: 'codzienny zysk',
    title: 'Wygrywaj, zanim konkurencja wypije kawę',
    desc: 'Każdego dnia dostajesz gotową analizę: kto jest tańszy, gdzie tracisz pozycję i gdzie możesz zarobić więcej.',
  },
  {
    Icon: TrendingUp,
    chip: 'raise',
    chipLabel: 'marża +18%',
    title: 'Pompuj marżę, gdy innym brakuje towaru',
    desc: 'Konkurent wyprzedał zapas? Shoppalyzer natychmiast wyłapuje tę lukę i daje sygnał do podwyżki. Podnieś cenę i zarabiaj, zanim rynek w ogóle zareaguje.',
  },
  {
    Icon: Trash2,
    chip: 'lower',
    chipLabel: 'tnij straty',
    title: 'Przestań przepalać budżet',
    desc: 'Błyskawicznie namierzamy „martwe" oferty, które pożerają Twoje pieniądze. Odłącz im kroplówkę i przesuń kapitał wyłącznie na produkty, które generują realny zysk.',
  },
  {
    Icon: FileText,
    chip: 'hold',
    chipLabel: 'white-label',
    title: 'Pokaż klientom dane, nie opinie',
    desc: 'Pobierz raport PDF z Twoim logo (White-Label). Twarde liczby o utraconej marży i lukach rynkowych. Argument, którego nie da się podważyć.',
  },
];

export const BenefitsBento = () => (
  <section id="korzysci" className="relative py-24 lg:py-32">
    <div className="container">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
      >
        <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-muted-foreground mb-5">
          01 · Korzyści
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-[-0.025em] text-brand-navy leading-[1.08]">
          Inne narzędzia pokazują dane.
          <br />
          <span className="text-primary">Shoppalyzer mówi Ci, co zrobić.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
          Twój codzienny analityk rynku na Allegro. Działa za Ciebie.
        </p>
      </motion.div>

      {/* Bento grid — full container width for balance */}
      <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
        {benefits.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="
              group relative p-7 lg:p-8 rounded-2xl
              bg-surface ring-1 ring-border
              hover:ring-primary/25 hover:shadow-medium
              transition-all duration-300
            "
          >
            {/* Top row: icon + chip */}
            <div className="flex items-center justify-between mb-5">
              <div className="
                inline-flex h-11 w-11 items-center justify-center rounded-xl
                bg-primary-soft text-primary
                ring-1 ring-primary/15
                group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary
                transition-all duration-300
              ">
                <b.Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <RecommendationChip variant={b.chip} label={b.chipLabel} size="xs" />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2 leading-tight">
              {b.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {b.desc}
            </p>

            {/* Decorative corner accent */}
            <div
              aria-hidden
              className="absolute top-0 right-0 h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
