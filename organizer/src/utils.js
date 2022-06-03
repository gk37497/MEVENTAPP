import moment from 'moment';
import 'moment/locale/mn';

export const dateFormatter = date => {
  moment.locale('mn');
  let d = moment(date);
  return d.format('ddd, MMM [ын] d');
};

export const calendarFormatter = date => {
  moment.locale('mn');
  let d = moment(date);
  let calendar = [];
  calendar.push(d.format('ddd'));
  calendar.push(d.format('d'));
  calendar.push(d.format('YYYY'));
  calendar.push(d.format('MMM'));
  calendar.push(d.format('H:m'));
  return calendar;
};
