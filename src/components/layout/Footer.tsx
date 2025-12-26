import { Link } from "react-router-dom";
import { Stars, Instagram, Mail, Facebook, Linkedin } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/lib/graphql";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Stars className="w-6 h-6 text-cosmic-blue" />
              <span className="font-display text-xl font-semibold">
                Astro Aperture
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Capturing the cosmos one exposure at a time. Fine art astrophotography 
              by Jay Rosen.
            </p>
          </div>

          {/* Gallery Links */}
          <div>
            <h4 className="font-semibold mb-4">Gallery</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Captures
                </Link>
              </li>
              {GALLERY_CATEGORIES.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/gallery/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/space-apps"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Space Apps
                </Link>
              </li>
              <li>
                <Link
                  to="/gear"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gear
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shop Prints
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/astro.aperture"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/rosen.jay/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jayrosenartist/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:studio@jayrosen.design"
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Astro Aperture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
