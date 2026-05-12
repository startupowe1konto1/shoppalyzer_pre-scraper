import { motion } from 'framer-motion';
import { Check, Minus, Sparkles, ArrowRight } from 'lucide-react';
import { useWaitlist } from '@/context/WaitlistContext';
import { cn } from '@/lib/utils';

type Tier = {
  name: string;
  price: string;
  unit?: string;
  tagline: string;
  cta: string;
  ctaStyle: 'outline' | 'primary' | 'soft';
  features: { included: boolean; text: string }[];
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: '0',
    unit: 'PLN',
    tagline: 'Promocja na pierwsze 2 tygodnie współpracy',
    cta: 'Zacznij za darmo',
    ctaStyle: 'outline',
    features: [
      { included: true,  text: 'Do 100 SKU' },
      { included: true,  text: 'Analiza konkurencji na Allegro' },
      { included: true,  text: 'Tygodniowy raport rekomendacji' },
      { included: true,  text: 'Alerty e-mail' },
      { included: false, text: 'Raport PDF/CSV' },
    ],
  },
  {
    name: 'Pro',
    price: '89',
    unit: 'PLN/mies.',
    tagline: 'Dla rosnących sklepów, które chcą działać na danych',
    cta: 'Wypróbuj 3 dni za darmo',
    ctaStyle: 'primary',
    highlight: true,
    features: [
      { included: true, text: 'Do 1000 SKU' },
      { included: true, text: 'Codzienny raport o 9:00' },
      { included: true, text: 'Alerty Slack' },
      { included: true, text: 'Rekomendacje marżowe AI' },
      { included: true, text: 'Eksport CSV i PDF' },
    ],
  },
  {
    name: 'Agencja',
    price: '199',
    unit: 'PLN/mies.',
    tagline: 'Dla konsultantów i menedżerów wielu sklepów',
    cta: 'Skontaktuj się',
    ctaStyle: 'soft',
    features: [
      { included: true, text: 'Do 5000 SKU' },
      { included: true, text: 'Wszystko z Pro' },
      { included: true, text: 'Panel wielu klientów' },
      { included: true, text: 'Wsparcie priorytetowe' },
    ],
  },
];

const ctaClasses = {
  primary:
    'bg-foreground text-background hover:bg-brand-navy shadow-medium hover:shadow-strong',
  outline:
    'bg-transparent text-foreground ring-1 ring-border hover:ring-foreground/40 hover:bg-surface-muted',
  soft:
    'bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground',
} as const;

export const Pricing = () => {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="cennik" className="relative py-24 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-muted-foreground mb-5">
            03 · Cennik
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-[-0.025em] text-brand-navy leading-[1.08]">
            Zacznij za darmo. Płać tylko,
            <br />
            <span className="text-primary">gdy zarabiasz więcej.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Prosty cennik bez niespodzianek. Skaluj się razem z biznesem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={cn(
                'relative flex flex-col rounded-2xl p-7 lg:p-8 transition-all duration-300',
                tier.highlight
                  ? 'bg-brand-navy text-white shadow-strong ring-1 ring-foreground/10 lg:scale-[1.02]'
                  : 'bg-surface ring-1 ring-border hover:ring-primary/25 hover:shadow-medium',
              )}
            >
              {/* Highlight badge */}
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="
                    inline-flex items-center gap-1.5
                    text-[11px] font-semibold uppercase tracking-[0.14em]
                    bg-accent-brand text-accent-brand-foreground
                    px-3 py-1.5 rounded-full
                    shadow-soft
                  ">
                    <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                    Najpopularniejszy
                  </span>
                </div>
              )}

              {/* Tier name */}
              <div className={cn(
                'text-[11px] uppercase tracking-[0.18em] font-medium mb-3',
                tier.highlight ? 'text-white/55' : 'text-muted-foreground',
              )}>
                {tier.name}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className={cn(
                  'text-5xl font-bold tabular-nums tracking-tighter',
                  tier.highlight ? 'text-white' : 'text-foreground',
                )}>
                  {tier.price}
                </span>
                <span className={cn(
                  'text-sm font-medium',
                  tier.highlight ? 'text-white/65' : 'text-muted-foreground',
                )}>
                  {tier.unit}
                </span>
              </div>

              {/* Tagline */}
              <p className={cn(
                'text-sm leading-relaxed mb-7',
                tier.highlight ? 'text-white/70' : 'text-muted-foreground',
              )}>
                {tier.tagline}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    {f.included ? (
                      <span className={cn(
                        'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                        tier.highlight ? 'bg-success/20 text-success' : 'bg-success-soft text-success',
                      )}>
                        <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                      </span>
                    ) : (
                      <span className={cn(
                        'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                        tier.highlight ? 'bg-white/8 text-white/40' : 'bg-muted text-muted-foreground/50',
                      )}>
                        <Minus className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                    )}
                    <span className={cn(
                      f.included
                        ? (tier.highlight ? 'text-white/95' : 'text-foreground')
                        : (tier.highlight ? 'text-white/40 line-through' : 'text-muted-foreground/55 line-through'),
                    )}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                onClick={openWaitlist}
                className={cn(
                  'group inline-flex items-center justify-center gap-1.5',
                  'font-semibold text-sm py-3 rounded-lg',
                  'transition-all duration-300',
                  tier.highlight
                    ? 'bg-accent-brand text-accent-brand-foreground hover:bg-accent-brand-hover shadow-medium'
                    : ctaClasses[tier.ctaStyle],
                )}
              >
                {tier.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
