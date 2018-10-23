import React from "react";
import ApiController from "../../badcode/ApiController";
import mapZipCodesToTable from "./MapZipCodsToTable";
import ZipCodesView from './ZipCodesView';

class ZipCodsLoad extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = new Date();
        this.state = {
            zipCodes: [],
            date: currentDate
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



    componentDidMount() {
        this.getAvailableZipCodes(this.state)
    }
    render () {
        const {zipCodes} = this.state;
        return (
            <ZipCodesView
                onChange={this.setAvailableZipCodes}
                codes={zipCodes}
            />
        )
    }


}

export default ZipCodsLoad;