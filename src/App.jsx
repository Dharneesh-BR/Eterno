import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import NavbarWithHome from './components/NavbarWithHome';
import ConditionalNavbar from './components/ConditionalNavbar';
import RequireAuth from './components/RequireAuth';
import ProtectedRoute from './components/ProtectedRoute';
import OtpLoginPage from './pages/OtpLoginPage';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import SEO from './components/SEO';
import PixelTracker from './components/PixelTracker';
import Logo from '/icons/Logo icon.png';
import SimpleDashboard from './pages/SimpleDashboard';
import AdLandingPage from './pages/AdLandingPage';
import DiabetesLandingPage from './pages/DiabetesLandingPage';
import NewLandingPage from './pages/NewLandingPage';

// Import Programs component
import TestPrograms from './components/Programs';

import ProgramDetail from './pages/ProgramDetail';
import Footer from './components/Footer';
import Categories from './pages/Categories';
import Body from './pages/Body';
import Balance from './pages/Balance';
import Decode from './pages/Decode';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Community from './pages/Community';
import Partner from './pages/Partner';
import Research from './pages/Research';
import Contact from './pages/Contact';
import CancellationPolicy from './pages/CancellationPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AllArticles from './pages/AllArticles';
import OrderSuccess from './pages/OrderSuccess';
import Checkout from './pages/Checkout';
// Cart, Favorites, Coaching History
import Cart from './pages/Cart';
import FavoritesPage from './pages/Favorites';
import MyCourses from './pages/MyCourses';
import CoachingHistory from './pages/CoachingHistory';
import CartIcon from './components/CartIcon';
import CartDrawer from './components/Cart';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import ResearchDetail from './pages/ResearchDetail';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <PixelTracker />
          <SEO 
            title="Home"
            description="Discover balance, clarity, and emotional wellbeing at Eterno. Connect with trusted spiritual guides for mindfulness, meditation, and personal growth. Start your journey to inner peace today."
            keywords="spiritual healing, mindfulness, meditation, emotional wellbeing, personal growth, inner peace, wellness, spiritual guidance, mental health, self-discovery, transformation"
            image="/icons/eterno-logo.png"
            structuredData={{
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Eterno',
              url: 'https://eterno.fit',
              description: 'Discover balance, clarity, and emotional wellbeing at Eterno. Connect with trusted spiritual guides for mindfulness, meditation, and personal growth.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://eterno.fit/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            }}
          />
          <Routes>
            {/* Special Landing Pages - Standalone (No Navbar/Footer) */}
            <Route path="/special-offer" element={<AdLandingPage />} />
            <Route path="/diabetes-reversal" element={<DiabetesLandingPage />} />
            <Route path="/ad-decode-diabetes" element={<NewLandingPage />} />
            
            {/* Main Website Routes - With Navbar/Footer Layout */}
            <Route path="/*" element={
              <div className="flex flex-col min-h-screen">
                <ConditionalNavbar />
                <CartDrawer />
                <main className="flex-grow pt-20 md:pt-16">
                  <Routes>
                    <Route path="/" element={<Categories />} />
                    <Route path="/body" element={<Body />} />
                    <Route path="/balance" element={<Balance />} />
                    <Route path="/decode" element={<Decode />} />
                    {/* Body subpages now handled dynamically by ProgramDetail */}
                    <Route path="/about" element={<About />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/research" element={<Research />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/refund-and-cancellation" element={<CancellationPolicy />} />
                    <Route path="/shipping-and-delivery" element={<ShippingPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsConditions />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/programs/:slug" element={<ProgramDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/all-articles" element={<AllArticles />} />
                    <Route path="/programs" element={<TestPrograms />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp-login" element={<OtpLoginPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/dashboard/favorites" element={<RequireAuth><FavoritesPage /></RequireAuth>} />
                    <Route path="/dashboard/courses" element={<RequireAuth><MyCourses /></RequireAuth>} />
                    <Route path="/coaching-history" element={<RequireAuth><CoachingHistory /></RequireAuth>} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<RequireAuth><OrderSuccess /></RequireAuth>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/store/:slug" element={<ProductDetail />} exact />
                    <Route path="/research/:slug" element={<ResearchDetail />} />
                    <Route path="/store/*" element={<Store />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
              </div>
            } />
          </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
