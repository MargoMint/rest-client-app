import Image from 'next/image';
import Typography from './typography';
import footerLinks from '@/constants/footer-links';

function Footer() {
  return (
    <footer className="w-full rounded-t-xl bg-[var(--primary)] py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Typography variant="caption" className="text-[var(--dark)]">
          2025
        </Typography>

        <Typography variant="caption" className="flex gap-8 text-right">
          {footerLinks.map((link) => (
            <a
              key={link.nickname}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--dark)] hover:underline"
            >
              {link.nickname}
            </a>
          ))}
        </Typography>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <Image src="/rss-logo.png" alt="RS School" width={30} height={30} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
