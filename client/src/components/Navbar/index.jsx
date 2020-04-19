import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';


import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import RenderAuth from '../Navbar/RenderAuth'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "theme"
import SearchBox from "../Navbar/search"
import Cookies from 'js-cookie'


const useStyles = makeStyles((theme) => ({

  authStyle: {
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2),

  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



export default function Navbar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(Cookies.get("user_id") || null);
  const [popup, setPopup] = React.useState(props.popup || false)
  const [button, setButton] = React.useState(null)



  const handleClickOpen = (buttonType) => {
    setButton(buttonType)
    setPopup(true);
  };

  const handleClose = () => {
    setPopup(false);
    setButton(null)
  };

  const logout = () => {
    setAuth(null);
    Cookies.remove('user_id')
    location.reload();

  }



  const CheckAuth = () => {
    if (auth) {
      return (
        <div >
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Button onClick={() => logout()} color="inherit">Logout</Button>
      </div>
      )
    }
    else {
      return (
        <div>
          <Button color="inherit" onClick={ () => {handleClickOpen('register')}}>Register</Button>
          <Button color="inherit" onClick={ () => {handleClickOpen('login')}}>Login</Button>
          <RenderAuth onClose={handleClose} open={popup} buttonType={button}/>
        </div>
    )
    }
  }



  React.useEffect(() => {
  }, [auth])


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >

    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>
            Meez'r
          </Typography>
          <div className={classes.search}>

            <SearchBox
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />
          <CheckAuth/>
          
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
    </ThemeProvider >

  );
}