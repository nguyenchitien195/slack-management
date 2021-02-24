import React from "react";
import { Grid, Typography, Tabs, Tab } from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import SignInButton from "../../components/SignInButton";

function Login(props) {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Login" classes={{ root: classes.tab }} />
          </Tabs>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Welcome to Slack Management
            </Typography>
            <SignInButton label="Sign in with Slack" />
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
