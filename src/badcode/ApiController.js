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
    app:false,
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
    requestWithContext: function(params /* {path, public, private, onFinish} */) {
        const path = params.path;
        const dataPublic = params.public ? params.public : {};
        const dataPrivate = params.private ? params.private : {};
        const onFinish = params.onFinish;
        dataPrivate.context = this.state.context;
        return $.ajax({
            type: "POST",
            data: JSON.stringify(this.EncryptData({
                dataPrivate: dataPrivate,
                dataPublic: dataPublic
            })),
            url: API_ENDPOINT+path,
            dataType:'json',
            cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    return onFinish ? onFinish(data) : null;
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: (function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this))
        });
    },
    finishLogin: function(context) {
        this.app.hideMessage();
        this.app.setState({
            apiStatus: API_AUTH_OK,
            token: context.userToken
        });
    },
    registerCleaner: function(userObj,password,onFinish) {
        var body = {
            dataPrivate: {
                context: this.state.context,
                password: password,
            },
            dataPublic: {
                user:userObj
            }
        };
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.register_cleaner, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: (function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this))
        });

    },
    resetPassword: function(email, onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {user:{email:email}}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.reset_password, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    changePassword: function(oldPassword, newPassword, onFinish) {
        var body = {"dataPrivate": {"context": this.state.context, "oldPassword":oldPassword, "newPassword":newPassword },"dataPublic": {}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.change_password, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },

    connect: function() {
        //this.app.showMessage('loading', 'connect...');
        debugger;
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.connect,dataType: 'json',cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    this.app.setState({
                        apiStatus: API_NO_AUTH
                    });
                    //this.hideMessage();
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this),
        });
    },
    login: function(email, password) {
        this.app.showMessage('loading', 'login...');
        var body = {"dataPrivate": {"context": this.state.context, "password":password},"dataPublic": {"user":{"email":email}}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.login, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    if(data.dataPublic.user.userType == 1) {
                        this.saveContext(data.dataPrivate.context);
                        this.state.user = data.dataPublic.user;
                        this.finishLogin(data.dataPrivate.context);
                    }
                    else {
                        this.handleApiError( 2,  'sory, you are not admin :(');
                    }
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this),
        });
    },
    getUsers: function(page, order, serchText, onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"page":page,"orderBy":order,"serch":serchText}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.get_all_users, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.userList, data.dataPublic.pages);
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    getAviableZipCodes: function(year, month, onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {year:year,month:month}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.get_available_zip_codes, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.availableZipCodes || []);
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    setAviableZipCodes: function(year, month, rows, onFinish) {
        var body = {
            "dataPrivate": {"context": this.state.context},
            "dataPublic": {
                year:year,
                month:month,
                availableZipCodes:rows
            }
        };
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.set_available_zip_codes, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.availableZipCodes || []);
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    getServiceList: function(onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.get_service_list, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.serviceList);
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    getGiftPayments: function(onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),
            url: this.state.routes.get_gift_payments,
            dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPrivate.giftPayments);
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    setGiftPaymentAdminData: function(id, isProcessed, isArchived, adminComment, onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {
                id:id,isProcessed:isProcessed, isArchived:isArchived, adminComment:adminComment
            }};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),
            url: this.state.routes.set_gift_payment_admin_data,
            dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPrivate.giftPayments);
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    getBookingList: function(page, startDate, endDate, serch, onFinish, isArchived, isNewOnly) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"startDate":startDate, "endDate":endDate, "page":page, "serch":serch}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),
            url: (
                isNewOnly
                    ? this.state.routes.get_booking_list_new_only
                    : isArchived
                    ? this.state.routes.get_booking_list_archived
                    : this.state.routes.get_booking_list
            ),
            dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.bookingList, data.dataPublic.pages);
                }
                else {
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    getCalendar: function(startDate, endDate, onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"startDate":startDate, "endDate":endDate}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.get_available_hours, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.availableHours);
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },

    setAvailableHours: function(availableHoursObj,onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"availableHours":availableHoursObj}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.set_available_hours, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    setBusyDate: function(busyDateObj,onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"busyDate":busyDateObj}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.set_busy_date, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    insertService: function(service,onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"service":service}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.insert_service, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.service);
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },

    setBookingisArchived: function(id,val,onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"bookingId":id, "value":val}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.set_booking_archived, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },

    setBookingIsProcessed: function(id,comment,onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"bookingId":id, "comment":comment}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.set_booking_processed, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish();
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },


    updateUser: function(userObj,onFinish) {
        var body = {"dataPrivate": {"context": this.state.context},"dataPublic": {"user":userObj}};
        body = this.EncryptData(body);
        $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.edit_user, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.user);
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },
    getUserById: function(id,onFinish) {
        console.log("getUserById " + id);
        var body = {
            "dataPrivate": {
                "context": this.state.context
            },
            "dataPublic": {
                "user": {
                    "fullName":" ",
                    "id":id
                }
            }
        };
        body = this.EncryptData(body);
        return $.ajax({
            type: "POST",data:  JSON.stringify(body),url: this.state.routes.get_user, dataType:'json', cache: false,
            success: function(data) {
                data = this.DecryptData(data);
                if(data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    onFinish(data.dataPublic.user);
                }
                else {
                    console.log(data.error);
                    this.handleApiError( data.error.code,  data.error.message);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                this.handleApiError(400, err.toString());
            }.bind(this)
        });
    },


// START UP
    start: function(){
        this.state.aesKeyHash = this.reedSavedAesKeyHash();
        if(!this.state.aesKeyHash) {
            this.app.setState({
                apiStatus: API_NO_AES
            });
        }
        else {
            this.state.context = this.reedSavedContext();
            debugger;
            if(!this.state.context.userToken || !this.state.context.userId) {
                this.connect();
            }
            else {
                this.finishLogin(this.state.context);
            }
        }
    },
    DecryptData: function(json) {
        if(typeof json.dataPrivate == "undefined") {
            json.dataPrivate = [];
        }
        else if(typeof json.dataPrivate == "string" && !isBlank(json.dataPrivate)) {
            var ciphertext = json.dataPrivate;
            var decryptedText = null;
            try {
                // Mcrypt pads a short key with zero bytes
                var key = CryptoJS.enc.Utf8.parse(this.state.aesKeyHash);
                // Mcrypt uses ZERO padding
                var plaintext = CryptoJS.AES.decrypt(ciphertext, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding })
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
    EncryptData: function(json) {
        this._debug_prev_body = json;
        var text = JSON.stringify(json.dataPrivate);
        return json;
    },
    handleApiError: function(code, message) {
        console.log(code+", "+message, this._debug_prev_body);
        if (message !='abort') {
            this.app.showMessage(code, message, MSG_MODE_MODAL);
        }
    },
    reedSavedAppId: function() {
        var oldCookie = $.cookie('appId');
        if(oldCookie == null || isBlank(oldCookie)) {
            var newCookie = "react.js-" + Math.random().toString(36).substr(2, 16);
            $.cookie('appId', newCookie);
            return newCookie;
        }
        else {
            return oldCookie;
        }
    },
    reedSavedAesKeyHash: function() {
        return this.state.aesKeyHash;
        // var aesKeyHash = $.cookie('aesKeyHash');
        // if(aesKeyHash == null || isBlank(aesKeyHash)) {
        // 	return false;
        // }
        // else {
        // 	return aesKeyHash;
        // }
    },
    saveAesKeyHash: function(aesKeyHash) {
        this.state.aesKeyHash = aesKeyHash;
        if(!aesKeyHash) {
            $.cookie('aesKeyHash', "");
            this.app.showMessage(E_CODE_ARG_MISSING, "wrong AES KeyHash", MSG_MODE_DIALOG, function(){
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
    reedSavedContext: function() {
        var oldCookie = $.cookie('context');
        if(oldCookie == null || isBlank(oldCookie)) {
            return { appId: this.reedSavedAppId(), clientVersion:"reactClientV1b", userToken:null, userId:null };
        }
        else {
            return JSON.parse(oldCookie);
        }
    },
    logout: function() {
        this.state.context = false;
        $.cookie('context', "");
        $.cookie('appId', "");
        this.app.setState({
            apiStatus: API_NO_AUTH
        });

    },
    saveContext: function(context) {
        this.state.context = context;
        if(context == "") {
            $.cookie('context', "");
        }
        else {
            $.cookie('context', JSON.stringify(context));
        }
    }
};