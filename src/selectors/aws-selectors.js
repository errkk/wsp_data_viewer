// @flow

import { createSelector } from "reselect";
import type { AwsRow, AwsRows } from "../types/aws";
import type { State } from "../types";

const CHLORINE_LOWER_LIMIT = 2.1;
const CHLORINE_UPPER_LIMIT = 2.9;

const getRows = (state: State) => state.aws.rows;

export const getLastAwsRow = createSelector(
  [getRows], (rows: AwsRows): ?AwsRow => {
    if (rows.length < 1) return;
    return rows[rows.length -1];
  }
);

export const acceptableChlorine = createSelector(
  [getLastAwsRow], (row: AwsRow): boolean => {
    if (row && row.chlorine > CHLORINE_LOWER_LIMIT && row.chlorine < CHLORINE_UPPER_LIMIT) {
      return true;
    }
    return false;
  }
);
