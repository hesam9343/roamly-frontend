import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import "./App.css";
import Explore from "./Explore";
import OpportunityDetails from "./OpportunityDetails";
import Auth from "./Auth";
import Profile from "./Profile";
import HostProfile from "./HostProfile";
import Chat from "./Chat";

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ConnectionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="16"
        cy="16"
        r="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m10.3 10.3 3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 8h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m13 5 3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 16H8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m11 13-3 3 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Globe3D() {
  return (
    <div className="globe-3d" aria-hidden="true">
      <div className="globe-shell">
        <div className="globe-highlight" />

        <svg
          className="globe-lines"
          viewBox="0 0 300 300"
          fill="none"
        >
          <circle
            cx="150"
            cy="150"
            r="122"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1"
          />

          <ellipse
            cx="150"
            cy="150"
            rx="122"
            ry="48"
            stroke="rgba(101,230,174,0.24)"
            strokeWidth="1"
          />

          <ellipse
            cx="150"
            cy="150"
            rx="122"
            ry="88"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />

          <ellipse
            cx="150"
            cy="150"
            rx="52"
            ry="122"
            stroke="rgba(101,230,174,0.22)"
            strokeWidth="1"
          />

          <ellipse
            cx="150"
            cy="150"
            rx="88"
            ry="122"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />

          <path
            d="M34 150h232"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          <path
            d="M54 103c61 27 131 27 192 0"
            stroke="rgba(101,230,174,0.16)"
            strokeWidth="1"
          />

          <path
            d="M54 197c61-27 131-27 192 0"
            stroke="rgba(101,230,174,0.13)"
            strokeWidth="1"
          />
        </svg>

        <div className="globe-node node-one" />
        <div className="globe-node node-two" />
        <div className="globe-node node-three" />
      </div>
    </div>
  );
}

function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <div className="app">

<nav className="navbar">
  <div className="navbar-top">
    <Link to="/" className="logo">
      Roamly
    </Link>

    <div className="nav-actions">
      {loading ? (
        <span className="nav-loading">Loading</span>
      ) : user ? (
        <>
          <Link to="/chat" className="nav-chat">
            Chat
          </Link>

          <Link to="/profile" className="nav-user">
  <span className="nav-user-dot" />
  <span>Profile</span>
</Link>

          <button
            type="button"
            className="login-button nav-logout"
            onClick={logout}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/auth" className="login-button">
            Log in
          </Link>

          <Link to="/auth" className="signup-button">
            Sign up
          </Link>
        </>
      )}
    </div>
  </div>

  <div className="nav-links">
    <Link to="/explore">Explore</Link>
    <a href="#how-it-works">How it works</a>
    <a href="#about">About</a>
  </div>
</nav>
      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              TRAVEL DIFFERENTLY
            </div>

            <h1>
              Travel.
              <br />
              Connect.
              <br />
              <span>Exchange.</span>
            </h1>

            <p>
              Discover meaningful travel opportunities, connect with people
              around the world, and exchange skills for unforgettable
              experiences.
            </p>

            <div className="hero-actions">
              <Link to="/explore" className="primary-button">
                Explore opportunities
                <span className="button-arrow">→</span>
              </Link>

              <Link to="/auth" className="secondary-button">
                Become a host
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-line" />

              <span>
                Built for travelers, hosts, and meaningful connections.
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="glow">
              <Globe3D />
            </div>

            <div className="visual-card card-one">
              <div className="card-icon">
                <GlobeIcon />
              </div>

              <div>
                <strong>Explore</strong>
                <span>New places</span>
              </div>
            </div>

            <div className="visual-card card-two">
              <div className="card-icon">
                <ConnectionIcon />
              </div>

              <div>
                <strong>Connect</strong>
                <span>Real people</span>
              </div>
            </div>

            <div className="visual-card card-three">
              <div className="card-icon">
                <ExchangeIcon />
              </div>

              <div>
                <strong>Exchange</strong>
                <span>Skills & experiences</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats" id="about">
          <div>
            <strong>100%</strong>
            <span>Community driven</span>
          </div>

          <div>
            <strong>Global</strong>
            <span>Connections across borders</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>Possibilities to discover</span>
          </div>
        </section>

        <section className="home-info" id="how-it-works">
          <div className="home-info-heading">
            <span>THE ROAMLY WAY</span>

            <h2>
              More than a trip.
              <br />
              <em>A real exchange.</em>
            </h2>
          </div>

          <div className="home-info-grid">
            <article>
              <span className="info-number">01</span>
              <h3>Discover</h3>
              <p>
                Find opportunities that match the places you want to explore
                and the skills you can bring.
              </p>
            </article>

            <article>
              <span className="info-number">02</span>
              <h3>Connect</h3>
              <p>
                Meet hosts and travelers, start conversations, and build
                genuine connections before you go.
              </p>
            </article>

            <article>
              <span className="info-number">03</span>
              <h3>Exchange</h3>
              <p>
                Share your skills, time, and experience in exchange for
                meaningful opportunities.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route
            path="/opportunity/:id"
            element={<OpportunityDetails />}
          />

          <Route path="/auth" element={<Auth />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/host/:id"
            element={<HostProfile />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
