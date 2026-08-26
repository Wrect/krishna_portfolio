import { Mail, MapPin, Phone, Linkedin, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section id="contact" className="pt-24 pb-12 bg-card rounded-t-[40px] md:rounded-t-[80px] relative mt-20 border-t border-border/20 z-30">
      <div className="container mx-auto px-6 flex flex-col items-center">
        
        {/* Name Logo */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black italic tracking-tighter uppercase flex justify-center gap-2">
            <span className="text-foreground drop-shadow-md">KRISHNA</span>
            <span className="text-[#DC2626] drop-shadow-md">KUMAR</span>
          </h2>
          <p className="text-foreground/50 tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm font-bold mt-6 uppercase">
            Precision Meets Engineering
          </p>
        </div>

        {/* Contact Pills */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-16 w-full max-w-5xl">
          
          <a href="mailto:Kishansaxena753@gmail.com" className="flex items-center gap-4 bg-background/40 hover:bg-background border border-border/60 rounded-full px-6 py-4 transition-all duration-300 hover-glow btn-press">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20">
              <Mail className="w-4 h-4 text-foreground/70" />
            </div>
            <span className="text-foreground font-bold text-sm">Kishansaxena753@gmail.com</span>
          </a>

          <a href="https://www.linkedin.com/in/krishna-kumar-6540b9249" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-background/40 hover:bg-background border border-border/60 rounded-full px-6 py-4 transition-all duration-300 hover-glow btn-press">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20">
              <Linkedin className="w-4 h-4 text-foreground/70" />
            </div>
            <span className="text-foreground font-bold text-sm">LinkedIn</span>
          </a>

          <a href="tel:+917522035943" className="flex items-center gap-4 bg-background/40 hover:bg-background border border-border/60 rounded-full px-6 py-4 transition-all duration-300 hover-glow btn-press">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/20">
              <Phone className="w-4 h-4 text-foreground/70" />
            </div>
            <span className="text-foreground font-bold text-sm">+91-7522035943</span>
          </a>

          <div className="flex items-center gap-4 bg-background/40 hover:bg-background border border-border/60 rounded-full px-6 py-4 transition-all duration-300 cursor-default hover-glow">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#DC2626]/40">
              <MapPin className="w-4 h-4 text-[#DC2626]" />
            </div>
            <span className="text-foreground font-bold text-sm">Faridabad, Haryana</span>
          </div>

        </div>

        {/* Newsletter / Micro-interaction Demo */}
        <div className="mt-20 w-full max-w-md mx-auto text-center">
          <p className="text-sm text-foreground/70 font-semibold mb-4 uppercase tracking-widest">Join My Network</p>
          <form onSubmit={handleSubscribe} className={`relative flex items-center transition-all duration-300 ${status === 'error' ? 'animate-shake' : ''}`}>
            <input 
              type="email" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-background/50 border-2 rounded-full py-4 pl-6 pr-16 text-sm font-medium outline-none transition-colors duration-300
                ${status === 'error' ? 'border-red-500/50 focus:border-red-500' : 
                  status === 'success' ? 'border-green-500/50 focus:border-green-500 text-green-600 dark:text-green-400' : 
                  'border-border/60 focus:border-[#DC2626]'}`}
            />
            <button 
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 btn-press
                ${status === 'error' ? 'bg-red-500 hover:bg-red-600' : 
                  status === 'success' ? 'bg-green-500 hover:bg-green-600' : 
                  'bg-[#DC2626] hover:bg-[#B91C1C] hover-glow'}`}
            >
              {status === 'error' ? <AlertCircle className="w-4 h-4" /> : 
               status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : 
               <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
          {status === 'error' && <p className="text-red-500 text-xs mt-2 font-medium absolute left-0 right-0">Please enter a valid email address.</p>}
          {status === 'success' && <p className="text-green-600 dark:text-green-400 text-xs mt-2 font-medium absolute left-0 right-0">Subscribed successfully!</p>}
        </div>

        {/* Footer Text */}
        <div className="mt-28 pt-8 w-full text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-border/40 rounded-full"></div>
          <p className="text-foreground/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase pt-4">
            © {currentYear} KRISHNA KUMAR . PRABHAT ENGINEERING COLLEGE
          </p>
        </div>

      </div>
    </section>
  );
}
