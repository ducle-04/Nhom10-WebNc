import React from 'react';

function AdminFooter() {
  return (
    <footer className="admin-footer bg-light border-top text-center py-3 mt-auto" style={{fontSize: 15}}>
      <span className="text-muted">
        &copy; {new Date().getFullYear()} WildQuest Admin &nbsp;|&nbsp; Powered by <span className="text-primary fw-semibold">WildQuest Team</span>
      </span>
    </footer>
  );
}

export default AdminFooter;
