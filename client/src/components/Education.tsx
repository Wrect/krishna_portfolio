import { Award, BookOpen, Download } from "lucide-react";

const education = [
  {
    degree: "Polytechnic Diploma in Mechanical Engineering",
    school: "Prabhat Engineering College",
    location: "Kanpur Dehat, U.P.",
    board: "BTEUP",
    year: "2022",
  },
  {
    degree: "Senior Secondary (Class XII)",
    school: "D.G.A. Inter College",
    location: "Barhapur, Kanpur Dehat, U.P.",
    board: "UP BOARD",
    year: "2019",
  },
  {
    degree: "Secondary (Class X)",
    school: "D.G.A. Inter College",
    location: "Barhapur, Kanpur Dehat, U.P.",
    board: "UP BOARD",
    year: "2017",
  },
];

const certifications = [
  {
    title: "SolidWorks",
    issuer: "Professional-level 3D CAD modeling, Surfacing, Sheet Metal, Assembly, Drafting, Molding, Simulation, & Weldments",
    skills: ["3D Modeling", "Surfacing", "Sheet Metal", "Assembly", "Drafting", "Simulation", "Weldments"],
  },
  {
    title: "AutoCAD",
    issuer: "Sketching, Nesting, Strip Layout, 2D Drafting, Isometric Drawing, Technical Drawing with GD&T Symbol & Annotation",
    skills: ["2D Drafting", "Strip Layout", "Nesting", "Isometric", "GD&T Symbols"],
  },
  {
    title: "Siemens NX",
    issuer: "Basic Knowledge & CAD Principles",
    skills: ["3D Modeling", "CAD Principles"],
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-32 bg-card/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-[#DC2626]" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Education
                </h2>
              </div>
              <div className="w-12 h-1 bg-[#DC2626] rounded-full" />
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-[#DC2626] font-semibold text-sm mb-3">
                    {edu.school}
                  </p>
                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    <span>{edu.location}</span>
                    <span className="font-semibold text-foreground">{edu.year}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-[#DC2626]/10 text-[#DC2626] text-sm font-semibold rounded-full">
                      {edu.board}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-[#DC2626]" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Certifications & Software
                </h2>
              </div>
              <div className="w-12 h-1 bg-[#DC2626] rounded-full" />
            </div>

            <div className="space-y-6">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-[#DC2626]/10 text-[#DC2626] text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
