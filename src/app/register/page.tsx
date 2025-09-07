import AuthForm from '@/components/AuthForm';
import Layout from '@/components/Layout';
import Typography from '@/components/Typography';

export default function RegisterPage() {
  console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  return (
    <Layout>
      <div className="flex h-full items-center justify-center">
        <div className="h-[408px] w-[550px] self-center rounded-[20px] bg-[var(--white)] p-8 text-center shadow-[0px_0px_11.6px_5px_rgba(0,0,0,0.08)]">
          <Typography
            variant="h2"
            className="mb-6 text-center text-[var(--primary)]"
          >
            Welcome to REST Client
          </Typography>
          <AuthForm mode="register" />
        </div>
      </div>
    </Layout>
  );
}
