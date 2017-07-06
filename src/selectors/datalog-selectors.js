// @flow

import { createSelector } from "reselect";
import type { Row, DataRows } from "../types/datalog";
import type { State } from "../types";

const CHLORINE_LOWER_LIMIT = 2.1;
const CHLORINE_UPPER_LIMIT = 2.5;

const getRows = (state: State) => state.datalog.rows;

export const getLastRow = createSelector(
  [getRows], (rows: DataRows): ?Row => {
    if (rows.length < 1) return;
    return rows[rows.length -1];
  }
);

export const acceptableChlorine = createSelector(
  [getLastRow], (row: Row): boolean => {
    if (row && row.chlorine > CHLORINE_LOWER_LIMIT && row.chlorine < CHLORINE_UPPER_LIMIT) {
      return true;
    }
    return false;
  }
);
