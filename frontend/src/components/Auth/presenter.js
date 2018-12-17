import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const Auth = props => {
  console.log(props);
  return (
    <main className={styles.auth}>
      <div>
        <form className={styles.column} onSubmit={props.handleSubmit}>
          <label>username</label>
          <input
            type="text"
            value={props.username}
            onChange={props.handleInputChange}
            name="username"
          />
          <label>password</label>
          <input
            type="password"
            value={props.password}
            onChange={props.handleInputChange}
            name="password"
          />
          <input
            type="submit"
            text="Log In"
            onChange={props.handleInputChange}
          />
        </form>
      </div>
    </main>
  );
};

Auth.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default Auth;
