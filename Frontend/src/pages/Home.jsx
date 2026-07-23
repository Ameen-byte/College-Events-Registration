// import { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import Card from "../components/Card.jsx";
// import HeroCard from "../components/HeroCard.jsx";
// import styles from "./Home.module.css";
// import culturalFest from "../assets/events/culturefest.jpg.png";
// import sportsMeet from "../assets/events/sports.jpg";
// import scienceExpo from "../assets/events/science.jpg.png";
// import startup from "../assets/events/startup.jpg";
// import coding from "../assets/events/codingchallenge.jpg";

// const stats = [
//   { title: "Events", value: "12" },
//   { title: "Registrations", value: "480" },
//   { title: "Colleges", value: "16" },
// ];
// const eventsData = [
//   {
//     id: 1,
//     title: "Tech Fest 2026",
//     description: "Participate in coding, AI, robotics, and hackathon events.",
//     image: techFest,
//   },
//   {
//     id: 2,
//     title: "Cultural Fest",
//     description: "Enjoy dance, music, drama, and fine arts competitions.",
//     image: culturalFest,
//   },
//   {
//     id: 3,
//     title: "Sports Meet",
//     description: "Compete in cricket, football, volleyball, and athletics.",
//     image: sportsMeet,
//   },
//   {
//     id: 4,
//     title: "Science Exhibition",
//     description: "Showcase innovative science projects and experiments.",
//     image: scienceExpo,
//   },
//   {
//     id: 5,
//     title: "Entrepreneurship Summit",
//     description: "Learn startup ideas from successful entrepreneurs.",
//     image: startup,
//   },
//   {
//     id: 6,
//     title: "Photography Contest",
//     description: "Capture creative moments and win exciting prizes.",
//     image: photography,
//   },
//   {
//     id: 7,
//     title: "Debate Competition",
//     description: "Express your ideas and improve your public speaking skills.",
//     image: debate,
//   },
//   {
//     id: 8,
//     title: "Coding Challenge",
//     description: "Solve programming problems and compete with peers.",
//     image: coding,
//   },
// ];

// export default function Home() {
//   const [events] = useState(eventsData);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("title");

//   const filteredEvents = useMemo(() => {
//     const term = searchTerm.trim().toLowerCase();

//     const filtered = events.filter((event) => {
//       return `${event.title} ${event.description}`
//         .toLowerCase()
//         .includes(term);
//     });

//     return filtered.sort((a, b) => {
//       if (sortBy === "title") {
//         return a.title.localeCompare(b.title);
//       }
//       return a.id - b.id;
//     });
//   }, [events, searchTerm, sortBy]);

//   return (
//     <div className={styles.homePage}>
//       <HeroCard
//         title="Welcome to College Events Registration"
//         description="Register for campus events, manage attendees, and track event details from one dashboard."
//         highlighted
//       />

//       <div className={styles.grid}>
//         {stats.map((stat) => (
//           <Card
//             key={stat.title}
//             title={stat.title}
//             value={stat.value}
//           />
//         ))}
//       </div>

//       <section className={styles.eventsSection}>
//         <div className={styles.sectionHeader}>
//           <div>
//             <h3>Upcoming Events</h3>
//             <p>Browse and register for exciting college events.</p>
//           </div>
//         </div>

//         <div className={styles.controls}>
//           <input
//             type="search"
//             placeholder="Search events..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="title">Sort by Title</option>
//             <option value="id">Sort by ID</option>
//           </select>
//         </div>

//         {filteredEvents.length === 0 ? (
//           <div className={styles.statusCard}>
//             No events found.
//           </div>
//         ) : (
//           <div className={styles.eventGrid}>
//   {filteredEvents.map((event) => (
//     <article key={event.id} className={styles.eventCard}>
//       <img
//         src={event.image}
//         alt={event.title}
//         className={styles.eventImage}
//       />

//       <div className={styles.eventContent}>
//         <h4>{event.title}</h4>
//         <p>{event.description}</p>

//         <div className={styles.actions}>
//           <Link
//             to={`/details/${event.id}`}
//             className={styles.viewLink}
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </article>
//   ))}
// </div>
//         )}
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import HeroCard from "../components/HeroCard";
import styles from "./Home.module.css";
import { getEvents } from "../api/api";

import backgroundImage from "../assets/background.jpg.jpeg";

import techFest from "../assets/events/tech.jpg.png";
import culturalFest from "../assets/events/culuturefest.jpg.png";
import sportsMeet from "../assets/events/sports.jpg.png";
import scienceExpo from "../assets/events/science.jpg.png";
import startup from "../assets/events/startup.jpg.png";
import photography from "../assets/events/photography.jpg.png";
import debate from "../assets/events/debate.jpg.png";
import coding from "../assets/events/codechallenge.jpg";

const eventImages = { techFest, culturalFest, sportsMeet, scienceExpo, startup, photography, debate, coding };

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    getEvents()
      .then(({ data }) => setEvents(data.data))
      .catch(() => setError("Unable to load events. Please check that the API is running."))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = useMemo(() => {
    const term = searchTerm.toLowerCase();

    const filtered = events.filter((event) =>
      `${event.title} ${event.description}`
        .toLowerCase()
        .includes(term)
    );

    return filtered.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return String(a._id).localeCompare(String(b._id));
    });
  }, [events, searchTerm, sortBy]);

  return (
    <div
      className={styles.homePage}
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   backgroundAttachment: "fixed",
      //   minHeight: "100vh",
      // }}
    >
      <HeroCard
        title="Welcome to College Events Registration"
        description="Register for campus events, manage attendees, and track all event details from one dashboard."
        highlighted
      />

      <div className={styles.grid}>
        {[{ title: "Events", value: events.length }, { title: "Open seats", value: events.reduce((total, event) => total + Math.max(event.capacity - event.registeredCount, 0), 0) }, { title: "Open now", value: events.filter((event) => event.status === "open").length }].map((stat) => (
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
            <h2>Upcoming Events</h2>
            <p>Browse and register for exciting college events.</p>
          </div>
        </div>

        <div className={styles.controls}>
          <input
            type="search"
            placeholder="Search Events..."
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

        {loading ? (
          <div className={styles.statusCard}>Loading events...</div>
        ) : error ? (
          <div className={styles.statusCard}>{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className={styles.statusCard}>
            No events found.
          </div>
        ) : (
          <div className={styles.eventGrid}>
            {filteredEvents.map((event) => (
              <article
                key={event._id}
                className={styles.eventCard}
              >
                <img
                  src={eventImages[event.imageKey]}
                  alt={event.title}
                  className={styles.eventImage}
                />

                <div className={styles.eventContent}>
                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <Link
                    to={`/details/${event._id}`}
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
}4
        