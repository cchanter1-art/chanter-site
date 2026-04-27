import LoginButton from "./LoginButton";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading, firebaseReady } = useAuth();

  if (loading) {
    return (
      <section className="c-auth-gate" aria-label="Loading access">
        <p className="c-kicker">ACCESS CHECK</p>
        <h2>Opening folder.</h2>
        <p className="c-muted">Syncing identity layer.</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="c-auth-gate" aria-label="Sign in required">
        <p className="c-kicker">PRIVATE FOLDER</p>
        <h2>Enter the archive.</h2>
        <p className="c-muted">
          Sign in once to access the creature folders and future creator tools.
        </p>
        <LoginButton />
        {!firebaseReady && (
          <p className="c-auth-note">
            Firebase environment variables are not set yet. Add them in Vercel and your local .env file.
          </p>
        )}
      </section>
    );
  }

  return children;
}
