import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="admin-layout d-flex min-vh-100">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="admin-main flex-grow-1 d-flex flex-column" style={{minHeight: '100vh'}}>
        <Header onToggleSidebar={toggleSidebar} />
        <main
          className="flex-grow-1 p-3"
          style={{
            background: '#f8f9fa',
            overflowY: 'auto',
            minHeight: 0, // Đảm bảo flexbox cho phép cuộn
            maxHeight: 'calc(100vh - 64px - 56px)' // 64px header, 56px footer (tuỳ chỉnh nếu khác)
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default AdminLayout;