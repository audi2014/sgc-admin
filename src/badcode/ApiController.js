import $ from "jquery";
import cookie from "jquery.cookie";
import CryptoJS from "cryptojs";
import {
    API_ENDPOINT,
    MSG_MODE_MODAL,
    MSG_MODE_DIALOG,
    E_CODE_ARG_MISSING,
    API_NO_AES,
    API_NO_AUTH,
    API_AUTH_OK,
} from "./Constants";


function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

export default {
    _debug_prev_body: null,
    app: false,
    state: {
        aesKeyHash: '23ef8d5472ff814d',
        routes: {
            connect: API_ENDPOINT + "app/connect/",
            login: API_ENDPOINT + "app/login/",
            get_all_users: API_ENDPOINT + "admin/get_all_users/",
            get_service_list: API_ENDPOINT + "user/get_service_list/",
            get_available_zip_codes: API_ENDPOINT + "user/get_available_zip_codes/",
            get_booking_list: API_ENDPOINT + "admin/get_booking_list/",
            get_booking_list_archived: API_ENDPOINT + "admin/get_booking_list_archived/",
            get_booking_list_new_only: API_ENDPOINT + "admin/get_booking_list_new_only/",
            get_available_hours: API_ENDPOINT + "admin/get_available_hours/",
            set_available_hours: API_ENDPOINT + "admin/set_available_hours/",
            edit_user: API_ENDPOINT + "admin/edit_user/",
            get_user: API_ENDPOINT + "admin/get_user/",
            insert_service: API_ENDPOINT + "admin/insert_service/",
            set_booking_archived: API_ENDPOINT + "admin/set_booking_archived/",
            set_booking_processed: API_ENDPOINT + "admin/set_booking_processed/",
            change_password: API_ENDPOINT + "user/change_password/",
            reset_password: API_ENDPOINT + "app/send_new_password/",
            get_gift_payments: API_ENDPOINT + "admin/get_gift_payments/",
            set_available_zip_codes: API_ENDPOINT + "admin/set_available_zip_codes/",
            set_gift_payment_admin_data: API_ENDPOINT + "admin/set_gift_payment_admin_data/",
            register_cleaner: API_ENDPOINT + "admin/register-cleaner/",
        },
        context: false
    },
    fetch: function (path, dataPublic = {}) {
        const dataPrivate = {
            context: this.state.context
        };

        return fetch(API_ENDPOINT + path, {
            method: 'POST',
            body: JSON.stringify(this.EncryptData({
                dataPrivate: dataPrivate,
                dataPublic: dataPublic
            }))
        }).then(res => res.json())
            .then(res => {
                const data = this.DecryptData(res);
                if (data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    return {...data.dataPrivate, ...data.dataPublic}
                }
                else {
                    console.log(data.error);
                    this.handleApiError(data.error.code, data.error.message);
                    return null;
                }
            }).catch(e => {
            this.handleApiError(400, e.toString());
            return null;
        });
    },
    finishLogin: function (context) {
        this.app.hideMessage();
        this.app.setState({
            apiStatus: API_AUTH_OK,
            token: context.userToken
        });
    },
    registerCleaner: function (userObj, password, onFinish) {
        var body = {
            dataPrivate: {
                context: this.state.context,
                password: password,
            },
            dataPublic: {
                user: userObj
            }
        };
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",
            data: JSON.stringify(body),
            url: this.state.routes.register_cleaner,
            dataType: 'json',
            cache: false,
            success: function (data) {
                data = this.DecryptData(data);
                if (data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError(data.error.code, data.error.message);
                }
            }.bind(this),
            error: (function (xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this))
        });

    },
    resetPassword: function (email, onFinish) {
        var body = {"dataPrivate": {"context": this.state.context}, "dataPublic": {user: {email: email}}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",
            data: JSON.stringify(body),
            url: this.state.routes.reset_password,
            dataType: 'json',
            cache: false,
            success: function (data) {
                data = this.DecryptData(data);
                if (data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError(data.error.code, data.error.message);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    changePassword: function (oldPassword, newPassword, onFinish) {
        var body = {
            "dataPrivate": {
                "context": this.state.context,
                "oldPassword": oldPassword,
                "newPassword": newPassword
            }, "dataPublic": {}
        };
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",
            data: JSON.stringify(body),
            url: this.state.routes.change_password,
            dataType: 'json',
            cache: false,
            success: function (data) {
                data = this.DecryptData(data);
                if (data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError(data.error.code, data.error.message);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },

    connect: function () {
        this.app.showMessage('loading', 'connect...');
        var body = {"dataPrivate": {"context": this.state.context}, "dataPublic": {}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST", data: JSON.stringify(body), url: this.state.routes.connect, dataType: 'json', cache: false,
            success: function (data) {
                data = this.DecryptData(data);
                if (data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    this.app.setState({
                        apiStatus: API_NO_AUTH
                    });
                    this.app.hideMessage();
                }
                else {
                    this.handleApiError(data.error.code, data.error.message);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this),
        });
    },
    login: function (email, password) {
        this.app.showMessage('loading', 'loading...');
        var body = {
            "dataPrivate": {"context": this.state.context, "password": password},
            "dataPublic": {"user": {"email": email}}
        };
        body = this.EncryptData(body);
        $.ajax({
            type: "POST", data: JSON.stringify(body), url: this.state.routes.login, dataType: 'json', cache: false,
            success: function (data) {
                data = this.DecryptData(data);
                if (data.success === true) {
                    if (data.dataPublic.user.userType == 1) {
                        this.saveContext(data.dataPrivate.context);
                        this.state.user = data.dataPublic.user;
                        this.finishLogin(data.dataPrivate.context);
                    }
                    else {
                        this.handleApiError(2, 'sory, you are not admin :(');
                    }
                }
                else {
                    this.handleApiError(data.error.code, data.error.message);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this),
        });
    },


// START UP
    start: function () {
        this.state.aesKeyHash = this.reedSavedAesKeyHash();
        if (!this.state.aesKeyHash) {
            this.app.setState({
                apiStatus: API_NO_AES
            });
        }
        else {
            this.state.context = this.reedSavedContext();
            if (!this.state.context.userToken || !this.state.context.userId) {
                this.connect();
            }
            else {
                this.finishLogin(this.state.context);
            }
        }
    },
    DecryptData: function (json) {
        if (typeof json.dataPrivate == "undefined") {
            json.dataPrivate = [];
        }
        else if (typeof json.dataPrivate == "string" && !isBlank(json.dataPrivate)) {
            var ciphertext = json.dataPrivate;
            var decryptedText = null;
            try {
                // Mcrypt pads a short key with zero bytes
                var key = CryptoJS.enc.Utf8.parse(this.state.aesKeyHash);
                // Mcrypt uses ZERO padding
                var plaintext = CryptoJS.AES.decrypt(ciphertext, key, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.ZeroPadding
                })
                json.dataPrivate = JSON.parse(CryptoJS.enc.Utf8.stringify(plaintext));
            }
                //Malformed UTF Data due to incorrect password
            catch (err) {
                this.saveAesKeyHash(false);
                json.dataPrivate = "";
            }
        }
        return json;
    },
    EncryptData: function (json) {
        this._debug_prev_body = json;
        var text = JSON.stringify(json.dataPrivate);
        return json;
    },
    handleApiError: function (code, message) {
        console.log(code + ", " + message, this._debug_prev_body);
        if (message != 'abort') {
            this.app.showMessage(code, message, MSG_MODE_MODAL);
        }
    },
    reedSavedAppId: function () {
        var oldCookie = $.cookie('appId');
        if (oldCookie == null || isBlank(oldCookie)) {
            var newCookie = "react.js-" + Math.random().toString(36).substr(2, 16);
            $.cookie('appId', newCookie);
            return newCookie;
        }
        else {
            return oldCookie;
        }
    },
    reedSavedAesKeyHash: function () {
        return this.state.aesKeyHash;
        // var aesKeyHash = $.cookie('aesKeyHash');
        // if(aesKeyHash == null || isBlank(aesKeyHash)) {
        // 	return false;
        // }
        // else {
        // 	return aesKeyHash;
        // }
    },
    saveAesKeyHash: function (aesKeyHash) {
        this.state.aesKeyHash = aesKeyHash;
        if (!aesKeyHash) {
            $.cookie('aesKeyHash', "");
            this.app.showMessage(E_CODE_ARG_MISSING, "wrong AES KeyHash", MSG_MODE_DIALOG, function () {
                this.app.setState({
                    apiStatus: API_NO_AES
                });
                this.app.hideMessage();
            }.bind(this));
        }
        else {
            $.cookie('aesKeyHash', aesKeyHash);
        }
    },
    reedSavedContext: function () {
        var oldCookie = $.cookie('context');
        if (oldCookie == null || isBlank(oldCookie)) {
            return {appId: this.reedSavedAppId(), clientVersion: "reactClientV1b", userToken: null, userId: null};
        }
        else {
            return JSON.parse(oldCookie);
        }
    },
    logout: function () {
        this.state.context = false;
        $.cookie('context', "");
        // $.cookie('appId', "");
        this.app.setState({
            apiStatus: API_NO_AUTH
        });

    },
    saveContext: function (context) {
        this.state.context = context;
        if (context == "") {
            $.cookie('context', "");
        }
        else {
            $.cookie('context', JSON.stringify(context));
        }
    }
};