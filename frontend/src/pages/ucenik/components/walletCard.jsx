import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import './walletCard.css'



const styles = theme => ({
    root: {
        overflowY: 'hidden',
    }
})

class walletCard extends Component {

    render() {
        const { classes } = this.props
        return (
            <ContentCard className={classes.root}>
                <div className="wallet">
                    {/* <div className="department" id="one"></div>
                    <div className="department" id="two"></div>
                    <div className="department" id="three"></div> */}

                    <div className="card" id="card1" style={{ bottom: "0px" }}>

                    </div>
                    <div className="card" id="card2" style={{ bottom: "50px" }}>

                    </div>
                    <div className="card" id="card3" style={{ bottom: "100px" }}>

                    </div>


                    <img id="logo" src="https://www.sccu.com.au/images/sccu/category_icons/cards_header_icon.png" />
                </div>
            </ContentCard>
        )
    }

}

export default withStyles(styles)(walletCard);
