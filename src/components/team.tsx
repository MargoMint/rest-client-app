import teamMembers from '@/constants/team-data';
import Image from 'next/image';
import Typography from './typography';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Team() {
  return (
    <section>
      <div className="mb-8 text-center">
        <Typography variant="body" className="uppercase">
          Our team
        </Typography>
        <Typography variant="h3" className="text-[var(--primary)] capitalize">
          Get to know us
        </Typography>
      </div>

      <div className="space-y-14">
        {teamMembers.map((member) => (
          <div
            key={member.github}
            className="flex flex-col items-center gap-4 md:flex-row md:gap-10"
          >
            <div className="flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <Typography variant="h3" className="uppercase">
                {member.name}
              </Typography>

              <Typography variant="body" className="mt-2">
                {member.bio}
              </Typography>

              <div className="mt-2 flex justify-center gap-2 md:justify-start">
                <a
                  href={member.linkedin}
                  aria-label={`LinkedIn - ${member.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--dark)] transition hover:text-[var(--primary)]"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                  href={member.github}
                  aria-label={`GitHub - ${member.name}`}
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
