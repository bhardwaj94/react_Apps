import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ExitToApp } from '@material-ui/icons';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { bindActionCreators } from 'redux';
import MenuIcon from '@material-ui/icons/Menu';
import { manualLogout } from '../../redux/actions/index';
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Header = (props) => {
  const { classes, loggedIn, logout } = props;
  console.log('loginRed', props)
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            React App {"\u2728"}
          </Typography>
          {localStorage.getItem('token') ? <Tooltip title="logout" aria-label="logout">
            <Button color="inherit" onClick={logout}><ExitToApp /></Button>
          </Tooltip> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    loggedIn: state.userReducer.authenticated
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: manualLogout
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));