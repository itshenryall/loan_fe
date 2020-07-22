import React, { Component } from "react";
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Row,
    Table,
  } from 'reactstrap';
class List extends Component {
  render() {
    return (
<tr>
  <td>
    <div>{this.props.namex}</div>
    <div className="small text-muted">
      <span>{this.props.statusx}</span> | {this.props.startDatex}
    </div>
  </td>
  <td className="text-center">
    {this.props.typex}
  </td>
  <td>
    <div className="clearfix">
      <div className="float-left">
        <strong>{this.props.usagex}%</strong>
      </div>
      <div className="float-right">
    <small className="text-muted">{this.props.usageDatex}</small>
      </div>
    </div>
    <Progress className="progress-xs" color="primary" value={this.props.usagex} />
  </td>
  <td className="text-center">
    {this.props.thresholdx}
  </td>
  <td>
    <div className="small text-muted">Last login</div>
    <strong>{this.props.statusx}</strong>
  </td>
</tr>
    );
  }
}
export default List;
