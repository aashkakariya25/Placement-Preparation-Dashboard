import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DSA from "./pages/DSA";
import Aptitude from "./pages/aptitude";
import Interview from "./pages/interview";
import Resume from "./pages/resume";


function Dashboard() {
  /* ==========================================
     LOGIN & USER STATE
  ========================================== */

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("placementUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  /* ==========================================
     PLACEMENT OPPORTUNITIES
  ========================================== */

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);

  /* ==========================================
     TASK STATE
  ========================================== */

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Solve 3 DSA problems",
      completed: false,
    },
    {
      id: 2,
      text: "Complete aptitude test",
      completed: false,
    },
    {
      id: 3,
      text: "Revise JavaScript concepts",
      completed: false,
    },
    {
      id: 4,
      text: "Practice HR interview questions",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");

  /* ==========================================
     PREPARATION AREA MODAL
  ========================================== */

  const [selectedArea, setSelectedArea] = useState(null);

  /* ==========================================
     PREPARATION DATA
  ========================================== */

  const [preparationData, setPreparationData] = useState({
    dsa: {
      problemsSolved: 86,
      totalProblems: 150,
      easy: 40,
      medium: 35,
      hard: 11,
      topicsCompleted: 8,
      totalTopics: 12,
    },

    aptitude: {
      attempted: 120,
      correct: 94,
      quantitative: 45,
      logical: 30,
      verbal: 19,
      mockTests: 4,
    },

    interview: {
      hrPrepared: 18,
      hrTotal: 25,
      technicalPrepared: 32,
      technicalTotal: 50,
      mockInterviews: 3,
    },

    resume: {
      resumeCompleted: true,
      linkedinAdded: true,
      githubAdded: true,
      projects: 3,
      skills: 8,
      profileStrength: 82,
    },
  });

  /* ==========================================
     CHART REFERENCES
  ========================================== */

  const progressChartRef = useRef(null);
  const skillChartRef = useRef(null);

  const progressChartInstance = useRef(null);
  const skillChartInstance = useRef(null);

  /* ==========================================
     LOGIN FUNCTION
  ========================================== */

  const handleLogin = (event) => {
    event.preventDefault();

    setLoginError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setLoginError("Please enter your name and email to continue.");

      return;
    }

    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setLoginError("Please enter a valid email address.");

      return;
    }

    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
    };

    localStorage.setItem("placementUser", JSON.stringify(newUser));

    setUser(newUser);

    setName("");
    setEmail("");
  };

  /* ==========================================
     LOGOUT FUNCTION
  ========================================== */

  const handleLogout = () => {
    localStorage.removeItem("placementUser");

    setUser(null);

    setName("");
    setEmail("");
  };

  /* ==========================================
     FETCH API
     PLACEMENT OPPORTUNITIES
  ========================================== */

  const fetchPlacementData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      if (!response.ok) {
        throw new Error("Unable to fetch placement data.");
      }

      const data = await response.json();

      /*
        JSONPlaceholder does not provide real
        company placement data.

        We are using the API response to demonstrate
        Fetch API + Async/Await functionality.
      */

      const placementJobs = data.slice(0, 6).map((company, index) => ({
        id: company.id,

        name: company.company?.name || company.name,

        position: index % 2 === 0 ? "Software Developer" : "Frontend Developer",

        location: company.address?.city || "India",

        eligibility: "BTech / BE Computer Engineering",

        cgpa: "Minimum 7.0 CGPA",

        skills:
          index % 2 === 0
            ? "C++, Java, DSA, Algorithms, Problem Solving"
            : "HTML, CSS, JavaScript, React, Git",

        experience: "Freshers",

        deadline: "30 August 2026",
      }));

      setJobs(placementJobs);
    } catch (error) {
      console.error("Error fetching API data:", error);

      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
     LOAD API DATA
  ========================================== */

  useEffect(() => {
    if (user) {
      fetchPlacementData();
    }
  }, [user]);

  /* ==========================================
     TASK FUNCTIONS
  ========================================== */

  const toggleTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const addTask = (event) => {
    event.preventDefault();

    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      return;
    }

    const task = {
      id: Date.now(),
      text: trimmedTask,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, task]);

    setNewTask("");
  };

  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  };

  /* ==========================================
     TASK STATISTICS
  ========================================== */

  const completedTasks = tasks.filter((task) => task.completed).length;

  const taskProgress =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  /* ==========================================
     PREPARATION AREA DATA
  ========================================== */

  const dsaProgress = Math.round(
    (preparationData.dsa.problemsSolved / preparationData.dsa.totalProblems) *
      100,
  );

  const aptitudeProgress = Math.round(
    (preparationData.aptitude.correct / preparationData.aptitude.attempted) *
      100,
  );

  const interviewProgress = Math.round(
    ((preparationData.interview.hrPrepared +
      preparationData.interview.technicalPrepared) /
      (preparationData.interview.hrTotal +
        preparationData.interview.technicalTotal)) *
      100,
  );

  const resumeProgress = preparationData.resume.profileStrength;

  /* ==========================================
     PREPARATION AREA CLICK
  ========================================== */

  const openPreparationArea = (area) => {
    setSelectedArea(area);
  };

  const closePreparationArea = () => {
    setSelectedArea(null);
  };

  /* ==========================================
     UPDATE PREPARATION DATA
  ========================================== */

  const updateDSAProblems = () => {
    setPreparationData((previousData) => ({
      ...previousData,

      dsa: {
        ...previousData.dsa,

        problemsSolved: previousData.dsa.problemsSolved + 1,
      },
    }));
  };

  const updateAptitudeQuestion = (correct) => {
    setPreparationData((previousData) => ({
      ...previousData,

      aptitude: {
        ...previousData.aptitude,

        attempted: previousData.aptitude.attempted + 1,

        correct: correct
          ? previousData.aptitude.correct + 1
          : previousData.aptitude.correct,
      },
    }));
  };

  const updateInterviewQuestion = (type) => {
    setPreparationData((previousData) => ({
      ...previousData,

      interview: {
        ...previousData.interview,

        ...(type === "hr"
          ? {
              hrPrepared: Math.min(
                previousData.interview.hrPrepared + 1,
                previousData.interview.hrTotal,
              ),
            }
          : {
              technicalPrepared: Math.min(
                previousData.interview.technicalPrepared + 1,
                previousData.interview.technicalTotal,
              ),
            }),
      },
    }));
  };

  /* ==========================================
     DYNAMIC PLACEMENT READINESS
  ========================================== */

  const placementReadiness = Math.round(
    (dsaProgress + aptitudeProgress + interviewProgress + resumeProgress) / 4,
  );

  /* ==========================================
     CREATE CHARTS
  ========================================== */

  useEffect(() => {
    if (!user) {
      return;
    }

    /* ==========================================
       WEEKLY PROGRESS BAR CHART
    ========================================== */

    if (progressChartRef.current) {
      if (progressChartInstance.current) {
        progressChartInstance.current.destroy();
      }

      progressChartInstance.current = new Chart(progressChartRef.current, {
        type: "bar",

        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

          datasets: [
            {
              label: "Tasks Completed",

              data: [5, 8, 6, 10, 7, 12, 9],

              backgroundColor: "#0d6efd",

              borderRadius: 8,
            },
          ],
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },
          },

          scales: {
            x: {
              title: {
                display: true,
                text: "Days of the Week",
              },
            },

            y: {
              beginAtZero: true,

              title: {
                display: true,
                text: "Tasks Completed",
              },

              ticks: {
                stepSize: 2,
              },
            },
          },
        },
      });
    }

    /* ==========================================
       SKILL DOUGHNUT CHART
    ========================================== */

    if (skillChartRef.current) {
      if (skillChartInstance.current) {
        skillChartInstance.current.destroy();
      }

      skillChartInstance.current = new Chart(skillChartRef.current, {
        type: "doughnut",

        data: {
          labels: ["DSA", "Web Development", "Aptitude", "Communication"],

          datasets: [
            {
              data: [dsaProgress, 82, aptitudeProgress, 65],

              backgroundColor: ["#0d6efd", "#3d8bfd", "#6ea8fe", "#9ec5fe"],

              borderWidth: 2,
            },
          ],
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    return () => {
      if (progressChartInstance.current) {
        progressChartInstance.current.destroy();
      }

      if (skillChartInstance.current) {
        skillChartInstance.current.destroy();
      }
    };
  }, [user, dsaProgress, aptitudeProgress]);

  /* ==========================================
     LOGIN PAGE
  ========================================== */

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="logo-circle">
            <i className="bi bi-briefcase-fill"></i>
          </div>

          <h2>PlacementPro</h2>

          <p className="login-subtitle">
            Your Smart Placement Preparation Dashboard
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-3 text-start">
              <label className="form-label">Full Name</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="mb-4 text-start">
              <label className="form-label">Email Address</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            {loginError && (
              <div className="alert alert-danger">{loginError}</div>
            )}

            <button type="submit" className="btn login-btn w-100">
              Login to Dashboard
              <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ==========================================
     DASHBOARD STARTS
  ========================================== */

  return (
    <div className="dashboard-page">
      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="navbar dashboard-navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#top">
            <i className="bi bi-briefcase-fill"></i>
            PlacementPro
          </a>

          <div className="d-flex align-items-center">
            <div className="user-info">
              <i className="bi bi-person-circle"></i>

              <span>{user.name}</span>
            </div>

            <button className="btn logout-btn ms-3" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main id="top" className="container-fluid dashboard-container">
        {/* ======================================
            WELCOME SECTION
        ====================================== */}

        <section className="welcome-section">
          <div>
            <p className="welcome-label">WELCOME BACK 👋</p>

            <h1>Hello, {user.name}</h1>

            <p>Track your placement preparation and stay career-ready.</p>
          </div>

          <div className="readiness-box">
            <span>Placement Readiness</span>

            <h2>{placementReadiness}%</h2>

            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${placementReadiness}%`,
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* ======================================
            STAT CARDS
        ====================================== */}

        <section className="row g-4 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-code-slash"></i>
              </div>

              <div>
                <p>DSA Problems</p>

                <h3>{preparationData.dsa.problemsSolved}</h3>

                <small>+12 this week</small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-lightbulb"></i>
              </div>

              <div>
                <p>Aptitude Score</p>

                <h3>{aptitudeProgress}%</h3>

                <small>
                  {preparationData.aptitude.correct} correct answers
                </small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-laptop"></i>
              </div>

              <div>
                <p>Skills Learned</p>

                <h3>{preparationData.resume.skills}</h3>

                <small>2 in progress</small>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="bi bi-calendar-check"></i>
              </div>

              <div>
                <p>Tasks Completed</p>

                <h3>{completedTasks}</h3>

                <small>{taskProgress}% of today's tasks</small>
              </div>
            </div>
          </div>
        </section>
        {/* ======================================
            CHARTS
        ====================================== */}

        <section className="row g-4 mb-4">
          {/* WEEKLY PROGRESS */}

          <div className="col-lg-8">
            <div className="dashboard-card">
              <div className="card-header-custom">
                <div>
                  <h4>Preparation Progress</h4>

                  <p>Your weekly preparation activity</p>
                </div>

                <i className="bi bi-bar-chart-fill"></i>
              </div>

              <div className="chart-container">
                <canvas ref={progressChartRef}></canvas>
              </div>
            </div>
          </div>

          {/* SKILL PROGRESS */}

          <div className="col-lg-4">
            <div className="dashboard-card">
              <div className="card-header-custom">
                <div>
                  <h4>Skill Progress</h4>

                  <p>Current skill levels</p>
                </div>

                <i className="bi bi-pie-chart-fill"></i>
              </div>

              <div className="chart-container">
                <canvas ref={skillChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================
            PREPARATION AREAS
        ====================================== */}

        <section className="mb-4">
          <div className="section-heading">
            <h3>Preparation Areas</h3>

            <p>Click an area to track your preparation</p>
          </div>

          <div className="row g-4">
            {/* ==================================
                DSA CARD
            ================================== */}

            <div className="col-lg-3 col-md-6">
              <div
                className="preparation-card clickable-card"
                onClick={() => openPreparationArea("dsa")}
              >
                <div className="prep-icon">
                  <i className="bi bi-code-square"></i>
                </div>

                <h5>DSA & Coding</h5>

                <p>Practice data structures, algorithms and coding problems.</p>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${dsaProgress}%`,
                    }}
                  ></div>
                </div>

                <div className="progress-text">
                  <span>
                    {preparationData.dsa.problemsSolved} Problems Solved
                  </span>

                  <strong>{dsaProgress}%</strong>
                </div>

                <button
                  className="btn btn-sm btn-outline-primary mt-3"
                  onClick={(event) => {
                    event.stopPropagation();
                    window.location.href = "/dsa";
                  }}
                >
                  View Details
                </button>
              </div>
            </div>

            {/* ==================================
                APTITUDE CARD
            ================================== */}

            <div className="col-lg-3 col-md-6">
              <div className="preparation-card ">
                <div className="prep-icon">
                  <i className="bi bi-calculator"></i>
                </div>

                <h5>Aptitude</h5>

                <p>Improve quantitative, logical and verbal reasoning.</p>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${aptitudeProgress}%`,
                    }}
                  ></div>
                </div>

                <div className="progress-text">
                  <span>{preparationData.aptitude.attempted} Questions</span>

                  <strong>{aptitudeProgress}%</strong>
                </div>

                <button
                  className="btn btn-sm btn-outline-primary mt-3"
                  onClick={() => {
                    window.location.href = "/aptitude";
                  }}
                >
                  View Details
                </button>
              </div>
            </div>

            {/* ==================================
    INTERVIEW CARD
================================== */}

            <div className="col-lg-3 col-md-6">
              <div className="preparation-card">
                <div className="prep-icon">
                  <i className="bi bi-person-video3"></i>
                </div>

                <h5>Interview Prep</h5>

                <p>Prepare HR questions, technical interviews and mocks.</p>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${interviewProgress}%`,
                    }}
                  ></div>
                </div>

                <div className="progress-text">
                  <span>
                    {preparationData.interview.hrPrepared +
                      preparationData.interview.technicalPrepared}{" "}
                    Prepared
                  </span>

                  <strong>{interviewProgress}%</strong>
                </div>

                <button
                  className="btn btn-sm btn-outline-primary mt-3"
                  onClick={() => {
                    window.location.href = "/interview";
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
            {/* ==================================
                RESUME CARD
            ================================== */}

            <div className="col-lg-3 col-md-6">
              <div
                className="preparation-card clickable-card"
                onClick={() => openPreparationArea("resume")}
              >
                <div className="prep-icon">
                  <i className="bi bi-file-earmark-person"></i>
                </div>

                <h5>Resume & Profile</h5>

                <p>Build a strong resume and professional profile.</p>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${resumeProgress}%`,
                    }}
                  ></div>
                </div>

                <div className="progress-text">
                  <span>Profile Strength</span>
                  <strong>{resumeProgress}%</strong>
                </div>

                <button
                  className="btn btn-sm btn-outline-primary mt-3"
                  onClick={(event) => {
                    event.stopPropagation();
                    window.location.href = "/resume";
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================
            PREPARATION DETAILS MODAL
        ====================================== */}

        {selectedArea && (
          <div className="custom-modal-overlay">
            <div className="custom-modal">
              <button
                className="modal-close-btn"
                onClick={closePreparationArea}
              >
                <i className="bi bi-x-lg"></i>
              </button>

              {/* ==================================
                  DSA DETAILS
              ================================== */}

              {selectedArea === "dsa" && (
                <>
                  <div className="modal-icon">
                    <i className="bi bi-code-square"></i>
                  </div>

                  <h3>DSA & Coding</h3>

                  <p className="modal-subtitle">
                    Track your coding practice and problem-solving progress.
                  </p>

                  <div className="detail-grid">
                    <div className="detail-box">
                      <span>Problems Solved</span>

                      <strong>
                        {preparationData.dsa.problemsSolved}/
                        {preparationData.dsa.totalProblems}
                      </strong>
                    </div>

                    <div className="detail-box">
                      <span>Easy</span>

                      <strong>{preparationData.dsa.easy}</strong>
                    </div>

                    <div className="detail-box">
                      <span>Medium</span>

                      <strong>{preparationData.dsa.medium}</strong>
                    </div>

                    <div className="detail-box">
                      <span>Hard</span>

                      <strong>{preparationData.dsa.hard}</strong>
                    </div>
                  </div>

                  <div className="modal-progress-section">
                    <div className="d-flex justify-content-between">
                      <span>Overall Progress</span>

                      <strong>{dsaProgress}%</strong>
                    </div>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${dsaProgress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="topic-list">
                    <h5>DSA Topics</h5>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Arrays
                    </div>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Strings
                    </div>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Searching
                    </div>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Sorting
                    </div>

                    <div className="topic-item">
                      <i className="bi bi-circle"></i>
                      Linked List
                    </div>

                    <div className="topic-item">
                      <i className="bi bi-circle"></i>
                      Trees
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={updateDSAProblems}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Mark One Problem as Solved
                  </button>
                </>
              )}

              {/* ==================================
                  APTITUDE DETAILS
              ================================== */}

              {selectedArea === "aptitude" && (
                <>
                  <div className="modal-icon">
                    <i className="bi bi-calculator"></i>
                  </div>

                  <h3>Aptitude Preparation</h3>

                  <p className="modal-subtitle">
                    Track your aptitude practice and test performance.
                  </p>

                  <div className="detail-grid">
                    <div className="detail-box">
                      <span>Questions Attempted</span>

                      <strong>{preparationData.aptitude.attempted}</strong>
                    </div>

                    <div className="detail-box">
                      <span>Correct Answers</span>

                      <strong>{preparationData.aptitude.correct}</strong>
                    </div>

                    <div className="detail-box">
                      <span>Accuracy</span>

                      <strong>{aptitudeProgress}%</strong>
                    </div>

                    <div className="detail-box">
                      <span>Mock Tests</span>

                      <strong>{preparationData.aptitude.mockTests}</strong>
                    </div>
                  </div>

                  <div className="topic-list">
                    <h5>Aptitude Areas</h5>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Quantitative Aptitude
                      <span className="topic-score">45 solved</span>
                    </div>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Logical Reasoning
                      <span className="topic-score">30 solved</span>
                    </div>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Verbal Ability
                      <span className="topic-score">19 solved</span>
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button
                      className="btn btn-success flex-fill"
                      onClick={() => updateAptitudeQuestion(true)}
                    >
                      <i className="bi bi-check-lg me-1"></i>
                      Correct
                    </button>

                    <button
                      className="btn btn-outline-danger flex-fill"
                      onClick={() => updateAptitudeQuestion(false)}
                    >
                      <i className="bi bi-x-lg me-1"></i>
                      Incorrect
                    </button>
                  </div>
                </>
              )}

              {/* ==================================
                  INTERVIEW DETAILS
              ================================== */}

              {selectedArea === "interview" && (
                <>
                  <div className="modal-icon">
                    <i className="bi bi-person-video3"></i>
                  </div>

                  <h3>Interview Preparation</h3>

                  <p className="modal-subtitle">
                    Prepare for HR and technical placement interviews.
                  </p>

                  <div className="detail-grid">
                    <div className="detail-box">
                      <span>HR Questions</span>

                      <strong>
                        {preparationData.interview.hrPrepared}/
                        {preparationData.interview.hrTotal}
                      </strong>
                    </div>

                    <div className="detail-box">
                      <span>Technical Questions</span>

                      <strong>
                        {preparationData.interview.technicalPrepared}/
                        {preparationData.interview.technicalTotal}
                      </strong>
                    </div>

                    <div className="detail-box">
                      <span>Mock Interviews</span>

                      <strong>
                        {preparationData.interview.mockInterviews}
                      </strong>
                    </div>

                    <div className="detail-box">
                      <span>Readiness</span>

                      <strong>{interviewProgress}%</strong>
                    </div>
                  </div>

                  <div className="topic-list">
                    <h5>Interview Questions</h5>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Tell me about yourself
                    </div>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Strengths and Weaknesses
                    </div>

                    <div className="topic-item completed">
                      <i className="bi bi-check-circle-fill"></i>
                      Explain your project
                    </div>

                    <div className="topic-item">
                      <i className="bi bi-circle"></i>
                      Why should we hire you?
                    </div>

                    <div className="topic-item">
                      <i className="bi bi-circle"></i>
                      Technical fundamentals
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button
                      className="btn btn-primary flex-fill"
                      onClick={() => updateInterviewQuestion("hr")}
                    >
                      Add HR Question
                    </button>

                    <button
                      className="btn btn-outline-primary flex-fill"
                      onClick={() => updateInterviewQuestion("technical")}
                    >
                      Add Technical
                    </button>
                  </div>
                </>
              )}

              {/* ==================================
                  RESUME DETAILS
              ================================== */}

              {selectedArea === "resume" && (
                <>
                  <div className="modal-icon">
                    <i className="bi bi-file-earmark-person"></i>
                  </div>

                  <h3>Resume & Profile</h3>

                  <p className="modal-subtitle">
                    Manage your professional placement profile.
                  </p>

                  <div className="profile-checklist">
                    <div className="profile-check completed">
                      <i className="bi bi-check-circle-fill"></i>

                      <div>
                        <strong>Resume</strong>

                        <small>Resume completed</small>
                      </div>
                    </div>

                    <div className="profile-check completed">
                      <i className="bi bi-check-circle-fill"></i>

                      <div>
                        <strong>LinkedIn</strong>

                        <small>Profile added</small>
                      </div>
                    </div>

                    <div className="profile-check completed">
                      <i className="bi bi-check-circle-fill"></i>

                      <div>
                        <strong>GitHub</strong>

                        <small>Profile added</small>
                      </div>
                    </div>
                  </div>

                  <div className="detail-grid mt-3">
                    <div className="detail-box">
                      <span>Projects</span>

                      <strong>{preparationData.resume.projects}</strong>
                    </div>

                    <div className="detail-box">
                      <span>Skills</span>

                      <strong>{preparationData.resume.skills}</strong>
                    </div>

                    <div className="detail-box">
                      <span>Profile Strength</span>

                      <strong>{preparationData.resume.profileStrength}%</strong>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ======================================
            API + TASKS
        ====================================== */}

        <section className="row g-4 mb-4">
          {/* ==================================
              PLACEMENT OPPORTUNITIES
          ================================== */}

          <div className="col-lg-7">
            <div className="dashboard-card">
              <div className="card-header-custom">
                <div>
                  <h4>Latest Placement Opportunities</h4>

                  <p>Data loaded using Fetch API</p>
                </div>

                <i className="bi bi-briefcase"></i>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner-border text-primary"></div>

                  <p className="mt-2">Loading opportunities...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="alert alert-danger">
                  Unable to load placement opportunities.
                </div>
              ) : (
                jobs.map((job) => (
                  <div className="job-card" key={job.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6>{job.name}</h6>

                        <p>
                          <i className="bi bi-briefcase me-2"></i>

                          {job.position}
                        </p>

                        <p>
                          <i className="bi bi-geo-alt me-2"></i>

                          {job.location}
                        </p>
                      </div>

                      <button
                        className="btn btn-primary btn-sm"
                        
                        onClick={() => {
                          alert("Company details coming soon!");
                        }}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ==================================
              TODAY'S TASKS
          ================================== */}

          <div className="col-lg-5">
            <div className="dashboard-card">
              <div className="card-header-custom">
                <div>
                  <h4>Today's Tasks</h4>

                  <p>
                    {completedTasks} of {tasks.length} tasks completed
                  </p>
                </div>

                <i className="bi bi-check2-square"></i>
              </div>

              <div className="task-progress">
                <div className="d-flex justify-content-between">
                  <span>Daily Progress</span>

                  <strong>{taskProgress}%</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${taskProgress}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="task-list">
                {tasks.map((task) => (
                  <div className="task-item" key={task.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />

                      <span className={task.completed ? "completed-task" : ""}>
                        {task.text}
                      </span>
                    </label>

                    <button
                      className="delete-task-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
              </div>

              <form className="add-task-form" onSubmit={addTask}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                />

                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-plus-lg"></i>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ======================================
            COMPANY REQUIREMENTS MODAL
        ====================================== */}

        {selectedJob && (
          <div className="custom-modal-overlay">
            <div className="custom-modal company-modal">
              <button
                className="modal-close-btn"
                onClick={() => setSelectedJob(null)}
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <div className="modal-icon">
                <i className="bi bi-building"></i>
              </div>

              <h3>{selectedJob.name}</h3>

              <p className="modal-subtitle">
                {selectedJob.position}
                {" • "}
                {selectedJob.location}
              </p>

              <div className="company-detail-section">
                <h5>
                  <i className="bi bi-person-check me-2"></i>
                  Eligibility
                </h5>

                <p>{selectedJob.eligibility}</p>
              </div>

              <div className="company-detail-section">
                <h5>
                  <i className="bi bi-mortarboard me-2"></i>
                  Academic Requirement
                </h5>

                <p>{selectedJob.cgpa}</p>
              </div>

              <div className="company-detail-section">
                <h5>
                  <i className="bi bi-code-slash me-2"></i>
                  Required Skills
                </h5>

                <div className="skill-tags">
                  {selectedJob.skills.split(", ").map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="company-detail-section">
                <h5>
                  <i className="bi bi-clock me-2"></i>
                  Experience
                </h5>

                <p>{selectedJob.experience}</p>
              </div>

              <div className="company-detail-section">
                <h5>
                  <i className="bi bi-calendar-event me-2"></i>
                  Application Deadline
                </h5>

                <p>{selectedJob.deadline}</p>
              </div>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ======================================
            FOOTER
        ====================================== */}

        <footer>
          <p>© 2026 PlacementPro | Placement Preparation Dashboard</p>
        </footer>
      </main>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/dsa" element={<DSA />} />
        <Route path="/aptitude" element={<Aptitude />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/resume" element={<Resume />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
