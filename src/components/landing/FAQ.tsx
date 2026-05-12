import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'Czy jest plan bezpłatny?', a: 'Tak. Plan Starter to bezpłatny 2-tygodniowy test. Bez karty kredytowej, bez zobowiązań.' },
  { q: 'Czy Shoppalyzer działa tylko z Allegro?', a: 'Tak, na ten moment Allegro jest naszym jedynym rynkiem. Jeżeli są Państwo zainteresowani współpracą na innych marketplacach to zapraszamy do kontaktu.' },
  { q: 'Czym różni się Shoppalyzer od monitorowania cen?', a: 'Narzędzia do monitorowania cen pokazują tylko liczby. Shoppalyzer analizuje dane i daje Państwu konkretne rekomendacje: na którym produkcie zmienić cenę, co promować, czego się pozbyć.' },
  { q: 'Czy mogę zrezygnować w dowolnym momencie?', a: 'Tak. Żadnych długoterminowych umów. Anulujesz kiedy chcesz, dostęp działa do końca opłaconego okresu.' },
  { q: 'Jestem konsultantem z wieloma klientami. Czy to zadziała?', a: 'Tak. Plan Agencja daje Ci panel wielu klientów oraz raporty PDF z własnym logo, które możesz wysyłać klientom pod swoją marką.' },
  { q: 'Ile czasu zajmuje konfiguracja?', a: 'Mniej niż 5 minut. Wczytaj CSV z produktami, resztę robimy my. Zero kodu, zero konfiguracji.' },
];

export const FAQ = () => (
  <section id="faq" className="relative py-24 lg:py-32">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center mb-14 lg:mb-20"
      >
        <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-muted-foreground mb-5">
          05 · Często zadawane pytania
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-[-0.025em] text-brand-navy leading-[1.08]">
          Wszystko, co musisz wiedzieć,
          <br />
          <span className="text-primary">zanim zaczniesz.</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-border last:border-0"
            >
              <AccordionTrigger className="
                py-5 text-left text-base lg:text-lg font-semibold text-foreground
                tracking-tight hover:text-primary
                hover:no-underline group
              ">
                <span className="flex items-baseline gap-4 pr-4">
                  <span className="font-mono text-xs text-muted-foreground/60 group-hover:text-primary/70 transition-colors mt-0.5 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-9 pr-4 text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);
