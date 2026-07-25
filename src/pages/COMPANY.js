import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* =====================================================
   COMPANY LIST PAGE
   URL: /c
===================================================== */

export function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error("Unable to fetch company data");
        }

        const data = await response.json();

        /*
          JSONPlaceholder gives USER data.
          We are using the company object inside each user
          as our company data.
        */

        const companyData = data.map((company) => ({
          id: company.id,
          name: company.company.name,
          position: company.company.catchPhrase,
          location: company.address.city,
          eligibility: "BTech / BE Computer Engineering",
          academic: "Minimum 7.0 CGPA",
          skills: "HTML, CSS, JavaScript, React, Git",
          experience: "Freshers can apply",
        }));

        setCompanies(companyData);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Unable to load company opportunities.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  /* LOADING */
  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading Companies...</h3>
        <p>Please wait while we fetch company opportunities.</p>
      </div>
    );
  }

  /* ERROR */
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  /* COMPANY LIST */
  return (
    <div className="container py-5">
      {/* PAGE HEADER */}
      <div className="mb-4">
        <h1>Company Opportunities</h1>

        <p>
          Explore companies, job roles, eligibility requirements and required
          skills for placement preparation.
        </p>
      </div>

      {/* COMPANY CARDS */}
      <div className="row g-4">
        {companies.map((company) => (
          <div className="col-lg-6" key={company.id}>
            <div className="card h-100 shadow-sm p-3">
              <div className="card-body">
                {/* COMPANY NAME */}
                <h3>{company.name}</h3>

                {/* POSITION */}
                <p className="text-muted">
                  <i className="bi bi-briefcase me-2"></i>
                  {company.position}
                </p>

                {/* LOCATION */}
                <p className="text-muted">
                  <i className="bi bi-geo-alt me-2"></i>
                  {company.location}
                </p>

                {/* OPEN BUTTON */}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/company/${company.id}`)}
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   COMPANY DETAILS PAGE
   URL: /company/:id
===================================================== */

export function CompanyDetails() {
  /* GET ID FROM URL */
  const { id } = useParams();

  /* NAVIGATION */
  const navigate = useNavigate();

  /* STATE */
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* FETCH SELECTED COMPANY */
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError("");

        /*
          Fetch only the selected company
          using the ID from the URL.
        */

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
        );

        if (!response.ok) {
          throw new Error("Company not found");
        }

        const data = await response.json();

        /*
          Convert API data into company details.
        */

        const companyData = {
          id: data.id,
          name: data.company.name,
          position: data.company.catchPhrase,
          location: data.address.city,
          eligibility: "BTech / BE Computer Engineering",
          academic: "Minimum 7.0 CGPA",
          skills: "HTML, CSS, JavaScript, React, Git",
          experience: "Freshers can apply",
        };

        setCompany(companyData);
      } catch (error) {
        console.error("Error fetching company:", error);

        setError("Unable to load company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  /* LOADING */
  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading Company Details...</h3>

        <p>Please wait.</p>
      </div>
    );
  }

  /* ERROR */
  if (error || !company) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error || "Company not found."}
        </div>

        <button className="btn btn-primary" onClick={() => navigate("/company")}>
          ← Back to Companies
        </button>
      </div>
    );
  }

  /* COMPANY DETAILS */
  return (
    <div className="container py-5">
      {/* BACK BUTTON */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => navigate("/company")}
      >
        ← Back to Companies
      </button>

      {/* COMPANY CARD */}
      <div className="card shadow-sm">
        <div className="card-body p-4">
          {/* COMPANY NAME */}
          <h1>{company.name}</h1>

          {/* POSITION AND LOCATION */}
          <p className="text-muted">
            {company.position}
            {" • "}
            {company.location}
          </p>

          <hr />

          {/* ELIGIBILITY */}
          <div className="mb-4">
            <h5>
              <i className="bi bi-person-check me-2"></i>
              Eligibility
            </h5>

            <p>{company.eligibility}</p>
          </div>

          {/* ACADEMIC REQUIREMENT */}
          <div className="mb-4">
            <h5>
              <i className="bi bi-mortarboard me-2"></i>
              Academic Requirement
            </h5>

            <p>{company.academic}</p>
          </div>

          {/* REQUIRED SKILLS */}
          <div className="mb-4">
            <h5>
              <i className="bi bi-code-slash me-2"></i>
              Required Skills
            </h5>

            <p>{company.skills}</p>
          </div>

          {/* EXPERIENCE */}
          <div className="mb-4">
            <h5>
              <i className="bi bi-clock me-2"></i>
              Experience
            </h5>

            <p>{company.experience}</p>
          </div>

          {/* COMPANY ID */}
          <div>
            <h5>Company ID</h5>

            <p>{company.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
