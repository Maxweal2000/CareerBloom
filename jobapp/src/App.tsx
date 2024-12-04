import React, { useState, useEffect } from 'react';
import './App.css';

// Define types for job and form data
interface Job {
  id: string;
  title: string;
  description: string;
}

interface ApplicationData {
  name: string;
  email: string;
  jobId: string;
  resume: string;
}

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    name: '',
    email: '',
    jobId: '',
    resume: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch job listings from backend
  useEffect(() => {
    fetch('http://localhost:5000/jobs')
      .then((response) => response.json())
      .then((data: Job[]) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!applicationData.name || !applicationData.email || !applicationData.resume) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        alert('There was an error submitting your application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  return (
    <div className="App">
      {/* Existing sections like Hero, About, Services, etc. */}

      {/* Job Listings Section */}
      <section className="Jobs">
        <h2>Available Jobs</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button onClick={() => setApplicationData({ ...applicationData, jobId: job.id })}>
                Apply Now
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Job Application Form */}
      {applicationData.jobId && !formSubmitted && (
        <section className="ApplicationForm">
          <h2>Apply for Job</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={applicationData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={applicationData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
            />

            <label htmlFor="resume">Resume (Link):</label>
            <input
              type="text"
              id="resume"
              name="resume"
              value={applicationData.resume}
              onChange={handleInputChange}
              placeholder="Link to your resume"
              required
            />

            <button type="submit">Submit Application</button>
          </form>
        </section>
      )}

      {formSubmitted && (
        <section className="ThankYou">
          <h2>Thank You for Applying!</h2>
          <p>We will review your application and get back to you.</p>
        </section>
      )}
    </div>
  );
}

export default App;
