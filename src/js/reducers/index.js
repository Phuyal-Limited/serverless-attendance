import {combineReducers} from 'redux';
import EmployeeReducer from './employeereducer';
import NotificationReducer from './notificationreducer';

const allReducers=combineReducers({
    employee: EmployeeReducer,
    notification: NotificationReducer
});

export default allReducers;