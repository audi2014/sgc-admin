
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const API_ENDPOINT = "http://lowcost-env.cbgaq2vptb.us-west-2.elasticbeanstalk.com/api/dev-v7/"; 

export const DAYS = [
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su',
];

// export const API_ENDPOINT = "http://lowcost-env.cbgaq2vptb.us-west-2.elasticbeanstalk.com/api/v6/";
//var API_ENDPOINT = "http://localhost:8888/";


export const E_CODE_ARG_MISSING = 4;
export const E_CODE_FILE_SIZE = 413;
export var E_CODE_DUBLICATE = 10;
export var E_CODE_AUTH_FAIL = 2;
export var E_CODE_AES_FAIL = 13;

export var API_OFF = 0;
export var API_NO_AES = 1;
export var API_NO_AUTH = 2;
export var API_AUTH_OK = 3;

export const jsDateToServerDate = (jsDate) => {
    var y = jsDate.getFullYear();
    var m = jsDate.getMonth()+1;
    var d = jsDate.getDate();
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
};

export const getMonthStartEnd =(date) => {
    var y = date.getFullYear();
    var m = date.getMonth();
    var ds = new Date(y, m, 1).getDate();
    var de = new Date(y, m + 1, 0).getDate();
    m += 1;
    var startDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (ds < 10 ? '0' + ds : ds);
    var endDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (de < 10 ? '0' + de : de);
    return {startDate: startDate, endDate: endDate};
};