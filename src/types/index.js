// @flow

import type { DataRows } from "./datalog";

export type State = {
  datalog: {
    rows: DataRows,
    loading: boolean,
  },
};
