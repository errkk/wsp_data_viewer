// @flow

import React from "react";
import { colors } from "material-ui/styles";
import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import { getDataAge } from "../helpers/utils";
import "../sass/Dashboard.css";

type Props = {
  timestamp: ?Date,
  chlorine: ?Number,
  ph: ?Number,
  panelTemp: ?Number,
  airTemp: ?Number,
  poolTemp: ?Number,
  daysSince: ?Number,
  rows: DataRows,
  acceptableChlorine: boolean,
  awsLoading: boolean,
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
  isBad: ?boolean,
  loading: ?boolean,
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
      isBad,
      unit,
      loading,
    } = this.props;
    const lineChartProps = {
      width: 200,
      height: 50,
      margin: { left: 16, right: 16 },
      data: rows,
    };

    const classes = ["dashboard__item"];
    if (isBad) {
      classes.push("is-bad");
    }

    if (loading) {
      classes.push("is-loading");
    }

    return (
      <div className={classes.join(" ")}>
        <h2 className="dashboard__item__title">
          {title}
          <span className="dashboard__item__unit">
            {unit}
          </span>
        </h2>
        <p className="dashboard__item__subtitle">{subtitle}</p>

        <ResponsiveContainer height={60}>
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
      </div>
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
      acceptableChlorine,
      loading,
      awsLoading,
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
        <div className="dashboard">
          <DashboardItem
            title={chlorine && chlorine.toFixed(2)}
            subtitle="Chlorine"
            dataKey='chlorine'
            colour={colors.teal500}
            rows={rows}
            isBad={!acceptableChlorine}
            unit="PPM"
            loading={awsLoading}
          />
          <DashboardItem
            title={ph && ph.toFixed(2)}
            subtitle="PH"
            dataKey='ph'
            colour={colors.indigo500}
            rows={rows}
            loading={awsLoading}
          />
          <DashboardItem
            title={poolTemp && poolTemp.toFixed(2)}
            subtitle="Pool Temp"
            dataKey='poolTemp'
            colour={colors.blue500}
            rows={rows}
            unit="ºC"
            loading={loading}
          />
          <DashboardItem
            title={panelTemp && panelTemp.toFixed(2)}
            subtitle="Panel Temp"
            dataKey='panelTemp'
            colour={colors.orange500}
            rows={rows}
            unit="ºC"
            loading={loading}
          />
          <DashboardItem
            title={airTemp && airTemp.toFixed(2)}
            subtitle="Air Temp"
            dataKey='airTemp'
            colour={colors.green500}
            rows={rows}
            unit="ºC"
            loading={loading}
          />
        </div>
        <p>
          {ageString}
        </p>
      </div>
    );
  }
}
