import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Slider from "rc-slider";
import Header from "../components/Header";
import { experience, jobTypes, jobs } from "../utils/data";
import { CustomButton, JobCard, ListBox } from "../components";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [salaryRange, setSalaryRange] = useState([500, 15000]); // Salary range state
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const filterJobs = (val) => {
    console.log(filterJobTypes)
    if (filterJobTypes.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = (val) => {
    if (filterExp.includes(val)) {
      setFilterExp(filterExp.filter((el) => el !== val));
    } else {
      setFilterExp([...filterExp, val]);
    }
  };

  const filteredJobs = jobs.filter((job) => {
      const jobTypeMatch = filterJobTypes.length === 0 || filterJobTypes.includes(job.jobType);
      const expMatch = filterExp.length === 0 || filterExp.some(exp => exp === job.experience);
      const salary = parseInt(job.salary, 10); // Ensure salary is a number
      const salaryMatch = salary >= salaryRange[0] && salary <= salaryRange[1];
      return jobTypeMatch && expMatch && salaryMatch;
    }).sort((a, b) => {
      switch (sort) {
        case "Newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "Oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "Salary High to Low":
          return b.salary - a.salary;
        case "Salary Low to High":
          return a.salary - b.salary;
        case "A-Z":
          return a.jobTitle.localeCompare(b.jobTitle);
        case "Z-A":
          return b.jobTitle.localeCompare(a.jobTitle);
        default:
          return 0;
      }
    });

    const handleSalaryChange = (range) => {
      console.log(range)
      setSalaryRange(range);
      
    };

  return (
    <div>
      <style>
        {`
          .card-hover {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      <Header
        title="Find Your Dream Job with Ease"
        type="home"
        handleClick={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className="container mx-auto flex gap-6 2xl:gap-10 md:px-7 py-0 md:py-6 bg-[#f7fdfd] dark:bg-slate-800">
        <div className="hidden md:flex flex-col w-1/5 px-4 py-4 h-fit bg-white dark:bg-slate-900 shadow-sm">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-100">Filter Search</p>
          <div className="py-2">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Filter By Salary
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
            <Slider
            range
            min={500}
            max={20000}
            defaultValue={salaryRange}
            value={salaryRange}
            onChange={handleSalaryChange}
            trackStyle={{ backgroundColor: "#007BFF" }}
            handleStyle={[{ borderColor: "#007BFF" }, { borderColor: "#007BFF" }]}
          />
          <div className="flex justify-between mt-2">
            <span>${salaryRange[0]}</span>
            <span>${salaryRange[1]}</span>
          </div>
            </div>
          </div>
          <div className="py-2">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Job Type
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {jobTypes.map((jtype, index) => (
                <div key={index} className="flex gap-2 text-sm md:text-base">
                  <input
                    type="checkbox"
                    value={jtype}
                    className="w-4 h-4"
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-2 mt-4">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BsStars />
                Experience
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {experience.map((exp) => (
                <div key={exp.title} className="flex gap-3">
                  <input
                    type="checkbox"
                    value={exp.value}
                    className="w-4 h-4"
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-5/6 px-5 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-base">
              Showing: <span className="font-semibold">{filteredJobs.length}</span> Jobs Available
            </p>

            <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
              <p className="text-sm md:text-base">Sort By:</p>

              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-4">
            {filteredJobs.map((job, index) => (
              <div className="card-hover" key={index}>
                <JobCard job={job} />
              </div>
            ))}
          </div>

          {numPage > page && !isFetching && (
            <div className="w-full flex items-center justify-center pt-16">
              <CustomButton
                title="Load More"
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
