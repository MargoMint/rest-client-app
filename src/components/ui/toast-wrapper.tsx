'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastWrapper() {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeButton={false}
        toastStyle={{
          background: 'rgba(0,0,0,0.5)',
          color: 'var(--white)',
        }}
      />
    </div>
  );
}
