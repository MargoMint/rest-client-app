import { NextRequest, NextResponse } from 'next/server';
import { HttpStatus } from '@/constants/http-status';

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get('mode');

  if (mode === '404') {
    return NextResponse.json(
      { message: 'Page not found' },
      { status: HttpStatus.NOT_FOUND },
    );
  }

  if (mode === '500') {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR },
    );
  }

  if (mode === 'network') {
    return NextResponse.redirect('http://localhost:1234');
  }

  return NextResponse.json(
    { message: 'Hello world' },
    { status: HttpStatus.OK },
  );
}
