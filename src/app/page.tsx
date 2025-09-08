import AppWrapper from '@/components/app-wrapper';
import Link from 'next/link';
import Typography from '@/components/typography';

function Home() {
  return (
    <AppWrapper>
      <Link href="/ui-demo">
        <Typography variant="body" className="flex justify-center">
          To UI demo page
        </Typography>
      </Link>
    </AppWrapper>
  );
}

export default Home;
