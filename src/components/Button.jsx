import PropTypes from "prop-types";
import { useContext } from "react";
import themeContext from "../context/Theme";

function Button({ text, className, ...props }) {
  const theme = useContext(themeContext);

  return (
    <button
      {...props}
      className={`btn btn-${theme} ${className ? className : ""}`}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
