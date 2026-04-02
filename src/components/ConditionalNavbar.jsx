import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import NavbarWithHome from './NavbarWithHome';

export default function ConditionalNavbar() {
  const location = useLocation();
  
  // Pages that should use the regular Navbar (without Home button)
  const regularNavbarPages = ['/', '/categories', '/diabetes-reversal'];
  
  // Check if current path should use regular navbar
  const shouldUseRegularNavbar = regularNavbarPages.includes(location.pathname) || 
    location.pathname.startsWith('/diabetes-reversal');
  
  return shouldUseRegularNavbar ? <Navbar /> : <NavbarWithHome />;
}
