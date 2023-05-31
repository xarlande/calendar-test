import moment from 'moment';

export const convertTime = (timestamp: number) => moment.unix(timestamp)
    .format('HH:mm');

export default {};
