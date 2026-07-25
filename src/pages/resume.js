import React, { useState } from "react";

function Resume() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");

  const handleSave = () => {
    const resumeData = {
      name,
      email,
      phone,
      college,
      degree,
      skills,
      projects,
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    alert("Resume profile saved successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        paddingBottom: "50px",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          backgroundColor: "#0d6efd",
          padding: "15px 30px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>
          <i className="bi bi-briefcase-fill"></i> PlacementPro
        </h3>

        <a
          href="/"
          style={{
            color: "#0d6efd",
            backgroundColor: "white",
            padding: "8px 15px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </a>
      </nav>

      {/* MAIN CONTENT */}

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#e7f1ff",
              color: "#0d6efd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
              fontSize: "30px",
            }}
          >
            <i className="bi bi-file-earmark-person"></i>
          </div>

          <h1>Resume & Profile</h1>

          <p style={{ color: "#6c757d" }}>
            Build your professional profile and get placement-ready.
          </p>
        </div>

        {/* PERSONAL INFORMATION */}

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>
            <i className="bi bi-person-fill text-primary"></i> Personal
            Information
          </h3>

          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>

              <div className="col-md-6">
  <label className="form-label">Full Name</label>

  <input
    type="text"
    className="form-control"
    placeholder="Enter your full name"
    value={name}
    onChange={(e) => {
      const value = e.target.value;
      if (/^[a-zA-Z ]*$/.test(value)) {
        setName(value);
      }
    }}
  />
</div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone Number</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* EDUCATION */}

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>
            <i className="bi bi-mortarboard-fill text-primary"></i> Education
          </h3>

          <hr />

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">College / University</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter college name"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Degree</label>

              <input
                type="text"
                className="form-control"
                placeholder="B.Tech / B.E."
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* SKILLS */}

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>
            <i className="bi bi-code-slash text-primary"></i> Technical Skills
          </h3>

          <hr />

          <label className="form-label">Skills</label>

          <input
            type="text"
            className="form-control"
            placeholder="C, C++, JavaScript, React, HTML, CSS"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <small className="text-muted">
            Separate your skills using commas.
          </small>
        </div>

        {/* PROJECTS */}

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>
            <i className="bi bi-folder-fill text-primary"></i> Projects
          </h3>

          <hr />

          <label className="form-label">Project Details</label>

          <textarea
            className="form-control"
            rows="5"
            placeholder="Enter your project name and description..."
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
          ></textarea>
        </div>

        {/* SAVE BUTTON */}

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <button className="btn btn-primary btn-lg px-5" onClick={handleSave}>
            <i className="bi bi-save me-2"></i>
            Save Profile
          </button>
        </div>

        {/* FOOTER */}

        <footer
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "#6c757d",
          }}
        >
          <p>© 2026 PlacementPro | Placement Preparation Dashboard</p>
        </footer>
      </div>
    </div>
  );
}

export default Resume;
