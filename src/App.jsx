import { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

const events = [
  {
    id: "1",
    title: "Web Dev Night",
    date: "September 20, 2026",
    location: "Computer Laboratory",
    description: "Learn the basics of modern web development."
  },
  {
    id: "2",
    title: "Tech Career Talk",
    date: "September 25, 2026",
    location: "School Auditorium",
    description: "A discussion about careers and opportunities in IT."
  },
  {
    id: "3",
    title: "Coding Workshop",
    date: "October 5, 2026",
    location: "IT Laboratory",
    description: "Practice programming through hands-on activities."
  }
];

function Navbar() {
  return (
    <nav>
      <h2>EventHub</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="container">
      <h1>Welcome to EventHub!</h1>
      <p>
        EventHub is a simple website where students can browse
        upcoming events and register to attend.
      </p>

      <Link className="button" to="/events">
        View Events
      </Link>
    </div>
  );
}

function Events() {
  return (
    <div className="container">
      <h1>Upcoming Events</h1>

      <div className="events">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <p>{event.location}</p>

            <Link to={`/events/${event.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventDetails() {
  const { id } = useParams();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return (
      <div className="container">
        <h1>Event Not Found</h1>
        <Link to="/events">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{event.title}</h1>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>

      <Link className="button" to="/register">
        Register for Event
      </Link>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    event: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Validation 1: Name required
    if (form.name.trim() === "") {
      newErrors.name = "Name is required.";
    }

    // Validation 2: Name minimum length
    else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    // Validation 3: Email required and must contain @
    if (form.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Please enter a valid email.";
    }

    // Validation 4: Event required
    if (form.event === "") {
      newErrors.event = "Please select an event.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/confirmation", {
        state: {
          name: form.name,
          event: form.event
        }
      });
    }
  }

  return (
    <div className="container">
      <h1>Register for an Event</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Select Event</label>
        <select
          name="event"
          value={form.event}
          onChange={handleChange}
        >
          <option value="">-- Select an event --</option>

          {events.map((event) => (
            <option key={event.id} value={event.title}>
              {event.title}
            </option>
          ))}
        </select>

        {errors.event && <p className="error">{errors.event}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

function Confirmation() {
  return (
    <div className="container">
      <h1>Registration Successful!</h1>
      <p>Thank you for registering for an EventHub event.</p>

      <Link className="button" to="/events">
        Back to Events
      </Link>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  );
}

export default App;