import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/af6dde14-4df7-4137-98e3-07e42f6a0c30/files/3d2074fd-6b2e-476c-8354-a65a2ea77f1e.jpg";
const ABOUT_IMG = "https://cdn.ezst.app/projects/af6dde14-4df7-4137-98e3-07e42f6a0c30/files/f3990c20-7360-4519-8221-445efb8f8758.jpg";
const PRODUCTS_IMG = "https://cdn.ezst.app/projects/af6dde14-4df7-4137-98e3-07e42f6a0c30/files/b9aa01eb-72ff-4f20-937e-27d4054797a0.jpg";

const services = [
  { icon: "Sparkles", name: "Facial Treatments", desc: "Deep cleansing, hydrating, and rejuvenating facials tailored to your skin type." },
  { icon: "Star", name: "Chemical Peels", desc: "Gentle-to-advanced exfoliation treatments to resurface and renew your complexion." },
  { icon: "Zap", name: "Microneedling", desc: "Collagen-induction therapy for smoother texture, fine lines, and radiant skin." },
  { icon: "Droplets", name: "LED Light Therapy", desc: "Non-invasive light-based treatment targeting acne, aging, and inflammation." },
  { icon: "Sun", name: "Dermaplaning", desc: "Manual exfoliation removing peach fuzz and dead skin for a silky-smooth glow." },
  { icon: "Heart", name: "Brow & Lash", desc: "Lamination, tinting, and shaping services for perfectly framed eyes." },
];

const pricing = [
  { name: "Signature Facial", desc: "Custom 60-min facial — cleanse, treat, mask", price: "Starting from $85" },
  { name: "Chemical Peel", desc: "Superficial to medium-depth peel treatment", price: "Starting from $110" },
  { name: "Microneedling", desc: "Full-face collagen induction session", price: "Starting from $175" },
  { name: "LED Therapy", desc: "Targeted 30-min light therapy add-on", price: "Starting from $45" },
  { name: "Dermaplaning", desc: "Full-face manual exfoliation", price: "Starting from $75" },
  { name: "Brow Lamination", desc: "Brow lamination + tint + shaping", price: "Starting from $65" },
];

const testimonials = [
  { name: "Mia R.", text: "Hooraesthetics completely transformed my skin. The facial I received was the most relaxing and effective experience I've ever had. My skin has never looked better.", rating: 5 },
  { name: "Sophia L.", text: "I came in with stubborn acne scarring and after just three sessions, my texture has smoothed out dramatically. The team is knowledgeable, kind, and made me feel so comfortable.", rating: 5 },
  { name: "Jade K.", text: "The ambiance alone is worth the visit — it feels like a true luxury escape. But beyond the vibe, the results speak for themselves. Absolutely glowing after every visit.", rating: 5 },
  { name: "Priya N.", text: "I've tried so many places and nothing compares. The dermaplaning left my skin incredibly smooth and my makeup application has been flawless ever since.", rating: 5 },
];

const faqs = [
  { q: "How do I book an appointment?", a: "Simply fill out the booking request form on our website or DM us on Instagram @hooraesthetics. We'll reach out within 24 hours to confirm your appointment." },
  { q: "What should I do to prepare for my first appointment?", a: "Come with a clean face if possible and avoid retinol or active skincare for 24 hours prior. We'll do a quick skin consultation before every session." },
  { q: "Are your treatments suitable for sensitive skin?", a: "Absolutely. We customize every treatment to your unique skin type and concerns. We always patch-test new clients before applying any active products." },
  { q: "How far in advance should I book?", a: "We recommend booking at least 3–5 days in advance, especially for weekends. Same-week slots are sometimes available — reach out and we'll do our best." },
  { q: "Do you offer package deals?", a: "Yes! We offer treatment bundles and loyalty perks for returning clients. Ask about our current promotions when you book." },
];

const galleryImages = [HERO_IMG, ABOUT_IMG, PRODUCTS_IMG, HERO_IMG, PRODUCTS_IMG, ABOUT_IMG];

const navLinks = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "Pricing", id: "pricing" },
  { label: "Reviews", id: "testimonials" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export default function Index() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-body bg-cream text-charcoal overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <button onClick={() => scrollTo("hero")} className="font-display text-xl tracking-widest text-charcoal uppercase">
            Hooraesthetics
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-xs tracking-widest uppercase text-charcoal/70 hover:text-blush transition-colors duration-300">
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo("contact")} className="hidden md:block btn-primary text-xs tracking-widest uppercase px-6 py-3">
            Book Now
          </button>
          <button className="md:hidden text-charcoal" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-blush/20 px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm tracking-widest uppercase text-charcoal/70 text-left hover:text-blush transition-colors">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-primary text-xs tracking-widest uppercase px-6 py-3 mt-2 w-full">
              Book Now
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Hooraesthetics" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/92 via-cream/55 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.35em] uppercase text-blush mb-6 font-body animate-fade-in">Luxury Skincare & Aesthetics</p>
            <h1 className="font-display text-6xl md:text-8xl leading-none text-charcoal mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Glow from<br />
              <span className="italic text-blush">within.</span>
            </h1>
            <p className="text-base md:text-lg text-charcoal/65 leading-relaxed mb-10 max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Personalized skincare treatments and beauty services designed to reveal your most radiant self.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <button onClick={() => scrollTo("contact")} className="btn-primary text-xs tracking-widest uppercase px-8 py-4">
                Book a Treatment
              </button>
              <button onClick={() => scrollTo("services")} className="btn-outline text-xs tracking-widest uppercase px-8 py-4">
                Explore Services
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-blush/40" />
          <Icon name="ChevronDown" size={14} className="text-blush/60" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-blush py-4 overflow-hidden">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center gap-16 text-white text-xs tracking-[0.3em] uppercase font-body shrink-0">
              <span>Skincare</span><span className="text-white/40">✦</span>
              <span>Facial Treatments</span><span className="text-white/40">✦</span>
              <span>Microneedling</span><span className="text-white/40">✦</span>
              <span>Chemical Peels</span><span className="text-white/40">✦</span>
              <span>LED Therapy</span><span className="text-white/40">✦</span>
              <span>Dermaplaning</span><span className="text-white/40">✦</span>
              <span>Brow & Lash</span><span className="text-white/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-blush/10 -z-10" />
            <img src={ABOUT_IMG} alt="About Hooraesthetics" className="w-full aspect-[4/5] object-cover rounded-2xl" />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
              <p className="font-display text-4xl text-blush">500+</p>
              <p className="text-xs tracking-widest uppercase text-charcoal/60 mt-1">Happy Clients</p>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-blush mb-5 font-body">Our Story</p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight text-charcoal mb-8">
              Beauty rooted in<br /><span className="italic">self-care.</span>
            </h2>
            <p className="text-charcoal/65 leading-relaxed mb-6">
              Hooraesthetics was born from a passion for skin health and a belief that every person deserves to feel radiant. We blend clinical expertise with a deeply personal approach — because skincare is never one-size-fits-all.
            </p>
            <p className="text-charcoal/65 leading-relaxed mb-10">
              From your very first consultation, our goal is to understand your skin's unique story and build a treatment plan that truly works. We believe that glowing skin starts with genuine care — for your skin, your confidence, and your time.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[["100%", "Custom Plans"], ["5★", "Rated Service"], ["2+", "Years of Care"]].map(([num, label]) => (
                <div key={label} className="text-center border border-blush/20 rounded-xl py-5 px-3">
                  <p className="font-display text-3xl text-blush">{num}</p>
                  <p className="text-xs tracking-widest uppercase text-charcoal/55 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 bg-petal">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.35em] uppercase text-blush mb-4 font-body">What We Offer</p>
            <h2 className="font-display text-5xl md:text-6xl text-charcoal">Our <span className="italic text-blush">Services</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.name} className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-blush/10">
                <div className="w-12 h-12 rounded-full bg-blush/10 flex items-center justify-center mb-6 group-hover:bg-blush/20 transition-colors">
                  <Icon name={s.icon} size={20} className="text-blush" fallback="Sparkles" />
                </div>
                <h3 className="font-display text-2xl text-charcoal mb-3">{s.name}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-blush mb-4 font-body">Our Work</p>
              <h2 className="font-display text-5xl md:text-6xl text-charcoal">The <span className="italic text-blush">Gallery</span></h2>
            </div>
            <a href="https://instagram.com/hooraesthetics" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-blush transition-colors">
              <Icon name="Instagram" size={16} />
              <span className="tracking-widest uppercase text-xs">@hooraesthetics</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""} aspect-square`}>
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <a
            href="https://instagram.com/hooraesthetics"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex items-center justify-center gap-3 group"
          >
            <div className="flex items-center gap-3 border border-blush/30 rounded-full px-8 py-4 hover:bg-blush hover:border-blush transition-all duration-300 group">
              <Icon name="Instagram" size={18} className="text-blush group-hover:text-white transition-colors" />
              <span className="text-xs tracking-widest uppercase text-charcoal/70 group-hover:text-white transition-colors">
                See more on @hooraesthetics
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 bg-petal">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.35em] uppercase text-blush mb-4 font-body">Investment in Yourself</p>
            <h2 className="font-display text-5xl md:text-6xl text-charcoal">Pricing</h2>
            <p className="text-charcoal/55 text-sm mt-4 tracking-wide">All treatments are personalized. Final pricing confirmed at consultation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pricing.map((p, i) => (
              <div key={p.name} className={`rounded-2xl p-8 border transition-all duration-300 hover:shadow-lg ${i === 2 ? "bg-blush text-white border-blush" : "bg-white border-blush/10"}`}>
                <h3 className={`font-display text-2xl mb-2 ${i === 2 ? "text-white" : "text-charcoal"}`}>{p.name}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${i === 2 ? "text-white/80" : "text-charcoal/55"}`}>{p.desc}</p>
                <div className="flex items-end justify-between">
                  <p className={`font-display text-xl ${i === 2 ? "text-white" : "text-blush"}`}>{p.price}</p>
                  <button onClick={() => scrollTo("contact")} className={`text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors ${i === 2 ? "border-white/40 text-white hover:bg-white hover:text-blush" : "border-blush/30 text-blush hover:bg-blush hover:text-white"}`}>
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.35em] uppercase text-blush mb-4 font-body">Kind Words</p>
            <h2 className="font-display text-5xl md:text-6xl text-charcoal">Client <span className="italic text-blush">Love</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-petal rounded-2xl p-10 border border-blush/10">
                <div className="flex gap-1 mb-6">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <span key={j} className="text-blush text-sm">★</span>
                  ))}
                </div>
                <p className="font-display text-xl md:text-2xl text-charcoal leading-relaxed mb-8 italic">"{t.text}"</p>
                <p className="text-xs tracking-widest uppercase text-blush/80">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH IMAGE BREAK */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={PRODUCTS_IMG} alt="Skincare products" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="font-display text-4xl md:text-6xl italic mb-4">Your skin deserves the best.</p>
            <button onClick={() => scrollTo("contact")} className="mt-4 text-xs tracking-widest uppercase px-8 py-3 border border-white/70 text-white hover:bg-white hover:text-charcoal transition-colors">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="py-28 bg-petal">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-blush mb-4 font-body">Common Questions</p>
            <h2 className="font-display text-5xl md:text-6xl text-charcoal">FAQ</h2>
          </div>
          <div className="flex flex-col divide-y divide-blush/15">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button className="w-full flex items-center justify-between text-left gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display text-xl text-charcoal">{faq.q}</span>
                  <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} className="text-blush shrink-0" />
                </button>
                {openFaq === i && (
                  <p className="mt-4 text-charcoal/65 leading-relaxed text-sm animate-fade-in">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-blush mb-5 font-body">Get In Touch</p>
            <h2 className="font-display text-5xl md:text-6xl text-charcoal leading-tight mb-8">
              Ready to<br /><span className="italic text-blush">glow?</span>
            </h2>
            <p className="text-charcoal/65 leading-relaxed mb-10">
              Fill out the form and we'll get back to you within 24 hours to confirm your appointment. We can't wait to welcome you.
            </p>
            <div className="flex flex-col gap-6">
              <a href="https://instagram.com/hooraesthetics" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-blush/10 flex items-center justify-center group-hover:bg-blush/20 transition-colors">
                  <Icon name="Instagram" size={18} className="text-blush" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-charcoal/50 mb-1">Instagram</p>
                  <p className="text-charcoal font-medium">@hooraesthetics</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blush/10 flex items-center justify-center">
                  <Icon name="Clock" size={18} className="text-blush" />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-charcoal/50 mb-1">Hours</p>
                  <p className="text-charcoal font-medium">Tue – Sat: 9am – 7pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-petal rounded-3xl p-8 md:p-10 border border-blush/15">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-blush/15 flex items-center justify-center mb-6">
                  <Icon name="Check" size={28} className="text-blush" />
                </div>
                <h3 className="font-display text-3xl text-charcoal mb-3">Thank you!</h3>
                <p className="text-charcoal/60 leading-relaxed">We've received your request and will be in touch within 24 hours to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-display text-2xl text-charcoal mb-2">Book a Treatment</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-charcoal/50 block mb-2">Name</label>
                    <input required type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-blush/20 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-blush transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-charcoal/50 block mb-2">Phone</label>
                    <input type="tel" placeholder="Your phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white border border-blush/20 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-blush transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-charcoal/50 block mb-2">Email</label>
                  <input required type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-blush/20 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-blush transition-colors" />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-charcoal/50 block mb-2">Service</label>
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full bg-white border border-blush/20 rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-blush transition-colors">
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-charcoal/50 block mb-2">Message</label>
                  <textarea rows={4} placeholder="Tell us about your skin concerns or any questions..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white border border-blush/20 rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-blush transition-colors resize-none" />
                </div>
                <button type="submit" className="btn-primary text-xs tracking-widest uppercase py-4 mt-2">
                  Send Booking Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-display text-2xl tracking-widest uppercase mb-2">Hooraesthetics</p>
              <p className="text-white/40 text-xs tracking-widest uppercase">Luxury Skincare & Aesthetics</p>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors">
                  {l.label}
                </button>
              ))}
            </div>
            <a href="https://instagram.com/hooraesthetics" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <Icon name="Instagram" size={18} />
              <span className="text-xs tracking-widest uppercase">@hooraesthetics</span>
            </a>
          </div>
          <div className="border-t border-white/10 mt-10 pt-8 text-center">
            <p className="text-white/30 text-xs tracking-widest">© 2025 Hooraesthetics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}