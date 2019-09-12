import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
})

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }
  get githubOauthLink() {
    const { githubClientId, githubRandomState, callbackURL } = this.props;
    let { githubCallbackUrl } = this.props
    if (callbackURL.length > 0) { githubCallbackUrl = githubCallbackUrl.concat(callbackURL) }
    return `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubCallbackUrl}&state=${githubRandomState}`;
  }
  handleCheck = event => {
    this.setState({ checked: event.target.checked })
  }
  render() {
    const { open, onClose, classes } = this.props;
    const { checked } = this.state;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id="login-title">{"Login to SciGym"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="login-description">
            Login via Github to upload and discuss environments on SciGym
          </DialogContentText>
          <Typography className={classes.textField}>
            <Checkbox checked={checked} onChange={this.handleCheck} value="policy" />
            I agree to the <Link component="button" to="/policy/private-policy" target="_blank" rel="noopener">Private Policy</Link> and <Link component="button" to="/policy/terms-and-conditions" target="_blank" rel="noopener">Terms and Conditions</Link>
          </Typography>
        </DialogContent>
        <DialogActions>
          {checked ? (
            <Button fullWidth onClick={onClose} variant="contained" color="primary" size="large" autoFocus href={this.githubOauthLink}>
              Login with Github
                    </Button>
          ) : (
              <Button fullWidth disabled variant="contained" size="large" autoFocus>
                Login with Github
          </Button>
            )}
        </DialogActions>
      </Dialog>
    )
  }
}

LoginForm.propTypes = {
  githubClientId: PropTypes.string.isRequired,
  githubCallbackUrl: PropTypes.string.isRequired,
  githubRandomState: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    githubClientId: state.config.githubClientId,
    githubCallbackUrl: state.config.githubCallbackUrl,
    githubRandomState: state.config.githubRandomState,
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(LoginForm);
