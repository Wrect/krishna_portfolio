const softwareTools = [
  {
    name: "CATIA V5",
    level: "Advanced",
    skills: [
      "Part Design",
      "Assembly Design",
      "Drafting",
      "Generative Shape Design",
      "Generative Sheetmetal Design",
    ],
    proficiency: 95,
  },
  {
    name: "SolidWorks",
    level: "Advanced",
    skills: ["3D Modeling", "Simulation", "Assemblies", "Drafting"],
    proficiency: 90,
  },
  {
    name: "AutoCAD",
    level: "Proficient",
    skills: ["2D Drafting", "Technical Drawing", "Annotation"],
    proficiency: 80,
  },
  {
    name: "Microsoft Office",
    level: "Proficient",
    skills: ["Word", "Excel", "PowerPoint"],
    proficiency: 85,
  },
];

export default function Software() {
  return (
    <section id="software" className="py-20 md:py-32 bg-card/30">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Software Expertise
          </h2>
          <div className="w-12 h-1 bg-[#DC2626] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {softwareTools.map((tool) => (
            <div
              key={tool.name}
              className="bg-background border border-border rounded-lg p-8 hover:shadow-lg transition-all duration-200 hover:border-[#DC2626]/50"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {tool.name}
                  </h3>
                  <p className="text-sm font-medium text-[#DC2626] mt-1">
                    {tool.level}
                  </p>
                </div>
              </div>



              {/* Skills */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
                  Key Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {tool.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-card border border-border rounded-full text-xs font-medium text-foreground/70 hover:text-[#DC2626] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
