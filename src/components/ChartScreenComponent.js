// @flow

import React from "react";
import {
  Line,
  YAxis,
} from "recharts";

import ChartComponent from "./ChartComponent";
import { colors } from "material-ui/styles";

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
            label="Chlorine"
          />
          <Line
            type='monotone'
            dataKey='ph'
            stroke='#8844d8'
            strokeWidth={2}
            yAxisId={1}
            label="PH"
          />
        </ChartComponent>
        <h2>
        Temperature
        </h2>
        <ChartComponent rows={rows}>
          <YAxis
            type="number"
            domain={[12.0, 38.0]}
            dataKey="tempInternal"
          />
          <Line
            type='monotone'
            dataKey='poolTemp'
            stroke={colors.blue500}
            strokeWidth={3}
            label="Pool temp"
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='panelTemp'
            stroke={colors.orange500}
            strokeWidth={3}
            label="Panel output"
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='airTemp'
            stroke={colors.green500}
            strokeWidth={3}
            label="Air temp"
            dot={false}
          />
        </ChartComponent>
      </div>
    );
  }
}
