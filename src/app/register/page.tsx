import AppWrapper from '@/components/app-wrapper';
import AuthForm from '@/components/AuthForm';
import Typography from '@/components/typography';

export default function RegisterPage() {
  console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  return (
    <AppWrapper>
      <div className="flex h-full items-center justify-center">
        <div className="flex h-[408px] w-[550px] flex-col self-center rounded-[20px] bg-[var(--white)] px-16 py-8 text-center shadow-[0px_0px_11.6px_5px_rgba(0,0,0,0.08)]">
          <Typography
            variant="h2"
            className="mb-6 text-center text-[var(--primary)]"
          >
            Welcome to REST Client
          </Typography>
          <AuthForm mode="register" />
        </div>
      </div>
    </AppWrapper>
  );
}
