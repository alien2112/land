'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Yousef Al Harbi',
    role: 'Lead Concrete Cutter',
    image: '/IMG-20251111-WA0030.webp',
  },
  {
    name: 'Faisal Al Qahtani',
    role: 'Project Supervisor',
    image: '/IMG-20251111-WA0028.webp',
  },
  {
    name: 'Hassan Al Amri',
    role: 'Diamond Saw Specialist',
    image: '/IMG-20251111-WA0032.webp',
  },
  {
    name: 'Khalid Al Zahrani',
    role: 'Safety Coordinator',
    image: '/IMG-20251111-WA0034.webp',
  },
  {
    name: 'Omar Al Mutairi',
    role: 'Epoxy Injection Expert',
    image: '/IMG-20251111-WA0036.webp',
  },
  {
    name: 'Abdulrahman Al Ghamdi',
    role: 'Demolition Planner',
    image: '/IMG-20251111-WA0038.webp',
  },
];

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-24 px-10 bg-black text-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h4 className="text-sm md:text-base font-semibold text-white/85 uppercase tracking-wider mb-4">
            TEAM
          </h4>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="block">Meet Our MEN</span>
          </h2>
        </motion.div>

        <div className="relative mb-12">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / 3)}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="min-w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1.5rem)]"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors"
                  >
                    <div className="aspect-square rounded-lg mb-4 relative overflow-hidden group">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        sizes="(min-width: 768px) 20vw, 75vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <div className="flex gap-4">
                          <Link
                            href="https://www.instagram.com/jitu.ux/"
                            target="_blank"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-xs">IG</span>
                          </Link>
                          <Link
                            href="https://www.linkedin.com/in/jitendra-raut/"
                            target="_blank"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-xs">LI</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                    <p className="text-white/85">{member.role}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {[...Array(Math.ceil(teamMembers.length / 3))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-white w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <h4 className="text-xl font-semibold">See All</h4>
          <Link
            href="/speakers"
            className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

