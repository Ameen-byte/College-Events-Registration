import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './StudentDetails.module.css'
import { getEvent } from '../api/api'

export default function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchEvent = async () => {
      try {
        setLoading(true)
        setError('')
        const { data } = await getEvent(id)

        if (isMounted) {
          setEvent(data.data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchEvent()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.card}>
          <h2>Loading event details…</h2>
          <p>Please wait while we fetch the latest information.</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.card}>
          <h2>Unable to load details</h2>
          <p>{error}</p>
          <Link to="/">Back to Home</Link>
        </div>
      </section>
    )
  }

  if (!event) {
    return (
      <section className={styles.detailsPage}>
        <div className={styles.card}>
          <h2>Record not found</h2>
          <p>The requested event could not be found.</p>
          <Link to="/">View all events</Link>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.detailsPage}>
      <div className={styles.card}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <ul>
          <li><strong>Event ID:</strong> {event._id}</li>
          <li><strong>Category:</strong> {event.category}</li>
          <li><strong>Host college:</strong> {event.hostCollege}</li>
          <li><strong>City:</strong> {event.city}</li>
          <li><strong>Venue:</strong> {event.venue}</li>
          <li><strong>Status:</strong> {event.status}</li>
          <li><strong>Capacity:</strong> {event.registeredCount} / {event.capacity} registered</li>
          <li><strong>Student registration:</strong> ₹{event.studentDiscountFee}</li>
          <li><strong>Regular registration:</strong> ₹{event.registrationFee}</li>
        </ul>
        <Link to="/">Back to Home</Link>
      </div>
    </section>
  )
}





// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import styles from "./StudentDetails.module.css";

// export default function EventDetails() {
//   const { id } = useParams();

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let isMounted = true;

//     const fetchEvent = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           `https://jsonplaceholder.typicode.com/posts/${id}`
//         );

//         if (!response.ok) {
//           throw new Error("Unable to load event details.");
//         }

//         const data = await response.json();

//         if (isMounted) {
//           setEvent(data);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message || "Something went wrong.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchEvent();

//     return () => {
//       isMounted = false;
//     };
//   }, [id]);

//   if (loading) {
//     return (
//       <section className={styles.detailsPage}>
//         <div className={styles.card}>
//           <h2>Loading Event Details...</h2>
//           <p>Please wait while we fetch the latest information.</p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className={styles.detailsPage}>
//         <div className={styles.card}>
//           <h2>Unable to Load Details</h2>
//           <p>{error}</p>
//           <Link to="/">Back to Home</Link>
//         </div>
//       </section>
//     );
//   }

//   if (!event) {
//     return (
//       <section className={styles.detailsPage}>
//         <div className={styles.card}>
//           <h2>Event Not Found</h2>
//           <p>The requested event could not be found.</p>
//           <Link to="/">Back to Home</Link>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className={styles.detailsPage}>
//       <div className={styles.card}>
//         <h2>{event.title}</h2>

//         <p>{event.body}</p>

//         <ul>
//           <li>
//             <strong>Event ID:</strong> {event.id}
//           </li>

//           <li>
//             <strong>User ID:</strong> {event.userId}
//           </li>

//           <li>
//             <strong>Category:</strong> Tech Event
//           </li>

//           <li>
//             <strong>Status:</strong> Registration Open
//           </li>
//         </ul>

//         <Link to="/">⬅ Back to Home</Link>
//       </div>
//     </section>
//   );
// }