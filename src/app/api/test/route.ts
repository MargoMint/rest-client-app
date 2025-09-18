import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get('mode');

  if (mode === '404') {
    return NextResponse.json({ message: 'Page not found' }, { status: 404 });
  }

  if (mode === '500') {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }

  if (mode === 'network') {
    return NextResponse.redirect('http://localhost:1234');
  }

  return NextResponse.json({ message: 'Hello world' });
}
