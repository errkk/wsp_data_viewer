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
            stroke='#88f4d8'
            strokeWidth={2}
            yAxisId={0}
            label="Chlorine"
          />
        </ChartComponent>
      </div>
    );
  }
}
