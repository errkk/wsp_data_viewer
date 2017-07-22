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
  rows: DataRows,
};

export default class ChartScreenComponent extends React.PureComponent {
  props: Props;

  render () {
    const { rows } = this.props;
    return (
      <div className="screen-container screen-container--charts">
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
