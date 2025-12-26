import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GALLERY_CATEGORIES } from "@/lib/graphql";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Space Apps", href: "/space-apps" },
    { label: "Gear", href: "/gear" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <Stars className="w-8 h-8 text-cosmic-blue group-hover:text-cosmic-blue-glow transition-colors" />
            <span className="font-display text-xl lg:text-2xl font-semibold tracking-tight">
              Astro Aperture
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Gallery Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Gallery
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-56 bg-popover/95 backdrop-blur-xl border-border"
              >
                <DropdownMenuItem asChild>
                  <Link
                    to="/gallery"
                    className="cursor-pointer font-medium"
                  >
                    All Captures
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1" />
                {GALLERY_CATEGORIES.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link
                      to={`/gallery/${category.slug}`}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Shop Button */}
            <Button asChild size="sm">
              <Link to="/shop">Shop</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                to="/gallery"
                className="px-4 py-3 text-lg font-medium hover:bg-muted rounded-lg transition-colors"
              >
                Gallery
              </Link>
              <div className="pl-6 flex flex-col gap-1">
                {GALLERY_CATEGORIES.slice(0, 6).map((category) => (
                  <Link
                    key={category.slug}
                    to={`/gallery/${category.slug}`}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-3 text-lg font-medium hover:bg-muted rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/shop"
                className="mx-4 mt-2"
              >
                <Button className="w-full">Shop</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
