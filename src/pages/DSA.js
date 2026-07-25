import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function DSA() {
  const navigate = useNavigate();

  const [problemsSolved, setProblemsSolved] = useState(86);

  const totalProblems = 150;

  const easy = 40;
  const medium = 35;
  const hard = 11;

  const dsaProgress = Math.round(
    (problemsSolved / totalProblems) * 100
  );

  const handleProblemSolved = () => {
    if (problemsSolved < totalProblems) {
      setProblemsSolved(problemsSolved + 1);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f8fc",
      }}
    >

      {/* ================================
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

          <button
            className="btn btn-light"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Dashboard
          </button>

        </div>
      </nav>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="container py-5">

        {/* PAGE HEADER */}

        <div
          className="bg-white rounded-4 shadow-sm p-4 mb-4"
        >

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
              <i className="bi bi-code-square"></i>
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

              <h1 className="mb-1">
                DSA & Coding
              </h1>

              <p className="text-muted mb-0">
                Track your data structures,
                algorithms and coding problem-solving
                progress.
              </p>

            </div>

          </div>

        </div>


        {/* ================================
            PROGRESS
        ================================= */}

        <div
          className="bg-white rounded-4 shadow-sm p-4 mb-4"
        >

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h3>
                Coding Progress
              </h3>

              <p className="text-muted">
                Keep solving problems to improve
                your DSA skills.
              </p>

            </div>

            <h2
              style={{
                color: "#0d6efd",
                fontWeight: "700",
              }}
            >
              {dsaProgress}%
            </h2>

          </div>

          <div className="progress mt-3" style={{ height: "12px" }}>

            <div
              className="progress-bar"
              style={{
                width: `${dsaProgress}%`,
              }}
            ></div>

          </div>

          <div className="d-flex justify-content-between mt-2">

            <span>
              {problemsSolved} problems solved
            </span>

            <span>
              {totalProblems} total problems
            </span>

          </div>

        </div>


        {/* ================================
            STATISTICS
        ================================= */}

        <div className="row g-4 mb-4">

          <div className="col-md-3">

            <div className="bg-white rounded-4 shadow-sm p-4 text-center">

              <i
                className="bi bi-check-circle-fill"
                style={{
                  fontSize: "30px",
                  color: "#198754",
                }}
              ></i>

              <h2 className="mt-3">
                {problemsSolved}
              </h2>

              <p className="text-muted mb-0">
                Problems Solved
              </p>

            </div>

          </div>


          <div className="col-md-3">

            <div className="bg-white rounded-4 shadow-sm p-4 text-center">

              <i
                className="bi bi-circle"
                style={{
                  fontSize: "30px",
                  color: "#0d6efd",
                }}
              ></i>

              <h2 className="mt-3">
                {easy}
              </h2>

              <p className="text-muted mb-0">
                Easy Problems
              </p>

            </div>

          </div>


          <div className="col-md-3">

            <div className="bg-white rounded-4 shadow-sm p-4 text-center">

              <i
                className="bi bi-bar-chart"
                style={{
                  fontSize: "30px",
                  color: "#ffc107",
                }}
              ></i>

              <h2 className="mt-3">
                {medium}
              </h2>

              <p className="text-muted mb-0">
                Medium Problems
              </p>

            </div>

          </div>


          <div className="col-md-3">

            <div className="bg-white rounded-4 shadow-sm p-4 text-center">

              <i
                className="bi bi-fire"
                style={{
                  fontSize: "30px",
                  color: "#dc3545",
                }}
              ></i>

              <h2 className="mt-3">
                {hard}
              </h2>

              <p className="text-muted mb-0">
                Hard Problems
              </p>

            </div>

          </div>

        </div>


        {/* ================================
            DSA TOPICS
        ================================= */}

        <div
          className="bg-white rounded-4 shadow-sm p-4 mb-4"
        >

          <div className="mb-4">

            <h3>
              DSA Topics
            </h3>

            <p className="text-muted">
              Track the topics you have completed.
            </p>

          </div>


          <div className="row g-3">

            {/* Arrays */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i
                  className="bi bi-check-circle-fill"
                  style={{
                    color: "#198754",
                  }}
                ></i>

                <h6 className="mt-2">
                  Arrays
                </h6>

                <small className="text-success">
                  Completed
                </small>

              </div>

            </div>


            {/* Strings */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i
                  className="bi bi-check-circle-fill"
                  style={{
                    color: "#198754",
                  }}
                ></i>

                <h6 className="mt-2">
                  Strings
                </h6>

                <small className="text-success">
                  Completed
                </small>

              </div>

            </div>


            {/* Searching */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i
                  className="bi bi-check-circle-fill"
                  style={{
                    color: "#198754",
                  }}
                ></i>

                <h6 className="mt-2">
                  Searching
                </h6>

                <small className="text-success">
                  Completed
                </small>

              </div>

            </div>


            {/* Sorting */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i
                  className="bi bi-check-circle-fill"
                  style={{
                    color: "#198754",
                  }}
                ></i>

                <h6 className="mt-2">
                  Sorting
                </h6>

                <small className="text-success">
                  Completed
                </small>

              </div>

            </div>


            {/* Linked List */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i className="bi bi-circle"></i>

                <h6 className="mt-2">
                  Linked List
                </h6>

                <small className="text-warning">
                  In Progress
                </small>

              </div>

            </div>


            {/* Trees */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i className="bi bi-circle"></i>

                <h6 className="mt-2">
                  Trees
                </h6>

                <small className="text-muted">
                  Not Started
                </small>

              </div>

            </div>


            {/* Graphs */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i className="bi bi-circle"></i>

                <h6 className="mt-2">
                  Graphs
                </h6>

                <small className="text-muted">
                  Not Started
                </small>

              </div>

            </div>


            {/* Dynamic Programming */}

            <div className="col-md-3">

              <div className="border rounded-3 p-3">

                <i className="bi bi-circle"></i>

                <h6 className="mt-2">
                  Dynamic Programming
                </h6>

                <small className="text-muted">
                  Not Started
                </small>

              </div>

            </div>

          </div>

        </div>


        {/* ================================
            ACTION
        ================================= */}

        <div
          className="bg-white rounded-4 shadow-sm p-4 mb-4"
        >

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h4>
                Keep Going! 🚀
              </h4>

              <p className="text-muted mb-0">
                Solve another coding problem and
                keep improving your placement readiness.
              </p>

            </div>

            <button
              className="btn btn-primary"
              onClick={handleProblemSolved}
            >

              <i className="bi bi-plus-circle me-2"></i>

              Mark Problem as Solved

            </button>

          </div>

        </div>


        {/* BACK BUTTON */}

        <div className="text-center mt-4 mb-5">

          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >

            <i className="bi bi-arrow-left me-2"></i>

            Back to Dashboard

          </button>

        </div>


        {/* FOOTER */}

        <footer className="text-center text-muted">

          <p>
            © 2026 PlacementPro |
            Placement Preparation Dashboard
          </p>

        </footer>

      </main>

    </div>
  );
}

export default DSA;