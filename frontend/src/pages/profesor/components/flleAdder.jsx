import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListButton from "../../../common/list-button/listButton";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import TestIcon from "@material-ui/icons/QuestionAnswer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ProffesorApi from "../../../data/apiController/proffesor";

const styles = theme => ({
  addFile: {
    width: 400
  },
  fileUrl: {
    width: "80%"
  },
  submitFile: {
    marginTop: 15,
    marginBottom: 15
  }
});

class FileAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: <div />
    };
    setTimeout(this.initContent, 1);
    console.log({ props: props });
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  };

  submitFile = () => {
    ProffesorApi.addFile({
      name: this.state.name,
      lesson: this.props.lesson,
      url: this.state.url,
      gradeId: this.props.grade.id
    })
      .then(data => {
        console.log({ data: data });
      })
      .catch(err => {
        console.log(err);
      });
    this.props.onClose();
  };

  addFileScreen = state => (
    <div className={this.props.classes.addFile}>
      <DialogTitle>Unesite podatke o datoteci</DialogTitle>
      <TextField
        label="ime"
        name="name"
        value={this.state["name"]}
        onChange={this.handleChange("name")}
        className={this.props.classes.fileUrl}
      />
      <TextField
        type="url"
        label="url"
        name="url"
        onChange={this.handleChange("url")}
        value={this.state["url"]}
        className={this.props.classes.fileUrl}
      />
      <Button
        onClick={this.submitFile}
        className={this.props.classes.submitFile}
      >
        SUBMIT
      </Button>
    </div>
  );

  addTestScreen = state => (
    <div className={this.props.classes.addFile}>
      <DialogTitle>Unesite ime testa</DialogTitle>
      <TextField
        label="ime"
        name="name"
        value={this.state["name"]}
        onChange={this.handleChange("name")}
        className={this.props.classes.fileUrl}
      />
      <Button
        onClick={() => {
          this.props.addTest(this.state.name);
          this.props.onClose();
        }}
        className={this.props.classes.submitFile}
      >
        SUBMIT
      </Button>
    </div>
  );

  changeContent = content => () => {
    this.setState({ content: content });
  };

  startingScreen = state => (
    <div>
      <DialogTitle>Dodajte novi file</DialogTitle>
      <Typography variant="caption" style={{ fontSize: 15, padding: 25 }}>
        Odaberite tip fajla kojeg želite dodat
      </Typography>

      <List>
        <ListButton
          primary={"Dokument"}
          onClick={this.changeContent(this.addFileScreen(state))}
          icon={<FileIcon />}
        />
        <ListButton
          primary={"Test"}
          onClick={this.changeContent(this.addTestScreen(state))}
          icon={<TestIcon />}
        />
      </List>
    </div>
  );

  initContent = () => {
    this.setState({ content: this.startingScreen(this.state) });
  };

  onClose = close => () => {
    this.initContent();
    close();
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.onClose(this.props.onClose)}
        className={classes.root}
      >
        {this.state.content}
      </Dialog>
    );
  }
}

export default withStyles(styles)(FileAdder);
