import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "young123";

function readProjects() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeProjects(projects: unknown[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2));
}

// GET - public, no auth needed
export async function GET() {
  const projects = readProjects();
  return NextResponse.json(projects);
}

// POST - add a new project (requires password)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, ...projectData } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = readProjects();
  const newProject = {
    id: Date.now().toString(),
    ...projectData,
  };
  projects.push(newProject);
  writeProjects(projects);

  return NextResponse.json(newProject, { status: 201 });
}

// DELETE - remove a project (requires password in body)
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { password, id } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let projects = readProjects();
  projects = projects.filter((p: { id: string }) => p.id !== id);
  writeProjects(projects);

  return NextResponse.json({ success: true });
}

// PUT - update a project (requires password)
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { password, id, ...updates } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = readProjects();
  const index = projects.findIndex((p: { id: string }) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  projects[index] = { ...projects[index], ...updates };
  writeProjects(projects);

  return NextResponse.json(projects[index]);
}
