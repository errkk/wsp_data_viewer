// @flow

 type RawRow = {
  t1: Number,
  t2: Number,
  t3: Number,
  t4: Number,
  timestamp: Date,
};

type MappedRow = {
  airTemp: Number,
  panelTemp: Number,
  poolTemp: Number,
  timestamp: Date,
};

export Row = RawRow | MappedRow;

export type DataRows = Array<Row>;

export type RequestDatalogData = {
  type: 'REQUEST_DATALOG_DATA'
};

export type ReceiveDatalogData = {
  type: 'RECEIVE_DATALOG_DATA',
  data: DataRows,
};

export type Action = RequestDatalogData | ReceiveDatalogData;
