// import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub, FaYoutube } from "react-icons/fa6";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-400 py-8">
//       <div className="max-w-4xl mx-auto text-center">
//         <div className="flex justify-center space-x-6 text-sm mb-4">
//           <a href="#" className="hover:text-white">About</a>
//           <a href="#" className="hover:text-white">Blog</a>
//           <a href="#" className="hover:text-white">Jobs</a>
//           <a href="#" className="hover:text-white">Press</a>
//           <a href="#" className="hover:text-white">Accessibility</a>
//           <a href="#" className="hover:text-white">Partners</a>
//         </div>
//         <div className="flex justify-center space-x-6 text-xl mb-4">
//           <a href="#" className="hover:text-white"><FaFacebookF /></a>
//           <a href="#" className="hover:text-white"><FaInstagram /></a>
//           <a href="#" className="hover:text-white"><FaXTwitter /></a>
//           <a href="#" className="hover:text-white"><FaGithub /></a>
//           <a href="#" className="hover:text-white"><FaYoutube /></a>
//         </div>
//         <p className="text-sm">&copy; 2025 Innovatica, Inc. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Responsive navigation links */}
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-sm mb-4">
          <a href="#" className="hover:text-white block mb-2 md:mb-0">About</a>
          <a href="#" className="hover:text-white block mb-2 md:mb-0">Blog</a>
          <a href="#" className="hover:text-white block mb-2 md:mb-0">Jobs</a>
          <a href="#" className="hover:text-white block mb-2 md:mb-0">Press</a>
          <a href="#" className="hover:text-white block mb-2 md:mb-0">Accessibility</a>
          <a href="#" className="hover:text-white block mb-2 md:mb-0">Partners</a>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-4 md:space-x-6 text-xl mb-4">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaXTwitter /></a>
          <a href="#" className="hover:text-white"><FaGithub /></a>
          <a href="#" className="hover:text-white"><FaYoutube /></a>
        </div>

        {/* Copyright text */}
        <p className="text-sm">&copy; 2025 Innovatica, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}