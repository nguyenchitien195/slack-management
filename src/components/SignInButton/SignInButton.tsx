import React, { ReactElement } from "react";
import { Button } from "@material-ui/core";
import slack from "./slack.svg";

import useStyles from "./styles";

interface SignInButtonProps {
  label: string;
}

const scopePermission = [
  // Files
  "files:read",
  "files:write",
  // Conversation
  "channels:read",
  "groups:read",
  "im:read",
  "mpim:read",
  // user: https://api.slack.com/methods#users
  "users:read",
];

const SignInButton = (props: SignInButtonProps): ReactElement => {
  const classes = useStyles();

  const { label } = props;

  const handleLoginBySlack = () => {
    window.location.href = `https://slack.com/oauth/v2/authorize
    ?user_scope=${scopePermission.join(',')}
    &redirect_uri=${window.location.origin + window.location.pathname}
    &client_id=${process.env.REACT_APP_SLACK_APP_CLIENT_ID}`;
  };

  return (
    <Button
      size="large"
      className={classes.googleButton}
      onClick={handleLoginBySlack}
    >
      <img src={slack} alt="slack" className={classes.googleIcon} />
      &nbsp;{label}
    </Button>
  );
};

export default SignInButton;
