import React, { useState } from "react";
import { UserRound, UsersRound, ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Logo } from "@/components/kit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ROLES = [
  ["agent", "Agent", UserRound],
  ["management", "Management", UsersRound],
  ["admin", "Admin", ShieldCheck],
];

function Password({ placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-wrap">
      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ paddingRight: 40 }}
      />
      <button
        type="button"
        className="eye"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}

export function Login({ onLogin, initialRole = "management" }) {
  const [role, setRole] = useState(initialRole);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState("");

  if (mode === "email") return <InviteEmail onOpen={() => setMode("create")} />;

  const submit = (e) => {
    e.preventDefault();
    if (mode === "create") {
      if (pw.length < 8) return setErr("Use at least 8 characters.");
      if (pw !== pw2) return setErr("Passwords do not match.");
    }
    setErr("");
    onLogin(role);
  };

  return (
    <div className="auth">
      <div className="auth-left">
        <div className="logo">
          <Logo size={1.15} />
        </div>
        {mode === "login" && (
          <Tabs value={role} onValueChange={setRole} className="role-switch" aria-label="Workspace">
            <TabsList className="h-10 w-full">
              {ROLES.map(([k, l, I]) => (
                <TabsTrigger key={k} value={k}>
                  <I />
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        {mode === "login" && (
          <>
            <h1>Welcome back!</h1>
            <p className="lede">Sign in to manage your sales, inventory, and business operations.</p>
            <form onSubmit={submit}>
              <label className="field">
                <span>Email address</span>
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="field">
                <span className="between">
                  <span>Password</span>
                  <button type="button" className="link" onClick={() => setMode("forgot")}>
                    Forgot your password?
                  </button>
                </span>
                <Password
                  placeholder="Enter your password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </label>
              <Button className="w-full">Login</Button>
              <p className="xs muted" style={{ textAlign: "center", marginTop: -6 }}>
                Prototype: any email and password will sign you in as{" "}
                {ROLES.find((r) => r[0] === role)?.[1]}.
              </p>
            </form>
          </>
        )}
        {mode === "forgot" && (
          <>
            <button className="link" style={{ marginBottom: 16 }} onClick={() => setMode("login")}>
              <ArrowLeft size={14} />
              Back to login
            </button>
            <h1>Reset your password</h1>
            <p className="lede">
              Enter your work email. Your administrator-issued reset link will arrive in a few
              minutes.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMode("email");
              }}
            >
              <label className="field">
                <span>Email address</span>
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <Button className="w-full">Send reset link</Button>
            </form>
          </>
        )}
        {mode === "create" && (
          <>
            <h1>Create Your Password</h1>
            <p className="lede">
              Set a password to activate your Durrani Estates account and access the platform.
            </p>
            <form onSubmit={submit}>
              <label className="field">
                <span>New password</span>
                <Password
                  placeholder="Enter new password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </label>
              <label className="field">
                <span>Confirm new password</span>
                <Password
                  placeholder="Re-enter new password"
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                />
              </label>
              {err && <span className="err">{err}</span>}
              <Button className="w-full">Set Password & Continue</Button>
            </form>
          </>
        )}
        <div className="support">
          Need help? <button onClick={() => setMode("email")}>Contact support</button>
        </div>
      </div>
      <div
        className="auth-hero"
        style={{ backgroundImage: `url(${hero})` }}
        role="img"
        aria-label="Find an address that feels like yours."
      />
    </div>
  );
}

function InviteEmail({ onOpen }) {
  return (
    <div
      className="email-wrap"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25)),url(${hero})`,
      }}
    >
      <div className="email">
        <div className="eh">
          <h1>Durrani Estates</h1>
          <h2>
            You've Been Invited to Join
            <br />
            Durrani Estates
          </h2>
        </div>
        <div className="eb">
          <p>Hello Archit,</p>
          <p>You've been invited to access the Durrani Estates platform.</p>
          <p>To activate your account, please set your password by clicking the button below.</p>
          <div style={{ textAlign: "center", margin: "22px 0" }}>
            <Button onClick={onOpen}>Create Your Password</Button>
          </div>
          <div className="divider" />
          <p>
            This link will take you to a secure page where you can create your password and get
            started with Durrani Estates.
          </p>
          <p>🔒 For security reasons, this invitation link will expire in 24 hours.</p>
          <p>
            If you did not expect this email, you can safely ignore it or contact our support team
            at
          </p>
          <p>
            <a href="mailto:support@durraniestates.com" style={{ color: "var(--blue)" }}>
              support@durraniestates.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
