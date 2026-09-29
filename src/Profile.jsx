import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Profile.css";

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path
        d="M19 10.2c0 4.7-7 10-7 10s-7-5.3-7-10a7 7 0 1 1 14 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="10"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
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

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.5 19c.7-3.2 2.9-5 6.5-5s5.8 1.8 6.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path
        d="m14.5 5.5 4 4M5 19l3.8-.8L18.8 8.2a2.1 2.1 0 0 0-3-3L5.8 15.2 5 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path
        d="M5 12h13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="m12 3.8 2.55 5.16 5.7.83-4.12 4.02.97 5.68L12 16.8l-5.1 2.69.97-5.68-4.12-4.02 5.7-.83L12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Profile() {
  const { user, loading, loadUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [stats, setStats] = useState({
    trips: 0,
    applications: 0,
    favorites: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [form, setForm] = useState({
    display_name: "",
    country: "",
    city: "",
    bio: "",
    languages: "",
    skills: "",
    birth_year: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (!user) {
      setStatsLoading(false);
      return;
    }

    async function loadStats() {
      try {
        const requests = [
          fetch("http://localhost:3000/api/my/trips", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/api/my/applications", {
            credentials: "include",
          }),
          fetch("http://localhost:3000/api/my/favorites", {
            credentials: "include",
          }),
        ];

        const [tripsResponse, applicationsResponse, favoritesResponse] =
          await Promise.all(requests);

        const [tripsData, applicationsData, favoritesData] =
          await Promise.all([
            tripsResponse.json(),
            applicationsResponse.json(),
            favoritesResponse.json(),
          ]);

        setStats({
          trips: Array.isArray(tripsData.trips)
            ? tripsData.trips.length
            : 0,
          applications: Array.isArray(applicationsData.applications)
            ? applicationsData.applications.length
            : 0,
          favorites: Array.isArray(favoritesData.favorites)
            ? favoritesData.favorites.length
            : 0,
        });
      } catch (err) {
        console.error("PROFILE STATS ERROR:", err);
      } finally {
        setStatsLoading(false);
      }
    }

    loadStats();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setReviewsLoading(false);
      return;
    }

    async function loadReviews() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${user.id}/reviews`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load reviews."
          );
        }

        setRating(Number(data.average_rating) || 0);
        setReviewCount(Number(data.review_count) || 0);

        setReviews(
          Array.isArray(data.reviews) ? data.reviews : []
        );
      } catch (err) {
        console.error("PROFILE REVIEWS ERROR:", err);
      } finally {
        setReviewsLoading(false);
      }
    }

    loadReviews();
  }, [user]);

  function startEditing() {
    setForm({
      display_name: user?.display_name || "",
      country: user?.country || "",
      city: user?.city || "",
      bio: user?.bio || "",
      languages: Array.isArray(user?.languages)
        ? user.languages.join(", ")
        : user?.languages || "",
      skills: Array.isArray(user?.skills)
        ? user.skills.join(", ")
        : user?.skills || "",
      birth_year: user?.birth_year || "",
      avatar_url: user?.avatar_url || "",
    });

    setError("");
    setSuccess("");
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setError("");
    setSuccess("");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            display_name: form.display_name,
            country: form.country || null,
            city: form.city || null,
            bio: form.bio || null,
            languages: form.languages || null,
            skills: form.skills || null,
            birth_year: form.birth_year
              ? Number(form.birth_year)
              : null,
            avatar_url: form.avatar_url || null,
          }),
        }
      );

      const data = await response.json();

      console.log("PROFILE SAVE RESPONSE:", response.status);
      console.log("PROFILE SAVE DATA:", data);

      if (!response.ok) {
        const details = Array.isArray(data.details)
          ? data.details.join(", ")
          : "";

        throw new Error(
          details || data.error || "Failed to update profile."
        );
      }

      await loadUser();

      setSuccess("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  function renderStars(value) {
    const count = Math.max(0, Math.min(5, Number(value) || 0));

    return (
      <div className="review-stars" aria-label={`${count} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} filled={star <= count} />
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-loading-orbit" />
          <span>Loading profile</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <header className="profile-navbar">
          <Link to="/" className="profile-logo">
            Roamly
          </Link>
        </header>

        <main className="profile-container">
          <section className="profile-card profile-empty">
            <div className="profile-empty-visual">
              <div className="profile-empty-orbit" />
              <div className="profile-empty-core">
                <UserIcon />
              </div>
            </div>

            <span className="profile-eyebrow">ROAMLY</span>

            <h1>You're not logged in.</h1>

            <p>
              Log in to view your profile and manage your Roamly
              account.
            </p>

            <Link to="/auth" className="profile-button">
              <span>Log in</span>
              <ArrowIcon />
            </Link>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-navbar">
        <Link to="/" className="profile-logo">
          Roamly
        </Link>

        <Link to="/explore" className="profile-back">
          <span>Explore</span>
          <ArrowIcon />
        </Link>
      </header>

      <main className="profile-container">
        <section className="profile-card">
          <div className="profile-cover">
            <div className="profile-cover-grid" />
            <div className="profile-cover-orbit profile-cover-orbit-one" />
            <div className="profile-cover-orbit profile-cover-orbit-two" />
          </div>

          <div className="profile-card-inner">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.display_name || "Profile"}
                  />
                ) : (
                  user.display_name?.charAt(0)?.toUpperCase() || "R"
                )}
              </div>
            </div>

            <div className="profile-main">
              <div className="profile-topline">
                <div>
                  <span className="profile-eyebrow">
                    {user.role === "host" ? "HOST" : "TRAVELER"}
                  </span>

                  {!editing && (
                    <h1>{user.display_name || "Roamly User"}</h1>
                  )}
                </div>

                {!editing && (
                  <button
                    type="button"
                    className="profile-edit-button profile-edit-top"
                    onClick={startEditing}
                  >
                    <EditIcon />
                    <span>Edit profile</span>
                  </button>
                )}
              </div>

              {!editing ? (
                <>
                  <p className="profile-email">
                    {user.email}
                  </p>

                  {success && (
                    <div className="profile-success">
                      {success}
                    </div>
                  )}

                  <div className="profile-info">
                    <div className="profile-info-item">
                      <span>
                        <GlobeIcon />
                        Country
                      </span>
                      <strong>
                        {user.country || "Not added"}
                      </strong>
                    </div>

                    <div className="profile-info-item">
                      <span>
                        <MapPinIcon />
                        City
                      </span>
                      <strong>
                        {user.city || "Not added"}
                      </strong>
                    </div>

                    <div className="profile-info-item">
                      <span>
                        <UserIcon />
                        Account
                      </span>
                      <strong>
                        {user.role === "host"
                          ? "Host"
                          : "Traveler"}
                      </strong>
                    </div>
                  </div>

                  <div className="profile-stats">
                    <div className="profile-stat">
                      <strong>
                        {statsLoading ? "—" : stats.trips}
                      </strong>
                      <span>Trips</span>
                    </div>

                    <div className="profile-stat">
                      <strong>
                        {statsLoading
                          ? "—"
                          : stats.applications}
                      </strong>
                      <span>Applications</span>
                    </div>

                    <div className="profile-stat">
                      <strong>
                        {statsLoading ? "—" : stats.favorites}
                      </strong>
                      <span>Favorites</span>
                    </div>
                  </div>

                  <div className="profile-rating">
                    <div className="profile-rating-main">
                      <strong>
                        {reviewsLoading
                          ? "—"
                          : rating.toFixed(1)}
                      </strong>

                      <div>
                        {renderStars(
                          reviewsLoading ? 0 : rating
                        )}
                        <span>Average rating</span>
                      </div>
                    </div>

                    <div className="profile-rating-count">
                      <strong>
                        {reviewsLoading ? "—" : reviewCount}
                      </strong>

                      <span>Reviews</span>
                    </div>
                  </div>

                  {!reviewsLoading && reviews.length > 0 && (
                    <div className="profile-reviews">
                      <div className="profile-reviews-header">
                        <span>Community reviews</span>
                        <span>{reviewCount} total</span>
                      </div>

                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="profile-review"
                        >
                          <div className="profile-review-top">
                            <strong>
                              {review.reviewer_name ||
                                "Roamly User"}
                            </strong>

                            {renderStars(review.rating)}
                          </div>

                          <p>
                            {review.comment ||
                              "No comment provided."}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {!reviewsLoading && reviews.length === 0 && (
                    <div className="profile-reviews-empty">
                      No reviews yet.
                    </div>
                  )}

                  <div className="profile-details-grid">
                    <div className="profile-bio">
                      <span>About</span>

                      <p>
                        {user.bio ||
                          "Tell the Roamly community a little about yourself."}
                      </p>
                    </div>

                    <div className="profile-bio">
                      <span>Languages</span>

                      <p>
                        {Array.isArray(user.languages)
                          ? user.languages.join(", ")
                          : user.languages || "Not added"}
                      </p>
                    </div>

                    <div className="profile-bio profile-bio-full">
                      <span>Skills</span>

                      <p>
                        {Array.isArray(user.skills)
                          ? user.skills.join(", ")
                          : user.skills || "Not added"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <form
                  className="profile-edit-form"
                  onSubmit={handleSave}
                >
                  <h1>Edit profile</h1>

                  <div className="profile-form-group">
                    <label htmlFor="display_name">
                      Display name
                    </label>

                    <input
                      id="display_name"
                      name="display_name"
                      type="text"
                      value={form.display_name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="profile-form-row">
                    <div className="profile-form-group">
                      <label htmlFor="country">
                        Country
                      </label>

                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={form.country}
                        onChange={handleChange}
                        maxLength={100}
                      />
                    </div>

                    <div className="profile-form-group">
                      <label htmlFor="city">
                        City
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="bio">
                      About
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      maxLength={5000}
                      rows={5}
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="languages">
                      Languages
                    </label>

                    <input
                      id="languages"
                      name="languages"
                      type="text"
                      value={form.languages}
                      onChange={handleChange}
                      maxLength={1000}
                      placeholder="English, Persian, French"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="skills">
                      Skills
                    </label>

                    <input
                      id="skills"
                      name="skills"
                      type="text"
                      value={form.skills}
                      onChange={handleChange}
                      maxLength={2000}
                      placeholder="Programming, Photography, Farming"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="birth_year">
                      Birth year
                    </label>

                    <input
                      id="birth_year"
                      name="birth_year"
                      type="number"
                      value={form.birth_year}
                      onChange={handleChange}
                      min="1900"
                      max="2026"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="avatar_url">
                      Avatar URL
                    </label>

                    <input
                      id="avatar_url"
                      name="avatar_url"
                      type="url"
                      value={form.avatar_url}
                      onChange={handleChange}
                      maxLength={1000}
                      placeholder="https://..."
                    />
                  </div>

                  {error && (
                    <div className="profile-error">
                      {error}
                    </div>
                  )}

                  <div className="profile-form-actions">
                    <button
                      type="submit"
                      className="profile-edit-button"
                      disabled={saving}
                    >
                      {saving
                        ? "Saving..."
                        : "Save changes"}
                    </button>

                    <button
                      type="button"
                      className="profile-cancel-button"
                      onClick={cancelEditing}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
