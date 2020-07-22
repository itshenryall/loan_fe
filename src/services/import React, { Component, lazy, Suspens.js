import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import AuthService from "../../services/auth.service";

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';











const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


const user = JSON.parse(localStorage.getItem('user'));

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
      barPercentage: 0.6,
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      dropdownOpen: false,
      radioSelected: 2,
      items:[]
    };
  }

  componentDidMount() {
    fetch("178.128.222.35:9100/loan-engine-web-services/api/dashboard/dummy", {
        mode: 'no-cors',
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': 'bearer user.accessToken',
            'Content-Type': 'application/json'
        }
    })
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.results.map(data => (
        {
          id: `${data.id.name}`,
          firstName: `${data.name.card1}`,
          lastName: `${data.name.card2}`,
          location: `${data.name.card3}`,
          thumbnail: `${data.dob.age}`,

        }


      )))
      .then(items => this.setState({
        items,
        isLoaded: false
      }))
      .catch(error => console.log('parsing failed', error))
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>





  render() {
     const {items } = this.state;
  
const { currentUser } = this.state;


   
  if (currentUser === null) {
      return <Redirect to='/login'/>;
    }
  


// export default Dashboard;


return (
  <div className="animated fadeIn">    
  {
         items.length > 0 ? items.map(item => {
         const {id, firstName, lastName, location, thumbnail} = item;
          return (    
    <Row>
      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-info">
          <CardBody className="pb-0">
            <ButtonGroup className="float-right">
              <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                <DropdownToggle caret className="p-0" color="transparent">
                  <i className="icon-settings"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem disabled>Disabled action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            <div key={id} className="text-value"> {firstName}</div>
            <div>Notifs Received</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Line data={cardChartData2} options={cardChartOpts2} height={70} />
          </div>
        </Card>
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-success">
          <CardBody className="pb-0">
            <ButtonGroup className="float-right">
              <Dropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                <DropdownToggle className="p-0" color="transparent">
                  <i className="icon-location-pin"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            <div key={id} className="text-value"> {lastName}</div>
            <div>Sent to Scoring</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Line data={cardChartData1} options={cardChartOpts1} height={70} />
          </div>
        </Card>
      </Col>

      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-warning">
          <CardBody className="pb-0">
            <ButtonGroup className="float-right">
              <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                <DropdownToggle caret className="p-0" color="transparent">
                  <i className="icon-settings"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            <div key={id} className="text-value"> {location}</div>
            <div>Push Offer
             <strong>{currentUser.username}</strong>
            </div>

          </CardBody>
          <div className="chart-wrapper" style={{ height: '70px' }}>
            <Line data={cardChartData3} options={cardChartOpts3} height={70} />
          </div>
        </Card>
      </Col>

      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-danger">
          <CardBody className="pb-0">
            <ButtonGroup className="float-right">
              <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                <DropdownToggle caret className="p-0" color="transparent">
                  <i className="icon-settings"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
            <div key={id} className="text-value"> {thumbnail}</div>
            <div>Topup Notifs Received</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
          </div>
        </Card>
      </Col>
    </Row>
    );
  }) : null
}




{
         items.length > 0 ? items.map(item => {
         const {id, firstName, lastName, location, thumbnail} = item;
          return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Row>
              <Col sm="5">
                <CardTitle className="mb-0">Transactions</CardTitle>
                <div className="small text-muted">June 2020</div>
              </Col>
              <Col sm="7" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                    <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                    <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
          <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                <Line data={mainChart} options={mainChartOpts} height={300} />
            </div>
          </CardBody>
          <CardFooter>
            <Row className="text-center">
              <Col sm={12} md className="mb-sm-2 mb-0">
              <div className="text-muted">Offer Accepted</div>
                <strong>9.4M (64%)</strong>
                <Progress className="progress-xs mt-2" color="success" value={thumbnail} />
              </Col>
        
              <Col sm={12} md className="mb-sm-2 mb-0">
                <div className="text-muted">Full Repayment</div>
                <strong>3M (46%)</strong>
                <Progress className="progress-xs mt-2" color="warning" value={thumbnail} />
              </Col>
              {/* <Col sm={12} md className="mb-sm-2 mb-0">
                <div className="text-muted">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <Progress className="progress-xs mt-2" color="danger" value="80" />
              </Col>
              <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Bounce Rate</div>
                <strong>Average Rate (40.15%)</strong>
                <Progress className="progress-xs mt-2" color="primary" value="40" />
              </Col> */}
            </Row>
          </CardFooter>
        </Card>
      </Col>
    </Row>



);
}) : null
}



    {/* <Row>
      <Col xs="6" sm="6" lg="3">
        <Suspense fallback={this.loading()}>
          <Widget03 dataBox={() => ({ variant: 'facebook', friends: '89k', feeds: '459' })} >
            <div className="chart-wrapper">
              <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
            </div>
          </Widget03>
        </Suspense>
      </Col>

      <Col xs="6" sm="6" lg="3">
        <Suspense fallback={this.loading()}>
          <Widget03 dataBox={() => ({ variant: 'twitter', followers: '973k', tweets: '1.792' })} >
            <div className="chart-wrapper">
              <Line data={makeSocialBoxData(1)} options={socialChartOpts} height={90} />
            </div>
          </Widget03>
        </Suspense>
      </Col>

      <Col xs="6" sm="6" lg="3">
        <Suspense fallback={this.loading()}>
          <Widget03 dataBox={() => ({ variant: 'linkedin', contacts: '500+', feeds: '292' })} >
            <div className="chart-wrapper">
              <Line data={makeSocialBoxData(2)} options={socialChartOpts} height={90} />
            </div>
          </Widget03>
        </Suspense>
      </Col>

      <Col xs="6" sm="6" lg="3">
        <Suspense fallback={this.loading()}>
          <Widget03 dataBox={() => ({ variant: 'google-plus', followers: '894', circles: '92' })} >
            <div className="chart-wrapper">
              <Line data={makeSocialBoxData(3)} options={socialChartOpts} height={90} />
            </div>
          </Widget03>
        </Suspense>
      </Col>
    </Row> */}

    <Row>
      <Col>
        <Card>
          <CardHeader>
            Statistic {' & '} Packages
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="6" xl="6">
                <Row>
                  <Col sm="6">
                    <div className="callout callout-info">
                      <small className="text-muted">Server Availability</small>
                      <br />
                      <strong className="h4">9,123</strong>
                      <div className="chart-wrapper">
                        <Line data={makeSparkLineData(0, brandPrimary)} options={sparklineChartOpts} width={100} height={30} />
                      </div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="callout callout-danger">
                      <small className="text-muted">Avg.TPS</small>
                      <br />
                      <strong className="h4">22,643</strong>
                      <div className="chart-wrapper">
                        <Line data={makeSparkLineData(1, brandDanger)} options={sparklineChartOpts} width={100} height={30} />
                      </div>
                    </div>
                  </Col>
                </Row>
                <hr className="mt-0" />
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                      IDR 5k Package
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="34" />
                    <Progress className="progress-xs" color="danger" value="78" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    IDR 10k Package
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="56" />
                    <Progress className="progress-xs" color="danger" value="94" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    IDR 20k Package
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="12" />
                    <Progress className="progress-xs" color="danger" value="67" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    IDR 50k Package
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="43" />
                    <Progress className="progress-xs" color="danger" value="91" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    IDR 100k Package
                    </span>
                  </div>
                 
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="9" />
                    <Progress className="progress-xs" color="danger" value="69" />
                  </div>
                </div>
                <div className="legend text-center">
                  <small>
                    <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
                    Accepted Offer
                    &nbsp;
                    <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                    Rejected Offer
                  </small>
                </div>
              </Col>
              <Col xs="12" md="6" xl="6">
               
                {/* <hr className="mt-0" /> */}
                <ul>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-dollar progress-group-icon"></i>
                      <span className="title">Repaid</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="warning" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <i className="icon-close progress-group-icon"></i>
                      <span className="title">Unrepaid</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="warning" value="37" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">IDR 5k Package</span>
                      <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value="56" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">IDR 10k Package</span>
                      <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value="15" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">IDR 20k Package</span>
                      <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value="11" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">IDR 50k Package</span>
                      <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value="8" />
                    </div>
                  </div>

                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">IDR 100k Package</span>
                      <span className="ml-auto font-weight-bold">19,319 <span className="text-muted small">(4%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value="8" />
                    </div>
                  </div>

                  <div className="divider text-center">
                    <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
                            title="" data-original-title="show more"><i className="icon-options"></i></Button>
                  </div>
                </ul>
              </Col>
            </Row>
            <br />
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
              <thead className="thead-light">
              <tr>
                <th>Package</th>
                <th className="text-center">Type</th>
                <th>Usage</th>
                <th className="text-center">Threshold</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                
                <td>
                  <div>IDR 5k Package</div>
                  <div className="small text-muted">
                    <span>New</span> | Registered: Jan 1, 2020
                  </div>
                </td>
                <td className="text-center">
                Balance
                </td>
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>50%</strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">Jun 11, 2020 - Jul 10, 2020</small>
                    </div>
                  </div>
                  <Progress className="progress-xs" color="success" value="50" />
                </td>
                <td className="text-center">
                IDR 10k Balance
                </td>
                <td>
                  <div className="small text-muted">Last login</div>
                  <strong>10 sec ago</strong>
                </td>
              </tr>
              <tr>
               
                <td>
                  <div>IDR 5k Package</div>
                  <div className="small text-muted">

                    <span>Recurring</span> | Registered: Jan 1, 2020
                  </div>
                </td>
                <td className="text-center">
                Balance
                </td>
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>10%</strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">Jun 11, 2020 - Jul 10, 2020</small>
                    </div>
                  </div>
                  <Progress className="progress-xs" color="info" value="10" />
                </td>
                <td className="text-center">
                IDR 10k Balance
                </td>
                <td>
                  <div className="small text-muted">Last login</div>
                  <strong>5 minutes ago</strong>
                </td>
              </tr>
              <tr>
               
                <td>
                  <div>IDR 5k Package</div>
                  <div className="small text-muted">
                    <span>New</span> | Registered: Jan 1, 2020
                  </div>
                </td>
                <td className="text-center">
                Balance
                </td>
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>74%</strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">Jun 11, 2020 - Jul 10, 2020</small>
                    </div>
                  </div>
                  <Progress className="progress-xs" color="warning" value="74" />
                </td>
                <td className="text-center">
                IDR 10k Balance
                </td>
                <td>
                  <div className="small text-muted">Last login</div>
                  <strong>1 hour ago</strong>
                </td>
              </tr>
              <tr>
             
                <td>
                  <div>IDR 5k Package</div>
                  <div className="small text-muted">
                    <span>New</span> | Registered: Jan 1, 2020
                  </div>
                </td>
                <td className="text-center">
                Balance
                </td>
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>98%</strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">Jun 11, 2020 - Jul 10, 2020</small>
                    </div>
                  </div>
                  <Progress className="progress-xs" color="danger" value="98" />
                </td>
                <td className="text-center">
                IDR 10k Balance
                </td>
                <td>
                  <div className="small text-muted">Last login</div>
                  <strong>Last month</strong>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div>IDR 5k Package</div>
                  <div className="small text-muted">
                    <span>New</span> | Registered: Jan 1, 2020
                  </div>
                </td>
                <td className="text-center">
                Balance
                </td>
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>22%</strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">Jun 11, 2020 - Jul 10, 2020</small>
                    </div>
                  </div>
                  <Progress className="progress-xs" color="info" value="22" />
                </td>
                <td className="text-center">
                IDR 10k Balance
                </td>
                <td>
                  <div className="small text-muted">Last login</div>
                  <strong>Last week</strong>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div>IDR 5k Package</div>
                  <div className="small text-muted">
                    <span>New</span> | Registered: Jan 1, 2020
                  </div>
                </td>
                <td className="text-center">
                  Balance
                </td>
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>43%</strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">Jun 11, 2020 - Jul 10, 2020</small>
                    </div>
                  </div>
                  <Progress className="progress-xs" color="success" value="43" />
                </td>
                <td className="text-center">
                IDR 10k Balance
                </td>
                <td>
                  <div className="small text-muted">Last login</div>
                  <strong>Yesterday</strong>
                </td>
              </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
 
  </div>
  
);
}
}

export default Dashboard;
