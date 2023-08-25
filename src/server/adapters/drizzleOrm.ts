import type { Adapter } from "@auth/core/adapters";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm/expressions";
import type { PlanetScaleDatabase } from "drizzle-orm/planetscale-serverless";
import { accounts, sessions, users, verificationTokens } from "../../db/schema";

export function createDrizzleAdapter(db: PlanetScaleDatabase): Adapter {
  return {
    async createSession(data) {
      await db.insert(sessions).values({
        expires: data.expires,
        id: createId(),
        sessionToken: data.sessionToken,
        userId: data.userId,
      });
      const rows = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) {
        throw new Error("User not found");
      }
      return row;
    },
    async createUser(userData) {
      await db.insert(users).values({
        email: userData.email,
        emailVerified: userData.emailVerified,
        id: createId(),
        image: userData.image,
        name: userData.name,
      });
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.email, userData.email))
        .limit(1);
      const row = rows[0];
      if (!row) {
        throw new Error("User not found");
      }
      return row;
    },
    async createVerificationToken(verificationToken) {
      await db.insert(verificationTokens).values({
        expires: verificationToken.expires,
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      });
      const rows = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, verificationToken.token))
        .limit(1);
      const row = rows[0];
      if (!row) {
        throw new Error("Coding bug: inserted verification token not found");
      }
      return row;
    },
    async deleteSession(sessionToken) {
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
    },
    async deleteUser(userId) {
      await db.delete(users).where(eq(users.id, userId));
    },
    async getSessionAndUser(sessionToken) {
      const rows = await db
        .select({
          session: {
            expires: sessions.expires,
            id: sessions.id,
            sessionToken: sessions.sessionToken,
            userId: sessions.userId,
          },
          user: users,
        })
        .from(sessions)
        .innerJoin(users, eq(users.id, sessions.userId))
        .where(eq(sessions.sessionToken, sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) {
        return null;
      }
      const { user, session } = row;
      return {
        session: {
          expires: session.expires,
          id: session.id,
          sessionToken: session.sessionToken,
          userId: session.userId,
        },
        user,
      };
    },
    async getUser(id) {
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const rows = await db
        .select()
        .from(users)
        .innerJoin(accounts, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider),
          ),
        )
        .limit(1);
      const row = rows[0];
      return row?.users ?? null;
    },
    async getUserByEmail(email) {
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async linkAccount(account) {
      await db.insert(accounts).values({
        // OpenIDTokenEndpointResponse properties
        access_token: account.access_token,
        expires_in: account.expires_in,
        id: createId(),
        id_token: account.id_token,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        refresh_token: account.refresh_token,
        refresh_token_expires_in: account.refresh_token_expires_in as number, // TODO: why doesn't the account type have this property?
        scope: account.scope,
        token_type: account.token_type,
        type: account.type,
        userId: account.userId,
      });
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider),
          ),
        );
    },
    async updateSession(session) {
      await db
        .update(sessions)
        .set(session)
        .where(eq(sessions.sessionToken, session.sessionToken));
      const rows = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, session.sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) {
        throw new Error("Coding bug: updated session not found");
      }
      return row;
    },
    async updateUser({ id, ...userData }) {
      if (!id) {
        throw new Error("User not found");
      }
      await db.update(users).set(userData).where(eq(users.id, id));
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      const row = rows[0];
      if (!row) {
        throw new Error("User not found");
      }
      return row;
    },
    async useVerificationToken({ identifier, token }) {
      // First get the token while it still exists. TODO: need to add identifier to where clause?
      const rows = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token))
        .limit(1);
      const row = rows[0];
      if (!row) {
        return null;
      }
      // Then delete it.
      await db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.token, token),
            eq(verificationTokens.identifier, identifier),
          ),
        );
      // Then return it.
      return row;
    },
  };
}
