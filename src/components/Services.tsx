import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faRobot, faMicrochip, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Service {
  icon: IconDefinition;
  title: string;
  description: string;
}

// Content from index.html
const servicesData: Service[] = [
  {
    icon: faLaptopCode,
    title: 'Software Development',
    description: 'Quality software solutions production for commercial and professional use cases.',
  },
  {
    icon: faRobot,
    title: 'Automation Using AI',
    description: 'Automation of softwares and tasks using AI and ML models, development of softwares which automate the tasks for better performance.',
  },
  {
    icon: faMicrochip,
    title: 'AI Integrated Development',
    description: 'Integration of AI into the sofwares and websites for advancement of the quality of work.',
  },
];

const Services: React.FC = () => {
  return (
    <div id="services" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-5">
        <h1 className="sub-title">Services</h1>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-dark-card p-8 rounded-lg transform transition-transform duration-500 hover:-translate-y-2 hover:bg-brand-teal-hover"
            >
              <FontAwesomeIcon icon={service.icon} className="text-5xl mb-6 text-brand-teal" />
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-dark-text">{service.description}</p>
              <a href="#" className="text-white inline-block mt-6 hover:text-brand-teal">
                Learn more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;