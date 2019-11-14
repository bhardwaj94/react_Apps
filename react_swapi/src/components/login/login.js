import React from 'react';
import { loginUser } from '../../redux/actions/index'
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
//import SignIn from '../layout/loginLay'

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
        success: false,
        formIsValid:false,
        emailError:true,
        pwdError:true,
        errorMsg:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate = () =>{
      const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
      const validEmail = pattern.test(this.state.email);
      const validPassword = (this.state.password===''||this.state.password===null)?false:true
      if(validEmail){
        this.setState({
          emailError:false
        })
      }
      if(this.state.password){
        this.setState({
          pwdError:false
        })
      }
      return (validEmail&&validPassword)?true:false
    }
    submit = (e) => {
        e.preventDefault();
        if(this.validate()){
        this.props.dispatch(loginUser(this.state))
      }
    }

    componentDidUpdate(prevProps){
      if(this.props.login){
        this.props.history.push('/dashboard');
      }
    }
    render() {
        //console.log("from login comp>>>",this.props.state)
        const { classes } = this.props;
        return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.submit}>
          <FormControl margin="normal" required fullWidth error={this.emailError}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email"
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth error={this.pwdError}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password"
            value={this.state.password}
            onChange={this.handleChange}
            id="password" autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
        );
    }

}
function mapStateToProps(state){
    return {
        login:state.userReducer.login
    };
};
export default connect(mapStateToProps,null)(withStyles(styles)(Login));