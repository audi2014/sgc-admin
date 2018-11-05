import CryptoJS from "cryptojs";
import Cookies from "js-cookie";
import {
    API_ENDPOINT,
    API_NO_AES,
    API_NO_AUTH,
    API_AUTH_OK,
} from "./Constants";


export default {
    app: false,
    state: {
        aesKeyHash: '23ef8d5472ff814d',
        context: false
    },
    fetch: function (path, dataPublic = {}) {
        const dataPrivate = {
            context: this.state.context
        };

        return fetch(API_ENDPOINT + path, {
            method: 'POST',
            body: JSON.stringify({
                dataPrivate: dataPrivate,
                dataPublic: dataPublic
            })
        }).then(res => res.json())
            .then(res => {
                const data = this.DecryptData(res);
                if (data.success === true) {
                    this.saveContext(data.dataPrivate.context);
                    return {...data.dataPrivate, ...data.dataPublic}
                }
                else {
                    this.handleApiError(data.error.code, data.error.message);
                    return null;
                }
            }).catch(e => {
            this.handleApiError(400, e.toString());
            return null;
        });
    },
    connect: function () {
        this.app.showMessage('loading', 'connect...');
        return this.fetch(
            "app/connect/", 
            {}
        ).then(data => {
            if(!data) {
                alert("error");
            } else {
                this.app.setState({
                    apiStatus: API_NO_AUTH
                });
                this.app.hideMessage();            
            }
            return data;    
        });
    },
    login: function (email, password) {
        this.app.showMessage('loading', 'login...');

        return this.fetch(
            "app/login/", 
            {
                "password": password, 
                "user": {"email": email}
            }
        ).then(data => {
            if(data) {                
                if (data.user.userType == 1) {
                    this.saveContext(data.context);
                    this.state.user = data.user;
                    
                    this.app.hideMessage();
                    this.app.setState({
                        apiStatus: API_AUTH_OK,
                        token: data.context.userToken
                    });

                    return data;
                }
                else {
                    this.handleApiError(2, 'sory, you are not admin :(');
                    return null;
                }
            }
        });
    },


// START UP
    start: function () {
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
                this.app.hideMessage();
                this.app.setState({
                    apiStatus: API_AUTH_OK,
                    token: this.state.context.userToken
                });
            }
        }
    },
    DecryptData: function (json) {
        if (typeof json.dataPrivate == "undefined") {
            json.dataPrivate = [];
        }
        else if (typeof json.dataPrivate == "string" && !!json.dataPrivate) {
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
    handleApiError: function (code, message) {
        if (message != 'abort') {
            console.error(message);
            this.app.showMessage(code, message);
        }
    },
    reedSavedAppId: function () {

        const oldCookie =  Cookies.get('appId');
        if (!oldCookie) {
            const newCookie = "react.js-" + Math.random().toString(36).substr(2, 16);
            Cookies.set('appId', newCookie);
            return newCookie;
        }
        else {
            return oldCookie;
        }
    },
    reedSavedContext: function () {
        const oldCookie = Cookies.getJSON('context');
        if (!oldCookie) {
            return {appId: this.reedSavedAppId(), clientVersion: "reactClientV1b", userToken: null, userId: null};
        }
        else {
            return oldCookie;
        }
    },
    logout: function () {
        this.state.context = false;
        Cookies.remove('context');
        this.app.setState({
            apiStatus: API_NO_AUTH
        });
        return this.start();


    },
    saveContext: function (context) {
        this.state.context = context;
        if (!context) {
            Cookies.remove('context');
        }
        else {
            Cookies.set('context', context);
        }
    }
};