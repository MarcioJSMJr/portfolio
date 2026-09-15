import { GithubIcon, LinkedInIcon, MailIcon, TwitterIcon } from '@/components/icons';
import { SocialIconLink } from '@/components/ui';

interface HubSocialsProps {
  github?: string | null;
  linkedin?: string | null;
  email?: string | null;
  twitter?: string | null;
}

export function HubSocials({
  github,
  linkedin,
  email,
  twitter,
}: HubSocialsProps) {
  const items = [
    github
      ? { href: github, title: 'GitHub', icon: <GithubIcon className="w-5 h-5" /> }
      : null,
    linkedin
      ? {
          href: linkedin,
          title: 'LinkedIn',
          icon: <LinkedInIcon className="w-5 h-5" />,
        }
      : null,
    email
      ? {
          href: `mailto:${email}`,
          title: 'E-mail',
          icon: <MailIcon className="w-5 h-5" />,
        }
      : null,
    twitter
      ? {
          href: twitter,
          title: 'Twitter / X',
          icon: <TwitterIcon className="w-5 h-5" />,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  return (
    <div className="pt-6 mt-2 border-t border-border">
      <p className="text-[11px] font-mono text-neutral-500 mb-3">Conecte-se</p>
      <div className="flex items-center justify-center gap-3">
        {items.map((item) => (
          <SocialIconLink
            key={item.title}
            href={item.href}
            title={item.title}
            className="p-3.5"
          >
            {item.icon}
          </SocialIconLink>
        ))}
      </div>
    </div>
  );
}
