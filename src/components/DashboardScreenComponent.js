// @flow

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "material-ui/Card";
import { colors } from "material-ui/styles";
import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import { getDataAge } from "../helpers/utils";

type Props = {
  timestamp: ?Date,
  chlorine: ?Number,
  ph: ?Number,
  panelTemp: ?Number,
  airTemp: ?Number,
  poolTemp: ?Number,
  daysSince: ?Number,
  rows: DataRows,
};

type State = {
  dataAge: number,
};

type ItemProps = {
  colour: String,
  dataKey: String,
  title: String,
  subtitle: String,
  rows: DataRows,
};

const STROKE_WIDTH = 3;

class DashboardItem extends React.PureComponent {
  props: ItemProps;

  render () {
    const {
      colour,
      dataKey,
      title,
      subtitle,
      rows,
    } = this.props;
    const lineChartProps = {
      width: 200,
      height: 50,
      margin: { left: 16, right: 16 },
      data: rows,
    };

    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={subtitle}
        />

        <ResponsiveContainer height={120}>
          <LineChart {...lineChartProps}>
            <Line
              type='monotone'
              dataKey={dataKey}
              stroke={colour}
              strokeWidth={STROKE_WIDTH}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    );
  }
}

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
      daysSince,
      rows,
      timestamp,
      panelTemp,
      poolTemp,
      airTemp,
      ph,
      chlorine,
    } = this.props;
    const { dataAge } = this.state;
    const updatedAt = timestamp ? `Updated: ${timestamp.toLocaleTimeString()}` : "";
    const days = daysSince ? ` – ${daysSince.toFixed(0)} days ago` : "";

    let ageString;
    if (dataAge > 60 * 60) {
      ageString = timestamp && updatedAt + days;
    } else if (dataAge > 59) {
      ageString = `Updated: ${Math.round(dataAge / 60)} minutes ago`;
    } else {
      ageString = `Updated: ${Math.round(dataAge)} seconds ago`;
    }


    return (
      <div className="screen-container">
        <h2>
          Dashboard
        </h2>
        <DashboardItem
          title={chlorine && `${chlorine.toFixed(2)} PPM`}
          subtitle="PH"
          dataKey='chlorine'
          colour={colors.teal500}
          rows={rows}
        />
        <DashboardItem
          title={ph && ph.toFixed(2)}
          subtitle="PH"
          dataKey='ph'
          colour={colors.indigo500}
          rows={rows}
        />
        <DashboardItem
          title={poolTemp && `${poolTemp.toFixed(2)}ºC`}
          subtitle="Pool Temp"
          dataKey='poolTemp'
          colour={colors.blue500}
          rows={rows}
        />
        <DashboardItem
          title={panelTemp && `${panelTemp.toFixed(2)}ºC`}
          subtitle="Panel Temp"
          dataKey='panelTemp'
          colour={colors.orange500}
          rows={rows}
        />
        <DashboardItem
          title={airTemp && `${airTemp.toFixed(2)}ºC`}
          subtitle="Air Temp"
          dataKey='airTemp'
          colour={colors.green500}
          rows={rows}
        />
        <CardHeader
          title={ageString}
        />
      </div>
    );
  }
}
