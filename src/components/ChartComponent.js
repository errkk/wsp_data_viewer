// @flow

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  datalogActions: Object,
};

export default class ChartComponent extends React.PureComponent {
  props: Props;

  render () {
    const { rows } = this.props;
    return (
      <div className="Log">
      <LineChart width={500} height={300} data={rows}>
        <Line type='monotone' dataKey='chlorine' stroke='#8884d8' strokeWidth={2} />
        <Line type='monotone' dataKey='ph' stroke='#8884d8' strokeWidth={2} />
        <XAxis dataKey="timestamp"/>
        <YAxis type="number" orientation="left" yAxisI="ph" domain={[0, 14.0]} dataKey="ph" />
        <YAxis type="number" orientation="right" yAxisId="chlorine" domain={[0, 4.0]} dataKey="chlorine" />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
      </LineChart>
      </div>
    );
  }
}
