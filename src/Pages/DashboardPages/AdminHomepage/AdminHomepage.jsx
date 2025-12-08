import React from 'react';
import useAuth from '../../../hooks/useAuth/useAuth';

const AdminHomepage = () => {
    const {user} =useAuth()
    return (
      <div className="p-6 space-y-8">

      {/* ------------------ WELCOME CARD ------------------ */}
      <div className="bg-linear-to-r from-red-500 to-red-700 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName} 👋</h1>
        <p className="text-white/90 mt-1">Glad to see you back. Stay ready to save lives!</p>
      </div>

        </div>
    );
};

export default AdminHomepage;