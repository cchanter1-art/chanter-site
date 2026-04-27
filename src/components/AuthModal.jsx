import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function AuthModal({ open, onClose, onSuccess }) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError("Sign in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdrop = (event) => {
    if (event.target.classList.contains("c-auth-modal")) {
      onClose?.();
    }
  };

  return (
    <div className="c-auth-modal" onClick={handleBackdrop} role="presentation">
      <div className="c-auth-modal-window" role="dialog" aria-modal="true" aria-label="Archive sign in">
        <button className="c-auth-modal-close" onClick={onClose} type="button" aria-label="Close">
          ×
        </button>

        <p className="c-auth-modal-kicker">PRIVATE ACCESS</p>
        <h3>Enter Archive</h3>
        <p className="c-auth-modal-copy">
          Sign in to unlock the creature archive and private visual folders.
        </p>

        <button
          type="button"
          className="c-auth-modal-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? "SIGNING IN..." : "CONTINUE WITH GOOGLE"}
        </button>

        {error ? <p className="c-auth-modal-error">{error}</p> : null}
      </div>
    </div>
  );
}
