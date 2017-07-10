// @flow

 export type AwsRow = {
  chlorine: Number,
  ph: Number,
  timestamp: Date,
};

export type AwsRows = Array<AwsRow>;

export type RequestAwsData = {
  type: 'REQUEST_AWS_DATA'
};

export type ReceiveAwsData = {
  type: 'RECEIVE_AWS_DATA',
  data: AwsRows,
};

export type Action = RequestAwsData | ReceiveAwsData;
