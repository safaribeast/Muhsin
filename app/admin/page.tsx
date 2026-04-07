"use client";

import { useState, useEffect, useRef } from "react";

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

interface Social {
  id: string;
  platform: string;
  url: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "socials">("projects");

  // Project form
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Social form
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [socialSaving, setSocialSaving] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    setAuthError(false);
    const res = await fetch("/api/projects");
    if (res.ok) {
      setAuthed(true);
      const data = await res.json();
      setProjects(data);
      const socialRes = await fetch("/api/socials");
      if (socialRes.ok) setSocials(await socialRes.json());
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  };

  const fetchSocials = async () => {
    const res = await fetch("/api/socials");
    if (res.ok) setSocials(await res.json());
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const resetForm = () => {
    setFormMode(null); setEditId(null); setTitle(""); setTag("");
    setDescription(""); setImageFile(null); setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = async () => {
    if (!title || !tag || !description) return;
    setSaving(true);
    let imagePath = imagePreview;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("password", password);
      const uploadRes = await fetch("/api/projects/upload", { method: "POST", body: formData });
      if (uploadRes.ok) { imagePath = (await uploadRes.json()).path; }
      else if (uploadRes.status === 401) { setAuthError(true); setAuthed(false); setSaving(false); return; }
    }

    if (formMode === "add") {
      const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, title, tag, description, image: imagePath }) });
      if (res.status === 401) { setAuthError(true); setAuthed(false); setSaving(false); return; }
    } else if (formMode === "edit" && editId) {
      const res = await fetch("/api/projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, id: editId, title, tag, description, ...(imagePath ? { image: imagePath } : {}) }) });
      if (res.status === 401) { setAuthError(true); setAuthed(false); setSaving(false); return; }
    }

    await fetchProjects();
    resetForm();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, id }) });
    if (res.status === 401) { setAuthError(true); setAuthed(false); return; }
    setDeleteConfirm(null);
    await fetchProjects();
  };

  const startEdit = (project: Project) => {
    setFormMode("edit"); setEditId(project.id); setTitle(project.title);
    setTag(project.tag); setDescription(project.description);
    setImagePreview(project.image); setImageFile(null);
  };

  // Social handlers
  const handleSocialUpdate = async (id: string, url: string) => {
    const updated = socials.map((s) => s.id === id ? { ...s, url } : s);
    setSocials(updated);
  };

  const saveSocials = async () => {
    setSocialSaving(true);
    const res = await fetch("/api/socials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, socials }) });
    if (res.status === 401) { setAuthError(true); setAuthed(false); }
    setSocialSaving(false);
  };

  const addSocial = () => {
    if (!newPlatform) return;
    setSocials([...socials, { id: Date.now().toString(), platform: newPlatform, url: newUrl }]);
    setNewPlatform(""); setNewUrl("");
  };

  const removeSocial = (id: string) => {
    setSocials(socials.filter((s) => s.id !== id));
  };

  const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--cream-muted)", marginBottom: "0.4rem" };
  const inputFieldStyle: React.CSSProperties = { width: "100%", padding: "0.8rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream)", fontFamily: "var(--font-body)", fontSize: "0.85rem", outline: "none" };

  // Login
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--black)", fontFamily: "var(--font-body)" }}>
        <div className="w-full" style={{ maxWidth: "380px" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1rem, 4vw, 1.4rem)", letterSpacing: "3px", marginBottom: "0.5rem" }}>
              YOUNG<span style={{ color: "var(--red)" }}>_</span>GRAPHIC<span style={{ color: "var(--red)" }}>123</span>
            </div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "4px", textTransform: "uppercase", color: "var(--cream-muted)" }}>Admin Dashboard</div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <label style={labelStyle}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" autoFocus
              style={{ ...inputFieldStyle, borderColor: authError ? "var(--red)" : undefined, marginBottom: "1rem" }}
              onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            {authError && <p style={{ color: "var(--red)", fontSize: "0.75rem", marginBottom: "1rem" }}>Wrong password. Try again.</p>}
            <button type="submit" style={{ width: "100%", padding: "0.9rem", background: "var(--red)", color: "var(--black)", border: "none", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer" }}>
              Access Dashboard
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <a href="/" style={{ fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--cream-muted)" }}>&#8592; Back to Portfolio</a>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen" style={{ background: "var(--black)", fontFamily: "var(--font-body)" }}>
      {/* Top bar */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 md:px-8 py-4 sticky top-0 z-50"
        style={{ borderBottom: "1px solid rgba(230,57,70,0.15)", background: "rgba(10,10,10,0.95)" }}>
        <div className="flex items-center gap-3">
          <div style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(0.9rem, 3vw, 1.2rem)", letterSpacing: "3px" }}>
            YOUNG<span style={{ color: "var(--red)" }}>_</span>GRAPHIC<span style={{ color: "var(--red)" }}>123</span>
          </div>
          <span style={{ fontSize: "0.55rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--cream-muted)", padding: "0.2rem 0.6rem", border: "1px solid rgba(230,57,70,0.2)" }}>Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--cream-muted)" }}>View Site &#8599;</a>
          <button onClick={() => { setAuthed(false); setPassword(""); }}
            style={{ padding: "0.4rem 1rem", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "var(--cream-muted)", fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </header>

      <div className="px-4 md:px-8 py-6 md:py-10 mx-auto" style={{ maxWidth: "1100px" }}>
        {/* Tabs */}
        <div className="flex gap-0 mb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {(["projects", "socials"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.8rem 1.5rem", background: "transparent", border: "none",
                borderBottom: activeTab === tab ? "2px solid var(--red)" : "2px solid transparent",
                color: activeTab === tab ? "var(--cream)" : "var(--cream-muted)",
                fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer",
                transition: "0.3s", fontFamily: "var(--font-body)",
              }}>
              {tab === "projects" ? "Projects" : "Social Links"}
            </button>
          ))}
        </div>

        {/* === PROJECTS TAB === */}
        {activeTab === "projects" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
              <div>
                <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                  Manage <em style={{ color: "var(--red)", fontStyle: "italic" }}>Projects</em>
                </h1>
                <p style={{ color: "var(--cream-muted)", fontSize: "0.8rem" }}>{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
              </div>
              <button onClick={() => { resetForm(); setFormMode("add"); }}
                style={{ padding: "0.7rem 1.5rem", background: "var(--red)", color: "var(--black)", border: "none", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
                + Add Project
              </button>
            </div>

            {/* Add/Edit Form */}
            {formMode && (
              <div style={{ marginBottom: "2rem", padding: "clamp(1rem, 3vw, 2rem)", background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1.1rem", letterSpacing: "2px" }}>
                    {formMode === "add" ? "ADD NEW PROJECT" : "EDIT PROJECT"}
                  </h3>
                  <button onClick={resetForm} style={{ background: "none", border: "none", color: "var(--cream-muted)", cursor: "pointer", fontSize: "1.2rem" }}>&#10005;</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <div>
                      <label style={labelStyle}>Project Title</label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. NEON NEXUS" style={inputFieldStyle}
                        onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Category Tag</label>
                      <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. Identity Design" style={inputFieldStyle}
                        onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Description</label>
                      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description..." rows={3}
                        style={{ ...inputFieldStyle, resize: "vertical", minHeight: "80px" }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Project Image</label>
                    <div onClick={() => fileRef.current?.click()} className="flex items-center justify-center cursor-pointer hover:border-red transition-colors"
                      style={{ width: "100%", aspectRatio: "16/10", border: "1px dashed rgba(255,255,255,0.1)", background: imagePreview ? "none" : "rgba(255,255,255,0.02)", overflow: "hidden", position: "relative" }}>
                      {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : (
                        <div style={{ textAlign: "center", color: "var(--cream-muted)" }}>
                          <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>+</div>
                          <div style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase" }}>Click to upload</div>
                        </div>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                  <button onClick={resetForm} style={{ padding: "0.6rem 1.2rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream-muted)", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>Cancel</button>
                  <button onClick={handleSave} disabled={saving || !title || !tag || !description || (formMode === "add" && !imageFile && !imagePreview)} className="disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ padding: "0.6rem 1.5rem", background: "var(--red)", color: "var(--black)", border: "none", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>
                    {saving ? "Saving..." : formMode === "add" ? "Add Project" : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* Projects list */}
            <div className="flex flex-col" style={{ gap: "2px" }}>
              {projects.map((project) => (
                <div key={project.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                  style={{ padding: "clamp(0.8rem, 2vw, 1.2rem)", background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div className="shrink-0 overflow-hidden" style={{ width: "clamp(80px, 15vw, 120px)", aspectRatio: "16/10", background: "#111" }}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", letterSpacing: "2px" }}>{project.title}</span>
                      <span style={{ fontSize: "0.5rem", letterSpacing: "3px", textTransform: "uppercase", color: "var(--red)", padding: "0.1rem 0.4rem", border: "1px solid rgba(230,57,70,0.2)" }}>{project.tag}</span>
                    </div>
                    <p className="truncate" style={{ color: "var(--cream-muted)", fontSize: "0.75rem", fontWeight: 300 }}>{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => startEdit(project)} className="hover:border-cream hover:text-cream transition-colors"
                      style={{ padding: "0.4rem 0.8rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream-muted)", fontSize: "0.55rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>Edit</button>
                    {deleteConfirm === project.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(project.id)} style={{ padding: "0.4rem 0.8rem", background: "var(--red)", color: "var(--black)", border: "none", fontSize: "0.55rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontWeight: 600 }}>Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} style={{ padding: "0.4rem 0.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream-muted)", fontSize: "0.55rem", cursor: "pointer" }}>&#10005;</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(project.id)} className="hover:border-red hover:text-red transition-colors"
                        style={{ padding: "0.4rem 0.8rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream-muted)", fontSize: "0.55rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && !loading && (
              <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--cream-muted)", border: "1px dashed rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>&#9670;</div>
                <p style={{ fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase" }}>No projects yet</p>
              </div>
            )}
          </>
        )}

        {/* === SOCIALS TAB === */}
        {activeTab === "socials" && (
          <>
            <div className="mb-6">
              <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                Social <em style={{ color: "var(--red)", fontStyle: "italic" }}>Links</em>
              </h1>
              <p style={{ color: "var(--cream-muted)", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                Manage your social media links shown on the portfolio
              </p>
            </div>

            {/* Existing socials */}
            <div className="flex flex-col gap-3 mb-6">
              {socials.map((social) => (
                <div key={social.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  style={{ padding: "clamp(0.8rem, 2vw, 1.2rem)", background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div className="shrink-0 flex items-center" style={{ minWidth: "120px" }}>
                    <span style={{ fontFamily: "var(--font-headline)", fontSize: "1rem", letterSpacing: "2px" }}>
                      {social.platform}
                    </span>
                  </div>
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => handleSocialUpdate(social.id, e.target.value)}
                    placeholder={`https://${social.platform.toLowerCase()}.com/...`}
                    className="flex-1"
                    style={inputFieldStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--red)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                  <button onClick={() => removeSocial(social.id)} className="hover:text-red hover:border-red transition-colors shrink-0"
                    style={{ padding: "0.6rem 0.8rem", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "var(--cream-muted)", fontSize: "0.9rem", cursor: "pointer" }}>
                    &#10005;
                  </button>
                </div>
              ))}
            </div>

            {/* Add new social */}
            <div style={{ padding: "clamp(1rem, 2vw, 1.5rem)", background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1rem", letterSpacing: "2px", marginBottom: "1rem" }}>
                ADD NEW LINK
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)} placeholder="Platform name (e.g. Twitter)"
                  style={{ ...inputFieldStyle, flex: "0 0 auto", width: undefined }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..."
                  className="flex-1" style={inputFieldStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--red)")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                <button onClick={addSocial} disabled={!newPlatform} className="disabled:opacity-40 shrink-0"
                  style={{ padding: "0.8rem 1.5rem", background: "transparent", border: "1px solid var(--red)", color: "var(--red)", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>
                  + Add
                </button>
              </div>
            </div>

            {/* Save all socials */}
            <button onClick={saveSocials} disabled={socialSaving} className="disabled:opacity-40"
              style={{ padding: "0.9rem 2.5rem", background: "var(--red)", color: "var(--black)", border: "none", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer" }}>
              {socialSaving ? "Saving..." : "Save Social Links"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
