import { FaFacebookF, FaInstagram, FaXTwitter, FaGithub, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center space-x-6 text-sm mb-4">
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Blog</a>
          <a href="#" className="hover:text-white">Jobs</a>
          <a href="#" className="hover:text-white">Press</a>
          <a href="#" className="hover:text-white">Accessibility</a>
          <a href="#" className="hover:text-white">Partners</a>
        </div>
        <div className="flex justify-center space-x-6 text-xl mb-4">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaXTwitter /></a>
          <a href="#" className="hover:text-white"><FaGithub /></a>
          <a href="#" className="hover:text-white"><FaYoutube /></a>
        </div>
        <p className="text-sm">&copy; 2025 Innovatica, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
