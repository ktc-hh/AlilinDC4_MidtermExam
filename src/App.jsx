import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to My Mini Site</h1>
      <p>This is my simple React website.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Me</h1>
      <p>
        Hello! I am a BSIT student learning React.
        This mini site is one of my coding activities.
      </p>
    </div>
  );
}

function Contact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || email === "") {
      setError("Please enter your name and email.");
      return;
    }

    setError("");
    navigate("/thank-you");
  }

  return (
    <div>
      <h1>Contact Me</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Message:</label>
          <br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <br />

        {error && <p>{error}</p>}

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

function ThankYou() {
  return (
    <div>
      <h1>Thank You!</h1>
      <p>Your message has been submitted successfully.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;