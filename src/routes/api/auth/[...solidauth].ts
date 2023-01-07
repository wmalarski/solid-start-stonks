import { SolidAuth } from "@auth/solid-start";
import { authOptions } from "~/server/auth";

export const { GET, POST } = SolidAuth(authOptions);
