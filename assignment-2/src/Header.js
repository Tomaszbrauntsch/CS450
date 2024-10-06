import React, {Component} from "react";

class Header extends Component{
    render(){
        return (
            <div className="hd1">
                <div className="hd1_c1">
                    <p><b>{this.props.personInfo.name}</b><br/>
                    {this.props.personInfo.occupation}</p>
                </div>
                <div className="hd1_c2">
            <p>Email: <a href={this.props.contactInfo.email}>{this.props.contactInfo.email}</a><br/>
            Website: {this.props.contactInfo.website}<br/>
            Mobile: {this.props.contactInfo.mobilenumber}</p>
                </div>
            </div>
        )
    }
}
export default Header;