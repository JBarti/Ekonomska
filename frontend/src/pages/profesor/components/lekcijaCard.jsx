import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from "prop-types";
import ContentCard from '../../../common/content-card/contentCard'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import EditIcon from '@material-ui/icons/Edit';
import './lekcijaCard.css'


const drawerWidth = 240;

const styles = theme => ({
    dialog: {
        overflow: "hidden",
        zIndex: 2000
    },
    container:{
        width: '20%',
        height: '20%',
    },
    background: {
        background: 'linear-gradient(135deg, #C33764 0%, #252E73 100%)',
        width: '100%',
        height: '100%',
        overflowX:'hidden',
        overflowY: 'hidden'
    },
    root: {
        display: "flex",
        padding: 15,
        overflowX:'hidden',
        maxWidth: '100%',
    },
    cardDiv: {
        width: '100%',
        boxSizing: 'content-box',
        overflow: 'hidden',
        padding: '1%',
        zIndex: 0,
    },
    lekcijaIme: {
        color: 'white',
        lineHeight: '100%',
        verticalAlign: 'middle'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        textDecoration: "underline",
        marginRight: drawerWidth,
        color: "black",
        backgroundColor: theme.palette.background.default,
        textAlign: "center",
        boxShadow: "0px 7px 50px 0px rgba(255,255,255,1)",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        background: "linear-gradient(180deg, #C33764 0%, #252E73 100%)",
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        width: "78%",
        margin: "0 auto"
    },
    contentText: {
        fontSize: 24,   
        borderLeftWidth: "3px",
        borderLeftStyle: "solid",
        borderImage: "linear-gradient(180deg, #C33764 0%, #252E73 100%) 1 100%",
        paddingLeft: 15
    },
    contentTitle: {
        paddingBottom: 25,
        color: "black"
    }
})
function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class LekcijaCard extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props
        return (
            <ContentCard className={classes.container}>
                <Button className={classes.background} onClick={this.handleClickOpen}>
                    <div className={classes.cardDiv}>
                        <h1 className={classes.lekcijaIme}>Lekcija 1</h1>
                    </div>
                </Button>
                <Dialog classes={{paper:classes.dialog}} fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <div className={classes.root}>
                       
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.flex}>
                                    Lekcija 1. - merketinška nešto nešto nešto
          </Typography>
          <IconButton className={classes.deleteBtn} aria-label="Edit">
                         <EditIcon />
                     </IconButton>
                            </Toolbar>
                        </AppBar>

                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <Typography className={classes.contentTitle} variant="display2">
                                NASLOV
        </Typography>
                            <Typography className={classes.contentText} paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
                                dolor purus non enim praesent elementum facilisis leo vel. Risus at
                                ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
                                quisque non tellus. Convallis convallis tellus id interdum velit
                                laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
                                adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
                                integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
                                eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
                                quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
                                vivamus at augue. At augue eget arcu dictum varius duis at consectetur
                                lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
                                faucibus et molestie ac.
        </Typography>
                            <Typography
                                className={classes.contentText}
                                paragraph
                                style={{ fontSize: 24 }}
                            >
                                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                                ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
                                elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
                                sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
                                mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
                                risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
                                purus viverra accumsan in. In hendrerit gravida rutrum quisque non
                                tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
                                morbi tristique senectus et. Adipiscing elit duis tristique
                                sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                                posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
                            <Typography
                                className={classes.contentText}
                                paragraph
                                style={{ fontSize: 24 }}
                            >
                                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                                ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
                                elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
                                sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
                                mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
                                risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
                                purus viverra accumsan in. In hendrerit gravida rutrum quisque non
                                tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
                                morbi tristique senectus et. Adipiscing elit duis tristique
                                sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                                posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
                            <Typography
                                className={classes.contentText}
                                paragraph
                                style={{ fontSize: 24 }}
                            >
                                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                                ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
                                elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
                                sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
                                mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
                                risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
                                purus viverra accumsan in. In hendrerit gravida rutrum quisque non
                                tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
                                morbi tristique senectus et. Adipiscing elit duis tristique
                                sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                                posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
                        </main>
                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            anchor="right"
                        >
                            <div className={classes.toolbar} />
                            <Divider />
                            <List>
                                {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                                    <ListItem style={{ color: "white" }} button key={text}>
                                        <ListItemIcon style={{ color: "white" }}>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText style={{ color: "white" }} primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <List>
                                {["All mail", "Trash", "Spam"].map((text, index) => (
                                    <ListItem style={{ color: "white" }} button key={text}>
                                        <ListItemIcon style={{ color: "white" }}>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText style={{ color: "white" }} primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </div>
                </Dialog>
            </ContentCard>
        )
    }

}
LekcijaCard.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(LekcijaCard);