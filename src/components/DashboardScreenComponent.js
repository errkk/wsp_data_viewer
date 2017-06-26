// @flow

import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText,
} from "material-ui/Card";
import { getDataAge } from "../helpers/utils";

type Props = {
  timestamp: ?Date,
  chlorine: ?Number,
  ph: ?Number,
  tempExternal: ?Number,
  tempInternal: ?Number,
  daysSince: ?Number,
};

type State = {
  dataAge: number,
};

export default class DashboardScreenComponent extends React.PureComponent {
  props: Props;
  state: State;
  interval: ?number;

  constructor (props: Props): void {
    super(props);
    this.state = {
      dataAge: 0,
    };
  }

  componentDidMount () {
    this.interval = setInterval(this.updateTimeAgo, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  updateTimeAgo = (): void => {
    const { timestamp } = this.props;
    if (!timestamp) return;
    const dataAge = getDataAge(timestamp);
    this.setState({dataAge});
  }

  render () {
    const {
      timestamp,
      chlorine,
      ph,
      tempInternal,
      tempExternal,
      daysSince,
    } = this.props;
    const { dataAge } = this.state;
    const updatedAt = timestamp ? `Updated: ${timestamp.toLocaleTimeString()}` : "";
    const days = daysSince ? ` – ${daysSince.toFixed(0)} days ago` : "";
    let ageString;
    if (dataAge > 59) {
      ageString = timestamp && updatedAt + days;
    } else {
      ageString = `Updated: ${Math.round(dataAge)} seconds ago`;
    }
    return (
      <div className="screen-container">
        <h2>
          Dashboard
        </h2>
        <Card>
          <CardTitle
            title={chlorine && `${chlorine.toFixed(2)}ppm`}
            subtitle="Chlorine"
          />
        </Card>
        <Card>
          <CardTitle
            title={ph && ph.toFixed(2)}
            subtitle="PH"
          />
        </Card>
        <Card>
          <CardTitle
            title={tempInternal && `${tempInternal.toFixed(2)}ºC`}
            subtitle="Temperature inside"
          />
        </Card>
        <Card>
          <CardTitle
            title={tempExternal && `${tempExternal.toFixed(2)}ºC`}
            subtitle="Temperature outside"
          />
        </Card>
          <CardHeader
            title={ageString}
          />
      </div>
    );
  }
}
