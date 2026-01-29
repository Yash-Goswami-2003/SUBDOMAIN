import { NextResponse } from 'next/server';
import { adminConfig } from '@/data/admin';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        // AUTHENTICATION
        if (username === adminConfig.username && password === adminConfig.password) {
            // Create a response
            const response = NextResponse.json(
                { message: 'Logged in successfully' },
                { status: 200 }
            );

            // Set HttpOnly cookie
            // In production, use a secure JWT or session ID
            response.cookies.set('auth_token', 'mock-secure-token-123', {
                httpOnly: true,
                secure: false, // For localhost development
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return response;
        }

        return NextResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
