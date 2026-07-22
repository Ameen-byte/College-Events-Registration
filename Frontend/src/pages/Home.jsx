import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import HeroCard from "../components/HeroCard.jsx";
import styles from "./Home.module.css";

const stats = [
  { title: "Events", value: "12" },
  { title: "Registrations", value: "480" },
  { title: "Colleges", value: "16" },
];

const eventsData = [
  {
    id: 1,
    title: "Tech Fest 2026",
    description: "Participate in coding, AI, robotics, and hackathon events.",
  },
  {
    id: 2,
    title: "Cultural Fest",
    description: "Enjoy dance, music, drama, and fine arts competitions.",
  },
  {
    id: 3,
    title: "Sports Meet",
    description: "Compete in cricket, football, volleyball, and athletics.",
  },
  {
    id: 4,
    title: "Science Exhibition",
    description: "Showcase innovative science projects and experiments.",
  },
  {
    id: 5,
    title: "Entrepreneurship Summit",
    description: "Learn startup ideas from successful entrepreneurs.",
  },
  {
    id: 6,
    title: "Photography Contest",
    description: "Capture creative moments and win exciting prizes.",
  },
  {
    id: 7,
    title: "Debate Competition",
    description: "Express your ideas and improve your public speaking skills.",
  },
  {
    id: 8,
    title: "Coding Challenge",
    description: "Solve programming problems and compete with peers.",
  },
];

export default function Home() {
  const [events] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const filtered = events.filter((event) => {
      return `${event.title} ${event.description}`
        .toLowerCase()
        .includes(term);
    });

    return filtered.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return a.id - b.id;
    });
  }, [events, searchTerm, sortBy]);

  return (
    <div className={styles.homePage}>
      <HeroCard
        title="Welcome to College Events Registration"
        description="Register for campus events, manage attendees, and track event details from one dashboard."
        highlighted
      />

      <div className={styles.grid}>
        {stats.map((stat) => (
          <Card
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <section className={styles.eventsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Upcoming Events</h3>
            <p>Browse and register for exciting college events.</p>
          </div>
        </div>

        <div className={styles.controls}>
          <input
            type="search"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="id">Sort by ID</option>
          </select>
        </div>

        {filteredEvents.length === 0 ? (
          <div className={styles.statusCard}>
            No events found.
          </div>
        ) : (
          <div className={styles.eventGrid}>
            {filteredEvents.map((event) => (
              <article key={event.id} className={styles.eventCard}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>

                <div className={styles.actions}>
                  <Link
                    to={`/details/${event.id}`}
                    className={styles.viewLink}
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}