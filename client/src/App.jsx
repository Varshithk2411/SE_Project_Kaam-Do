import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  AuthPage,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
  Carousel
} from "./pages";
import { useSelector } from "react-redux";
import Error from './components/Error'
import SectionFirst from "./components/Home/SectionFirst";
import SectionSecond from "./components/Home/SectionSecond";
import SectionThird from "./components/Home/SectionThird";
import SectionFourth from "./components/Home/SectionFourth";
import SectionFifth from "./components/Home/SectionFifth";
import SectionSixth from "./components/Home/SectionSixth";
import About from "./components/About/About";
import ContactForm from "./components/ContactForm"; // Importing ContactForm
import Resume from "./pages/Resumebuilder1";
import Register from "./pages/CandidatePage";
import CandidatePage from "./pages/CandidatePage";
import PopularJobs from './pages/PopularJobs'; // Import PopularJobs

import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { BiArrowToTop } from "react-icons/bi";
import KaamDoPrivacyPolicy from "./pages/PrivacyPolicy";
import KaamDoTermsConditions from "./pages/Terms";
import Resume2 from "./pages/Resumebuilder2";
import ResumeBuilder from "./pages/Resumebuilder3";
import { resumedata1 } from "./utils/resumedata";
import { resumedata2 } from "./utils/resumedata";
import Translate from "./components/Translate";
import Translate2 from "./components/Translate2";

// Layout component to handle protected routes
function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/user-auth" state={{ from: location }} replace />
  );
}
function Temp () {
  return (
      <div>
          {/* Render MyComponent twice */}
          <Resume data={resumedata1} resumeBuildId={"Resume001"}/>
          <Resume data={resumedata2} resumeBuildId={"Resume002"}/>
          {/* <ResumeBuilder/> */}
      </div>
  );
};
function App() {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();

    // Simulate a loading time for demo purposes
    const timer = setTimeout(handleComplete, 2000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <main className="bg-[#f7fdfd] dark:bg-slate-950 dark:text-white">
      {/* <Translate/> */}
      <Translate2/>
      <Navbar />
      {loading && <Loader />}
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={
            <>
              <SectionFirst />
              <SectionSecond />
              <SectionThird />
              <SectionFourth />
              <SectionSixth />
              <SectionFifth />
            </>
          } />
          <Route path="/companies" element={<Companies />} />
          <Route element={<About />} path="/about" />
          <Route
            path="/"
            element={
              <>
                <SectionFirst />
                <SectionSecond />
                <SectionThird />
                <SectionFourth />
                <SectionSixth />
                <SectionFifth />
              </>
            }
          />

          <Route path='/companies' element={<Companies />} />
          <Route path='/blogs' element={<Carousel />} />

          <Route path="/find-jobs" element={<FindJobs />} />

          <Route path={
            user?.user?.accountType === "seeker"
              ? "/user-profile"
              : "/user-profile/:id"
          } element={<UserProfile />} />

          <Route
            path={
              user?.user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/company-profile/:id" element={<CompanyProfile />} />
          <Route path="/upload-job" element={<UploadJob />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} /> {/* Route for ContactForm */}
          <Route path="/privacy" element={<KaamDoPrivacyPolicy />} />
          <Route path="/terms" element={<KaamDoTermsConditions />} />
        </Route>
        <Route path="/about-us" element={<About/ >} />
        <Route path="/user-auth" element={<AuthPage />} />
        <Route path="/candidates" element={<CandidatePage/>}/>
        <Route path="/popular-jobs" element={<PopularJobs />} /> {/* Popular Jobs route */}
        <Route
          path="/"
          element={<Navigate to="/find-jobs" replace={true} />}
        />
        <Route path='/*' element={<Error />} />

        <Route path="*" element={<Navigate to="/find-jobs" replace />} />
        <Route path="/resume" element={<Temp />} />
        <Route path="/" element={<Navigate to="/find-jobs" replace={true} />} />
      </Routes>
      <BiArrowToTop
        className="fixed bottom-4 right-4 border rounded-full p-1"
        size={50}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      />
      {user && <Footer />}
    </main>
  );
}

export default App;
