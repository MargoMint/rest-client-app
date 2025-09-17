// import { HttpStatus } from '@/constants/http-status';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  // req: NextRequest
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');

  // const locale = req.nextUrl.pathname.split('/')[1]; // 'en', 'ru', и т.д.
  // const redirectUrl = `${req.nextUrl.origin}/${locale}/login`;

  // return NextResponse.redirect(redirectUrl, {
  //   status: HttpStatus.FOUND,
  // });
  return NextResponse.json({ success: true });
}
