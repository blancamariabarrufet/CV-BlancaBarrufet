"use client";

import cvData from "@/data/cv.json";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const { profile } = cvData;
  const pathname = usePathname();
  const router = useRouter();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      // If already on home page, just scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home page with hash
      router.push("/#contact");
      // After navigation, scroll to the section
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">{profile.name}</h3>
            <p className="text-sm">{profile.headline}</p>
            <p className="text-sm mt-2">{profile.location}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/cv" className="hover:text-white transition-colors">
                  CV
                </a>
              </li>
              <li>
                <a href="/#contact" onClick={handleContactClick} className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-white transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              {profile.linkedin && (
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {profile.github && (
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
