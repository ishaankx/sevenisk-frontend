import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface Work {
  img: string;
  title: string;
  description: string;
  link: string;
}

// Content from index.html
const portfolioData: Work[] = [
  {
    img: '/images/rimas.png',
    title: 'R.I.M.A.S',
    description: 'R.I.M.A.S: Real-time advanced monitoring system is your accountability buddy powered with Ai to monitor you and advice you to work productively.',
    link: 'https://github.com/ishaankx/RIMAS',
  },
  {
    img: '/images/xatnys.png',
    title: 'Xatnys',
    description: 'Xatnys is an AI-based operating system meant to transform the human-computer interface through full integration of artificial intelligence...',
    link: 'https://github.com/ishaankx/Xatnys',
  },
  {
    img: '/images/WIS.png',
    title: 'WIS',
    description: 'WIS: Where I Stand is a financial tracker for an individual to check where does he stand financially by comparing net worth with other benchmarks.',
    link: '#',
  },
];

const Portfolio: React.FC = () => {
  return (
    <div id="portfolio" className="py-20">
      <div className="container mx-auto px-5">
        <h1 className="sub-title">Portfolio</h1>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {portfolioData.map((work, index) => (
            <div key={index} className="work rounded-lg relative overflow-hidden group">
              <Image
                src={work.img}
                alt={work.title}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg block transition-transform duration-500 group-hover:scale-110"
              />
              <div className="layer portfolio-layer w-full h-0 absolute left-0 bottom-0 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-4 transition-all duration-500 group-hover:h-full">
                <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                <p className="text-sm mb-4">{work.description}</p>
                <Link
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 bg-white text-brand-teal-hover w-12 h-12 rounded-full flex items-center justify-center text-lg"
                >
                  <FontAwesomeIcon icon={faLink} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="btn block w-fit mx-auto border border-brand-teal-dark py-3 px-12 rounded-md text-white mt-12 transition-all duration-500 hover:bg-brand-teal-dark"
        >
          See more
        </a>
      </div>
    </div>
  );
};

export default Portfolio;