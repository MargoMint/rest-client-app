'use client';

import TEAM_MEMBERS from '@/constants/team-data';
import Image from 'next/image';
import Typography from './typography';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

function Team() {
  const t = useTranslations('Team');

  return (
    <section>
      <div className="mb-8 text-center">
        <Typography variant="body" className="uppercase">
          {t('teamTitle')}
        </Typography>
        <Typography variant="h3" className="text-[var(--primary)] capitalize">
          {t('teamSubtitle')}
        </Typography>
      </div>

      <div className="space-y-14">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.github}
            className="flex flex-col items-center gap-4 md:flex-row md:gap-10"
          >
            <div className="flex-shrink-0">
              <Image
                src={member.image}
                alt={t(`${member.id}.name`)}
                width={160}
                height={160}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <Typography variant="h3" className="uppercase">
                {t(`${member.id}.name`)}
              </Typography>

              <Typography variant="body" className="mt-2">
                {t(`${member.id}.bio`)}
              </Typography>

              <div className="mt-2 flex justify-center gap-2 md:justify-start">
                <a
                  href={member.linkedin}
                  aria-label={`LinkedIn - ${t(`${member.id}.name`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--dark)] transition hover:text-[var(--primary)]"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                  href={member.github}
                  aria-label={`GitHub - ${t(`${member.id}.name`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--dark)] transition hover:text-[var(--primary)]"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Team;
