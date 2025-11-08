'use client';

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { requestCV } from '@/lib/api';
import toast from 'react-hot-toast';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Get the API URL from your api.ts file (it's hardcoded there)
// This is not best practice, but consistent with your current code.
const API_BASE_URL = 'https://sevenisk-api.onrender.com';

const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sending request...');

    try {
      // 1. Log the user's details (POST request)
      const response = await requestCV({ name, email });
      toast.success(response.data.message || 'Request successful!', { id: toastId });

      // 2. Trigger the file download (GET request)
      const downloadUrl = `${API_BASE_URL}/cv/download`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'Ishaan-Katara-CV.pdf');
      document.body.appendChild(link);
      link.click();
      
      // 3. Clean up
      link.parentNode?.removeChild(link);
      setLoading(false);
      setName('');
      setEmail('');
      onClose();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.', { id: toastId });
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-card rounded-lg w-full max-w-md p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-dark-text hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-brand-teal">Download CV</h2>
            <p className="text-dark-text mb-6">
              To receive the CV, please enter your details. It will be sent directly to your inbox.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-dark-text mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-dark-bg border border-dark-text/50 outline-none p-3 rounded-md text-white text-lg"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-dark-bg border border-dark-text/50 outline-none p-3 rounded-md text-white text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn w-full bg-brand-teal-hover text-black py-3 px-8 rounded-md font-semibold cursor-pointer transition-all duration-300 hover:bg-brand-teal disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Submit & Download'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;