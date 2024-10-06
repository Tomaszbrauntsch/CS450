import React, {Component} from "react";

class Education extends Component{
    render(){
        return (
            <div className="hd5">
                <div className="hd5_c1">
                    <p><b><i>{this.props.education.title}</i></b></p>
                </div>
                <div className="hd5_c2">
                    <p><b>{this.props.education.eduone}</b><br/>
                    {this.props.education.edumajorone}<br/>
                    {this.props.education.eduyearone}<br/>
                    {this.props.education.edugpaone}</p>
                    
                    
                    <p><b>{this.props.education.edutwo}</b><br/>
                    {this.props.education.edumajortwo}<br/>
                    {this.props.education.eduyeartwo}<br/>
                    {this.props.education.edugpatwo}</p>
                </div>
            </div>
        )
    }
}
export default Education;