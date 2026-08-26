import { ChevronDown } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    id: 1,
    title: "Jr. Design Engineer",
    company: "Usaka Engineers",
    period: "Feb 2026 – Present",
    location: "Faridabad, Haryana",
    achievements: [
      "Develop 3D CAD models and 2D drawings using SolidWorks & AutoCAD per client specifications",
      "Design welding fixtures and checking gauges compliant with component drawings and GD&T standards",
      "Coordinate with tool room during fixture and gauge manufacturing and try-out phases",
      "Design and development of Sheet Metal Bending Tools for accurate and repeatable forming operations",
      "Work on Blanking Tool design, including strip layout, punch, die, and die-set",
      "Develop Blanking and Bending Press Tools using SolidWorks with progressive die strip layouts",
      "Maintain organized design files, revision history, and BOMs for full project traceability",
    ],
    technologies: ["SolidWorks", "AutoCAD", "Welding Fixtures", "Checking Gauges", "Bending Tools", "Blanking Tools", "GD&T", "PPAP", "BOM"],
  },
  {
    id: 2,
    title: "Jr. Design Engineer",
    company: "Jayem Auto Industries Pvt. Ltd.",
    period: "Sep 2024 – Feb 2026 (1 Yr 6 Mos)",
    location: "Faridabad, Haryana",
    achievements: [
      "Specialized in pipe bending process and coordinate knowledge for automotive assemblies",
      "Designed pipe bending components and assemblies as per customer requirements",
      "Developed and modified checking gauges for quality inspection of bent components",
      "Applied GD&T tolerances and manufacturing standards in 3D design & 2D detailing",
    ],
    technologies: ["SolidWorks", "AutoCAD", "Pipe Bending", "Checking Gauges", "GD&T Standards"],
  },
  {
    id: 3,
    title: "Machine Operator (Trainee)",
    company: "Sona BLW Precision Forging India Ltd.",
    period: "Aug 2022 – Sep 2024 (2 Yrs 1 Mo)",
    location: "Manesar, Gurugram",
    achievements: [
      "Operated CNC and VMC machines for high-precision machining of automotive production components",
      "Performed machine setup, job changeovers, tool offset corrections, and quality inspection",
      "Hands-on expertise with measuring instruments including Vernier, Micrometer, Height Gauge, Filler Gauge, and Dial Gauge",
      "Maintained 5S, Kaizen, and manufacturing process optimization on the shop floor",
    ],
    technologies: ["CNC Machine", "VMC Machine", "Precision Machining", "Vernier/Micrometer", "Tool Offset", "5S & Kaizen"],
  },
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section id="experience" className="py-20 md:py-32 relative z-10">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <div className="w-12 h-1 bg-[#DC2626] rounded-full" />
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="relative"
            >
              {/* Timeline line */}
              {idx < experiences.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-24 bg-gradient-to-b from-[#DC2626] to-border hidden md:block" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-6 w-12 h-12 bg-background border-2 border-[#DC2626] rounded-full flex items-center justify-center hidden md:flex">
                <div className="w-3 h-3 bg-[#DC2626] rounded-full" />
              </div>

              {/* Card */}
              <div className="md:ml-24 bg-card border border-border rounded-lg overflow-hidden hover:border-[#DC2626]/50 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
                <button
                  onClick={() =>
                    setExpandedId(expandedId === exp.id ? null : exp.id)
                  }
                  className="w-full p-6 text-left hover:bg-background/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-[#DC2626] font-semibold mt-1">
                        {exp.company}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-foreground/90 font-medium">
                        <span>{exp.period}</span>
                        <span className="hidden sm:inline text-border">•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-foreground/60 transition-transform duration-200 flex-shrink-0 ${
                        expandedId === exp.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedId === exp.id && (
                  <div className="px-6 pb-6 border-t border-border space-y-4">
                    {/* Achievements */}
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-3">
                        Key Achievements
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm text-foreground/90 font-medium"
                          >
                            <span className="text-[#DC2626] font-bold mt-0.5">
                              ✓
                            </span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-3">
                        Technologies & Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-background border border-border rounded-full text-xs font-semibold text-foreground/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
