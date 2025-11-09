'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import CVModal from './CVModal'; // The secure modal

type Tab = 'skills' | 'expereince' | 'education';

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? 'text-white border-b-2 border-brand-teal'
    : 'text-dark-text';
  
  return (
    <button onClick={selectTab}>
      <p className={`mr-6 font-semibold ${buttonClasses} transition-all`}>
        {children}
      </p>
    </button>
  );
};

const About: React.FC = () => {
  const [tab, setTab] = useState<Tab>('skills');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div id="about" className="py-20 text-dark-text">
        <div className="container mx-auto px-5">
          {/* ----- ABOUT US Section ----- */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-24">
            <div className="flex-shrink-0 md:w-1/3">
              <Image
                src="/images/Desig.jpg"
                alt="Our Design Process"
                width={500}
                height={500}
                className="rounded-lg w-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="sub-title">About Us</h1>
              <p className="text-lg text-justify mb-4">
                As a premier service provider and software development organization, we are dedicated to delivering high-quality and innovative solutions tailored to meet our customers&apos; unique challenges.
              </p>
              <p className="text-justify mb-4">
                Our mission is to design and develop professional, top-tier software across various categories, empowering individuals and businesses to achieve their goals efficiently and effectively.
              </p>
              <p className="text-justify">
                We pride ourselves on our commitment to excellence, ensuring that every software product we create is robust, reliable, and user-friendly.
              </p>
            </div>
          </div>

          {/* ----- ABOUT FOUNDER Section ----- */}
          <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-start">
            <div className="flex-1">
              <h1 className="sub-title">About The Founder</h1>
              <p className="text-lg text-justify mb-6">
                Hi, I&apos;m Ishaan Katara the founder and developer of SevenIsk. I&apos;m a B.tech CSE graduate from JIIT. I started my journey as a student who is interested in coding but now it is my passion and I want to innovate and develop the solution for the problems humans face through technology.
              </p>

              {/* React Tabs */}
              <div className="flex flex-row mt-8 mb-4">
                <TabButton selectTab={() => setTab('skills')} active={tab === 'skills'}>
                  Skills
                </TabButton>
                <TabButton selectTab={() => setTab('expereince')} active={tab === 'expereince'}>
                  Experience
                </TabButton>
                <TabButton selectTab={() => setTab('education')} active={tab === 'education'}>
                  Education
                </TabButton>
              </div>
              <div className="mt-4 min-h-[180px]">
                {/* Content from index.html tabs */}
                {tab === 'skills' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span>AI\ML</span><br />Developing and Training ML models.</li>
                    <li><span>Agentic AI Development</span><br />Developing and Designing Agentic AI.</li>
                    <li><span>Back-End Development</span><br />Creating server side back-end using Python and Node.js.</li>
                    <li><span>DevOps</span><br />Creating and delivering quality softwares through automation.</li>
                  </ul>
                )}
                {tab === 'expereince' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span>Jan 2025 - March 2025 </span><br />SDE Intern at Digital India Corporation.</li>
                    <li><span>Oct 2024 - Dec 2024</span><br />SDE Intern at STQC (Ministry of Electronics and Information Technology).</li>
                    <li><span>May 2024 - July 2024</span><br />SDE Intern at Sustainivo.</li>
                    <li><span>Nov 2022 - Current</span><br />Founder of Merch Pirates a merchandise retail organization.</li>
                  </ul>
                )}
                {tab === 'education' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span>2023 - 2025</span><br />B. Tech in CSE from JIIT, Noida-62</li>
                    <li><span>2021 - 2022</span><br />B. Tech in CSE from DIT, Dehradun</li>
                    <li><span>2020 - 2021</span><br />CBSE Class 12th from Modern Public School, Delhi.</li>
                  </ul>
                )}
              </div>
              
              {/* New CV Download Button (Modal Trigger) */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn inline-block bg-brand-teal-hover text-black py-3 px-8 rounded-md font-semibold mt-6 transition-all duration-300 hover:bg-brand-teal"
              >
                Download CV
              </button>

            </div>
            <div className="flex-shrink-0 md:w-1/3">
              <Image
                src="/images/founder2.png"
                alt="Ishaan Katara, Founder"
                width={400}
                height={400}
                className="rounded-lg w-full max-w-[270px] md:max-w-full mx-auto"
              />
              <p className="text-center mt-2 text-dark-text">Ishaan Katara, Founder & Developer</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* The Modal Component */}
      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default About;