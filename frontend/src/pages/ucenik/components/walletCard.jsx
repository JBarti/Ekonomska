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
                    <div className="card" id="card1" style={{ bottom: "0px" }}>
                        <h1>0000 0000 0000 0000</h1>
                        <p>Card Holder</p>
                        <p>Expiration Date</p>
                        <h2>Daniel Putzer</h2>
                        <h2>02/22</h2>
                    </div>
                    <div className="card" id="card2" style={{ bottom: "50px" }}>
                        <h1>0000 0000 0000 0000</h1>
                        <p>Card Holder</p>
                        <p>Expiration Date</p>
                        <h2>Daniel Putzer</h2>
                        <h2>03/33</h2>
                    </div>
                    <div className="card" id="card3" style={{ bottom: "100px" }}>
                        <h1>0000 0000 0000 0000</h1>
                        <p>Card Holder</p>
                        <p>Expiration Date</p>
                        <h2>Daniel Putzer</h2>
                        <h2>04/44</h2>
                    </div>

                    <div className="department" id="one"></div>
                    <div className="department" id="two"></div>
                    <div className="department" id="three"></div>

                    <img id="logo" src="https://www.sccu.com.au/images/sccu/category_icons/cards_header_icon.png" />
                </div>
            </ContentCard>
        )
    }

}

export default withStyles(styles)(walletCard);
