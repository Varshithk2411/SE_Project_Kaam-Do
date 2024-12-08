import React, { useState, useEffect } from "react";
import "./Resume.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume2 = () => {
  const [isCtrlDown, setIsCtrlDown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [resumeContent, setResumeContent] = useState({
    personalInfo: {
      name: "James Ryan",
      title: " Graduate Student | Research & Development",
      email: "james.ryan@gmail.com",
      phone: "940-629-3847",
      location: "Dallas, Texas",
      linkedin: "linkedin.com/in/jamesryan",
    },
    summary: "Graduate student with a background in product management, skilled in data integration, user-centered design, and agile methodologies. Passionate about using analytics and creative problem-solving to deliver impactful, user-focused products.",
    experience: [
      {
        position: "Product Management Intern",
        company: "InnovateTech",
        years: "Summer 2023",
        location: "New York, New York",
        description: [
          "Assisted in developing the product strategy for a new SaaS platform, leading to a 20% improvement in user engagement post-launch.",
          "Collaborated with UX and engineering teams to prioritize and launch key features, optimizing user experience and product functionality.",
          "Conducted competitor analysis and user research, providing insights that shaped the product roadmap.",
          "Supported agile development processes, improving sprint planning efficiency and reducing delivery times by 15%.",
        ],
      },
      {
        position: "Business Analyst Intern",
        company: "Global Solutions Group",
        years: "2022 - 2023",
        location: "San Francisco, California",
        description: [
          "Analyzed market trends and customer data to recommend features for an enterprise software solution, which boosted client retention by 10%.",
          "Worked with cross-functional teams to improve internal product workflows, enhancing productivity by standardizing processes.",
          "Built dashboards for tracking product KPIs, allowing stakeholders to make data-driven decisions and align with business goals.",
          "Conducted user testing and synthesized feedback, ensuring product design aligned with customer needs.",
        ],
      },
      {
        position: "Junior Product Analyst",
        company: "Tech Innovations",
        years: "2021 - 2022",
        location: "Remote",
        description: [
          "Supported the development and launch of a mobile app feature, increasing user engagement by 15%.",
          "Performed data analysis to understand usage patterns and improve user experience based on behavioral insights.",
          "Assisted in drafting product requirements documents (PRDs), ensuring clarity for development and design teams.",
          "Worked closely with customer support to analyze feedback and suggest improvements to the product roadmap.",
        ],
      },
    ],
    education: {
      school: "Purdue University",
      degree1: "Master of Science in Data Science",
      degree1years: "2022 - 2024",
      degree2: "Bachelor of Science in Electrical Engineering",
      degree2years: "2018 - 2022",
    },
    skills: ["Product Management", "Market Research", "Data Analysis", "Competitive Analysis", "User Testing & Feedback Analysis", "Business Strategy", "Frameworks: Node.js, Express.js, Bootstrap", "Developer Tools: Git, VS Code, PyCharm, Jupyter, MATLAB, LabView, Multisim", "Libraries: pandas, NumPy, Matplotlib, scikit-learn", "Coding Languages: Python, C/C++, JavaScript, HTML/CSS, Matlab"],
    certifications: ["Product Management Certificate (PMC)", "Project Management Professional (PMP)", "Certified Business Analysis Professional (CBAP)", "Google Analytics Individual Qualification (GAIQ)", "Data Analytics Certificate", "AWS Certified Cloud Practitioner"],
    achievements: [
      "Developed a Collaborative Research Tool, resulting in a 35% increase in team productivity.",
      "Enhanced Data Analysis Techniques, improving project efficiency by 25%.",
      "Designed and Implemented a User Feedback System, leading to a 30% boost in user engagement.",
      "Spearheaded a Marketing Campaign, achieving a 40% growth in student participation in events.",
    ],
    responsibilitiesundertaken: [
        "Career Development Representative - Actively participated in organizing career fairs and networking events for students in the Electrical Engineering department.",
        "Student Engagement Coordinator - Collaborated with faculty and administration to enhance student participation in academic and extracurricular activities.",
        "Event Management Team - Contributed to planning and executing various college events, including workshops and guest lectures.",
        "Assisted in coordinating recruitment drives for local tech companies as part of the placement cell.",
    ],
    extracurricular: [
        "Winner - Served as a team member in a case competition, leading to a first-place finish out of 10 teams at the Business Strategy Challenge 2023.",
        "Participant - Contributed as a panelist in the university's Innovation Summit, sharing insights on technology trends with industry professionals.",
        "Co-Founder - Co-founded a student-led organization focused on promoting sustainability initiatives on campus, resulting in a 25% increase in student participation in green activities.",
        "Organizer - Led the organizing committee for the annual Tech Fest, coordinating events and workshops that attracted over 500 attendees from various disciplines.",
        "Finalist - Achieved finalist status in the National Entrepreneurship Competition, presenting a business plan that garnered interest from several investors.",
        "Volunteer - Volunteered as a mentor in the university's tutoring program, providing academic support and guidance to underclassmen in STEM subjects.",
        "Speaker - Delivered a presentation on data analytics at the Graduate Research Symposium, receiving recognition for innovative research approaches.",
    ],
    languages: ["English", "French", "German"],
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Control") {
        setIsCtrlDown(true);
      }
      if (isCtrlDown && e.key === "p") {
        e.preventDefault();
        handlePrint();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Control") {
        setIsCtrlDown(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isCtrlDown]);

  const handlePrint = () => {
    const buttons = document.querySelectorAll(".resume-buttons button, .edit-button");
    const instructions = document.querySelector(".instructions");

    buttons.forEach((button) => {
      button.style.display = "none";
    });
    instructions.style.display = "none";

    html2canvas(document.querySelector("article")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("resume.pdf");

      buttons.forEach((button) => {
        button.style.display = "inline-block";
      });
      instructions.style.display = "block";
    });
  };



  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <center>

      <div className="resume-container">
        <article>
          <div className="resume" contentEditable={isEditMode}>
            <button className="edit-button" onClick={toggleEditMode}>
              {isEditMode ? "Save" : "Edit"} 
            </button> 
            <p className="instructions border p-1 border-dashed border-black mt-3 mb-1">
             <span className="text-blue-600 font-semibold">Instructions :</span>  Click on the edit button to modify the resume. Add or remove elements as needed. After making changes, click the save button and then download the resume.
            </p>
            <h1>{resumeContent.personalInfo.name}</h1>
            <h2>{resumeContent.personalInfo.title}</h2>
            <div className="contact-info">
              <p>{resumeContent.personalInfo.email} | {resumeContent.personalInfo.phone} | {resumeContent.personalInfo.location} | {resumeContent.personalInfo.linkedin}</p>
            </div>
            <hr />
            <section>
              <h3>Summary</h3>
              <p>{resumeContent.summary}</p>
            </section>
            <section>
              <h3>Work Experience</h3>
              {resumeContent.experience.map((exp, index) => (
                <div key={index} className="job">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company} | {exp.years} | {exp.location}</h5>
                  <ul>
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section>
              <h3>Education</h3>
              <div className="school">
                <h4>{resumeContent.education.degree1}</h4>
                <h5>{resumeContent.education.school} | {resumeContent.education.degree1years}</h5>
              </div>
              <div className="school">
                <h4>{resumeContent.education.degree2}</h4>
                <h5>{resumeContent.education.school} | {resumeContent.education.degree2years}</h5>
              </div>
            </section>
            <section>
              <h3>Skills</h3>
              <ul>
                {resumeContent.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Certifications</h3>
              <ul>
                {resumeContent.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Achievements</h3>
              <ul>
                {resumeContent.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Responsibilities Undertaken</h3>
              <ul>
                {resumeContent.responsibilitiesundertaken.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Extracurricular Achievements</h3>
              <ul>
                {resumeContent.extracurricular.map((extra, index) => (
                  <li key={index}>{extra}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>Languages</h3>
              <p>{resumeContent.languages.join(' | ')}</p>
            </section>
            <div className="resume-buttons">
              <button onClick={handlePrint}>Download PDF</button>
            </div>
          </div>
        </article>
      </div>    </center>

  );
};

export default Resume2;
