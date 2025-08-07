import React from "react";
import "./LandingPage.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { ReactComponent as HeroSVG } from "../../assests/hero.svg"; // Ensure this exists

export default function LandingPage() {
  return (
    <div className="LandingPage_Container">
      {/* Animated Floating Shapes */}
      <div className="LandingPage_FloatingShape shape1"></div>
      <div className="LandingPage_FloatingShape shape2"></div>

      <header className="LandingPage_Hero">
        <Parallax speed={-10}>
          <motion.div
            className="LandingPage_Hero_Content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="LandingPage_Hero_Text">
              <h2>Unleash Your Thoughts</h2>
              <p>Write. Share. Inspire. Your journey starts here.</p>
              <Link to="/blogs" className="LandingPage_Hero_Button">
                Explore Blogs
              </Link>
            </div>
            <div className="LandingPage_Hero_Illustration">
              <HeroSVG className="LandingPage_Hero_SVG" />
            </div>
          </motion.div>
        </Parallax>
      </header>

      <section className="LandingPage_Features" id="features">
        <h3 className="LandingPage_Section_Heading">Features</h3>
        <div className="LandingPage_Features_Grid">
          <div className="LandingPage_Feature_Item">
            <h4>Modern Tech Stack</h4>
            <p>
              Developed using Node.js, Express, MongoDB, and React for seamless
              performance.
            </p>
          </div>
          <div className="LandingPage_Feature_Item">
            <h4>Markdown Support</h4>
            <p>
              Includes a markdown parser for effortless writing and clean
              rendering of blog content.
            </p>
          </div>
          <div className="LandingPage_Feature_Item">
            <h4>Smart Search</h4>
            <p>
              Integrated debounced search, triggering API calls with a 0.5s
              delay to reduce load and increase efficiency.
            </p>
          </div>
          <div className="LandingPage_Feature_Item">
            <h4>Efficient Rendering</h4>
            <p>
              Uses infinite scrolling, lazy loading, and paginated rendering for
              smooth UX.
            </p>
          </div>
          <div className="LandingPage_Feature_Item">
            <h4>Shimmer UI</h4>
            <p>
              Displays sleek shimmer effects during content loading to enhance
              perceived performance.
            </p>
          </div>
          <div className="LandingPage_Feature_Item">
            <h4>Google OAuth</h4>
            <p>
              Secure and quick login via Google for a seamless authentication
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="LandingPage_About" id="about">
        <h3 className="LandingPage_Section_Heading">About BlogSpark</h3>
        <p className="LandingPage_About_Text">
          BlogSpark is a platform built for writers and readers. Whether you're
          here to share your story or explore thoughts from others, BlogSpark
          makes it effortless and enjoyable.
        </p>
      </section>

      <footer className="LandingPage_Footer" id="contact">
        <p>© 2025 BlogSpark. All rights reserved.</p>
      </footer>
    </div>
  );
}
