import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  Fade,
} from "@material-ui/core";
import { withRouter, useLocation } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

import { authAction } from "../../redux/authSlice";
import SignInButton from "../../components/SignInButton/SignInButton";
import useAuth from "./useAuth";

function Login(props: any) {
  var classes = useStyles();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: any) => {
    return { isLoading: state.auth?.loading, error: state.auth?.error };
  });
  const { isAuthenticated } = useAuth();

  useEffect((): void => {
    if (!isAuthenticated) {
      const params = new URLSearchParams();
      params.append("client_id", process.env.REACT_APP_SLACK_APP_CLIENT_ID || '');
      params.append("client_secret", process.env.REACT_APP_SLACK_APP_CLIENT_SECRET || '');
      params.append("code", query.get("code") || "");
      params.append("redirect_uri", window.location.origin + window.location.pathname);

      dispatch(authAction(params));
    }
  }, []);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Authentication" classes={{ root: classes.tab }} />
          </Tabs>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              We are authenticating, wait for second.
            </Typography>
            {isLoading && (
              <div className={classes.loaderContainer}>
                <CircularProgress size={50} className={classes.loginLoader} />
              </div>
            )}
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                {error}
              </Typography>
            </Fade>
            {error && <SignInButton label="Sign In again with Slack" />}
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2014-{new Date().getFullYear()}{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://flatlogic.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Flatlogic
          </a>
          , LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
