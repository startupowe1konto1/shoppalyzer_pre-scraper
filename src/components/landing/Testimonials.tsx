import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    initials: 'MK',
    quote:
      'To, co wyróżnia Shoppalyzer, to unikalne połączenie analizy trendów rynkowych z generatywnymi rekomendacjami AI. Narzędzie samo śledzi konkurencję na marketplaceach i podpowiada mi, które SKU warto teraz promować, a które usunąć z oferty. Dzięki temu mam pewność, że moje decyzje cenowe są oparte na twardych danych, a nie na przeczuciach.',
    name: 'Marta K.',
    role: 'właścicielka sklepu modowego',
  },
  {
    initials: 'PW',
    quote:
      'Przed poznaniem Shoppalyzera spędzałem kilka godzin w tygodniu w Excelu oraz na ofertach konkurencji. Teraz otwieram raport przy porannej kawie i wiem co zrobić. Shoppalyzer zwrócił się wielokrotnie.',
    name: 'Piotr W.',
    role: 'manager sklepu ze sprzętem sportowym',
  },
  {
    initials: 'AN',
    quote:
      'Jako właścicielka niewielkiego sklepu ze sprzętem muzycznym zawsze miałem problem z narzędziami, które były zbyt skomplikowane, albo zbyt drogie. Shoppalyzer to zmienił – za rozsądne pieniądze dostaję proste rekomendacje, które z łatwością wdrażam w życie. To nie jest tylko monitoring, to mój osobisty doradca',
    name: 'Anna N.',
    role: 'właścicielka sklepu ze sprzętem muzycznym',
  },
];

const Stars = () => (
  <div className="flex gap-0.5" aria-label="5 z 5 gwiazdek">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-3.5 w-3.5 fill-accent-brand text-accent-brand" />
    ))}
  </div>
);

export const Testimonials = () => (
  <section className="relative py-24 lg:py-32 bg-surface-muted/40">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
      >
        <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-muted-foreground mb-5">
          04 · Opinie sprzedawców
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-[-0.025em] text-brand-navy leading-[1.08]">
          Sprzedawcy na Allegro
          <br />
          <span className="text-primary">już to wiedzą.</span>
        </h2>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
          Dołącz do setek sklepów, które podjęły mądrzejsze decyzje dzięki Shoppalyzerowi.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.initials}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="
              relative flex flex-col p-7 rounded-2xl
              bg-surface ring-1 ring-border
              hover:ring-primary/25 hover:shadow-medium
              transition-all duration-300
            "
          >
            {/* Decorative quote mark */}
            <Quote
              aria-hidden
              className="absolute top-6 right-6 h-7 w-7 text-primary/15"
              fill="currentColor"
              strokeWidth={0}
            />

            <Stars />

            <blockquote className="mt-4 text-[15px] text-foreground leading-relaxed flex-1">
              {t.quote}
            </blockquote>

            <figcaption className="mt-6 pt-5 border-t border-border flex items-center gap-3">
              <span className="
                inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                bg-primary text-primary-foreground
                font-semibold text-xs tracking-tight
              ">
                {t.initials}
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground tracking-tight">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
