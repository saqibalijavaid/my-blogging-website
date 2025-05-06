import React from "react";
import { Link } from "react-router-dom";

const OurStory = () => {
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Innovation begins with a vision
        </h1>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-xl md:text-2xl mb-8">
            Innovatica is where ideas transform into impactful solutions. Here,
            creators, thinkers, and builders come together to shape the
            future — without barriers, gatekeepers, or limitations.
          </p>

          <p className="mb-6">
            In a world of noise and distraction, Innovatica offers clarity and
            purpose. We provide a platform where meaningful innovation thrives,
            where substance matters more than style, and where your breakthrough
            ideas find their audience.
          </p>

          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-8">
            Ultimately, our mission is to accelerate human progress through the
            power of collaborative innovation.
          </blockquote>

          <p className="mb-6">
            We believe that every great advancement begins with a single idea.
            Words can challenge or inspire us, code can solve or create
            problems, designs can confuse or clarify. In an era where the
            flashiest solutions often win over the most effective ones, we're
            building an ecosystem that rewards depth, thoughtfulness, and
            genuine impact.
          </p>

          <p className="mb-6">
            Over 50,000 innovators share their insights on Innovatica every
            month. They're engineers, entrepreneurs, researchers, educators, and
            dreamers — all united by their drive to make a difference. They
            document their breakthroughs, share their setbacks, and offer wisdom
            that can only come from hands-on experience.
          </p>

          <p className="mb-8">
            Instead of prioritizing engagement metrics or selling your
            attention, we're supported by a community of forward-thinkers who
            believe in our vision. If you're new here, start exploring. Dive
            into topics that spark your curiosity, or share your own innovations
            with others who appreciate the journey as much as the destination.
          </p>

          <div className="mt-12 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Join the Innovatica community
            </h2>

            <p className="mb-4">
              Whether you're building the future or simply curious about what's
              next, there's a place for you here.
            </p>

            <Link
              to="/signup"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Start your innovation journey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;