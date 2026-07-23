import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Event from "../models/Event.js";

dotenv.config();

const events = [
  ["Tech Fest 2026", "Participate in coding, AI, robotics, and hackathon events.", "technology", "techFest", "Innovation Hall", "Chalapathi Institute of Technology", "Guntur", 1200, 850],
  ["Cultural Fest", "Enjoy dance, music, drama, and fine arts competitions.", "cultural", "culturalFest", "Main Auditorium", "PSG Arts and Science College", "Coimbatore", 800, 500],
  ["Sports Meet", "Compete in cricket, football, volleyball, and athletics.", "sports", "sportsMeet", "College Sports Ground", "Sri Krishna Polytechnic", "Vijayawada", 600, 350],
  ["Science Exhibition", "Showcase innovative science projects and experiments.", "science", "scienceExpo", "Science Block", "Chalapathi Institute of Technology", "Guntur", 500, 300],
  ["Entrepreneurship Summit", "Learn startup ideas from successful entrepreneurs.", "business", "startup", "Seminar Hall", "PSG Arts and Science College", "Coimbatore", 1000, 700],
  ["Photography Contest", "Capture creative moments and win exciting prizes.", "creative", "photography", "Media Lab", "PSG Arts and Science College", "Coimbatore", 400, 250],
  ["Debate Competition", "Express your ideas and improve your public speaking skills.", "creative", "debate", "Lecture Theatre 2", "Sri Krishna Polytechnic", "Vijayawada", 300, 180],
  ["Coding Challenge", "Solve programming problems and compete with peers.", "technology", "coding", "Computer Centre", "Chalapathi Institute of Technology", "Guntur", 700, 450],
].map(([title, description, category, imageKey, venue, hostCollege, city, registrationFee, studentDiscountFee], index) => {
  const startsAt = new Date(Date.now() + (index + 2) * 86400000);
  return {
    title,
    description,
    category,
    imageKey,
    venue,
    hostCollege,
    city,
    startsAt,
    registrationDeadline: new Date(startsAt.getTime() - 86400000),
    capacity: 100 + index * 25,
    registrationFee,
    studentDiscountFee,
    status: "open",
  };
});

try {
  await connectDB();
  await Event.deleteMany({});
  await Event.insertMany(events);
  console.log(`${events.length} events seeded successfully`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  process.exit();
}
