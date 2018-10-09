import React from "react";
import ApiController from "../../badcode/ApiController";
import {Grid} from "semantic-ui-react";
import ServiceList from './ServiceList';
import EditService from './EditService';



class ListService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            selectedService: null,
        }
    }
   loadService = () => {
     return ApiController.fetch('user/get_service_list/')
         .then(res => {
             if (res) {
                 this.setState({services: res['serviceList']});
             }
         })
    };
    updateService = (service) => {
        this.setState({selectedService:service});
        return ApiController.fetch('admin/insert_service/', {service})
            .then(res => {
                if (res) {
                    this.handleServiceLoaded(res.service)
                }
            })
    };

    handleServiceLoaded =(service) => {
        // let find = false;
        // const result = this.state.services.reduce(function (sum,currentService){
        //     if(+currentService.id === +service.id) {
        //         sum.push(service);
        //         find = true;
        //     } else {
        //         sum.push(currentService);
        //     }
        //     return sum;
        // }, []);
        // if(!find) {
        //     result.push(service)
        // }
        const newServices = this.state
            .services.filter(s => +s.id !== +service.id);
        newServices.push(service);
        this.setState({services:newServices})
    };

    handleEditService = (service) => {
        this.updateService(service);
    };
    handleCreateService = () => {
        this.setState({selectedService: {
                    id: null,
                    name: "",
                    price: 100000,
                    isMulticount: 0,
                    isTemporal: 0
            }})
    };
    componentDidMount() {
        this.loadService(this.state)
    }
    handleServiceSelect = (id) => {
        const service = this.state.services.find(
            obj => Number(obj.id) === Number(id)
        );
        this.setState({selectedService: service})
    };
    render () {
        const {services, selectedService} = this.state;
        return (
            <Grid inverted stackable>
        <Grid.Row columns={2}>
            <Grid.Column width={5}>
                <ServiceList
                    selectedServiceId={selectedService ? selectedService.id : null}
                    services={services}
                    onServiceSelect={this.handleServiceSelect}
                    onServiceCreate={this.handleCreateService}
                />
    </Grid.Column>
    <Grid.Column width={8}>
        {selectedService && <EditService
            onEditService={this.handleEditService}
            data={selectedService}/>}
    </Grid.Column>
    </Grid.Row>
        </Grid>
        )
    }
}

export default ListService;