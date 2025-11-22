import { PrismaClient } from "generated/prisma/client";
import { singleton } from "./singleton";

export const prisma = singleton("prisma", () => new PrismaClient());
