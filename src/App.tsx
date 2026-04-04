import { Route, Routes } from 'react-router-dom'
import NearbyHospitals from './components/NearbyHospitals'
import CommunityDetailPage from './components/community/CommunityDetailPage'
import CommunityPage from './components/community/CommunityPage'
import HomeRoute from './components/routing/HomeRoute'
import RequireAuth from './components/routing/RequireAuth'
import PrescriptionListPage from './components/prescription/PrescriptionListPage'
import PrescriptionTranslatePage from './components/prescription/PrescriptionTranslatePage'
import PrescriptionLoadingScreen from './components/prescription/PrescriptionLoadingScreen'
import PrescriptionResultScreen from './components/prescription/PrescriptionResultScreen'
import SymptomInputScreen from './components/symptom/SymptomInputScreen'
import SymptomLoadingScreen from './components/symptom/SymptomLoadingScreen'
import SymptomResultScreen from './components/symptom/SymptomResultScreen'
import MyPageScreen from './components/mypage/MyPageScreen'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route
        path="/nearby-hospitals"
        element={
          <RequireAuth>
            <NearbyHospitals />
          </RequireAuth>
        }
      />
      <Route
        path="/prescriptions"
        element={
          <RequireAuth>
            <PrescriptionListPage />
          </RequireAuth>
        }
      />
      <Route
        path="/prescriptions/translate"
        element={
          <RequireAuth>
            <PrescriptionTranslatePage />
          </RequireAuth>
        }
      />
      <Route
        path="/prescriptions/loading"
        element={
          <RequireAuth>
            <PrescriptionLoadingScreen />
          </RequireAuth>
        }
      />
      <Route
        path="/prescriptions/result"
        element={
          <RequireAuth>
            <PrescriptionResultScreen />
          </RequireAuth>
        }
      />
      <Route
        path="/community"
        element={
          <RequireAuth>
            <CommunityPage />
          </RequireAuth>
        }
      />
      <Route
        path="/community/:postId"
        element={
          <RequireAuth>
            <CommunityDetailPage />
          </RequireAuth>
        }
      />
      <Route
        path="/symptom-input"
        element={
          <RequireAuth>
            <SymptomInputScreen />
          </RequireAuth>
        }
      />
      <Route
        path="/symptom-loading"
        element={
          <RequireAuth>
            <SymptomLoadingScreen />
          </RequireAuth>
        }
      />
      <Route
        path="/symptom-result"
        element={
          <RequireAuth>
            <SymptomResultScreen />
          </RequireAuth>
        }
      />
      <Route
        path="/mypage"
        element={
          <RequireAuth>
            <MyPageScreen />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default App
