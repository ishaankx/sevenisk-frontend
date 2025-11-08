'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { submitContactForm } from '@/lib/api';
import { ContactFormData } from '@/lib/types';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sending message...');

    try {
      const response = await submitContactForm(formData); 
      toast.success(response.data.message || 'Message sent successfully!', { id: toastId });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send message.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="py-20">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column */}
          <div className="contact-left md:w-1/3">
            <h1 className="sub-title">Contact Us</h1>
            <p className="mt-6 flex items-center">
              <FontAwesomeIcon icon={faPaperPlane} className="text-brand-teal-hover text-xl mr-4" />
              thesevenisk@gmail.com
            </p>
            <p className="mt-4 flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-brand-teal-hover text-xl mr-4" />
              7982650602
            </p>
            <div className="social-icons mt-8 flex space-x-4">
              <a href="https://www.instagram.com/thesevenisk/" target="_blank" rel="noopener noreferrer" className="text-dark-text text-3xl transition-transform duration-300 hover:text-brand-teal-hover hover:-translate-y-1">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.linkedin.com/company/sevenisk/" target="_blank" rel="noopener noreferrer" className="text-dark-text text-3xl transition-transform duration-300 hover:text-brand-teal-hover hover:-translate-y-1">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/ishaankx/" target="_blank" rel="noopener noreferrer" className="text-dark-text text-3xl transition-transform duration-300 hover:text-brand-teal-hover hover:-translate-y-1">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://x.com/SevenIsK" target="_blank" rel="noopener noreferrer" className="text-dark-text text-3xl transition-transform duration-300 hover:text-brand-teal-hover hover:-translate-y-1">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div className="contact-right md:w-2/3">
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-dark-card border-0 outline-none p-4 my-3 rounded-md text-white text-lg" 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-dark-card border-0 outline-none p-4 my-3 rounded-md text-white text-lg" 
              />
              <textarea 
                name="message" 
                rows={6} 
                placeholder="Your Message" 
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-dark-card border-0 outline-none p-4 my-3 rounded-md text-white text-lg"
              ></textarea>
              <button 
                type="submit" 
                disabled={loading}
                className="btn bg-brand-teal-hover text-black py-3 px-8 rounded-md font-semibold mt-3 cursor-pointer transition-all duration-300 hover:bg-brand-teal disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;