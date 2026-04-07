import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "socials.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "young123";

function readSocials() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeSocials(socials: unknown[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(socials, null, 2));
}

export async function GET() {
  return NextResponse.json(readSocials());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { password, socials } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  writeSocials(socials);
  return NextResponse.json(socials);
}
