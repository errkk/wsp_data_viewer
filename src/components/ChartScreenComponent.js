// @flow

import React from "react";
import {
  Line,
  YAxis,
} from "recharts";

import ChartComponent from "./ChartComponent";

import type { DataRows } from "../types/datalog";

type Props = {
  fetchData: Function,
  rows: DataRows,
};

export default class ChartScreenComponent extends React.PureComponent {
  props: Props;

  render () {
    const { rows } = this.props;
    return (
      <div className="screen-container">
        <h2>
        Chlorine & PH
        </h2>
        <ChartComponent rows={rows}>
          <YAxis
            type="number"
            domain={[0.0, 4.0]}
            dot={false}
            dataKey="chlorine"
            orientation="right"
            yAxisId={0}
          />
          <YAxis
            type="number"
            domain={[6.0, 8.0]}
            dot={false}
            dataKey="ph"
            orientation="left"
            yAxisId={1}
          />
          <Line
            type='monotone'
            dataKey='chlorine'
            stroke='#88f4d8'
            strokeWidth={2}
            yAxisId={0}
          />
          <Line
            type='monotone'
            dataKey='ph'
            stroke='#8844d8'
            strokeWidth={2}
            yAxisId={1}
          />
        </ChartComponent>
        <h2>
        Temperature
        </h2>
        <ChartComponent rows={rows}>
          <YAxis
            type="number"
            domain={[22.0, 35.0]}
            dot={false}
            dataKey="tempInternal"
          />
          <YAxis
            type="number"
            domain={[22.0, 35.0]}
            dot={false}
            dataKey="tempExternal"
          />
          <Line
            type='monotone'
            dataKey='temp'
            stroke='#e804d8'
            strokeWidth={2}
          />
        </ChartComponent>
      </div>
    );
  }
}
