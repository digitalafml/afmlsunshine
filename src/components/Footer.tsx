import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";
import akijInsafLogo from "@/assets/akij-insaf-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background/90">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Sunshine" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Bringing quality staple foods to Bangladeshi families since 
              our founding. Made with love, served with care.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Products", "Why Sunshine", "Quality", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-background/70 hover:text-primary transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Products</h3>
            <ul className="space-y-3">
              {["Atta (আটা)", "Maida (ময়দা)", "Rice (চাল)", "Edible Oil (তেল)", "Suji (সুজি)"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-background/70 text-sm">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-background/70 text-sm">
                  Akij House, 198 Bir Uttam Mir Shawkat Sarak,
                  Tejgaon, Dhaka-1208
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a
                  href="tel:+88028878745"
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  +880 2 8878745
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a
                  href="mailto:info@akij.net"
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  info@akij.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Sunshine by Akij Flour Mills Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-background/50 text-sm">
            <span>A brand of</span>
            <img src={akijInsafLogo} alt="AKIJ INSAF" className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
