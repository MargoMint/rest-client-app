import Typography from '@/components/typography';
import cn from '@/lib/utils';

type AboutSectionAlignVariant = 'left' | 'right';

interface AboutSectionProps {
  title: string;
  body: string;
  variant: AboutSectionAlignVariant;
}

const variantMap: Record<AboutSectionAlignVariant, { styles: string }> = {
  left: { styles: 'self-start text-left' },
  right: { styles: 'self-end text-right' },
};

function AboutSection({ title, body, variant }: AboutSectionProps) {
  const { styles } = variantMap[variant];

  return (
    <div
      className={cn('flex max-w-[850px] flex-col justify-center gap-4', styles)}
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
