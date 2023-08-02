import { NavLink } from "react-router-dom";
import "./footer.css";

export function Footer() {
  return (
    <div className="footer-component-container">
      <footer className="footer-container">
      <div>
        <p className="bold">Get to know us</p>
        <p>About us</p>
        <p>Careers</p>
        <p>Press Releases</p>
        <p>@2023 Book Nook</p>
      </div>

      <div className="links-container">
        <p className="bold">Connect with developer</p>
        <p>
          <NavLink to={"https://github.com/TusharAnekar"} target="_blank" rel="noopener norefferrer" className={"links"}>Github</NavLink>
        </p>
        <p>
          <NavLink to={"https://twitter.com/TusharAnekar"} target="_blank" rel="noopener norefferrer" className={"links"}>Twitter</NavLink>
        </p>
        <p>
          <NavLink to={"https://www.linkedin.com/in/tusharanekar/"} target="_blank" rel="noopener norefferrer" className={"links"}>
            LinkedIn
          </NavLink>
        </p>
      </div>

      <div className="links-container">
        <p className="bold">Quick Links</p>
        <p>
          <NavLink to={"/login"} className={"links"}>Login</NavLink>
        </p>
        <p><NavLink to={"/signup"} className={"links"}>Sign Up</NavLink></p>
      </div>
    </footer>
    </div>
  );
}
