// @flow

import React from "react";
import {
  Line,
  YAxis,
  ReferenceLine,
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
        Chlorine
        </h2>
        <ChartComponent rows={rows}>
          <YAxis
            type="number"
            domain={[1.0, 4.0]}
            dot={false}
            dataKey="chlorine"
            yAxisId={0}
          />
          <Line
            type='monotone'
            dataKey='chlorine'
            stroke={colors.green500}
            strokeWidth={2}
            yAxisId={0}
            label="Chlorine"
          />
          <ReferenceLine y={2.8} stroke="rgba(0, 0, 0, 0.2)" />
          <ReferenceLine y={2.4} stroke="rgba(0, 0, 0, 0.2)" />
        </ChartComponent>
      </div>
    );
  }
}
