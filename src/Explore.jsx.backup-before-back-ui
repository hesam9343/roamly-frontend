import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

const API = "http://localhost:3000";

const categories = [
  "Farming",
  "Hospitality",
  "Community",
  "Education",
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m16 16 4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7h16M7 12h10M10 17h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.5 4.5 0 0 1 12 6.4a4.5 4.5 0 0 1 8.8 2.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
    >
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
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
    >
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

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 9.5a11.2 11.2 0 0 1 15 0M7.5 12.5a6.8 6.8 0 0 1 9 0M10.3 15.4a2.7 2.7 0 0 1 3.4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18.2" r="1" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m7 9 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ImagePlaceholder({ type }) {
  return (
    <div className={`opportunity-art opportunity-art-${type}`}>
      <div className="art-glow" />
      <div className="art-orbit" />
      <div className="art-shape art-shape-one" />
      <div className="art-shape art-shape-two" />
      <div className="art-shape art-shape-three" />
      <span className="art-label">ROAMLY</span>
    </div>
  );
}

function getImageType(category) {
  const value = String(category || "").toLowerCase();

  if (value.includes("farm")) return "farm";
  if (value.includes("hospital")) return "house";
  if (value.includes("community")) return "garden";
  if (value.includes("education")) return "retreat";

  return "farm";
}

function formatDuration(minWeeks, maxWeeks) {
  if (minWeeks && maxWeeks) {
    return `${minWeeks}–${maxWeeks} weeks`;
  }

  if (minWeeks) {
    return `${minWeeks}+ weeks`;
  }

  if (maxWeeks) {
    return `Up to ${maxWeeks} weeks`;
  }

  return "Flexible duration";
}

function formatLocation(opportunity) {
  if (opportunity.city && opportunity.country) {
    return `${opportunity.city}, ${opportunity.country}`;
  }

  return opportunity.country || opportunity.city || "Location not specified";
}

function Explore() {
  const [opportunities, setOpportunities] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    total_pages: 0,
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [accommodation, setAccommodation] = useState(false);
  const [food, setFood] = useState(false);
  const [wifi, setWifi] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchTimer = useRef(null);

  const loadOpportunities = useCallback(
    async (page = 1, signal) => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        const trimmedSearch = search.trim();

        if (trimmedSearch) {
          params.set("search", trimmedSearch);
        }

        if (selectedCategory) {
          params.set("category", selectedCategory);
        }

        if (accommodation) {
          params.set("accommodation", "true");
        }

        if (food) {
          params.set("food", "true");
        }

        if (wifi) {
          params.set("wifi", "true");
        }

        params.set("page", String(page));
        params.set("limit", "20");

        const response = await fetch(
          `${API}/api/opportunities?${params.toString()}`,
          {
            credentials: "include",
            signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.details?.join(", ") ||
              data?.error ||
              "Failed to load opportunities."
          );
        }

        setOpportunities(
          Array.isArray(data.opportunities) ? data.opportunities : []
        );

        setPagination(
          data.pagination || {
            page,
            limit: 20,
            total: 0,
            total_pages: 0,
          }
        );
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        console.error("Explore opportunities error:", err);
        setError(err.message || "Failed to load opportunities.");
        setOpportunities([]);
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [search, selectedCategory, accommodation, food, wifi]
  );

  useEffect(() => {
    const controller = new AbortController();

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      loadOpportunities(1, controller.signal);
    }, 300);

    return () => {
      clearTimeout(searchTimer.current);
      controller.abort();
    };
  }, [
    search,
    selectedCategory,
    accommodation,
    food,
    wifi,
    loadOpportunities,
  ]);

  function handleCategoryChange(category) {
    setSelectedCategory((current) =>
      current === category ? "" : category
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedCategory("");
    setAccommodation(false);
    setFood(false);
    setWifi(false);
  }

  function handlePageChange(page) {
    if (
      page < 1 ||
      page > pagination.total_pages ||
      page === pagination.page
    ) {
      return;
    }

    const controller = new AbortController();
    loadOpportunities(page, controller.signal);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="explore-page">
      <header className="explore-header">
        <div className="explore-eyebrow">
          <span className="explore-eyebrow-dot" />
          DISCOVER OPPORTUNITIES
        </div>

        <h1>
          Find your next
          <br />
          <span>experience.</span>
        </h1>

        <p>
          Explore opportunities around the world and exchange your skills
          for accommodation, food, and unforgettable experiences.
        </p>
      </header>

      <section className="search-section">
        <div className="search-box">
          <SearchIcon />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search countries, cities or opportunities..."
            aria-label="Search opportunities"
          />
        </div>

        <button
          type="button"
          className="filter-button"
          onClick={() => {
            document
              .querySelector(".filters")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          }}
        >
          <FilterIcon />
          <span>Filters</span>
        </button>
      </section>

      <div className="explore-layout">
        <aside className="filters">
          <div className="filter-title">
            <strong>Filters</strong>

            <button type="button" onClick={clearFilters}>
              Clear
            </button>
          </div>

          <div className="filter-group">
            <span>Category</span>

            {categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <span>Benefits</span>

            <label>
              <input
                type="checkbox"
                checked={accommodation}
                onChange={(event) =>
                  setAccommodation(event.target.checked)
                }
              />
              <span>Accommodation</span>
            </label>

            <label>
              <input
                type="checkbox"
                checked={food}
                onChange={(event) => setFood(event.target.checked)}
              />
              <span>Food included</span>
            </label>

            <label>
              <input
                type="checkbox"
                checked={wifi}
                onChange={(event) => setWifi(event.target.checked)}
              />
              <span>Wi-Fi</span>
            </label>
          </div>

          <div className="filter-decoration">
            <div className="filter-decoration-ring" />
            <span>EXPLORE</span>
          </div>
        </aside>

        <main className="opportunity-area">
          <div className="results-header">
            <div>
              <span className="results-label">AVAILABLE NOW</span>
              <strong>
                {loading
                  ? "Loading..."
                  : `${pagination.total} opportunities`}
              </strong>
            </div>

            <button type="button" className="sort-button">
              <span>Sort by</span>
              <strong>Recommended</strong>
              <ChevronIcon />
            </button>
          </div>

          {loading && (
            <div className="explore-state explore-loading">
              <div className="explore-spinner" />
              <strong>Finding opportunities</strong>
              <span>Searching the latest available experiences.</span>
            </div>
          )}

          {!loading && error && (
            <div className="explore-state explore-error">
              <strong>Could not load opportunities</strong>
              <span>{error}</span>

              <button
                type="button"
                onClick={() => loadOpportunities(1)}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && opportunities.length === 0 && (
            <div className="explore-state explore-empty">
              <strong>No opportunities found</strong>
              <span>
                Try changing your search or removing one of the filters.
              </span>

              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {!loading && !error && opportunities.length > 0 && (
            <>
              <div className="opportunity-grid">
                {opportunities.map((opportunity) => (
                  <article
                    className="opportunity-card"
                    key={opportunity.id}
                  >
                    <div className="opportunity-image">
                      <ImagePlaceholder
                        type={getImageType(opportunity.category)}
                      />

                      <div className="image-overlay" />

                      <button
                        type="button"
                        className="favorite-button"
                        aria-label={`Save ${opportunity.title}`}
                      >
                        <HeartIcon />
                      </button>

                      <div className="image-category">
                        {opportunity.category}
                      </div>
                    </div>

                    <div className="opportunity-content">
                      <div className="opportunity-location">
                        <LocationIcon />
                        <span>{formatLocation(opportunity)}</span>
                      </div>

                      <h2>{opportunity.title}</h2>

                      <div className="opportunity-meta">
                        <span>
                          <ClockIcon />
                          {formatDuration(
                            opportunity.duration_min_weeks,
                            opportunity.duration_max_weeks
                          )}
                        </span>

                        {opportunity.accommodation && (
                          <span>
                            <StayIcon />
                            Stay
                          </span>
                        )}

                        {opportunity.food && (
                          <span>
                            <FoodIcon />
                            Food
                          </span>
                        )}

                        {opportunity.wifi && (
                          <span>
                            <WifiIcon />
                            Wi-Fi
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/opportunity/${opportunity.id}`}
                        className="view-button"
                      >
                        <span>View opportunity</span>
                        <span className="view-arrow">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {pagination.total_pages > 1 && (
                <div className="explore-pagination">
                  <button
                    type="button"
                    disabled={pagination.page <= 1}
                    onClick={() =>
                      handlePageChange(pagination.page - 1)
                    }
                  >
                    Previous
                  </button>

                  <div className="pagination-pages">
                    {Array.from(
                      {
                        length: pagination.total_pages,
                      },
                      (_, index) => index + 1
                    )
                      .filter((page) => {
                        if (pagination.total_pages <= 5) {
                          return true;
                        }

                        if (page === 1) return true;
                        if (page === pagination.total_pages) return true;

                        return Math.abs(page - pagination.page) <= 1;
                      })
                      .map((page, index, visiblePages) => {
                        const previousPage =
                          visiblePages[index - 1];

                        const showGap =
                          previousPage &&
                          page - previousPage > 1;

                        return (
                          <span key={page} className="pagination-item">
                            {showGap && (
                              <span className="pagination-gap">
                                ...
                              </span>
                            )}

                            <button
                              type="button"
                              className={
                                page === pagination.page
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                handlePageChange(page)
                              }
                            >
                              {page}
                            </button>
                          </span>
                        );
                      })}
                  </div>

                  <button
                    type="button"
                    disabled={
                      pagination.page >= pagination.total_pages
                    }
                    onClick={() =>
                      handlePageChange(pagination.page + 1)
                    }
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Explore;
