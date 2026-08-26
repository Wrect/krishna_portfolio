import { ArrowLeft, Download, Maximize2, RotateCcw, Zap, Layers, Box } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, lazy, Suspense, Component, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThreeModelViewer = lazy(() => import("@/components/ThreeModelViewer"));

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.warn("3D Model load error, falling back to image:", error);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface Subpart {
  id: string;
  name: string;
  modelFile: string;
}

interface CaseStudyData {
  id: number;
  title: string;
  category: string;
  industry: string;
  software: string[];
  difficulty: string;
  description: string;
  metrics: string[];
  objectives?: string[];
  requirements?: string[];
  constraints?: string[];
  solution?: string;
  challenges?: string[];
  lessonsLearned?: string[];
  commands?: string[];
  modelFile?: string;
  image?: string;
  subparts?: Subpart[];
}

export default function CaseStudy() {
  const [location, navigate] = useLocation();
  const caseStudyId = parseInt(location.split("/").pop() || "1");
  const [caseStudy, setCaseStudy] = useState<CaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [showSubparts, setShowSubparts] = useState(false);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}projects/${caseStudyId}/json/${caseStudyId}.json`);
        if (!res.ok) {
          setError(true);
          return;
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          console.error("Received HTML instead of JSON for Case Study.");
          setError(true);
          return;
        }

        const data = await res.json();
        setCaseStudy({ ...data, id: caseStudyId });
        setActiveModel(data.modelFile || null);
      } catch (err) {
        console.error("Error loading case study JSON:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudy();
  }, [caseStudyId]);

  const handleToggleSubparts = () => {
    if (showSubparts) {
      // Revert to main model when closing subparts
      setActiveModel(caseStudy?.modelFile || null);
    }
    setShowSubparts(!showSubparts);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 container py-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DC2626]"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Case Study Not Found
          </h1>
          <button
            onClick={() => navigate("/#projects")}
            className="inline-flex items-center gap-2 text-[#DC2626] hover:text-[#B91C1C] font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container pt-8 pb-4">
          <button
            onClick={() => navigate("/#projects")}
            className="inline-flex items-center gap-2 text-[#DC2626] hover:text-[#B91C1C] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#DC2626]/10 to-[#4A5A6A]/10 py-12 border-b border-border">
          <div className="container">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-[#DC2626]/10 text-[#DC2626] text-xs font-semibold rounded-full">
                {caseStudy.category}
              </span>
              <h1 className="text-5xl font-bold text-foreground">
                {caseStudy.title}
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl">
                {caseStudy.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div>
                  <p className="text-xs font-semibold text-foreground/60 uppercase">
                    Industry
                  </p>
                  <p className="text-foreground font-semibold">
                    {caseStudy.industry}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/60 uppercase">
                    Difficulty
                  </p>
                  <p className="text-foreground font-semibold">
                    {caseStudy.difficulty}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/60 uppercase">
                    Duration
                  </p>
                  <p className="text-foreground font-semibold">
                    {caseStudy.metrics[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split Layout: 3D Viewer on Left, Details/Subparts on Right */}
        <section className="py-12 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              
              {/* LEFT SIDE: 3D Model, Subparts Toggle, Commands */}
              <div className="space-y-6">
                <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-card to-background rounded-xl border border-border shadow-lg overflow-hidden flex items-center justify-center">
                  {activeModel ? (
                    <ModelErrorBoundary
                      key={activeModel}
                      fallback={
                        caseStudy.image ? (
                          <img
                            src={caseStudy.image.startsWith('/') ? `${import.meta.env.BASE_URL}${caseStudy.image.slice(1)}` : caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        ) : (
                          <div className="text-center space-y-4">
                            <div className="w-24 h-24 mx-auto bg-[#DC2626]/10 rounded-lg flex items-center justify-center border border-[#DC2626]/20">
                              <Box className="w-12 h-12 text-[#DC2626]" />
                            </div>
                            <p className="text-foreground/60 text-sm font-medium">
                              Interactive 3D CAD Viewer
                            </p>
                          </div>
                        )
                      }
                    >
                      <Suspense fallback={<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DC2626]"></div>}>
                        <ThreeModelViewer modelUrl={`${import.meta.env.BASE_URL}projects/${caseStudyId}/models/${activeModel}`} />
                      </Suspense>
                    </ModelErrorBoundary>
                  ) : caseStudy.image ? (
                    <img
                      src={caseStudy.image.startsWith('/') ? `${import.meta.env.BASE_URL}${caseStudy.image.slice(1)}` : caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-[#DC2626]/10 rounded-lg flex items-center justify-center border border-[#DC2626]/20">
                        <Box className="w-12 h-12 text-[#DC2626]" />
                      </div>
                      <p className="text-foreground/60 text-sm font-medium">
                        Interactive 3D CAD Viewer
                      </p>
                    </div>
                  )}
                </div>

                {/* Subparts Toggle Button */}
                {caseStudy.subparts && caseStudy.subparts.length > 0 && (
                  <button
                    onClick={handleToggleSubparts}
                    className={`w-full py-4 px-6 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-3 ${
                      showSubparts 
                        ? "bg-[#DC2626] border-[#DC2626] text-white shadow-md hover:bg-[#B91C1C]" 
                        : "bg-card border-border text-foreground hover:border-[#DC2626] hover:text-[#DC2626]"
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                    {showSubparts ? "Return to Full Details" : "View Subparts"}
                  </button>
                )}

                {/* Commands Used */}
                <div className="bg-card/40 p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-5 h-5 text-[#DC2626]" />
                    <h2 className="text-xl font-bold text-foreground">
                      Commands & Techniques
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(caseStudy.commands || []).map((cmd) => (
                      <span
                        key={cmd}
                        className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-medium text-foreground"
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Sliding Content Panel */}
              <div className="relative min-h-[600px] overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showSubparts ? (
                    // Details Mode
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-10"
                    >
                      {/* Objectives & Requirements */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">Objectives</h2>
                          <ul className="space-y-2">
                            {(caseStudy.objectives || []).map((obj, idx) => (
                              <li key={idx} className="flex gap-3 text-foreground/80 text-sm">
                                <span className="text-[#DC2626] font-bold mt-0.5">✓</span>
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                          <ul className="space-y-2">
                            {(caseStudy.requirements || []).map((req, idx) => (
                              <li key={idx} className="flex gap-3 text-foreground/80 text-sm">
                                <span className="text-[#DC2626] font-bold mt-0.5">→</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Solution */}
                      <div className="bg-card/20 p-6 rounded-xl border border-border/50">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Solution & Approach</h2>
                        <p className="text-foreground/80 leading-relaxed">
                          {caseStudy.solution || "Solution details not available."}
                        </p>
                      </div>

                      {/* Constraints & Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-background p-5 rounded-xl border border-border">
                          <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">Constraints</h3>
                          <ul className="space-y-2">
                            {(caseStudy.constraints || []).map((constraint, idx) => (
                              <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                                <span className="text-[#DC2626]">•</span> {constraint}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-background p-5 rounded-xl border border-border">
                          <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">Metrics</h3>
                          <ul className="space-y-2">
                            {(caseStudy.metrics || []).map((metric, idx) => (
                              <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                                <span className="text-[#DC2626]">•</span> {metric}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Challenges & Lessons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">Challenges</h2>
                          <ul className="space-y-2">
                            {(caseStudy.challenges || []).map((challenge, idx) => (
                              <li key={idx} className="flex gap-3 text-foreground/80 text-sm">
                                <span className="text-[#DC2626] font-bold">!</span>
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-4">Lessons Learned</h2>
                          <ul className="space-y-2">
                            {(caseStudy.lessonsLearned || []).map((lesson, idx) => (
                              <li key={idx} className="flex gap-3 text-foreground/80 text-sm">
                                <span className="text-[#DC2626] font-bold">★</span>
                                <span>{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Subparts Mode
                    <motion.div
                      key="subparts"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <Layers className="w-8 h-8 text-[#DC2626]" />
                        <h2 className="text-3xl font-bold text-foreground">Assembly Components</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {/* Main Assembly Option */}
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          onClick={() => setActiveModel(caseStudy?.modelFile || null)}
                          className={`w-full text-left p-6 rounded-xl border-2 transition-all group flex items-center gap-6 ${
                            activeModel === caseStudy.modelFile
                              ? "bg-[#DC2626]/10 border-[#DC2626] shadow-md"
                              : "bg-card border-border hover:border-[#DC2626]/50 hover:bg-card/80"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl transition-colors ${
                            activeModel === caseStudy.modelFile ? "bg-[#DC2626] text-white" : "bg-background text-foreground/40 group-hover:text-[#DC2626]"
                          }`}>
                            <Box className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-[#DC2626] transition-colors">Full Assembly</h3>
                            <p className="text-sm text-foreground/60 mt-1">View the complete model</p>
                          </div>
                        </motion.button>

                        {/* Individual Subparts */}
                        {caseStudy.subparts?.map((subpart, idx) => (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + (idx * 0.05) }}
                            key={subpart.id}
                            onClick={() => setActiveModel(subpart.modelFile)}
                            className={`w-full text-left p-6 rounded-xl border-2 transition-all group flex items-center gap-6 ${
                              activeModel === subpart.modelFile
                                ? "bg-[#DC2626]/10 border-[#DC2626] shadow-md"
                                : "bg-card border-border hover:border-[#DC2626]/50 hover:bg-card/80"
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl transition-colors ${
                              activeModel === subpart.modelFile ? "bg-[#DC2626] text-white" : "bg-background text-foreground/40 group-hover:text-[#DC2626]"
                            }`}>
                              {idx + 1}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground group-hover:text-[#DC2626] transition-colors">{subpart.name}</h3>
                              <p className="text-sm text-foreground/60 mt-1 font-mono">File: {subpart.modelFile}</p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-card/20">
          <div className="container text-center space-y-6">
            <h3 className="text-3xl font-bold text-foreground">Have a similar fixture or tolerance challenge?</h3>
            <p className="text-foreground/60 text-lg max-w-xl mx-auto">
              Let's connect and discuss how my precision engineering workflows can optimize your manufacturing process.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#DC2626] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#B91C1C] transition-colors duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform"
            >
              Let's Discuss Your Project
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
