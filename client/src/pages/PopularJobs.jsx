// src/pages/PopularJobs.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PopularJobs = () => {
  const [popularJobs, setPopularJobs] = useState([]);
  const navigate = useNavigate();

  // Fetch popular jobs (mocking an API call)
  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = [
        { id: 1, title: 'Software Engineer', company: 'Google', location: 'California, USA' },
        { id: 2, title: 'Data Scientist', company: 'Meta', location: 'New York, USA' },
        { id: 3, title: 'UI/UX Designer', company: 'Apple', location: 'California, USA' },
      ];
      setPopularJobs(jobs);
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Jobs</h1>
      <div className="flex flex-col gap-4">
        {popularJobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-white shadow-md rounded-md cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/job-detail/${job.id}`)}
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularJobs;
