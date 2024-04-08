import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Links = ({ linksToRender = [], toggleNavbar, show }) => {
  return (
    <ul className="w-auto flex items-center gap-2">
      {linksToRender.map((link, idx) => {
        return (
          <li key={idx}>
            <NavLink
              to={link.to}
              className="p-2 flex items-center gap-2 font-sohne-regular text-primary-text text-[12px]"
              onClick={toggleNavbar} // Close navbar when link is clicked
            >
              {link.icon}
              <span className="hidden sm:block">{link.label}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

Links.propTypes = {
  linksToRender: PropTypes.array,
  toggleNavbar: PropTypes.func,
  show: PropTypes.bool,
};

export default Links;
