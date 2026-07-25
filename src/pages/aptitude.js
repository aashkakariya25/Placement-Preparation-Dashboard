import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Aptitude() {
  const navigate = useNavigate();

  // ================================
  // APTITUDE DATA
  // ================================

  const [attempted, setAttempted] = useState(120);
  const [correct, setCorrect] = useState(94);

  const quantitativeSolved = 45;
  const logicalSolved = 30;
  const verbalSolved = 19;

  const mockTests = 4;

  // ================================
  // CALCULATE ACCURACY
  // ================================

  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  // ================================
  // ADD QUESTION
  // ================================

  const handleQuestion = (isCorrect) => {
    setAttempted(attempted + 1);

    if (isCorrect) {
      setCorrect(correct + 1);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f8fc",
      }}
    >
      {/* =================================
          NAVBAR
      ================================= */}

      <nav
        style={{
          backgroundColor: "#0d6efd",
          padding: "15px 30px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "22px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            <i className="bi bi-briefcase-fill me-2"></i>
            PlacementPro
          </button>

          <button className="btn btn-light" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main className="container py-5">
        {/* =================================
            PAGE HEADER
        ================================= */}

        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
          <div className="d-flex align-items-center">
            <div
              style={{
                width: "65px",
                height: "65px",
                backgroundColor: "#e7f1ff",
                color: "#0d6efd",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                marginRight: "20px",
              }}
            >
              <i className="bi bi-calculator"></i>
            </div>

            <div>
              <p
                style={{
                  color: "#0d6efd",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                PREPARATION AREA
              </p>

              <h1 className="mb-1">Aptitude Preparation</h1>

              <p className="text-muted mb-0">
                Track your quantitative, logical and verbal aptitude
                preparation.
              </p>
            </div>
          </div>
        </div>

        {/* =================================
            ACCURACY PROGRESS
        ================================= */}

        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3>Aptitude Performance</h3>

              <p className="text-muted">
                Improve your accuracy by practicing questions regularly.
              </p>
            </div>

            <h2
              style={{
                color: "#0d6efd",
                fontWeight: "700",
              }}
            >
              {accuracy}%
            </h2>
          </div>

          <div
            className="progress mt-3"
            style={{
              height: "12px",
            }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${accuracy}%`,
              }}
            ></div>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span>{correct} correct</span>

            <span>{attempted} attempted</span>
          </div>
        </div>

        {/* =================================
            STATISTICS
        ================================= */}

        <div className="row g-4 mb-4">
          {/* QUESTIONS ATTEMPTED */}

          <div className="col-md-3">
            <div className="bg-white rounded-4 shadow-sm p-4 text-center">
              <i
                className="bi bi-question-circle"
                style={{
                  fontSize: "30px",
                  color: "#0d6efd",
                }}
              ></i>

              <h2 className="mt-3">{attempted}</h2>

              <p className="text-muted mb-0">Questions Attempted</p>
            </div>
          </div>

          {/* CORRECT ANSWERS */}

          <div className="col-md-3">
            <div className="bg-white rounded-4 shadow-sm p-4 text-center">
              <i
                className="bi bi-check-circle-fill"
                style={{
                  fontSize: "30px",
                  color: "#198754",
                }}
              ></i>

              <h2 className="mt-3">{correct}</h2>

              <p className="text-muted mb-0">Correct Answers</p>
            </div>
          </div>

          {/* ACCURACY */}

          <div className="col-md-3">
            <div className="bg-white rounded-4 shadow-sm p-4 text-center">
              <i
                className="bi bi-bullseye"
                style={{
                  fontSize: "30px",
                  color: "#ffc107",
                }}
              ></i>

              <h2 className="mt-3">{accuracy}%</h2>

              <p className="text-muted mb-0">Accuracy</p>
            </div>
          </div>

          {/* MOCK TESTS */}

          <div className="col-md-3">
            <div className="bg-white rounded-4 shadow-sm p-4 text-center">
              <i
                className="bi bi-file-earmark-check"
                style={{
                  fontSize: "30px",
                  color: "#6f42c1",
                }}
              ></i>

              <h2 className="mt-3">{mockTests}</h2>

              <p className="text-muted mb-0">Mock Tests</p>
            </div>
          </div>
        </div>

        {/* =================================
            APTITUDE AREAS
        ================================= */}

        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
          <div className="mb-4">
            <h3>Aptitude Areas</h3>

            <p className="text-muted">
              Track your practice across different aptitude categories.
            </p>
          </div>

          <div className="row g-4">
            {/* QUANTITATIVE */}

            <div className="col-md-4">
              <div className="border rounded-3 p-4">
                <i
                  className="bi bi-calculator"
                  style={{
                    fontSize: "28px",
                    color: "#0d6efd",
                  }}
                ></i>

                <h5 className="mt-3">Quantitative Aptitude</h5>

                <p className="text-muted">
                  Practice mathematics, percentages, ratios and problem solving.
                </p>

                <h4>{quantitativeSolved}</h4>

                <small className="text-success">Questions Solved</small>
              </div>
            </div>

            {/* LOGICAL */}

            <div className="col-md-4">
              <div className="border rounded-3 p-4">
                <i
                  className="bi bi-puzzle"
                  style={{
                    fontSize: "28px",
                    color: "#198754",
                  }}
                ></i>

                <h5 className="mt-3">Logical Reasoning</h5>

                <p className="text-muted">
                  Practice logical puzzles, patterns and analytical reasoning.
                </p>

                <h4>{logicalSolved}</h4>

                <small className="text-success">Questions Solved</small>
              </div>
            </div>

            {/* VERBAL */}

            <div className="col-md-4">
              <div className="border rounded-3 p-4">
                <i
                  className="bi bi-chat-text"
                  style={{
                    fontSize: "28px",
                    color: "#6f42c1",
                  }}
                ></i>

                <h5 className="mt-3">Verbal Ability</h5>

                <p className="text-muted">
                  Improve vocabulary, grammar and reading comprehension.
                </p>

                <h4>{verbalSolved}</h4>

                <small className="text-success">Questions Solved</small>
              </div>
            </div>
          </div>
        </div>

        {/* =================================
            PRACTICE SECTION
        ================================= */}

        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
          <h3>Practice Tracker</h3>

          <p className="text-muted">
            Update your progress whenever you complete an aptitude question.
          </p>

          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-success"
              onClick={() => handleQuestion(true)}
            >
              <i className="bi bi-check-lg me-2"></i>
              Correct Answer
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() => handleQuestion(false)}
            >
              <i className="bi bi-x-lg me-2"></i>
              Incorrect Answer
            </button>
          </div>
        </div>

        {/* =================================
            BACK BUTTON
        ================================= */}

        <div className="text-center mt-4 mb-5">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Dashboard
          </button>
        </div>

        {/* =================================
            FOOTER
        ================================= */}

        <footer className="text-center text-muted">
          <p>© 2026 PlacementPro | Placement Preparation Dashboard</p>
        </footer>
      </main>
    </div>
  );
}

export default Aptitude;
