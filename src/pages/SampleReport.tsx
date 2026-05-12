import { useState, useRef } from 'react';
import { ArrowLeft, Download, TrendingUp, TrendingDown, Target, FileText, DollarSign, Loader2, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';

interface ProductRecommendation {
  id: string;
  title: string;
  currentPrice: number;
  recommendedPrice: number;
  category: string;
  recommendedCategory: string;
  descriptionScore: number;
  recommendations: {
    pricing: string;
    description: string;
    category: string;
  };
  potentialUplift: number;
}

const generateMockData = (): ProductRecommendation[] => {
  const products = [
    { title: "Słuchawki bezprzewodowe Bluetooth", category: "Elektronika", basePrice: 79.99 },
    { title: "Butelka termiczna ze stali", category: "Sport i rekreacja", basePrice: 24.99 },
    { title: "Lampka biurkowa LED z USB", category: "Dom i ogród", basePrice: 45.99 },
    { title: "Mata do jogi antypoślizgowa", category: "Sport i fitness", basePrice: 29.99 },
    { title: "Ekspres przelewowy 12 filiżanek", category: "Kuchnia", basePrice: 89.99 },
    { title: "Uchwyt samochodowy na telefon", category: "Akcesoria GSM", basePrice: 19.99 },
    { title: "Zestaw poduszek memory foam", category: "Dom i kuchnia", basePrice: 49.99 },
    { title: "Głośnik przenośny Bluetooth", category: "Elektronika", basePrice: 39.99 },
    { title: "Smartwatch z pulsometrem", category: "Elektronika", basePrice: 129.99 },
    { title: "Frytkownica beztłuszczowa 6L", category: "Kuchnia", basePrice: 119.99 },
  ];

  const recommendationTemplates = [
    { pricing: "Podnieś cenę o 15–20% do poziomu rynkowego", description: "Dodaj wypunktowanie kluczowych cech", category: "Przenieś do kategorii premium" },
    { pricing: "Obniż cenę o 10% dla konkurencyjności", description: "Podkreśl ekologiczne materiały", category: "Optymalizuj dla akcesoriów sportowych" },
    { pricing: "Cena optymalna, rozważ bundling", description: "Dodaj specyfikację techniczną w tytule", category: "Lepsza pozycja w kategorii dom" },
    { pricing: "Wdróż dynamiczną strategię cenową", description: "Uwzględnij rozmiar i materiał", category: "Kieruj na kategorię fitness" },
  ];

  return Array.from({ length: 100 }, (_, index) => {
    const baseProduct = products[index % products.length];
    const template = recommendationTemplates[index % recommendationTemplates.length];
    const priceVariation = (Math.random() - 0.5) * 0.4;
    const recommendedPrice = baseProduct.basePrice * (1 + priceVariation);
    const potentialUplift = Math.random() * 40 + 10;

    return {
      id: `PROD-${String(index + 1).padStart(3, '0')}`,
      title: `${baseProduct.title}${index > 9 ? ` (Model ${Math.floor(index / 10) + 1})` : ''}`,
      currentPrice: baseProduct.basePrice,
      recommendedPrice: Math.round(recommendedPrice * 100) / 100,
      category: baseProduct.category,
      recommendedCategory: baseProduct.category,
      descriptionScore: Math.floor(Math.random() * 40) + 60,
      recommendations: template,
      potentialUplift: Math.round(potentialUplift),
    };
  });
};

// Aktualna data w strefie czasowej Warszawa
const getWarsawDate = () => {
  const now = new Date();
  return new Intl.DateTimeFormat('pl-PL', {
    timeZone: 'Europe/Warsaw',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(now);
};

// Numer dnia w roku (seed do rotacji wierszy)
const getDayOfYear = () => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Warsaw' }));
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
};

const SampleReport = () => {
  const navigate = useNavigate();
  const mockData = generateMockData();
  const [pdfLoading, setPdfLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Rotacja wierszy — każdego dnia inny zestaw 20 z 100 produktów
  const daySeed = getDayOfYear();
  const startIndex = (daySeed * 20) % 100;
  const dailyRows = [
    ...mockData.slice(startIndex, startIndex + 20),
    ...mockData.slice(0, Math.max(0, (startIndex + 20) - 100)),
  ];

  const todayDisplay = getWarsawDate();

  const getPriceChangeIcon = (current: number, recommended: number) => {
    if (recommended > current) return <TrendingUp className="h-4 w-4 text-success" />;
    if (recommended < current) return <TrendingDown className="h-4 w-4 text-danger" />;
    return <Target className="h-4 w-4 text-muted-foreground" />;
  };

  const getPriceChangePercentage = (current: number, recommended: number) => {
    return Math.round(((recommended - current) / current) * 100);
  };

  const getDescriptionScoreBadge = (score: number) => {
    if (score >= 90) return <Badge variant="secondary" className="bg-success-soft text-success border-0 ring-1 ring-success/20">Wysoka</Badge>;
    if (score >= 80) return <Badge variant="secondary" className="bg-primary-soft text-primary border-0 ring-1 ring-primary/20">Dobra</Badge>;
    if (score >= 70) return <Badge variant="secondary" className="bg-warning-soft text-[hsl(38_92%_30%)] border-0 ring-1 ring-warning/25">Średnia</Badge>;
    return <Badge variant="secondary" className="bg-danger-soft text-danger border-0 ring-1 ring-danger/20">Niska</Badge>;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Wysoka';
    if (score >= 80) return 'Dobra';
    if (score >= 70) return 'Średnia';
    return 'Niska';
  };

  /**
   * Generates a PDF by capturing the on-screen report HTML via html2canvas.
   * This approach preserves Polish characters, fonts (Geist), and exact layout
   * because it renders the actual DOM rather than re-encoding text in jsPDF.
   *
   * Tradeoffs vs the previous text-based jsPDF approach:
   *   ✓ Polish chars (ł, ś, ż, etc.) render correctly
   *   ✓ Visual fidelity matches the on-screen design exactly
   *   ✓ No layout/encoding bugs
   *   ✗ Larger file size (raster image vs vector text)
   *   ✗ Text is not selectable inside the PDF
   *
   * For a marketing/sample report this is the right tradeoff — the user
   * downloads it once, sends it to a colleague, prints it. Fidelity wins.
   */
  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setPdfLoading(true);

    try {
      // Lazy-load html2canvas — large dep, only needed at click time
      const { default: html2canvas } = await import('html2canvas');

      // Allow any pending paints to settle (e.g. fonts swapping in)
      await new Promise((r) => setTimeout(r, 250));

      const node = reportRef.current;
      const canvas = await html2canvas(node, {
        scale: 2,                                  // 2× for crisp print quality
        backgroundColor: '#FAFAF7',                // matches our --background token
        logging: false,
        useCORS: true,
        windowWidth: node.scrollWidth,
        // Prepare the cloned DOM for capture: remove action buttons, kill animations
        onclone: (clonedDoc) => {
          // Remove anything explicitly flagged for hiding in PDFs (back button, PDF button)
          clonedDoc.querySelectorAll('[data-pdf-hide]').forEach((el) => el.remove());

          // Kill all CSS animations + transitions inside the cloned tree so the
          // rendered snapshot represents the final state, not a transitional frame
          clonedDoc.querySelectorAll('*').forEach((el) => {
            const style = (el as HTMLElement).style;
            style.animation = 'none';
            style.transition = 'none';
            // Framer Motion sometimes leaves transforms mid-animation
            if (style.opacity !== '' && parseFloat(style.opacity) < 1) style.opacity = '1';
            if (style.transform && style.transform !== 'none') {
              // Snap to final state — strip translate/scale that come from motion props
              style.transform = 'none';
            }
          });
        },
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const usableW = pageW - margin * 2;
      const usableH = pageH - margin * 2;

      // Convert pixels to mm for our scale
      const pxToMm = usableW / canvas.width;
      const fullImgHmm = canvas.height * pxToMm;

      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if (fullImgHmm <= usableH) {
        // Fits on a single page
        pdf.addImage(imgData, 'JPEG', margin, margin, usableW, fullImgHmm);
      } else {
        // Multi-page: slice the canvas into page-sized chunks
        const pageHeightPx = Math.floor(usableH / pxToMm);
        const totalPages = Math.ceil(canvas.height / pageHeightPx);

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage();

          const sliceH = Math.min(pageHeightPx, canvas.height - i * pageHeightPx);

          // Render the slice onto a temporary canvas
          const slice = document.createElement('canvas');
          slice.width = canvas.width;
          slice.height = sliceH;
          const ctx = slice.getContext('2d');
          if (!ctx) continue;

          // Fill with background to avoid transparent gaps when JPEG-encoded
          ctx.fillStyle = '#FAFAF7';
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(
            canvas,
            0, i * pageHeightPx, canvas.width, sliceH,
            0, 0,                  canvas.width, sliceH,
          );

          const sliceData = slice.toDataURL('image/jpeg', 0.92);
          pdf.addImage(sliceData, 'JPEG', margin, margin, usableW, sliceH * pxToMm);

          // Page footer
          pdf.setFontSize(7);
          pdf.setTextColor(140, 140, 140);
          pdf.text(
            `Strona ${i + 1} z ${totalPages}  ·  Shoppalyzer  ·  shoppalyzer.pl`,
            pageW / 2, pageH - 4, { align: 'center' },
          );
        }
      }

      const today = new Date();
      const dateStr = today.toLocaleDateString('pl-PL', {
        day: '2-digit', month: '2-digit', year: 'numeric',
      });
      pdf.save(`Shoppalyzer_Raport_${dateStr.replace(/\./g, '-')}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div ref={reportRef} className="container py-10 lg:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <button
            data-pdf-hide
            onClick={() => navigate('/')}
            className="
              inline-flex items-center gap-1.5 mb-6
              text-sm font-medium text-muted-foreground hover:text-foreground
              transition-colors group
            "
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Wróć na stronę główną
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] font-medium text-muted-foreground mb-3">
                Przykładowy raport · {dailyRows.length} z 100 produktów
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-[-0.025em] text-brand-navy leading-[1.1]">
                Tak wygląda raport,
                <span className="text-primary"> który dostaniesz każdego ranka.</span>
              </h1>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                Rekomendacje dla 100 produktów na Allegro, wygenerowane przez algorytm Shoppalyzera.
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Data raportu:</span>
                <span className="font-semibold text-foreground">{todayDisplay}</span>
              </div>
            </div>

            <motion.button
              data-pdf-hide
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              onClick={handleExportPDF}
              disabled={pdfLoading}
              className="
                group inline-flex items-center justify-center gap-2
                bg-foreground text-background
                font-semibold text-sm px-5 py-3 rounded-lg
                shadow-soft hover:shadow-medium
                transition-all disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {pdfLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generowanie...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Pobierz raport PDF
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Summary stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-10">
          {[
            { Icon: FileText,   label: 'Przeanalizowanych produktów', value: '100',  tone: 'primary' as const },
            { Icon: TrendingUp, label: 'Średni potencjał wzrostu',     value: '+27%', tone: 'success' as const },
            { Icon: DollarSign, label: 'Optymalizacje cenowe',          value: '73',   tone: 'amber'   as const },
            { Icon: Target,     label: 'Propozycje zmian treści',       value: '89',   tone: 'amber'   as const },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl bg-surface ring-1 ring-border p-5 hover:shadow-soft transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className={`
                  inline-flex h-10 w-10 items-center justify-center rounded-lg shrink-0
                  ${item.tone === 'primary' ? 'bg-primary-soft text-primary'         : ''}
                  ${item.tone === 'success' ? 'bg-success-soft text-success'         : ''}
                  ${item.tone === 'amber'   ? 'bg-accent-brand-soft text-accent-brand': ''}
                `}>
                  <item.Icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground tracking-tight tabular-nums leading-none">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5 leading-tight">
                    {item.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-surface ring-1 ring-border overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-border">
            <div className="text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground mb-1.5">
              Rekomendacje produktowe
            </div>
            <h2 className="text-lg font-semibold text-foreground tracking-tight">
              Szczegółowe rekomendacje cenowe i asortymentowe
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="w-[100px] text-[10px] uppercase tracking-wider font-medium">ID</TableHead>
                  <TableHead className="min-w-[260px] text-[10px] uppercase tracking-wider font-medium">Nazwa produktu</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider font-medium">Cena aktualna</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider font-medium">Cena rekomend.</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider font-medium">Zmiana</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider font-medium">Ocena opisu</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider font-medium">Potencjał</TableHead>
                  <TableHead className="min-w-[220px] text-[10px] uppercase tracking-wider font-medium">Rekomendacje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyRows.map((product) => {
                  const priceChange = getPriceChangePercentage(product.currentPrice, product.recommendedPrice);
                  return (
                    <TableRow key={product.id} className="border-b border-border/60 last:border-0 hover:bg-surface-muted/40 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">{product.id}</TableCell>
                      <TableCell className="font-medium text-foreground">{product.title}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">{product.currentPrice.toFixed(2)} zł</TableCell>
                      <TableCell className="text-right tabular-nums font-semibold text-foreground">{product.recommendedPrice.toFixed(2)} zł</TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1 tabular-nums">
                          {getPriceChangeIcon(product.currentPrice, product.recommendedPrice)}
                          <span className={`text-sm font-medium ${priceChange > 0 ? 'text-success' : priceChange < 0 ? 'text-danger' : 'text-muted-foreground'}`}>
                            {priceChange > 0 ? '+' : ''}{priceChange}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground tabular-nums">{product.descriptionScore}</span>
                          {getDescriptionScoreBadge(product.descriptionScore)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="
                          inline-flex items-center gap-1
                          bg-success-soft text-success
                          ring-1 ring-inset ring-success/25
                          font-semibold text-xs px-2 py-1 rounded-full tabular-nums
                        ">
                          +{product.potentialUplift}%
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <ul className="space-y-1">
                          <li className="flex items-start gap-1.5">
                            <span className="text-primary/40 mt-0.5">·</span>
                            <span>{product.recommendations.pricing}</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-primary/40 mt-0.5">·</span>
                            <span>{product.recommendations.description}</span>
                          </li>
                        </ul>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="px-6 py-5 border-t border-border bg-surface-muted/40 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Wyświetlono <span className="font-semibold text-foreground tabular-nums">{dailyRows.length}</span> z{' '}
              <span className="font-semibold text-foreground">100</span> produktów.
            </p>
            <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
              Zobacz wszystkie produkty
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SampleReport;
