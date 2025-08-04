import React from "react";

function Home() {
  return (
    <section style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1>
        🎓 Welcome to <strong>DiRates</strong>!
      </h1>
      <p>
        <strong>DiRates</strong> is a student-built project with a noble (and
        slightly chaotic) mission:
        <br />
        To give Université de Montréal computer science students a place to{" "}
        <strong>share honest opinions</strong> about <strong>courses</strong>{" "}
        and <strong>professors</strong>—without needing to whisper in a hallway
        or decode mysterious Reddit threads.
      </p>

      <p>
        Whether you're trying to pick the least soul-crushing 8AM course, avoid
        200-slide lectures from the 90s, or just want to know if "Algorithm
        Analysis" is as terrifying as it sounds…
        <br />
        You're in the right place.
      </p>

      <p>
        This platform was crafted <em>by UdeM students, for UdeM students</em>
        —so you can:
      </p>
      <ul>
        <li>Browse real feedback on CS courses 🧠</li>
        <li>Rate and review your professors 🤓</li>
        <li>Help future students make smarter choices 📘</li>
      </ul>

      <p>
        <strong>New here?</strong> Don’t worry. We’ve all been lost in Synchro
        once.
        <br />
        Just sign up, explore, and maybe leave a review or two to keep the cycle
        of wisdom (and memes) going.
      </p>
    </section>
  );
}

export default Home;
