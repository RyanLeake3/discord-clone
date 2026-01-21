import prisma from '@/lib/prisma';
import { getCurrentProfile } from '@/lib/profiles/actions';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await prisma.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl: imageUrl || '',
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: 'general', profileId: profile.id }],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: 'ADMIN',
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error('[SERVERS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
