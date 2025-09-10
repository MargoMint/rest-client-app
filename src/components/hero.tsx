import Image from 'next/image';
import { ABOUT_TEXTS } from '@/constants/about-texts';
import AboutSection from '@/components/about-section';

function Hero() {
  return (
    <div>
      <section>
        <div className="flex flex-col gap-10">
          <AboutSection
            title={ABOUT_TEXTS.project.title}
            body={ABOUT_TEXTS.project.body}
            variant="left"
          />
          <AboutSection
            title={ABOUT_TEXTS.course.title}
            body={ABOUT_TEXTS.course.body}
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
