// @flow

import React from "react";
import {
  Legend,
  LineChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import type { DataRows } from "../types/datalog";

type Props = {
  rows: DataRows,
};

export default class ChartComponent extends React.PureComponent {
  props: Props;

  render () {
    const { rows, children } = this.props;
    return (
      <ResponsiveContainer height={300}>
        <LineChart width={500} height={300} data={rows}>
          <XAxis dataKey="timestamp" label="Time" scale="utcTime" />
          <Tooltip />
          <Legend />
          {children}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
