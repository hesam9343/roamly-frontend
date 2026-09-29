import { Link, useParams } from "react-router-dom";
import "./OpportunityDetails.css";

const opportunities = [
  {
    id: 1,
    title: "Help at a small organic farm",
    location: "Portugal",
    category: "Farming",
    duration: "2–4 weeks",
    accommodation: true,
    food: true,
    imageType: "farm",
    description:
      "Join a small organic farm and help with everyday tasks while experiencing rural life in Portugal.",
    tasks: [
      "Help with planting and harvesting",
      "Maintain the garden",
      "Help with basic farm tasks",
      "Keep shared areas organized",
    ],
    host: "Maria & Family",
  },
  {
    id: 2,
    title: "Help with a family guesthouse",
    location: "France",
    category: "Hospitality",
    duration: "1–3 weeks",
    accommodation: true,
    food: true,
    imageType: "house",
    description:
      "Help a welcoming family run their countryside guesthouse and meet travelers from different parts of the world.",
    tasks: [
      "Help prepare rooms",
      "Welcome guests",
      "Assist with basic cleaning",
      "Help around the property",
    ],
    host: "Claire & Family",
  },
  {
    id: 3,
    title: "Help build a sustainable garden",
    location: "Spain",
    category: "Community",
    duration: "2–6 weeks",
    accommodation: true,
    food: false,
    imageType: "garden",
    description:
      "Take part in a community project focused on creating and maintaining a sustainable garden.",
    tasks: [
      "Plant and maintain vegetables",
      "Prepare garden areas",
      "Help with composting",
      "Support community activities",
    ],
    host: "Green Community",
  },
  {
    id: 4,
    title: "Support a countryside retreat",
    location: "Italy",
    category: "Hospitality",
    duration: "1–4 weeks",
    accommodation: true,
    food: true,
    imageType: "retreat",
    description:
      "Help at a peaceful countryside retreat and exchange your time and skills for a unique travel experience.",
    tasks: [
      "Help maintain common areas",
      "Assist guests",
      "Help with gardening",
      "Support daily retreat activities",
    ],
    host: "Luca & Team",
  },
];

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 7.8v4.6l3 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M4 18v-7.5M20 18v-7.5M4 14h16M6.5 14V9.5h4.8A2.7 2.7 0 0 1 14 12.2V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 18h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FoodIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M7 4v7M4.5 4v4.2A2.5 2.5 0 0 0 7 10.7a2.5 2.5 0 0 0 2.5-2.5V4M7 10.7V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 4v16M16 4c2.2 1.7 3.2 4 3.2 6.7H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
      <path
        d="m6.5 12.5 3.4 3.4 7.7-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M5 12h13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M7 4.5A1.5 1.5 0 0 1 8.5 3h7A1.5 1.5 0 0 1 17 4.5V21l-5-3.2L7 21V4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OpportunityArt({ type }) {
  return (
    <div className={`details-art details-art-${type}`}>
      <div className="details-art-glow" />
      <div className="details-art-ring details-art-ring-one" />
      <div className="details-art-ring details-art-ring-two" />

      <div className="details-art-core">
        <div className="details-art-core-inner" />
      </div>

      <div className="details-art-orbit details-art-orbit-one">
        <span />
      </div>

      <div className="details-art-orbit details-art-orbit-two">
        <span />
      </div>

      <div className="details-art-grid" />

      <span className="details-art-label">
        {type === "farm"
          ? "FIELD"
          : type === "house"
            ? "HOME"
            : type === "garden"
              ? "GROW"
              : "RETREAT"}
      </span>
    </div>
  );
}

function OpportunityDetails() {
  const { id } = useParams();

  const opportunity = opportunities.find(
    (item) => item.id === Number(id)
  );

  if (!opportunity) {
    return (
      <div className="details-page">
        <div className="not-found">
          <div className="not-found-number">404</div>

          <span className="details-eyebrow">ROAMLY / ERROR</span>

          <h1>Opportunity not found</h1>

          <p>
            This opportunity doesn't exist or may have been removed.
          </p>

          <Link to="/explore" className="back-button">
            <span>Back to Explore</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <nav className="details-navbar">
        <Link to="/" className="details-logo">
          Roamly
        </Link>

        <Link to="/explore" className="details-back">
          <span className="details-back-arrow">←</span>
          Explore
        </Link>
      </nav>

      <main className="details-container">
        <div className="breadcrumb">
          <Link to="/explore">Explore</Link>
          <span>/</span>
          <span>{opportunity.category}</span>
        </div>

        <section className="details-hero">
          <div className="details-image-wrap">
            <OpportunityArt type={opportunity.imageType} />

            <div className="details-image-badge">
              <span className="badge-dot" />
              AVAILABLE
            </div>

            <div className="details-image-index">
              0{opportunity.id}
            </div>
          </div>

          <div className="details-intro">
            <div className="details-category">
              {opportunity.category}
            </div>

            <h1>{opportunity.title}</h1>

            <div className="details-location">
              <LocationIcon />
              <span>{opportunity.location}</span>
            </div>

            <p className="details-description">
              {opportunity.description}
            </p>

            <div className="details-meta">
              <div className="details-meta-card">
                <div className="meta-icon">
                  <ClockIcon />
                </div>

                <div>
                  <strong>{opportunity.duration}</strong>
                  <small>Duration</small>
                </div>
              </div>

              <div className="details-meta-card">
                <div className="meta-icon">
                  <StayIcon />
                </div>

                <div>
                  <strong>
                    {opportunity.accommodation
                      ? "Included"
                      : "Not included"}
                  </strong>
                  <small>Accommodation</small>
                </div>
              </div>

              <div className="details-meta-card">
                <div className="meta-icon">
                  <FoodIcon />
                </div>

                <div>
                  <strong>
                    {opportunity.food
                      ? "Included"
                      : "Not included"}
                  </strong>
                  <small>Food</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="details-content">
          <div className="details-main">
            <section className="details-section">
              <div className="section-heading">
                <span>01</span>

                <div>
                  <small>THE EXPERIENCE</small>
                  <h2>What you'll do</h2>
                </div>
              </div>

              <div className="task-list">
                {opportunity.tasks.map((task, index) => (
                  <div className="task-item" key={task}>
                    <span className="task-number">
                      0{index + 1}
                    </span>

                    <span className="task-check">
                      <CheckIcon />
                    </span>

                    <p>{task}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="details-section host-section">
              <div className="section-heading">
                <span>02</span>

                <div>
                  <small>YOUR CONNECTION</small>
                  <h2>About the host</h2>
                </div>
              </div>

              <div className="host-card">
                <div className="host-avatar">
                  <span>
                    {opportunity.host.charAt(0)}
                  </span>

                  <div className="host-avatar-ring" />
                </div>

                <div className="host-info">
                  <strong>{opportunity.host}</strong>
                  <p>Host on Roamly</p>
                </div>

                <Link
                  to="/explore"
                  className="host-link"
                  aria-label="View host"
                >
                  <ArrowIcon />
                </Link>
              </div>
            </section>
          </div>

          <aside className="apply-card">
            <div className="apply-card-top">
              <span>READY FOR THE EXPERIENCE?</span>

              <div className="apply-status">
                <span />
                OPEN
              </div>
            </div>

            <h2>Interested in this opportunity?</h2>

            <p>
              Apply to connect with the host and start planning
              your experience.
            </p>

            <button type="button" className="apply-button">
              <span>Apply for this opportunity</span>
              <ArrowIcon />
            </button>

            <button type="button" className="save-button">
              <BookmarkIcon />
              <span>Save opportunity</span>
            </button>

            <div className="apply-card-footer">
              <span />
              <p>Your application starts a conversation with the host.</p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default OpportunityDetails;
