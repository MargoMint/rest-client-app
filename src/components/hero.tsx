'use client';

import Image from 'next/image';
import AboutSection from '@/components/about-section';
import { useTranslations } from 'next-intl';

function Hero() {
  const t = useTranslations('homePage');

  return (
    <div>
      <section>
        <div className="flex flex-col gap-10">
          <AboutSection
            title={t('aboutProjectTitle')}
            body={t('aboutProjectDescr')}
            variant="left"
          />
          <AboutSection
            title={t('aboutCourceTitle')}
            body={t('aboutCourceDescr')}
            variant="right"
          />
        </div>
      </section>
      <div className="absolute top-0 right-0">
        <Image
          src="/hero-bg.png"
          alt="Hero background"
          height={300}
          width={300}
          style={{ width: 'auto', height: 'auto' }}
          className="opacity-5"
          priority
        />
      </div>
    </div>
  );
}

export default Hero;
