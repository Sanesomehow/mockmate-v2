"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../app/globals.css";

const page = () => {
  // Add scroll function for the "Learn More" button
  const scrollToSection = (sectionId) => {
    // Add a small timeout to ensure DOM is fully loaded
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Mockmate</title>
        <meta
          name="description"
          content="Ace your next interview with AI-powered mock interviews"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-dots">
        <div></div> {/* Added div for the improved bg-dots effect */}
        <motion.div className="p-6 rounded-lg backdrop-blur-sm flex flex-col items-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Ace Your Next Interview
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Practice with AI-powered mock interviews and get personalized feedback
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <a
              href="/dashboard"
              className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100"
            >
              Get Started
            </a>
            <button
              onClick={() => scrollToSection("features")}
              className="px-8 py-4 text-lg font-semibold border border-white text-white rounded-lg hover:bg-white hover:text-blue-600"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-4 flex gap-4">
          <a
            href="https://github.com/Sanesomehow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaGithub size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Introducing Mockmate</h2>
          <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <video 
              className="w-full h-auto" 
              controls 
              poster="/video-thumbnail.png"
            >
              <source src="/Video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mt-6 text-lg text-gray-600">
            Watch how our AI-powered interview platform helps you prepare for your next big opportunity.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform offers a range of powerful features to help you succeed:
          </p>
          <div className="flex flex-wrap justify-center mt-12 gap-8">
            <div className="w-full md:w-1/3 bg-blue-100 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-blue-600">Mock Interviews</h3>
              <p className="mt-2 text-gray-600">
                Experience realistic interview scenarios with our advanced AI.
              </p>
            </div>
            <div className="w-full md:w-1/3 bg-blue-100 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-blue-600">Instant Feedback</h3>
              <p className="mt-2 text-gray-600">
                Get instant, personalized feedback to improve your performance.
              </p>
            </div>
            <div className="w-full md:w-1/3 bg-blue-100 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-blue-600">Comprehensive Reports</h3>
              <p className="mt-2 text-gray-600">
                Receive detailed reports highlighting your strengths and weaknesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center mt-12 gap-8">
            <div className="w-full md:w-1/2 bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-600">
                "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview."
              </p>
              <h4 className="mt-4 text-lg font-semibold text-blue-600">- Alex Johnson</h4>
            </div>
            <div className="w-full md:w-1/2 bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-600">
                "The feedback was spot on and helped me improve my answers. Highly recommend this service!"
              </p>
              <h4 className="mt-4 text-lg font-semibold text-blue-600">- Sarah Williams</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <h2 className="text-4xl font-bold">Ready to Ace Your Next Interview?</h2>
        <p className="mt-4 text-lg">
          Join thousands of users who have improved their interview skills with Mockmate.
        </p>
        <a
          href="/dashboard"
          className="mt-8 inline-block px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100"
        >
          Get Started Now
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>© 2025 Mockmate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default page;