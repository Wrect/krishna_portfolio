import { Linkedin, Github, Mail, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [displayStats, setDisplayStats] = useState({
    years: 0,
    companies: 0,
    projects: 0,
  });

  useEffect(() => {
    // Animate counter numbers on mount
    const intervals = [
      setInterval(() => {
        setDisplayStats((prev) => ({
          ...prev,
          years: Math.min(prev.years + 1, 4),
        }));
      }, 100),
      setInterval(() => {
        setDisplayStats((prev) => ({
          ...prev,
          companies: Math.min(prev.companies + 1, 3),
        }));
      }, 150),
      setInterval(() => {
        setDisplayStats((prev) => ({
          ...prev,
          projects: Math.min(prev.projects + 1, 50),
        }));
      }, 30),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-20 relative z-10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-12">
          
          {/* Left Column */}
          <div className="flex-1 space-y-6 sm:space-y-8 w-full">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Krishna Kumar
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#DC2626] tracking-tight pt-2 drop-shadow-sm">
                Mechanical Design Engineer
              </h2>
            </div>

            {/* Stats Card */}
            <div className="mt-4 sm:mt-6 bg-card/30 backdrop-blur-xl border border-border/30 rounded-2xl p-4 sm:p-6 flex items-center justify-between max-w-xl mx-auto lg:mx-0 shadow-xl">
              <div className="text-center px-2 sm:px-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC2626]">4+</h3>
                <p className="text-[10px] sm:text-xs text-foreground/60 mt-1 font-medium">Years Exp.</p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-border/50"></div>
              <div className="text-center px-2 sm:px-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC2626]">{displayStats.projects}+</h3>
                <p className="text-[10px] sm:text-xs text-foreground/60 mt-1 font-medium">Projects done</p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-border/50"></div>
              <div className="text-center px-2 sm:px-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#DC2626]">3+</h3>
                <p className="text-[10px] sm:text-xs text-foreground/60 mt-1 font-medium">Companies</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 pt-2 sm:pt-4">
              {/* Social Icons */}
              <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
                <a href="https://www.linkedin.com/in/krishna-kumar-6540b9249" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition-all duration-300 shadow-sm hover-glow btn-press">
                   <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="mailto:Kishansaxena753@gmail.com" aria-label="Email" className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition-all duration-300 shadow-sm hover-glow btn-press">
                   <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <a href="#contact" className="px-6 sm:px-8 py-3 bg-[#DC2626] text-white font-bold rounded-md transition-all duration-300 shadow-lg hover-glow btn-press text-sm sm:text-base">
                  Hire Me
                </a>
                <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="KRISHNA_KUMAR_RESUME.pdf" className="px-6 sm:px-8 py-3 border border-border text-foreground font-bold rounded-md hover:bg-white/5 transition-all duration-300 btn-press text-sm sm:text-base">
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end relative w-full max-w-[240px] sm:max-w-sm lg:max-w-none mx-auto lg:mx-0">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
              {/* Dark circle background */}
              <div className="absolute inset-0 bg-background rounded-full scale-110 -z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-border/20"></div>
              
              {/* Profile image cutout */}
              <img 
                src={`${import.meta.env.BASE_URL}profile.png`} 
                alt="Krishna Kumar" 
                className="w-full h-full object-cover rounded-full drop-shadow-2xl hover:scale-105 transition-all duration-500 object-center border-2 border-[#DC2626]/30"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/40 hover:text-[#DC2626] transition-colors duration-300 group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase group-hover:text-[#DC2626] transition-colors">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
