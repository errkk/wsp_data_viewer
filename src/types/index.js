// @flow

import type { DataRows } from "./datalog";
import type { AwsRows } from "./aws";

export type State = {
  aws: {
    rows: AwsRows,
    loading: boolean,
  },
  datalog: {
    rows: DataRows,
    loading: boolean,
  },
};
