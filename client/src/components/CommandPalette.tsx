import { Command } from "cmdk";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const commands = [
  {
    id: "about",
    label: "About",
    description: "Learn about Krishna's background and philosophy",
    href: "#about",
  },
  {
    id: "experience",
    label: "Experience",
    description: "View professional experience and timeline",
    href: "#experience",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Browse featured projects and case studies",
    href: "#projects",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch or download resume",
    href: "#contact",
  },
  {
    id: "software",
    label: "Software Skills",
    description: "View software expertise and proficiency",
    href: "#software",
  },
  {
    id: "education",
    label: "Education",
    description: "View education and certifications",
    href: "#education",
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    setSearch("");
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Keyboard Shortcut Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-[#DC2626] transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Search className="w-4 h-4 text-foreground/60" />
        <span className="text-sm text-foreground/60">
          <kbd className="hidden sm:inline px-2 py-1 text-xs font-semibold text-foreground/40 bg-background rounded border border-border">
            Ctrl+K
          </kbd>
          <span className="sm:hidden">⌘K</span>
        </span>
      </button>

      {/* Command Palette Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <Command className="[&_[cmdk-input-wrapper]_svg]:hidden [&_[cmdk-input]]:border-0 [&_[cmdk-input]]:focus:ring-0">
            <div className="flex items-center border-b border-border px-4 py-3">
              <Search className="w-4 h-4 text-foreground/40 mr-2" />
              <Command.Input
                placeholder="Search sections..."
                value={search}
                onValueChange={setSearch}
                className="flex-1 bg-transparent text-foreground placeholder:text-foreground/40 outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-card rounded transition-colors"
              >
                <X className="w-4 h-4 text-foreground/60" />
              </button>
            </div>

            <Command.List className="max-h-64 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <Command.Empty className="py-6 text-center text-sm text-foreground/60">
                  No sections found.
                </Command.Empty>
              ) : (
                <Command.Group>
                  {filteredCommands.map((cmd) => (
                    <Command.Item
                      key={cmd.id}
                      value={cmd.id}
                      onSelect={() => handleSelect(cmd.href)}
                      className="px-4 py-3 cursor-pointer hover:bg-card data-[selected]:bg-card transition-colors"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-foreground">
                          {cmd.label}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {cmd.description}
                        </span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>

            <div className="border-t border-border px-4 py-3 text-xs text-foreground/40">
              <div className="flex items-center justify-between">
                <span>Press ESC to close</span>
                <span>↵ to select</span>
              </div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
