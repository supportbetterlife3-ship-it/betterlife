import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

/**
 * Derive secure cookies from your configured public URL so PKCE / session cookies stay
 * consistent between the sign-in request and the OAuth callback.
 *
 * If this is wrong for your environment (e.g. `https` in env but you browse `http://localhost`),
 * the PKCE cookie may not persist or decrypt → InvalidCheck pkceCodeVerifier.
 */
function useSecureCookiesFromEnv(): boolean | undefined {
  const raw = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (!raw?.trim()) return undefined;
  try {
    return new URL(raw).protocol === 'https:';
  } catch {
    return undefined;
  }
}

function allowedAdminEmails(): string[] {
  const raw = process.env.ALLOWED_ADMIN_EMAILS ?? '';
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;
      const allowed = allowedAdminEmails();
      if (allowed.length === 0) {
        console.warn('ALLOWED_ADMIN_EMAILS is empty — no one can sign in.');
        return false;
      }
      return allowed.includes(email);
    },
  },
  pages: {
    signIn: '/admin',
  },
  trustHost: true,
  useSecureCookies: useSecureCookiesFromEnv(),
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});
