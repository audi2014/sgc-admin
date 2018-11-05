import React from "react";
import ApiController from "../../badcode/ApiController";
import mapZipCodesToTable from "./MapZipCodsToTable";
import ZipCodesView from './ZipCodesView';
import ModalConfirmDelete from './ModalConfirmDelete';
import {DAYS} from "../../badcode/Constants";

class ZipCodsLoad extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = new Date();
        this.state = {
            zipCodes: [],
            date: currentDate,
            modalMessage: null,
            modalAction: null,
        };
    }
    getAvailableZipCodes = () => {
        return ApiController.fetch('user/get_available_zip_codes/', {
            year: this.state.date.getFullYear(),
            month: this.state.date.getMonth()
        })
            .then(res => {
                if (res) {
                    this.setState({
                        zipCodes: res['availableZipCodes'],
                    })
                }
            })
    };
    setAvailableZipCodes = (availableZipCodes) => {
        return ApiController.fetch('admin/set_available_zip_codes/', {
            year: this.state.date.getFullYear(),
            month: this.state.date.getMonth(),
            availableZipCodes:availableZipCodes,
        })
            .then(res => {
                if (res) {
                    this.setState({ zipCodes: res['availableZipCodes']})
                }
            })
    };
    showConfirm = (msg,onOk) => {
        this.setState({
            modalMessage: msg,
            modalAction: onOk,
        })
    };
    hideConfirm = () => {
        this.setState({
            modalMessage: null,
            modalAction: null,
        })
    };
    handleDelete = ({code, dayOfWeek}) => {
        const codesCopy = JSON.parse(JSON.stringify(this.state.zipCodes));
        let obj = codesCopy.find(obj => +obj.dayOfWeek === dayOfWeek);
        if (code && obj) {
            obj.zipCodes = obj.zipCodes.filter(str => str !== code);

            this.showConfirm(
                `Confirm Delete ZIP "${code}" of Day: ${DAYS[dayOfWeek]}`,
                ()=>{
                    this.setAvailableZipCodes(codesCopy); 
                    this.hideConfirm();
                }
            );
        }
        
    };
    handleAdd = ({code, dayOfWeek}) => {

        //делаем глубокую копию данных сервера
        const codesCopy = JSON.parse(JSON.stringify(this.state.zipCodes));
        let obj = codesCopy.find(obj => +obj.dayOfWeek === dayOfWeek);
        if (code) {
            if(obj) {
                if(obj.zipCodes.find(s=>s===code)) {
                    alert("code already set");
                    return;
                } else {
                    obj.zipCodes.push(code);
                }
            } else {
                codesCopy.push({dayOfWeek, zipCodes:[code] })
            }

            this.showConfirm(
                `Confirm Add ZIP "${code}" of Day: ${DAYS[dayOfWeek]}`,
                ()=>{
                    this.setAvailableZipCodes(codesCopy); 
                    this.hideConfirm();
                }
            );
        }
        
    };



    componentDidMount() {
        this.getAvailableZipCodes(this.state)
    }
    render () {
        const {zipCodes,modalMessage,modalAction} = this.state;
        return (<div>
            <ZipCodesView
                onDelete={this.handleDelete}
                onAdd={this.handleAdd}
                codes={zipCodes}
            />
            <ModalConfirmDelete 
                message={modalMessage} 
                onOk={modalAction} 
                onCancel={this.hideConfirm} 
                open={modalMessage && modalAction}
            />
        </div>)
    }


}

export default ZipCodsLoad;