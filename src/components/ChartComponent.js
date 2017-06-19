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

import type { DataRows } from "../types/datalog";

type Props = {
  datalogActions: Object,
  rows: DataRows,
};

export default class ChartComponent extends React.PureComponent {
  props: Props;

  render () {
    const { rows } = this.props;
    return (
      <div className="Log">
      <LineChart width={500} height={300} data={rows}>
        <YAxis type="number"  domain={[0, 40]} dataKey="temp" />
        <Line type='monotone' dataKey='temp' stroke='#f884d8' strokeWidth={2} />
        <Line type='monotone' dataKey='chlorine' stroke='#8884d8' strokeWidth={2} />
        <Line type='monotone' dataKey='ph' stroke='#8884d8' strokeWidth={2} />
        <XAxis dataKey="timestamp"/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
      </LineChart>
      </div>
    );
  }
}
