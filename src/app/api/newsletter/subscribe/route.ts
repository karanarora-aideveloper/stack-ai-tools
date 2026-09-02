import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = 'website' } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Basic regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Save or update subscriber in MongoDB Atlas
    const subscriber = await prisma.subscriber.upsert({
      where: { email: cleanEmail },
      update: {
        status: 'active',
        source
      },
      create: {
        email: cleanEmail,
        status: 'active',
        source
      }
    });

    return NextResponse.json({
      success: true,
      message: "You're confirmed! Welcome to the Frontier AI Dispatch.",
      subscriberId: subscriber.id
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
