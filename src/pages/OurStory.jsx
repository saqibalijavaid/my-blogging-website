// import React from "react";

// const OurStory = () => {
//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-20 px-6 md:px-20">
//       <div className="max-w-4xl text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
//           Every Idea Deserves to Shine
//         </h1>
//         <p className="text-lg text-gray-300 leading-relaxed">
//           Innovatica is a home for visionaries, thinkers, and dreamers. Here, anyone can transform ideas into impact, without barriers or limitations. In a world filled with noise, Innovatica is the space where clarity meets creativity, and innovation finds its voice.
//         </p>
//       </div>

//       <div className="max-w-3xl mt-10 border-l-4 border-green-500 pl-6 text-lg text-gray-300">
//         <p className="italic">
//           "Our goal is to empower the curious minds of the world, providing a platform where knowledge flows freely, creativity is nurtured, and groundbreaking ideas take flight."
//         </p>
//       </div>

//       <div className="max-w-4xl mt-10 text-center text-gray-300 leading-relaxed">
//         <p>
//           We believe in the power of shared knowledge. The world moves forward when ideas are exchanged, and stories are told. Innovatica is built for those who seek depth, nuance, and meaningful connections. A space where originality thrives over trends, and substance outweighs superficiality.
//         </p>
//         <p className="mt-4">
//           Thousands of innovators, creators, and forward-thinkers gather here, from engineers to artists, entrepreneurs to educators. They share what they build, what keeps them inspired, and what they’ve learned along the way.
//         </p>
//       </div>

//       <div className="max-w-4xl mt-10 text-center">
//         <p className="text-gray-300">Join a growing community that believes in the power of ideas.</p>
//       </div>
//     </div>
//   );
// };

// export default OurStory;

import React from "react";

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

            <a
              href="/signup"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Start your innovation journey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;

// OurStory.jsx
// import React from 'react';

// const OurStory = () => {
//   return (
//     <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
//           Innovatica
//         </h1>
//         <p className="mt-4 text-xl text-gray-600">
//           Everyone has an idea worth sharing
//         </p>
//         <div className="mt-8 space-y-6 text-left">
//           <p className="text-lg text-gray-700">
//             Innovatica is a platform where creativity meets technology. Here, anyone can share their innovative ideas, insights, and experiences with the world—without needing a massive following or a built-in audience. The digital world is vast and often overwhelming; Innovatica is a serene space brimming with inspiration and knowledge. It's intuitive, elegant, collaborative, and designed to connect your ideas with the right audience.
//           </p>
//           <p className="text-lg text-gray-700">
//             Our mission is to foster a global community of thinkers, creators, and innovators. We believe that every idea has the potential to spark change, solve problems, and inspire others. In a world where quick, superficial content often dominates, we strive to create a platform that values depth, originality, and meaningful engagement. Innovatica is a place for thoughtful dialogue, where substance triumphs over style.
//           </p>
//           <p className="text-lg text-gray-700">
//             Over 50 million curious minds engage with Innovatica every month. They are engineers, artists, entrepreneurs, students, and visionaries—each with a unique perspective to share. They write about their breakthroughs, challenges, passions, and lessons learned, offering insights that can enlighten and empower others.
//           </p>
//           <p className="text-lg text-gray-700">
//             Unlike traditional platforms, Innovatica is supported by a vibrant community of members who believe in the power of innovation. If you're new here, start exploring. Dive into topics that matter to you. Discover posts that challenge your thinking, expand your knowledge, or inspire you to create something new—and then share your own story with the world.
//           </p>
//         </div>

//         <div className="mt-10">
//           <a
//             href="/signup"
//             className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
//           >
//             Join Innovatica
//           </a>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default OurStory;
