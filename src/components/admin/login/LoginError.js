import PropTypes from "prop-types";

export default function LoginError({ children }) {
    return <div className="login-error">{children}</div>;
}

LoginError.propTypes = {
    children: PropTypes.node.isRequired,
};