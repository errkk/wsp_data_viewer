// @flow

export type Row = {
  chlorine: Number,
  tempInternal: Number,
  tempExternal: Number,
  ph: Number,
  timestamp: Date,
};

export type DataRows = Array<Row>;

export type RequestDatalogData = {
  type: 'REQUEST_DATALOG_DATA'
};

export type ReceiveDatalogData = {
  type: 'RECEIVE_DATALOG_DATA',
  data: { data: DataRows },
};

export type Action = RequestDatalogData | ReceiveDatalogData;
