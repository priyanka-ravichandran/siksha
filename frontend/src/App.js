import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AssignmentSubmission from './pages/AssignmentSubmission';
import SubmittedAssignments from './pages/SubmittedAssignments';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/assignments" element={<SubmittedAssignments />} />
        <Route path="/submit" element={<AssignmentSubmission />} />
      </Routes>
    </Router>
  );
};

const Quiz = () => <div>Quiz</div>;

export default App;