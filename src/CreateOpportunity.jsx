import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateOpportunity.css";

const API = "http://localhost:3000";

const initialForm = {
  title: "",
  description: "",
  country: "",
  city: "",
  category: "",
  accommodation: false,
  food: false,
  wifi: false,
  people_needed: 1,
  duration_min_weeks: "",
  duration_max_weeks: "",
  start_date: "",
  end_date: "",
};

function CreateOpportunity() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API}/api/opportunities`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          country: form.country.trim(),
          city: form.city.trim() || null,
          category: form.category.trim(),
          accommodation: form.accommodation,
          food: form.food,
          wifi: form.wifi,
          people_needed: Number(form.people_needed),
          duration_min_weeks:
            form.duration_min_weeks === ""
              ? null
              : Number(form.duration_min_weeks),
          duration_max_weeks:
            form.duration_max_weeks === ""
              ? null
              : Number(form.duration_max_weeks),
          start_date: form.start_date || null,
          end_date: form.end_date || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const details = Array.isArray(data?.details)
          ? data.details.join(" ")
          : "";

        throw new Error(
          details || data?.error || "Failed to create opportunity."
        );
      }

      setSuccess("Opportunity created successfully.");
      setForm(initialForm);

      setTimeout(() => {
        if (data?.opportunity?.id) {
          navigate(`/opportunity/${data.opportunity.id}`);
        }
      }, 500);
    } catch (err) {
      console.error("Create opportunity error:", err);
      setError(err.message || "Failed to create opportunity.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="create-opportunity-page">
      <nav className="create-opportunity-nav">
        <Link to="/" className="create-opportunity-brand">
          Roamly
        </Link>

        <Link to="/explore" className="create-opportunity-back">
          Back to Explore
        </Link>
      </nav>

      <main className="create-opportunity-main">
        <header className="create-opportunity-header">
          <span>HOST AREA</span>

          <h1>Create an opportunity.</h1>

          <p>
            Share an experience, describe what you need help with,
            and connect with travelers.
          </p>
        </header>

        <form
          className="create-opportunity-form"
          onSubmit={handleSubmit}
        >
          <section className="create-form-section">
            <div className="create-form-heading">
              <span>01</span>

              <div>
                <h2>Basic information</h2>
                <p>Tell travelers what the experience is about.</p>
              </div>
            </div>

            <div className="create-form-grid">
              <label className="create-field create-field-full">
                <span>Title</span>

                <input
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  maxLength={200}
                  placeholder="Organic farm experience"
                  required
                />
              </label>

              <label className="create-field">
                <span>Country</span>

                <input
                  name="country"
                  value={form.country}
                  onChange={updateField}
                  maxLength={100}
                  placeholder="France"
                  required
                />
              </label>

              <label className="create-field">
                <span>City</span>

                <input
                  name="city"
                  value={form.city}
                  onChange={updateField}
                  maxLength={100}
                  placeholder="Lyon"
                />
              </label>

              <label className="create-field">
                <span>Category</span>

                <select
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Farming">Farming</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Community">Community</option>
                  <option value="Education">Education</option>
                </select>
              </label>

              <label className="create-field">
                <span>People needed</span>

                <input
                  name="people_needed"
                  type="number"
                  min="1"
                  max="100"
                  value={form.people_needed}
                  onChange={updateField}
                  required
                />
              </label>

              <label className="create-field create-field-full">
                <span>Description</span>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  maxLength={10000}
                  rows={7}
                  placeholder="Describe the experience, tasks, expectations, and what travelers can expect."
                  required
                />
              </label>
            </div>
          </section>

          <section className="create-form-section">
            <div className="create-form-heading">
              <span>02</span>

              <div>
                <h2>What you provide</h2>
                <p>Choose what is included for travelers.</p>
              </div>
            </div>

            <div className="create-checkbox-grid">
              <label className="create-check-card">
                <input
                  type="checkbox"
                  name="accommodation"
                  checked={form.accommodation}
                  onChange={updateField}
                />

                <span>
                  <strong>Accommodation</strong>
                  <small>Provide a place to stay</small>
                </span>
              </label>

              <label className="create-check-card">
                <input
                  type="checkbox"
                  name="food"
                  checked={form.food}
                  onChange={updateField}
                />

                <span>
                  <strong>Food</strong>
                  <small>Provide meals or food</small>
                </span>
              </label>

              <label className="create-check-card">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={form.wifi}
                  onChange={updateField}
                />

                <span>
                  <strong>Wi-Fi</strong>
                  <small>Internet access available</small>
                </span>
              </label>
            </div>
          </section>

          <section className="create-form-section">
            <div className="create-form-heading">
              <span>03</span>

              <div>
                <h2>Duration & dates</h2>
                <p>Give travelers an idea of the timing.</p>
              </div>
            </div>

            <div className="create-form-grid">
              <label className="create-field">
                <span>Minimum weeks</span>

                <input
                  name="duration_min_weeks"
                  type="number"
                  min="1"
                  max="104"
                  value={form.duration_min_weeks}
                  onChange={updateField}
                  placeholder="2"
                />
              </label>

              <label className="create-field">
                <span>Maximum weeks</span>

                <input
                  name="duration_max_weeks"
                  type="number"
                  min="1"
                  max="104"
                  value={form.duration_max_weeks}
                  onChange={updateField}
                  placeholder="8"
                />
              </label>

              <label className="create-field">
                <span>Start date</span>

                <input
                  name="start_date"
                  type="date"
                  value={form.start_date}
                  onChange={updateField}
                />
              </label>

              <label className="create-field">
                <span>End date</span>

                <input
                  name="end_date"
                  type="date"
                  value={form.end_date}
                  onChange={updateField}
                />
              </label>
            </div>
          </section>

          {error && (
            <div className="create-form-message create-form-error">
              {error}
            </div>
          )}

          {success && (
            <div className="create-form-message create-form-success">
              {success}
            </div>
          )}

          <div className="create-form-actions">
            <Link to="/explore" className="create-cancel-button">
              Cancel
            </Link>

            <button
              type="submit"
              className="create-submit-button"
              disabled={saving}
            >
              {saving ? "Creating..." : "Create opportunity"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateOpportunity;
