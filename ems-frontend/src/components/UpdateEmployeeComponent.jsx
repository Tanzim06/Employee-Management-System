import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            firstName:'',
            lastName:'',
            email:''

        }
        this.ChangeFirstNameHandler= this.ChangeFirstNameHandler.bind(this);
        this.ChangeLastNameHandler= this.ChangeLastNameHandler.bind(this);
        this.ChangeEmailHandler= this.ChangeEmailHandler.bind(this);
        this.updateEmployee= this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res)=>{
            let employee = res.data;
            this.setState({firstName: employee.firstName, 
                           lastName: employee.lastName, 
                           email: employee.email
                        });
                     });
    }

    ChangeFirstNameHandler=(event)=>{
        this.setState({firstName: event.target.value});
    }

    ChangeLastNameHandler=(event)=>{
        this.setState({lastName: event.target.value});
    }

    ChangeEmailHandler=(event)=>{
        this.setState({email: event.target.value});
    }

 updateEmployee= (e) =>{
        e.preventDefault();
        let employee={firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
        console.log('employee =>'+JSON.stringify(employee));
        EmployeeService.updateEmployee(employee, this.state.id).then(res =>{
            this.props.history.push('/employees');
        });
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input placeholder="First Name" name="firstname" className="form-control"
                                        value={this.state.firstName} onChange={this.ChangeFirstNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input placeholder="Last Name" name="lastname" className="form-control"
                                        value={this.state.lastName} onChange={this.ChangeLastNameHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input placeholder="Email Address" name="email" className="form-control"
                                        value={this.state.email} onChange={this.ChangeEmailHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UpdateEmployeeComponent;