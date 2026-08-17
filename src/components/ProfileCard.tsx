import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  Check,
  Loader2,
  Mail,
  Moon,
  RefreshCw,
  Sun,
  UserPlus,
  UserRound,
} from "lucide-react";

export type DemoState = "normal" | "loading" | "empty" | "error" | "stress";

type Profile = {
  name: string;
  email: string;
  role: string;
  bio: string;
};

const NORMAL: Profile = {
  name: "Ada Okonkwo",
  email: "ada.okonkwo@northwind.io",
  role: "Product Engineer",
  bio: "Builds resilient interfaces, obsesses over empty states, and thinks a good error message is a feature.",
};

const STRESS: Profile = {
  name: "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff",
  email: "hubert.blaine.wolfeschlegelsteinhausenbergerdorff@internationalisation-department.example-organisation.co.uk",
  role: "Principal Distinguished Staff Platform Reliability Architect",
  bio: "https://example-organisation.co.uk/team/hubert-blaine-wolfeschlegelsteinhausenbergerdorff/profile?tab=settings&ref=verylongunbrokenquerystringvalue — Supercalifragilisticexpialidocious_pseudopseudohypoparathyroidism_antidisestablishmentarianism.",
};

const STATES: { id: DemoState; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "loading", label: "Loading Skeleton" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
  { id: "stress", label: "Stress Test (40+ chars)" },
];

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?"
  );
}

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return { dark, setDark };
}

export function ProfileCard() {
  const [state, setState] = useState<DemoState>("normal");
  const { dark, setDark } = useTheme();

  const profile = useMemo<Profile | null>(() => {
    if (state === "empty") return null;
    if (state === "stress") return STRESS;
    return NORMAL;
  }, [state]);

  const [form, setForm] = useState<Profile>(NORMAL);
  const [touched, setTouched] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    setForm(profile ?? { name: "", email: "", role: "", bio: "" });
    setSaved(false);
    setSaving(false);
    if (state === "error") {
      setTouched(true);
      setForm({ ...NORMAL, name: "", email: "not-an-email@@" });
      setBanner("We couldn't reach the server (503). Your changes are not saved yet.");
    } else {
      setTouched(false);
      setBanner(null);
    }
  }, [state, profile]);

  const errors = {
    name: form.name.trim() ? "" : "Display name is required.",
    email: !form.email.trim()
      ? "Email is required."
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ? ""
        : "Enter a valid email address, e.g. name@company.com.",
  };
  const hasErrors = Boolean(errors.name || errors.email);
  const loading = state === "loading";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Profile &amp; Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A resilient component across loading, empty, error and extreme-content states.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {dark ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </button>
      </header>

      <div
        role="group"
        aria-label="Preview component state"
        className="mb-8 flex flex-wrap gap-2 rounded-xl border border-border bg-card p-2"
      >
        {STATES.map((s) => {
          const active = s.id === state;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => setState(s.id)}
              className={`min-h-11 flex-1 truncate rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <section
        aria-busy={loading}
        aria-live="polite"
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        {loading ? (
          <LoadingState />
        ) : !profile ? (
          <EmptyState onCreate={() => setState("normal")} />
        ) : (
          <div className="p-6 sm:p-8">
            {banner && (
              <div
                role="alert"
                className="mb-6 flex flex-wrap items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4"
              >
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
                <p className="min-w-0 flex-1 break-words text-sm text-foreground">{banner}</p>
                <button
                  type="button"
                  onClick={() => setBanner(null)}
                  className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-destructive px-3 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  <RefreshCw className="size-4" aria-hidden="true" />
                  Retry
                </button>
              </div>
            )}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div
                aria-hidden="true"
                className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-semibold text-primary-foreground"
              >
                {initials(profile.name)}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-xl font-semibold text-foreground">{profile.name}</h2>
                <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate" title={profile.email}>
                    {profile.email}
                  </span>
                </p>
                <span className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  <BadgeCheck className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{profile.role}</span>
                </span>
                <p className="mt-3 break-words text-sm leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                  {profile.bio}
                </p>
              </div>
            </div>

            <hr className="my-8 border-border" />

            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setTouched(true);
                if (hasErrors) return;
                setSaving(true);
                window.setTimeout(() => {
                  setSaving(false);
                  setSaved(true);
                }, 700);
              }}
              className="grid gap-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Settings
              </h3>

              <Field
                id="display-name"
                label="Display name"
                value={form.name}
                error={touched ? errors.name : ""}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                id="email"
                type="email"
                label="Email"
                value={form.email}
                error={touched ? errors.email : ""}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Field
                id="bio"
                label="Bio"
                multiline
                value={form.bio}
                error=""
                onChange={(v) => setForm({ ...form, bio: v })}
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:opacity-60"
                >
                  {saving && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  {saving ? "Saving…" : "Save changes"}
                </button>
                {saved && (
                  <p role="status" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Check className="size-4" aria-hidden="true" />
                    Profile updated
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  error: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const base =
    "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";
  const border = error ? "border-destructive" : "border-input";
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${border} resize-y [overflow-wrap:anywhere]`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${border} truncate`}
        />
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="break-words text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="p-6 sm:p-8">
      <span className="sr-only">Loading profile…</span>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Skeleton className="size-20 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-5 w-2/5" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
      <hr className="my-8 border-border" />
      <div className="space-y-5">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ))}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
        <Skeleton className="h-11 w-36 rounded-lg" />
      </div>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full border border-dashed border-border bg-muted">
        <UserRound className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-foreground">No profile yet</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        This account has no profile information. Create one to add an avatar, role and bio.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <UserPlus className="size-4" aria-hidden="true" />
        Create Profile
      </button>
    </div>
  );
}