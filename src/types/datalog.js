// @flow

export type Row = {
  chlorine: Number,
  temp: Number,
  ph: Number,
  timestamp: Date,
};

export type DataRows = Array<Rows>;

export type RequestDatalogData = {
  type: 'REQUEST_DATALOG_DATA'
};

export type ReceiveDatalogData = {
  type: 'RECEIVE_DATALOG_DATA',
  data: DataRows,
};

export type Action = RequestDatalogData | ReceiveDatalogData;
