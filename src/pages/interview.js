import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Interview() {
  const [hrQuestions, setHrQuestions] = useState([
    {
      id: 1,
      question: "Tell me about yourself",
      completed: true,
    },
    {
      id: 2,
      question: "What are your strengths and weaknesses?",
      completed: true,
    },
    {
      id: 3,
      question: "Why should we hire you?",
      completed: false,
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      completed: false,
    },
  ]);

  const [technicalQuestions, setTechnicalQuestions] = useState([
    {
      id: 1,
      question: "Explain OOP concepts",
      completed: true,
    },
    {
      id: 2,
      question: "What is a data structure?",
      completed: true,
    },
    {
      id: 3,
      question: "Explain time complexity",
      completed: true,
    },
    {
      id: 4,
      question: "What is the difference between stack and queue?",
      completed: false,
    },
    {
      id: 5,
      question: "Explain your project",
      completed: false,
    },
  ]);

  const [mockInterviews, setMockInterviews] = useState(3);

  /* ==========================================
     TOGGLE HR QUESTION
  ========================================== */

  const toggleHRQuestion = (id) => {
    setHrQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              completed: !question.completed,
            }
          : question,
      ),
    );
  };

  /* ==========================================
     TOGGLE TECHNICAL QUESTION
  ========================================== */

  const toggleTechnicalQuestion = (id) => {
    setTechnicalQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              completed: !question.completed,
            }
          : question,
      ),
    );
  };

  /* ==========================================
     CALCULATE PROGRESS
  ========================================== */

  const hrCompleted = hrQuestions.filter(
    (question) => question.completed,
  ).length;

  const technicalCompleted = technicalQuestions.filter(
    (question) => question.completed,
  ).length;

  const totalQuestions = hrQuestions.length + technicalQuestions.length;

  const totalCompleted = hrCompleted + technicalCompleted;

  const interviewProgress =
    totalQuestions > 0
      ? Math.round((totalCompleted / totalQuestions) * 100)
      : 0;

  /* ==========================================
     ADD MOCK INTERVIEW
  ========================================== */

  const addMockInterview = () => {
    setMockInterviews((previousCount) => previousCount + 1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f8fc",
        paddingBottom: "50px",
      }}
    >
      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav
        className="navbar"
        style={{
          background: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          padding: "15px 30px",
        }}
      >
        <div className="container-fluid">
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#0d6efd",
            }}
          >
            <i className="bi bi-briefcase-fill me-2"></i>
            PlacementPro
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="container py-5">
        {/* ==================================
            PAGE HEADER
        ================================== */}

        <div className="mb-5">
          <p
            style={{
              color: "#0d6efd",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            INTERVIEW PREPARATION
          </p>

          <h1
            style={{
              fontWeight: "700",
              color: "#1f2937",
            }}
          >
            Prepare for Your Interviews
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Practice HR questions, technical concepts and mock interviews to
            become placement-ready.
          </p>
        </div>

        {/* ==================================
            STAT CARDS
        ================================== */}

        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-primary mb-3" style={{ fontSize: "28px" }}>
                  <i className="bi bi-people-fill"></i>
                </div>

                <h6 className="text-muted">HR Questions</h6>

                <h2>
                  {hrCompleted}/{hrQuestions.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-primary mb-3" style={{ fontSize: "28px" }}>
                  <i className="bi bi-code-slash"></i>
                </div>

                <h6 className="text-muted">Technical Questions</h6>

                <h2>
                  {technicalCompleted}/{technicalQuestions.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-primary mb-3" style={{ fontSize: "28px" }}>
                  <i className="bi bi-camera-video-fill"></i>
                </div>

                <h6 className="text-muted">Mock Interviews</h6>

                <h2>{mockInterviews}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="text-primary mb-3" style={{ fontSize: "28px" }}>
                  <i className="bi bi-graph-up-arrow"></i>
                </div>

                <h6 className="text-muted">Interview Readiness</h6>

                <h2>{interviewProgress}%</h2>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            OVERALL PROGRESS
        ================================== */}

        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between mb-2">
              <h5>Overall Interview Preparation</h5>

              <strong>{interviewProgress}%</strong>
            </div>

            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${interviewProgress}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* ==================================
            QUESTION SECTIONS
        ================================== */}

        <div className="row g-4">
          {/* ==================================
              HR QUESTIONS
          ================================== */}

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <i className="bi bi-person"></i>
                  </div>

                  <div>
                    <h4 className="mb-0">HR Interview Questions</h4>

                    <small className="text-muted">
                      {hrCompleted} of {hrQuestions.length} prepared
                    </small>
                  </div>
                </div>

                {hrQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="d-flex align-items-center border-bottom py-3"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      checked={question.completed}
                      onChange={() => toggleHRQuestion(question.id)}
                    />

                    <span
                      style={{
                        textDecoration: question.completed
                          ? "line-through"
                          : "none",

                        color: question.completed ? "#6c757d" : "#212529",
                      }}
                    >
                      {question.question}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ==================================
              TECHNICAL QUESTIONS
          ================================== */}

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <i className="bi bi-code-slash"></i>
                  </div>

                  <div>
                    <h4 className="mb-0">Technical Questions</h4>

                    <small className="text-muted">
                      {technicalCompleted} of {technicalQuestions.length}{" "}
                      prepared
                    </small>
                  </div>
                </div>

                {technicalQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="d-flex align-items-center border-bottom py-3"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input me-3"
                      checked={question.completed}
                      onChange={() => toggleTechnicalQuestion(question.id)}
                    />

                    <span
                      style={{
                        textDecoration: question.completed
                          ? "line-through"
                          : "none",

                        color: question.completed ? "#6c757d" : "#212529",
                      }}
                    >
                      {question.question}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            MOCK INTERVIEW SECTION
        ================================== */}

        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h4>
                  <i className="bi bi-camera-video text-primary me-2"></i>
                  Mock Interview Practice
                </h4>

                <p className="text-muted mb-0">
                  Practice simulated interviews to improve your confidence and
                  communication skills.
                </p>
              </div>

              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button className="btn btn-primary" onClick={addMockInterview}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Complete Mock Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Interview;
