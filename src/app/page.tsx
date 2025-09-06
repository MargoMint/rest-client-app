import Layout from '@/components/Layout';
import Link from 'next/link';
import Typography from '@/components/Typography';

function Home() {
  return (
    <Layout>
      <Link href="/ui-demo">
        <Typography variant="body" className="flex justify-center">
          To UI demo page
        </Typography>
      </Link>
    </Layout>
  );
}

export default Home;
