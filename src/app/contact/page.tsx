import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/data/site";
import { FAQ_CONTACT } from "@/data/faq";
import { getPage } from "@/data/pages";
import { ORG_ID, breadcrumb, faqPage, graph, webPage } from "@/lib/schema";

const PAGE = getPage("/contact");

export const metadata: Metadata = {
  title: "Contact & devis",
  description:
    "Dispatch H24, basé à Paris. Réponse sous 30 minutes ouvrées. Pour les urgences, appelez directement le 24/7.",
  alternates: { canonical: "/contact" },
};

const jsonLd = graph(
  {
    ...webPage({
      path: PAGE.path,
      name: "Contact & devis",
      description: PAGE.summary,
      dateModified: PAGE.updated,
    }),
    "@type": "ContactPage",
    mainEntity: { "@id": ORG_ID },
  },
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  faqPage(PAGE.path, FAQ_CONTACT),
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        num="24/7"
        tag="/ contact / dispatch h24"
        eyebrow="Contactez-nous"
        title="Une mission ?"
        accent="Parlons-en."
        lead="Dispatch H24, basé à Paris. Réponse sous 30 minutes ouvrées. Pour les urgences, appelez directement le 24/7."
      />
      <section className="contact">
        <div className="container">
          <div className="contact-grid reveal">
            <div className="contact-info">
              <div className="contact-block">
                <div className="mono dim">// téléphone 24/7</div>
                <a
                  href={SITE.phoneHref}
                  className="display-m tnum"
                  style={{ display: "block", marginTop: 8 }}
                >
                  {SITE.phone}
                </a>
              </div>
              <div className="contact-block">
                <div className="mono dim">// email</div>
                <a
                  href={SITE.emailHref}
                  className="display-s"
                  style={{ display: "block", marginTop: 8 }}
                >
                  {SITE.email}
                </a>
              </div>
              <div className="contact-block">
                <div className="mono dim">// adresse</div>
                <div className="display-s" style={{ marginTop: 8 }}>
                  {SITE.location}
                  <br />
                  <span className="dim" style={{ fontSize: 14 }}>
                    Île-de-France · National
                  </span>
                </div>
              </div>
              <div className="contact-block">
                <div className="mono dim">// disponibilité</div>
                <div className="ticker" style={{ marginTop: 12 }}>
                  <span className="dot"></span>
                  <span>Service actif · 24h/24, 7j/7</span>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
      <Faq items={FAQ_CONTACT} />
    </>
  );
}
