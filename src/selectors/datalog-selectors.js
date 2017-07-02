// @flow

import { createSelector } from "reselect";
import type { Row, DataRows } from "../types/datalog";
import type { State } from "../types";


const getRows = (state: State) => state.datalog.rows;

export const getLastRow = createSelector(
  [getRows], (rows: DataRows): ?Row => {
    if (rows.length < 1) return;
    return rows[rows.length -1];
  }
);
