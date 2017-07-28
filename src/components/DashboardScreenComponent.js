// @flow

import React from "react";
import { colors } from "material-ui/styles";
import { Link } from "react-router-dom";
import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import type { DataRows } from "../types/datalog";
import type { AwsRows } from "../types/aws";

import { getDataAge } from "../helpers/utils";
import "../sass/Dashboard.css";

type Props = {
  timestamp: ?String,
  datetime: ?Date,
  chlorine: ?Number,
  ph: ?Number,
  panelTemp: ?Number,
  airTemp: ?Number,
  poolTemp: ?Number,
  daysSince: ?Number,
  rows: DataRows,
  awsRows: AwsRows,
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
  rows: (DataRows|AwsRows),
  isBad: ?Boolean,
  loading: ?Boolean,
  unit: ?String,
  link: String,
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
      isBad,
      unit,
      loading,
      rows,
      link,
    } = this.props;
    const lineChartProps = {
      width: 200,
      height: 50,
      margin: { left: 16, right: 16 },
      data: rows,
    };

    const classes = ["dashboard__item"];
    if (isBad && !loading && rows.length) {
      classes.push("is-bad");
    }

    if (loading) {
      classes.push("is-loading");
    }

    return (
      <div className={classes.join(" ")}>
        <Link to={link}>
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
        </Link>
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
    const { datetime } = this.props;
    if (!datetime) return;
    const dataAge = getDataAge(datetime);
    this.setState({dataAge});
  }

  render () {
    const {
      daysSince,
      rows,
      awsRows,
      datetime,
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
    const updatedAt = datetime ? `Updated: ${datetime.toLocaleTimeString()}` : "";
    const days = daysSince ? ` – ${daysSince.toFixed(0)} days ago` : "";

    let ageString;
    if (dataAge > 60 * 60) {
      ageString = datetime && updatedAt + days;
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
            rows={awsRows}
            isBad={!acceptableChlorine}
            unit="PPM"
            loading={awsLoading}
            link="/chlorine"
          />
          <DashboardItem
            title={ph && ph.toFixed(2)}
            subtitle="PH"
            dataKey='ph'
            colour={colors.indigo500}
            rows={awsRows}
            loading={awsLoading}
            link="/ph"
          />
          <DashboardItem
            title={poolTemp && poolTemp.toFixed(2)}
            subtitle="Pool Temp"
            dataKey='poolTemp'
            colour={colors.blue500}
            rows={rows}
            unit="ºC"
            loading={loading}
            link="/temperature"
          />
          <DashboardItem
            title={panelTemp && panelTemp.toFixed(2)}
            subtitle="Panel Temp"
            dataKey='panelTemp'
            colour={colors.orange500}
            rows={rows}
            unit="ºC"
            loading={loading}
            link="/temperature"
          />
          <DashboardItem
            title={airTemp && airTemp.toFixed(2)}
            subtitle="Air Temp"
            dataKey='airTemp'
            colour={colors.green500}
            rows={rows}
            unit="ºC"
            loading={loading}
            link="/temperature"
          />
        </div>
        <p>
          {ageString}
        </p>
      </div>
    );
  }
}
