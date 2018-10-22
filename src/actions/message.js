import {E_CODE_ARG_MISSING, E_CODE_AUTH_FAIL, E_CODE_DUBLICATE, E_CODE_FILE_SIZE} from "../badcode/Constants";
const errorCodeToTitle = (code) => {
    switch (code) {
        case 'loading':
            return "loading...";
        case E_CODE_ARG_MISSING:
            return "Empty field";
        case E_CODE_FILE_SIZE:
            return "File too large";
        case E_CODE_DUBLICATE:
            return "Duplicate";
        case E_CODE_AUTH_FAIL:
            return "Auth fail";
        default:
            return "No title";
    }
};

export const showMessage = (title, message) => ({
    type: 'SHOW_MESSAGE',
    payload: {message, title}
});

export const hideMessage = () => ({
    type: 'HIDE_MESSAGE',
});

export const showError = (message) => ({
    type: 'SHOW_MESSAGE',
    payload: {message, title:"Error"}
});

export const showApiMessage = ({message, code}) => ({
    type: 'SHOW_MESSAGE',
    payload: {message, title:errorCodeToTitle(code)}
});



