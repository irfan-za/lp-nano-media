import { site } from "~/data/site";

const socialLinks = [
  { href: site.social.instagram, label: "Instagram" },
  { href: site.social.tiktok, label: "TikTok" },
  { href: site.social.linkedin, label: "LinkedIn" },
  { href: site.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-surface px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl font-bold text-gray-900">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm text-gray-500 leading-relaxed">
              {site.tagline}
            </p>
            <div className="mt-5 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors hover:text-gray-600"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-gray-900">Contact</p>
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <p>{site.phone}</p>
              <p>{site.email}</p>
            </div>
          </div>

          {/* Offices */}
          <div>
            <p className="text-sm font-semibold text-gray-900">Offices</p>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              {Object.values(site.offices).map((office) => (
                <div key={office.label}>
                  <p className="font-medium text-gray-700">{office.label}</p>
                  <p className="mt-0.5">{office.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          {site.copyright}
        </div>
      </div>
    </footer>
  );
}
