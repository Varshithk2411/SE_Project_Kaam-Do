import React, { useState, useEffect } from "react";
import "./Resume.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume = ({data,resumeBuildId}) => {
  const [isCtrlDown, setIsCtrlDown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [resumeContent, setResumeContent] = useState(data)
  // const [resumeContent, setResumeContent] = useState({
  //   personalInfo: {
  //     name: "Luna Thomas",
  //     title: "Product Manager | Strategy & Innovation",
  //     email: "luna.thomas@gmail.com",
  //     phone: "469-585-7236",
  //     location: "San Francisco, California",
  //     linkedin: "linkedin.com/in/lunathomas",
  //   },
  //   summary:{
  //     summary:"With over 3 years of experience in product management, I have a proven track record of driving product strategy and innovation. My expertise in data integration platforms, user experience, and agile methodologies has been pivotal in delivering successful products.",
  //   },
  //   experience: [
  //     {
  //       position: "Senior Product Manager",
  //       company: "ABC Corp",
  //       years: "2020 - Present",
  //       location: "San Francisco, California",
  //       description: [
  //         "Led product strategy and execution for data integration platforms, resulting in a 25% increase in customer satisfaction.",
  //         "Collaborated with cross-functional teams to launch new features, enhancing user experience and engagement.",
  //         "Implemented agile methodologies to streamline product development, reducing time to market by 20%.",
  //         "Conducted market research and competitive analysis, leading to a 15% growth in market share.",
  //       ],
  //     },
  //     {
  //       position: "Product Manager",
  //       company: "XYZ Inc.",
  //       years: "2018 - 2020",
  //       location: "San Francisco, California",
  //       description: [
  //         "Managed end-to-end product development for a key feature, resulting in a 30% increase in user adoption.",
  //         "Worked closely with engineering and design teams to deliver a seamless user experience.",
  //         "Developed and maintained product roadmaps, ensuring alignment with business goals.",
  //         "Conducted user research and usability testing to inform product decisions.",
  //       ],
  //     },
  //     {
  //       position: "Associate Product Manager",
  //       company: "Tech Solutions",
  //       years: "2016 - 2018",
  //       location: "San Francisco, California",
  //       description: [
  //         "Supported senior product managers in the launch of three new products.",
  //         "Assisted in the creation of product requirements and specifications.",
  //         "Coordinated with marketing and sales teams to ensure successful product launches.",
  //         "Conducted data analysis to identify trends and opportunities for product improvement.",
  //       ],
  //     },
  //   ],
  //   education: {
  //     school: "University of California, Berkeley",
  //     school2: "University of California, Berkeley",
  //     degree1: "Master of Business Administration (MBA)",
  //     degree1years: "2014 - 2016",
  //     degree2: "Bachelor of Science in Computer Science",
  //     degree2years: "2010 - 2014",
  //   },
  //   skills: [
  //     "Product Management",
  //     "Data Integration",
  //     "Agile Methodologies",
  //     "User Experience",
  //   ],
  //   certifications: [
  //     "Certified Scrum Master (CSM)",
  //     "Certified Product Manager (CPM)",
  //   ],
  //   achievements: [
  //     "Launched Financial Data Platform, leading to a 30% increase in data accuracy.",
  //     "Improved Customer Satisfaction by 25% through enhanced user experience.",
  //     "Increased Transaction Volumes by 20% with streamlined processes.",
  //     "Streamlined Development Process, reducing time to market by 20%.",
  //   ],
  //   languages: ["English", "Spanish", "Mandarin"],
  // });

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

  // const handlePrint2 = () => {
  //   const resumeElement = document.getElementById(resumeBuildId)
  //   const buttons = resumeElement.querySelectorAll(
  //     ".resume-buttons button, .edit-button"
  //   );
  //   const instructions = resumeElement.querySelector(".instructions");
  
  //   // Hide buttons and instructions before creating the PDF
  //   buttons.forEach((button) => {
  //     button.style.display = "none";
  //   });
  //   instructions.style.display = "none";
  
  //   // Use jsPDF's `html` method to generate a PDF with selectable text
  //   const pdf = new jsPDF("p", "mm", "a4");
  
  //   pdf.html(resumeElement, {
  //     callback: function (pdf) {
  //       pdf.save("resume.pdf");
  
  //       // Show buttons and instructions after the PDF is generated
  //       buttons.forEach((button) => {
  //         button.style.display = "inline-block";
  //       });
  //       instructions.style.display = "block";
  //     },
  //     width: 210,  // Content width (A4 - margins)
  //     windowWidth: 800,  // Window width used to scale content
    
  //   });
  // };




  // const handleInputChangesss = (event, section, key, index = null) => {
  //   let { value } = event.target;

  //   if (section== "experience" && key == "description"){
  //        value = value.split("|")
  //   }

  
  //   setResumeContent((prevContent) => {
  //     if (section === "experience" && index !== null) {
  //       // If the section is "experience", we need to update the object at the given index
  //       const updatedExperience = [...prevContent.experience];
  //       updatedExperience[index] = {
  //         ...updatedExperience[index],
  //         [key]: value, // Update the specific key in the object at that index
  //       };
  
  //       return {
  //         ...prevContent,
  //         experience: updatedExperience, // Return the updated array
  //       };
  //     }
  
  //     // For other sections, update normally
  //     return {
  //       ...prevContent,
  //       [section]: {
  //         ...prevContent[section],
  //         [key]: value,
  //       },
  //     };
  //   });
  // };

  const handleInputChange = (event, section, key, index = null) => {
    let { value } = event.target;

    if ((section== "experience" && key == "description") || section === "skills" || section === "languages" || section === "achievements" || section === "certifications"){
      console.log(typeof value)
      value = value.split("|")
 }
  
    setResumeContent((prevContent) => {
      if (section === "experience" && index !== null) {
        // If we're in the experience section, update the object at the given index
        const updatedExperience = [...prevContent.experience];
        updatedExperience[index] = {
          ...updatedExperience[index],
          [key]: value,
        };
  
        return {
          ...prevContent,
          experience: updatedExperience,
        };
      }
  
      if (section === "skills" || section === "languages" || section === "achievements" || section === "certifications") {
        
        let updatedArray = [...prevContent[section]]; 
        updatedArray = value; 
        console.log(updatedArray)
  
        return {
          ...prevContent,
          [section]: updatedArray,
        };
      }
  
      // For other sections, just update the section normally
      return {
        ...prevContent,
        [section]: {
          ...prevContent[section],
          [key]: value,
        },
      };
    });
  };
  
  
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <center>
      <div className="resume-container">
        <article id={resumeBuildId}>
          {/* contentEditable={isEditMode} */}
          <div className="resume">
            <button className="edit-button" onClick={toggleEditMode}>
              {isEditMode ? "Save" : "Edit"}
            </button>
            <p className="instructions border p-1 border-dashed border-black mt-3 mb-1">
              <span className="text-blue-600 font-semibold">
                Instructions :
              </span>{" "}
              Click on the edit button to modify the resume. Add or remove
              elements as needed. After making changes, click the save button
              and then download the resume.
            </p>
            <h1>
              {isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.personalInfo.name}
                  handlechange={handleInputChange}
                  section="personalInfo"
                  keys="name"
                  inputtype ="small"
                />
              ) : (
                resumeContent.personalInfo.name
              )}
            </h1>
            <h2>
              {isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.personalInfo.title}
                  handlechange={handleInputChange}
                  section="personalInfo"
                  keys="title"
                  inputtype ="small"
                />
              ) : (
                resumeContent.personalInfo.title
              )}
            </h2>
            <div className="contact-info">
              <p>
                {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.personalInfo.email}
                    handlechange={handleInputChange}
                    section="personalInfo"
                    keys="email"
                    inputtype ="small"
                  />
                ) : (
                  resumeContent.personalInfo.email
                )}{" "}
                |{" "}
                {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.personalInfo.phone}
                    handlechange={handleInputChange}
                    section="personalInfo"
                    keys="phone"
                    inputtype ="small"
                  />
                ) : (
                  resumeContent.personalInfo.phone
                )}{" "}
                |{" "}
                {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.personalInfo.location}
                    handlechange={handleInputChange}
                    section="personalInfo"
                    keys="location"
                    inputtype ="small"
                  />
                ) : (
                  resumeContent.personalInfo.location
                )}{" "}
                |{" "}
                {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.personalInfo.linkedin}
                    handlechange={handleInputChange}
                    section="personalInfo"
                    keys="linkedin"
                    inputtype ="small"
                  />
                ) : (
                  resumeContent.personalInfo.linkedin
                )}
              </p>
            </div>
            <hr />
            <section>
              <h3>Summary</h3>
              <p className="w-100">{isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.summary.summary}
                    handlechange={handleInputChange}
                    section="summary"
                    keys="summary"
                    styles={{width:'100%'}}
                  />
                ) : (
                  resumeContent.summary.summary
                )}</p>
            </section>
            <section>
              <h3>Experience</h3>
              {resumeContent.experience.map((exp, index) => (
                <div key={index} className="job">
                  <h4>
                  {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={exp.position}
                    handlechange={handleInputChange}
                    section="experience"
                    keys="position"
                    inputtype ="small"
                    index={index}
                  />
                ) : (
                  exp.position
                )}

                  </h4>
                  <h5>
                  {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={exp.company}
                    handlechange={handleInputChange}
                    section="experience"
                    keys="company"
                    inputtype ="small"
                    index={index}
                  />
                ) : (
                  exp.company
                )} {" "} | {" "}
                {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={exp.years}
                    handlechange={handleInputChange}
                    section="experience"
                    keys="years"
                    inputtype ="small"
                    index={index}
                  />
                ) : (
                  exp.years
                )} {" "} | {" "}
                {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={exp.location}
                    handlechange={handleInputChange}
                    section="experience"
                    keys="location"
                    inputtype ="small"
                    index={index}
                  />
                ) : (
                  exp.location
                )}
                    {/* {exp.company} | {exp.years} | {exp.location} */}
                  </h5>
                  <ul>
                  {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={exp.description.join("|")}
                    handlechange={handleInputChange}
                    section="experience"
                    keys="description"
                    inputtype ="big"
                    index={index}
                    styles={{width:'100%'}}
                  />
                ) : (
                  exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))
                )}
                    {/* {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))} */}
                  </ul>
                </div>
              ))}
            </section>
            <section>
              <h3>Education</h3>
              <div className="school">
                <h4>
                {isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.education.degree1}
                  handlechange={handleInputChange}
                  section="education"
                  keys="degree1"
                  inputtype ="small"
                />
              ) : (
                resumeContent.education.degree1
              )}
                
                  </h4>
                <h5>
                {isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.education.school}
                  handlechange={handleInputChange}
                  section="education"
                  keys="school"
                  inputtype ="small"
                />
              ) : (
                resumeContent.education.school
              )} |{" "}
              {isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.education.degree1years}
                  handlechange={handleInputChange}
                  section="education"
                  keys="degree1years"
                  inputtype ="small"
                />
              ) : (
                resumeContent.education.degree1years
              )}
                  {/* {resumeContent.education.degree1years} */}
                </h5>
              </div>
              <div className="school">
                <h4>{isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.education.degree2}
                  handlechange={handleInputChange}
                  section="education"
                  keys="degree2"
                  inputtype ="small"
                />
              ) : (
                resumeContent.education.degree2
              )}</h4>
                <h5>
                {isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.education.school2}
                  handlechange={handleInputChange}
                  section="education"
                  keys="school2"
                  inputtype ="small"
                />
              ) : (
                resumeContent.education.school2
              )} |{" "}
              {isEditMode ? (
                <HandleInputComponent
                  type="text"
                  value={resumeContent.education.degree2years}
                  handlechange={handleInputChange}
                  section="education"
                  keys="degree2years"
                  inputtype ="small"
                />
              ) : (
                resumeContent.education.degree2years
              )}
                  
                </h5>
              </div>
            </section>
            <section>
              <h3>Skills</h3>
              <ul>
              {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.skills.join("|")}
                    handlechange={handleInputChange}
                    section="skills"
                    keys="skills"
                    inputtype ="big"
                    styles={{width:'100%'}}
                  />
                ) : (
                  resumeContent.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))
                )}
                {/* {resumeContent.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))} */}
              </ul>
            </section>
            <section>
              <h3>Certifications</h3>
              <ul>
              {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.certifications.join("|")}
                    handlechange={handleInputChange}
                    section="certifications"
                    keys="certifications"
                    inputtype ="big"
                    styles={{width:'100%'}}
                  />
                ) : (
                  resumeContent.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))
                )}
                {/* {resumeContent.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))} */}
              </ul>
            </section>
            <section>
              <h3>Achievements</h3>
              <ul>
              {isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.achievements.join("|")}
                    handlechange={handleInputChange}
                    section="achievements"
                    keys="achievements"
                    inputtype ="big"
                    styles={{width:'100%'}}
                  />
                ) : (
                  resumeContent.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))
                )}
                {/* {resumeContent.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))} */}
              </ul>
            </section>
            <section>
              <h3>Languages</h3>
              <p>{isEditMode ? (
                  <HandleInputComponent
                    type="text"
                    value={resumeContent.languages.join("|")}
                    handlechange={handleInputChange}
                    section="languages"
                    keys="languages"
                    inputtype ="big"
                    styles={{width:'100%'}}
                  />
                ) : (
                  resumeContent.languages.join(" | ")
                )}
                
                {/* {resumeContent.languages.join(" | ")} */}
                </p>
            </section>
            <div className="resume-buttons">
              <button onClick={handlePrint}>Download PDF</button>
            </div>
          </div>
        </article>
      </div>{" "}
    </center>
  );
};

export default Resume;

const HandleInputComponent = ({ inputtype, type, value, handlechange, section, keys,styles,index }) => {
  return (
    <>
      {inputtype === "small" ? (
        <input
          type={type}
          value={value}
          onChange={(e) => handlechange(e, section, keys,index)}
          style={styles}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => handlechange(e, section, keys,index)}
          rows={10} 
          cols={50} 
          style={styles}
        />
      )}
    </>
  );
};
