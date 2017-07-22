// @flow

import React from "react";
import {
  Line,
  YAxis,
} from "recharts";

import ChartComponent from "./ChartComponent";
import { colors } from "material-ui/styles";

import type { AwsRows } from "../types/aws";

type Props = {
  rows: AwsRows,
};

export default class ChartScreenComponent extends React.PureComponent {
  props: Props;

  render () {
    const { rows } = this.props;
    return (
      <div className="screen-container screen-container--charts">
        <h2>
        PH
        </h2>
        <ChartComponent rows={rows}>
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
            dataKey='ph'
            stroke={colors.red500}
            strokeWidth={2}
            yAxisId={1}
            label="PH"
          />
        </ChartComponent>
      </div>
    );
  }
}
