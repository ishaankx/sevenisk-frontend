import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="copyright w-full text-center py-6 bg-dark-card mt-5">
      <p className="text-dark-text">
        © {new Date().getFullYear()} SevenIsK. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;