import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Typography from '@material-ui/core/Typography';
import './../../component/css/style.css'

import avatar from "../../assets/img/admin.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: "center",

  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>SUMMANY ABOUT NETWORK</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <div className="container">
                <div className="item">
                  <p>Organization ID: 681155</p>
                </div>
                <div className="item">
                  <p>Network ID: L_566327653141843049</p> <p>Network name: Lyoli</p>
                  <p>Product Types: Camera, Switch, Wireless</p>
                  <p>Time zone: America/New York</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Administrator</h6>
              <h4 className={classes.cardTitle}>Truyen Nguyen</h4>
              <p className={classes.description}>
                Demo Meraki Dashboard Project
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
