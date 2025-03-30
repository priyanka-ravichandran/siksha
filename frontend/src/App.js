import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AssignmentSubmission from './pages/AssignmentSubmission';
import SubmittedAssignments from './pages/SubmittedAssignments';
import GradeEvaluation from './pages/GradeEvaluation';
import GradeAssignmentPage from './pages/GradeAssignmentPage';

const userType = 'professor'; // Change to 'student' or 'professor'

const App = () => {
  return (
    <Router>
      <Navbar userType={userType} />
      <Routes>
        {userType === 'student' && (
          <>
            <Route path="/" element={<AssignmentSubmission />} />
            <Route path="/assignments" element={<SubmittedAssignments />} />
            <Route path="/submit" element={<AssignmentSubmission />} />
          </>
        )}
        {userType === 'professor' && (
          <>
           <Route path="/" element={<GradeEvaluation />} /> {/* Default for professor */}
            <Route path="/grade" element={<GradeEvaluation />} />
            <Route path="/grade/:id" element={<GradeAssignmentPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};


export default App;
