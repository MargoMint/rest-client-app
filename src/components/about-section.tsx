import Typography from '@/components/typography';

interface AboutSectionProps {
  title: string;
  body: string;
  align: 'left' | 'right';
}

function AboutSection({ title, body, align }: AboutSectionProps) {
  const alignmentClasses =
    align === 'left' ? 'self-start text-left' : 'self-end text-right';

  return (
    <div
      className={`flex max-w-[850px] flex-col justify-center gap-4 ${alignmentClasses}`}
    >
      <Typography
        variant="h3"
        className="border-b-3 text-[var(--primary)] capitalize"
      >
        {title}
      </Typography>
      <Typography variant="body">{body}</Typography>
    </div>
  );
}

export default AboutSection;
