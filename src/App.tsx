import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RootLayout from './components/layout/RootLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BrowsePage from './pages/BrowsePage';
import BookDetailPage from './pages/BookDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import RequestsPage from './pages/RequestsPage';
import AddBookPage from './pages/AddBookPage';
import MyBooksPage from './pages/MyBooksPage';
import WishlistPage from './pages/WishlistPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Full-screen routes (no Navbar/Footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Routes with Navbar/Footer */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="browse" element={<BrowsePage />} />
            <Route path="book/:id" element={<BookDetailPage />} />
            <Route path="requests" element={<RequestsPage />} />
            {/* Member routes */}
            <Route path="add-book" element={<AddBookPage />} />
            <Route path="my-books" element={<MyBooksPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
