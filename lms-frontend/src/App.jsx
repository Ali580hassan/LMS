import { Routes, Route } from 'react-router-dom';

// Layout & Protection Components
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import TopLoader from './components/TopLoader.jsx';

// Auth Pages
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';

// Common / Shared Pages
import LMSHomePage from './pages/common/LMSHomePage.jsx';
import Courses from './pages/common/Courses.jsx';
import CourseDetail from './pages/common/CourseDetail.jsx';

// Student Pages
import MyCourses from './pages/student/MyCourses.jsx';

// Instructor Pages
import CreateCourse from './pages/instructor/CreateCourse.jsx';
import InstructorCourses from './pages/instructor/InstructorCourses.jsx';
import CourseStudents from './pages/instructor/CourseStudents.jsx';
import CreateQuiz from './pages/instructor/CreateQuiz.jsx';
import QuizStats from './pages/student/QuizStats.jsx';
import CreateAssignment from './pages/instructor/CreateAssignment.jsx';
import EditAssignment from './pages/instructor/EditAssignment.jsx';
// Admin Pages
import Categories from './pages/admin/Categories.jsx';
import GradeSubmissions from './pages/instructor/GradeSubmissions.jsx';
import MyCertificates from './pages/student/MyCertificates.jsx';
import CertificateView from './pages/student/CertificateView.jsx';
import VerifyCertificate from './pages/common/VerifyCertificate.jsx';
import IssuedCertificates from './pages/instructor/IssuedCertificates.jsx';
import NotFound from './pages/auth/NotFound.jsx';
import Unauthorized from './pages/auth/Unauthorized.jsx';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <TopLoader />
      <ToastContainer position="bottom-center" draggable />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LMSHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Student, Instructor & Admin Shared Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student', 'instructor', 'admin']} />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/certificates" element={<MyCertificates />} />
          <Route path="/certificates/:id" element={<CertificateView />} />
          <Route path="/verify/:id" element={<VerifyCertificate />} />
        </Route>

        {/* ONLY Instructor & Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['instructor', 'admin']} />}>
          <Route path="/courses/new" element={<CreateCourse />} />
          <Route path="/instructor/courses" element={<InstructorCourses />} />
          <Route path="/instructor/courses/:id/students" element={<CourseStudents />} />
          <Route path="/courses/:id/quizzes/new" element={<CreateQuiz />} />
          <Route path="/instructor/courses/:id/quiz-stats" element={<QuizStats />} />
          <Route path="/courses/:id/assignments/new" element={<CreateAssignment />} />
          <Route path="/courses/:id/assignments/:assignmentId/edit" element={<EditAssignment />} />
          <Route path="/courses/:id/assignments/:assignmentId/submissions" element={<GradeSubmissions />} />
          <Route path="/instructor/certificates" element={<IssuedCertificates />} />
        </Route>

        {/* ONLY Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </div>
  );
}