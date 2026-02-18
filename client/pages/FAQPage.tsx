import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question: "Kargo süresi ne kadar?",
    answer: "Siparişleriniz 1-3 iş günü içinde kargoya verilir. İstanbul içi 1-2 gün, Türkiye geneli 2-5 gün içinde teslim edilir.",
  },
  {
    question: "Ücretsiz kargo şartı nedir?",
    answer: "500₺ ve üzeri siparişlerde ücretsiz kargo hizmeti sunuyoruz. 500₺ altı siparişlerde 50₺ kargo ücreti alınmaktadır.",
  },
  {
    question: "İade ve değişim nasıl yapılır?",
    answer: "14 gün içinde ürünlerinizi iade edebilir veya değiştirebilirsiniz. Ürünlerin orijinal ambalajında ve hasarsız olması gerekmektedir. İade için müşteri hizmetlerimizle iletişime geçin.",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer: "Kredi kartı, banka kartı, kapıda ödeme ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeler SSL ile korunmaktadır.",
  },
  {
    question: "Ürün garantisi var mı?",
    answer: "Tüm ürünlerimiz 2 yıl garantilidir. Garanti kapsamı üretici garantisi ile sınırlıdır.",
  },
  {
    question: "Stok durumunu nasıl öğrenebilirim?",
    answer: "Ürün detay sayfasında stok durumu gösterilmektedir. Stokta olmayan ürünler için 'Stokta Olunca Haber Ver' özelliğini kullanabilirsiniz.",
  },
  {
    question: "Kurulum hizmeti sunuyor musunuz?",
    answer: "Evet, belirli ürünler için kurulum hizmeti sunuyoruz. Detaylı bilgi için müşteri hizmetlerimizle iletişime geçin.",
  },
  {
    question: "Faturalı ürün alabilir miyim?",
    answer: "Evet, tüm siparişleriniz için fatura kesilmektedir. Fatura bilgilerinizi sipariş sırasında girebilirsiniz.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>Sık Sorulan Sorular - Sencan Aydınlatma</title>
        <meta
          name="description"
          content="Sencan Aydınlatma hakkında sık sorulan sorular. Kargo, iade, ödeme ve diğer konularda merak ettikleriniz."
        />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-h2 font-bold text-foreground mb-4">
              Sık Sorulan Sorular
            </h1>
            <p className="text-base text-muted-foreground">
              Merak ettiklerinizin cevaplarını burada bulabilirsiniz
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Sorunuzun cevabını bulamadınız mı?
            </p>
            <a
              href="/iletisim"
              className="text-accent hover:underline font-medium"
            >
              Bize ulaşın →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

