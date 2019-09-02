import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chart } from 'react-google-charts'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'


const styles = theme => ({
    root: {
        width: '100%',
        height: '95%',
        paddingTop: 20,
        paddingRight: 20,
        boxSizing: 'border-box'

    }
})

class BarGraph extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ResponsiveContainer>
                    <BarChart data={[
                        { name: 'mate', pv: 100 },
                        { name: 'mišo', pv: 200 },
                        { name: 'kovač', pv: 200 },
                    ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div >
        );
    }
}

BarGraph.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(BarGraph);
