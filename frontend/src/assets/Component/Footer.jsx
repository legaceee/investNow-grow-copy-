import { Link } from "react-router-dom";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  Twitter,
} from "lucide-react";

function Footer({ path = [] }) {
  return (
    <footer className="w-full bg-gray-100 z-10 relative px-4 sm:px-6 lg:px-32 pt-16 sm:pt-24">
      <div className="flex flex-col">
        {/* breadcrumbs */}
        <div className="flex flex-wrap gap-x-1 gap-y-1 text-sm text-gray-700">
          {path?.[0] && <Link to="/">{path[0]}&#62;</Link>}
          {path?.[1] && <Link to="/">{path[1]}&#62;</Link>}
          {path?.[2] && <Link to="/">{path[2]}</Link>}
        </div>
      </div>

      {/* 🔹 Footer columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        <div>
          <h3 className="text-lg">INVESTnow</h3>
          <div className="flex flex-col">
            <span>Lorem, ipsum dolor, wenkatu</span>
            <span>Lorem ipsum dolor sit.</span>
            <span>Lorem, ipsum.</span>
          </div>
          <div>
            <div className="mt-5">
              <Link to={"/"}>CONTACT US</Link>
              <hr className="border-t-2 border-dashed border-gray-400 my-4" />
            </div>
            <div className="flex gap-4 mt-5">
              <Twitter />
              <InstagramIcon />
              <FacebookIcon />
              <LinkedinIcon />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg">INVESTnoww</h3>
          <div>
            <h3>home</h3>
            <h3>services</h3>
            <h3>blogs</h3>
          </div>
        </div>

        <div>
          <h3 className="text-lg">PRODUCTS</h3>
          <div>
            <h3>blogs</h3>
            <h3>blogs</h3>
            <h3>blogs</h3>
            <h3>blogs</h3>
            <h3>blogs</h3>
          </div>
        </div>

        <div>
          <h3>blogs</h3>
          <h3>blogs</h3>
          <h3>blogs</h3>
          <h3>blogs</h3>
          <h3>blogs</h3>
        </div>
      </div>

      {/* 🔹 Copyright below */}
      <div className="mt-10 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-700">
        <span>&copy; 2025-2030 INVESTnow. All rights reserved.</span>
        <span>version 1.0.0</span>
      </div>
      {/*second footer*/}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-sm">
          <h3>STOCKS</h3>
          <h3>HIGHEST GAINERS</h3>
          <h3>WILDCARDS</h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
