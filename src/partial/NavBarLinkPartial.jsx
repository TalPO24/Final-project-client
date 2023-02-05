import { NavLink } from "react-router-dom";

//* This function is a React functional component that renders a navigation bar link.
//* The component takes in two props, "label" and "link" which are used to render the link.
//* It returns a list item element that contains a "NavLink" component from the "react-router-dom" library.
//* The "NavLink" component is used to create a link that is aware of the current route and will apply an active class to the link when the route is a match.
//* The "to" prop of the NavLink component is set to the "link" prop passed to the component, so the link will navigate to the specified route.
//* The "isActive" prop is a function that takes in a "match" and "location" object and returns a boolean value that indicates whether the link should be considered active.
//* In this case, it's only active when the match is exact.
const NavBarLinkPartial = ({ label, link }) => {
  return (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        to={link}
        isActive={(match, location) => match && match.isExact}
      >
        {label}
      </NavLink>
    </li>
  );
};
export default NavBarLinkPartial;
