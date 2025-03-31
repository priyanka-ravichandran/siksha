import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AssignmentSubmission from './pages/AssignmentSubmission';
import SubmittedAssignments from './pages/SubmittedAssignments';
import GradeEvaluation from './pages/GradeEvaluation';
import GradeAssignmentPage from './pages/GradeAssignmentPage';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AppRoutes = () => {
  const query = useQuery();
  const [userType, setUserType] = useState(() => localStorage.getItem('role'));
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));

  useEffect(() => {
    const queryUserId = query.get('userId');
    const queryRole = query.get('role');
    console.log('Query Params:', queryUserId, queryRole);
    if (queryUserId && queryRole) {
      localStorage.setItem('userId', queryUserId);
      localStorage.setItem('role', queryRole);
      setUserId(queryUserId);
      setUserType(queryRole);
    }
  }, [query]);

  if (!userType) {
    return <div>Loading...</div>; // or redirect to login
  }

  return (
    <>
      <Navbar userType={userType} />
      <Routes>
        {userType === 'Student' && (
          <>
            <Route path="/" element={<AssignmentSubmission />} />
            <Route path="/assignments" element={<SubmittedAssignments />} />
            <Route path="/submit" element={<AssignmentSubmission />} />
          </>
        )}
        {userType === 'Tutor' && (
          <>
            <Route path="/" element={<GradeEvaluation />} />
            <Route path="/grade" element={<GradeEvaluation />} />
            <Route path="/grade/:id" element={<GradeAssignmentPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
