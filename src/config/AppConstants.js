const loginType = {
    USER: "1",
    ADMIN: "2"
}
const SERVER_ERROR = "Something went on server.";
// Used to show date and time ui
const LOCAL_DATE_FORMAT = "MMMM DD, YYYY";
const LOCAL_DATE_TIME_FORMAT = "MMMM DD, YYYY hh:mm A";
const LOCAL_DATE_S_FORMAT = "MMM DD, YYYY HH:mm A";
const LOCAL_DATE_TIME_SHORT_FORMAT = "MMM DD, YYYY hh:mm A";
const LOCAL_DATE_SHORT_FORMAT = "MMM DD, YYYY";
// Used while sending data on sever
const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:MM";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

//Used in date picker
const DATE_PICKER_DATE_AND_TIME_FORMAT = "MMMM dd, yyyy hh:mm: a"
const DATE_PICKER_DATE_FORMAT = "MMMM dd, yyyy"; /*"")*/
const DATE_PICKER_TIME_FORMAT = "p";
const LOCAL_DATE_SHORTS_FORMAT = "MMM dd, yyyy";

const days = [{
    value: 7,
    label: 'Sunday'
}, {
    value: 1,
    label: 'Monday'
}, {
    value: 2,
    label: 'Tuesday'
}, {
    value: 3,
    label: 'Wednesday'
}, {
    value: 4,
    label: 'Thursday'
}, {
    value: 5,
    label: 'Friday'
}, {
    value: 6,
    label: 'Saturday'
}]
const modalData = {
    modalStyle: {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 0, 0, 0.7)'
        },
        content: {
            margin: '0% auto',
            width: 'unset',
            border: 'none',
            background:'none'
        }
    },
    confirmationPopUpStyple : {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 0, 0, 0.7)'
        },
        content: {
            width: '40%',
        } 
    },
    pageLength: 10
}

const SIZE_PER_PAGE = 10;
const NO_DATA_TEXT = "No entries available.";


const data = {
    modalStyle: {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 34, 72, 1)'
        },
        content: {
            margin: '0% auto',
            width: 'unset',
            border: 'none',
            background:'none'
        }
    },
    confirmationPopUpStyple : {
        overlay: {
            zIndex: 9999999999,
            overflowX: 'hidden',
            overflowY: 'auto',
            backgroundColor : 'rgba(0, 34, 72, 1)'
        },
        content: {
            width: '40%',

        } 
    },
    pageLength: 10
}


export default {
   
    SERVER_ERROR,
    loginType,
    DATE_FORMAT,
    LOCAL_DATE_FORMAT,
    LOCAL_DATE_SHORT_FORMAT,
    LOCAL_DATE_TIME_SHORT_FORMAT,
    DATE_TIME_FORMAT,
    DATE_PICKER_DATE_FORMAT,
    DATE_PICKER_TIME_FORMAT,
    DATE_PICKER_DATE_AND_TIME_FORMAT,
    
    SIZE_PER_PAGE,
    NO_DATA_TEXT,
    LOCAL_DATE_TIME_FORMAT,
    DATA:data,
    TIME_FORMAT,
    
    LOCAL_DATE_SHORTS_FORMAT,
    LOCAL_DATE_S_FORMAT,
   
};