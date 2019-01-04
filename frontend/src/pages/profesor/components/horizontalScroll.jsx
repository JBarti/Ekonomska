import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LekcijaCard from './lekcijaCard';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    overflow: 'scroll',
  },
  
});

function horizontalScroll(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5.5}>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>
          <GridListTile>
            <LekcijaCard/>
          </GridListTile>

      </GridList>
    </div>
  );
}

horizontalScroll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(horizontalScroll);