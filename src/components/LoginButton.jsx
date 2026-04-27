import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function LoginButton({ compact = false }) {
  const { user, loading, firebaseReady, signInWithGoogle, signOutUser } = useAuth();
  const [busy, setBusy] = useState(false);

  const handleSignIn = async () => {
    try {
      setBusy(true);
      await signInWithGoogle();
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setBusy(true);
      await signOutUser();
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <span className="c-auth-chip">SYNCING</span>;
  }

  if (user) {
    return (
      <button className="c-user-chip" type="button" onClick={handleSignOut} disabled={busy}>
        {user.photoURL ? <img src={user.photoURL} alt="" /> : <span>{user.email?.slice(0, 1)}</span>}
        {!compact && <strong>{user.email}</strong>}
        <em>SIGN OUT</em>
      </button>
    );
  }

  return (
    <button
      className="c-auth-button"
      type="button"
      onClick={handleSignIn}
      disabled={!firebaseReady || busy}
      title={!firebaseReady ? "Add Firebase keys in .env first" : "Continue with Google"}
    >
      {firebaseReady ? "SIGN IN" : "LOGIN SETUP"}
    </button>
  );
}
