import {Routes, Route, Navigate} from 'react-router-dom';

import SignupPage from './pages/signup.page';
import SigninPage from './pages/signin.page';
import DashboardPage from './pages/dashboard.page';
import SendPage from './pages/send.page';

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to='/signin' />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/send" element={<SendPage />} />
    </Routes>
    </>
  )
}
