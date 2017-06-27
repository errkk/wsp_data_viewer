// @flow

import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardText,
} from "material-ui/Card";
import { colors } from "material-ui/styles";
import {
  Line,
  LineChart,
  YAxis,
} from "recharts";

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

const STROKE_WIDTH = 3;

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
      chlorine,
      daysSince,
      ph,
      rows,
      tempExternal,
      tempInternal,
      timestamp,
    } = this.props;
    const { dataAge } = this.state;
    const updatedAt = timestamp ? `Updated: ${timestamp.toLocaleTimeString()}` : "";
    const days = daysSince ? ` – ${daysSince.toFixed(0)} days ago` : "";
    const someRows = rows.slice(-40);
    let ageString;
    if (dataAge > 59) {
      ageString = timestamp && updatedAt + days;
    } else {
      ageString = `Updated: ${Math.round(dataAge)} seconds ago`;
    }

    const lineChartProps = { width: 200, height: 50, data: someRows };

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
          <CardText>
            <LineChart {...lineChartProps}>
              <Line
                type="monotone"
                dataKey="chlorine"
                stroke={colors.teal500}
                strokeWidth={STROKE_WIDTH}
              />
            </LineChart>
          </CardText>
        </Card>
        <Card>
          <CardTitle
            title={ph && ph.toFixed(2)}
            subtitle="PH"
          />
          <CardText>
            <LineChart {...lineChartProps}>
              <Line
                type="monotone"
                dataKey="chlorine"
                stroke={colors.indigo500}
                strokeWidth={STROKE_WIDTH}
              />
            </LineChart>
          </CardText>
        </Card>
        <Card>
          <CardTitle
            title={tempInternal && `${tempInternal.toFixed(2)}ºC`}
            subtitle="Temperature inside"
          />
          <CardText>
            <LineChart {...lineChartProps}>
              <Line
                type="monotone"
                dataKey="tempInternal"
                stroke={colors.pink500}
                strokeWidth={STROKE_WIDTH}
              />
            </LineChart>
          </CardText>
        </Card>
        <Card>
          <CardTitle
            title={tempExternal && `${tempExternal.toFixed(2)}ºC`}
            subtitle="Temperature outside"
          />

          <LineChart width={200} height={100} data={someRows}>
            <Line
              type='monotone'
              dataKey='tempExternal'
              stroke={colors.orange500}
              strokeWidth={STROKE_WIDTH}
            />
          </LineChart>
        </Card>
          <CardHeader
            title={ageString}
          />
      </div>
    );
  }
}
