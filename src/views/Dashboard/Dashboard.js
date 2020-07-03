import React, { Component, lazy, Suspense, FlatList } from 'react';
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
import authHeader from '../../services/auth-header';

import axios from "axios";
import List from "./List";
import Listx from "./Listx";

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';


const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      dropdownOpen: false,
      radioSelected: 2,
      responseJson:[],
      data: [],
      buatChart: [],
      mainChart: []
    };
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






  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('token' + user.accessToken)

    Promise.all([
    fetch("http://localhost:8080/api/dashboard/dummy-notif-received", {
       method: 'GET',
       withCredentials: true,
       headers:{
                  Authorization: 'Bearer ' + user.accessToken,
          },   
        }),

        fetch("http://localhost:8080/api/dashboard/dummy-sent-to-scoring", {
       method: 'GET',
       withCredentials: true,
       headers:{
                  Authorization: 'Bearer ' + user.accessToken,
          },   
        }),

        fetch("http://localhost:8080/api/dashboard/dummy-push-offer", {
       method: 'GET',
       withCredentials: true,
       headers:{
                  Authorization: 'Bearer ' + user.accessToken,
          },   
        }),

      fetch("http://localhost:8080/api/dashboard/dummy-topup-notif-received", {
       method: 'GET',
       withCredentials: true,
       headers:{
                  Authorization: 'Bearer ' + user.accessToken,
          },   
        }),

        fetch("http://localhost:8080/api/dashboard/dummy-transactions", {
          method: 'GET',
          withCredentials: true,
          headers:{
                     Authorization: 'Bearer ' + user.accessToken,
             },   
           }),



           fetch("http://localhost:8080/api/dashboard/dummy-statistics-and-packages", {
            method: 'GET',
            withCredentials: true,
            headers:{
                       Authorization: 'Bearer ' + user.accessToken,
               },   
             }),


             fetch("http://www.json-generator.com/api/json/get/cfxsabgOSq?indent=2"),


             fetch("http://www.json-generator.com/api/json/get/cfIzcYmlnS?indent=2"),
            

      ])


        
      //.then((res) => res.json())
      .then(([res1, res2, res3, res4, res5, res6, res7, res8]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json()]))
      
     
     
 .then(([data1, data2, data3, data4, data5, data6, data7, data8]) => this.setState({
  currentUser: AuthService.getCurrentUser(),
  isLoading: false,

  //cardData


  //card1
  cardNotifReceived: data1.data.totalNotifReceived, 
  cardNotifReceivedChartData0V: data1.data.notifReceivedWeeklys[0].value,
  cardNotifReceivedChartData1V: data1.data.notifReceivedWeeklys[1].value,
  cardNotifReceivedChartData2V: data1.data.notifReceivedWeeklys[2].value,
  cardNotifReceivedChartData3V: data1.data.notifReceivedWeeklys[3].value,
  cardNotifReceivedChartData4V: data1.data.notifReceivedWeeklys[4].value,
  cardNotifReceivedChartData5V: data1.data.notifReceivedWeeklys[5].value,
  
  cardNotifReceivedChartData0W: data1.data.notifReceivedWeeklys[0].week,
  cardNotifReceivedChartData1W: data1.data.notifReceivedWeeklys[1].week,
  cardNotifReceivedChartData2W: data1.data.notifReceivedWeeklys[2].week,
  cardNotifReceivedChartData3W: data1.data.notifReceivedWeeklys[3].week,
  cardNotifReceivedChartData4W: data1.data.notifReceivedWeeklys[4].week,
  cardNotifReceivedChartData5W: data1.data.notifReceivedWeeklys[5].week,


  //card2
  cardSentToScoring: data2.data.totalSentToScoring,
  cardSentToScoringChartData0V: data2.data.sentToScoringWeeklys[0].value,
  cardSentToScoringChartData1V: data2.data.sentToScoringWeeklys[1].value,
  cardSentToScoringChartData2V: data2.data.sentToScoringWeeklys[2].value,
  cardSentToScoringChartData3V: data2.data.sentToScoringWeeklys[3].value,
  cardSentToScoringChartData4V: data2.data.sentToScoringWeeklys[4].value,
  cardSentToScoringChartData5V: data2.data.sentToScoringWeeklys[5].value,

  cardSentToScoringChartData0W: data2.data.sentToScoringWeeklys[0].week,
  cardSentToScoringChartData1W: data2.data.sentToScoringWeeklys[1].week,
  cardSentToScoringChartData2W: data2.data.sentToScoringWeeklys[2].week,
  cardSentToScoringChartData3W: data2.data.sentToScoringWeeklys[3].week,
  cardSentToScoringChartData4W: data2.data.sentToScoringWeeklys[4].week,
  cardSentToScoringChartData5W: data2.data.sentToScoringWeeklys[5].week,


  //card3
  cardPushOffer: data3.data.totalPushOffer,
  cardPushOfferChartData0V: data3.data.pushOfferWeeklys[0].value,
  cardPushOfferChartData1V: data3.data.pushOfferWeeklys[1].value,
  cardPushOfferChartData2V: data3.data.pushOfferWeeklys[2].value,
  cardPushOfferChartData3V: data3.data.pushOfferWeeklys[3].value,
  cardPushOfferChartData4V: data3.data.pushOfferWeeklys[4].value,
  cardPushOfferChartData5V: data3.data.pushOfferWeeklys[5].value,

  cardPushOfferChartData0W: data3.data.pushOfferWeeklys[0].week,
  cardPushOfferChartData1W: data3.data.pushOfferWeeklys[1].week,
  cardPushOfferChartData2W: data3.data.pushOfferWeeklys[2].week,
  cardPushOfferChartData3W: data3.data.pushOfferWeeklys[3].week,
  cardPushOfferChartData4W: data3.data.pushOfferWeeklys[4].week,
  cardPushOfferChartData5W: data3.data.pushOfferWeeklys[5].week,



  //card4
  cardTopupNotifReceived: data4.data.totalTopUpNotifReceived,
  cardTopupNotifReceivedChartData0V: data4.data.topUpNotifReceivedWeeklys[0].value,
  cardTopupNotifReceivedChartData1V: data4.data.topUpNotifReceivedWeeklys[1].value,
  cardTopupNotifReceivedChartData2V: data4.data.topUpNotifReceivedWeeklys[2].value,
  cardTopupNotifReceivedChartData3V: data4.data.topUpNotifReceivedWeeklys[3].value,
  cardTopupNotifReceivedChartData4V: data4.data.topUpNotifReceivedWeeklys[4].value,
  cardTopupNotifReceivedChartData5V: data4.data.topUpNotifReceivedWeeklys[5].value,

  cardTopupNotifReceivedChartData0W: data4.data.topUpNotifReceivedWeeklys[0].week,
  cardTopupNotifReceivedChartData1W: data4.data.topUpNotifReceivedWeeklys[1].week,
  cardTopupNotifReceivedChartData2W: data4.data.topUpNotifReceivedWeeklys[2].week,
  cardTopupNotifReceivedChartData3W: data4.data.topUpNotifReceivedWeeklys[3].week,
  cardTopupNotifReceivedChartData4W: data4.data.topUpNotifReceivedWeeklys[4].week,
  cardTopupNotifReceivedChartData5W: data4.data.topUpNotifReceivedWeeklys[5].week,


  //detail chart data
  transactionDate: data5.data.transactionDate,

  //chart data
  chartTransactionDetailsTotalNotifReceived0: data5.data.transactionsDetails[0].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived1: data5.data.transactionsDetails[1].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived2: data5.data.transactionsDetails[2].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived3: data5.data.transactionsDetails[3].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived4: data5.data.transactionsDetails[4].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived5: data5.data.transactionsDetails[5].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived6: data5.data.transactionsDetails[6].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived7: data5.data.transactionsDetails[7].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived8: data5.data.transactionsDetails[8].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived9: data5.data.transactionsDetails[9].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived10: data5.data.transactionsDetails[10].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived11: data5.data.transactionsDetails[11].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived12: data5.data.transactionsDetails[12].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived13: data5.data.transactionsDetails[13].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived14: data5.data.transactionsDetails[14].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived15: data5.data.transactionsDetails[15].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived16: data5.data.transactionsDetails[16].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived17: data5.data.transactionsDetails[17].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived18: data5.data.transactionsDetails[18].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived19: data5.data.transactionsDetails[19].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived20: data5.data.transactionsDetails[20].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived21: data5.data.transactionsDetails[21].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived22: data5.data.transactionsDetails[22].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived23: data5.data.transactionsDetails[23].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived24: data5.data.transactionsDetails[24].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived25: data5.data.transactionsDetails[25].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived26: data5.data.transactionsDetails[26].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived27: data5.data.transactionsDetails[27].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived28: data5.data.transactionsDetails[28].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived29: data5.data.transactionsDetails[29].totalNotifReceived,
  chartTransactionDetailsTotalNotifReceived30: data5.data.transactionsDetails[30].totalNotifReceived,


  chartTransactionDetailsTotalPushOffer0: data5.data.transactionsDetails[0].totalPushOffer,
  chartTransactionDetailsTotalPushOffer1: data5.data.transactionsDetails[1].totalPushOffer,
  chartTransactionDetailsTotalPushOffer2: data5.data.transactionsDetails[2].totalPushOffer,
  chartTransactionDetailsTotalPushOffer3: data5.data.transactionsDetails[3].totalPushOffer,
  chartTransactionDetailsTotalPushOffer4: data5.data.transactionsDetails[4].totalPushOffer,
  chartTransactionDetailsTotalPushOffer5: data5.data.transactionsDetails[5].totalPushOffer,
  chartTransactionDetailsTotalPushOffer6: data5.data.transactionsDetails[6].totalPushOffer,
  chartTransactionDetailsTotalPushOffer7: data5.data.transactionsDetails[7].totalPushOffer,
  chartTransactionDetailsTotalPushOffer8: data5.data.transactionsDetails[8].totalPushOffer,
  chartTransactionDetailsTotalPushOffer9: data5.data.transactionsDetails[9].totalPushOffer,
  chartTransactionDetailsTotalPushOffer10: data5.data.transactionsDetails[10].totalPushOffer,
  chartTransactionDetailsTotalPushOffer11: data5.data.transactionsDetails[11].totalPushOffer,
  chartTransactionDetailsTotalPushOffer12: data5.data.transactionsDetails[12].totalPushOffer,
  chartTransactionDetailsTotalPushOffer13: data5.data.transactionsDetails[13].totalPushOffer,
  chartTransactionDetailsTotalPushOffer14: data5.data.transactionsDetails[14].totalPushOffer,
  chartTransactionDetailsTotalPushOffer15: data5.data.transactionsDetails[15].totalPushOffer,
  chartTransactionDetailsTotalPushOffer16: data5.data.transactionsDetails[16].totalPushOffer,
  chartTransactionDetailsTotalPushOffer17: data5.data.transactionsDetails[17].totalPushOffer,
  chartTransactionDetailsTotalPushOffer18: data5.data.transactionsDetails[18].totalPushOffer,
  chartTransactionDetailsTotalPushOffer19: data5.data.transactionsDetails[19].totalPushOffer,
  chartTransactionDetailsTotalPushOffer20: data5.data.transactionsDetails[20].totalPushOffer,
  chartTransactionDetailsTotalPushOffer21: data5.data.transactionsDetails[21].totalPushOffer,
  chartTransactionDetailsTotalPushOffer22: data5.data.transactionsDetails[22].totalPushOffer,
  chartTransactionDetailsTotalPushOffer23: data5.data.transactionsDetails[23].totalPushOffer,
  chartTransactionDetailsTotalPushOffer24: data5.data.transactionsDetails[24].totalPushOffer,
  chartTransactionDetailsTotalPushOffer25: data5.data.transactionsDetails[25].totalPushOffer,
  chartTransactionDetailsTotalPushOffer26: data5.data.transactionsDetails[26].totalPushOffer,
  chartTransactionDetailsTotalPushOffer27: data5.data.transactionsDetails[27].totalPushOffer,
  chartTransactionDetailsTotalPushOffer28: data5.data.transactionsDetails[28].totalPushOffer,
  chartTransactionDetailsTotalPushOffer29: data5.data.transactionsDetails[29].totalPushOffer,
  chartTransactionDetailsTotalPushOffer30: data5.data.transactionsDetails[30].totalPushOffer,



  chartTransactionDetailsTotalTopUpNotifReceived0: data5.data.transactionsDetails[0].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived1: data5.data.transactionsDetails[1].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived2: data5.data.transactionsDetails[2].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived3: data5.data.transactionsDetails[3].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived4: data5.data.transactionsDetails[4].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived5: data5.data.transactionsDetails[5].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived6: data5.data.transactionsDetails[6].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived7: data5.data.transactionsDetails[7].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived8: data5.data.transactionsDetails[8].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived9: data5.data.transactionsDetails[9].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived10: data5.data.transactionsDetails[10].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived11: data5.data.transactionsDetails[11].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived12: data5.data.transactionsDetails[12].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived13: data5.data.transactionsDetails[13].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived14: data5.data.transactionsDetails[14].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived15: data5.data.transactionsDetails[15].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived16: data5.data.transactionsDetails[16].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived17: data5.data.transactionsDetails[17].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived18: data5.data.transactionsDetails[18].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived19: data5.data.transactionsDetails[19].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived20: data5.data.transactionsDetails[20].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived21: data5.data.transactionsDetails[21].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived22: data5.data.transactionsDetails[22].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived23: data5.data.transactionsDetails[23].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived24: data5.data.transactionsDetails[24].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived25: data5.data.transactionsDetails[25].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived26: data5.data.transactionsDetails[26].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived27: data5.data.transactionsDetails[27].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived28: data5.data.transactionsDetails[28].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived29: data5.data.transactionsDetails[29].totalTopUpNotifReceived,
  chartTransactionDetailsTotalTopUpNotifReceived30: data5.data.transactionsDetails[30].totalTopUpNotifReceived,


  //dibawah chart 
  chartTransactionOffersAccepted: data5.data.offersAccepted,
  chartTransactionFullRepayment: data5.data.fullRepayment,
  

  //server availability
  progresStaticAvailability: data6.data.serverAvailability,
  progressAverageTPS: data6.data.averageTPS,
  
  //repaid unrepaid
  progressStatisticRepaid: data6.data.repaid,
  progressStatisticUnRepaid: data6.data.unrepaid,

  //progress bar kiri package
  progressStatisticAverageOfPackages0: data6.data.averageOfPackages[0].name,
  progressStatisticAverageOfPackages1: data6.data.averageOfPackages[1].name,
  progressStatisticAverageOfPackages2: data6.data.averageOfPackages[2].name,
  progressStatisticAverageOfPackages3: data6.data.averageOfPackages[3].name,
  progressStatisticAverageOfPackages4: data6.data.averageOfPackages[4].name,
  progressStatisticAverageOfPackagesAO: data6.data.averageOfPackages[0].acceptedOffer,
  progressStatisticAverageOfPackagesAO1: data6.data.averageOfPackages[1].acceptedOffer,
  progressStatisticAverageOfPackagesAO2: data6.data.averageOfPackages[2].acceptedOffer,
  progressStatisticAverageOfPackagesAO3: data6.data.averageOfPackages[3].acceptedOffer,
  progressStatisticAverageOfPackagesAO4: data6.data.averageOfPackages[4].acceptedOffer,
  progressStatisticAverageOfPackagesRO: data6.data.averageOfPackages[0].rejectedOffer,
  progressStatisticAverageOfPackagesRO1: data6.data.averageOfPackages[1].rejectedOffer,
  progressStatisticAverageOfPackagesRO2: data6.data.averageOfPackages[2].rejectedOffer,
  progressStatisticAverageOfPackagesRO3: data6.data.averageOfPackages[3].rejectedOffer,
  progressStatisticAverageOfPackagesRO4: data6.data.averageOfPackages[4].rejectedOffer,

  //progress bar kanan package
  progressStatisticCalculateOfPackageName0: data6.data.calculateOfPackages[0].name,
  progressStatisticCalculateOfPackageName1: data6.data.calculateOfPackages[1].name,
  progressStatisticCalculateOfPackageName2: data6.data.calculateOfPackages[2].name,
  progressStatisticCalculateOfPackageName3: data6.data.calculateOfPackages[3].name,
  progressStatisticCalculateOfPackageName4: data6.data.calculateOfPackages[4].name,
  progressStatisticCalculateOfPackageNameValue0: data6.data.calculateOfPackages[0].value,
  progressStatisticCalculateOfPackageNameValue1: data6.data.calculateOfPackages[1].value,
  progressStatisticCalculateOfPackageNameValue2: data6.data.calculateOfPackages[2].value,
  progressStatisticCalculateOfPackageNameValue3: data6.data.calculateOfPackages[3].value,
  progressStatisticCalculateOfPackageNameValue4: data6.data.calculateOfPackages[4].value,

  //table data
  data: data6.data.packages,

  //testing data chart
  chartData1: data7,
  chartData2: data8,



}
))

    .catch((error) => {
      console.error(error);
      });


  }


    render () {
      const {currentUser} = this.state;
      const {cardNotifReceived, 
             cardSentToScoring,
             chartData1,
             chartData2,
             dataPackage,
             chartTransactionDetails,
             transactionDate,
             cardPushOffer,
             cardTopupNotifReceived,
             chartTransactionOffersAccepted,
             chartTransactionFullRepayment,
             progresStaticAvailability,
             progressAverageTPS,
             progressStatisticRepaid,
             progressStatisticUnRepaid,
             progressStatisticAverageOfPackages0,
             progressStatisticAverageOfPackages1,
             progressStatisticAverageOfPackages2,
             progressStatisticAverageOfPackages3,
             progressStatisticAverageOfPackages4,
             progressStatisticAverageOfPackagesAO,
             progressStatisticAverageOfPackagesAO1,
             progressStatisticAverageOfPackagesAO2,
             progressStatisticAverageOfPackagesAO3,
             progressStatisticAverageOfPackagesAO4,
             progressStatisticAverageOfPackagesRO,
             progressStatisticAverageOfPackagesRO1,
             progressStatisticAverageOfPackagesRO2,
             progressStatisticAverageOfPackagesRO3,
             progressStatisticAverageOfPackagesRO4,
             progressStatisticCalculateOfPackageName0,
             progressStatisticCalculateOfPackageName1,
             progressStatisticCalculateOfPackageName2,
             progressStatisticCalculateOfPackageName3,
             progressStatisticCalculateOfPackageName4,
             progressStatisticCalculateOfPackageNameValue0,
             progressStatisticCalculateOfPackageNameValue1,
             progressStatisticCalculateOfPackageNameValue2,
             progressStatisticCalculateOfPackageNameValue3,
             progressStatisticCalculateOfPackageNameValue4,
             progressStaticnName,
             buatChart,
  chartTransactionDetailsTotalNotifReceived0,
  chartTransactionDetailsTotalNotifReceived1,
  chartTransactionDetailsTotalNotifReceived2,
  chartTransactionDetailsTotalNotifReceived3,
  chartTransactionDetailsTotalNotifReceived4,
  chartTransactionDetailsTotalNotifReceived5,
  chartTransactionDetailsTotalNotifReceived6,
  chartTransactionDetailsTotalNotifReceived7,
  chartTransactionDetailsTotalNotifReceived8,
  chartTransactionDetailsTotalNotifReceived9,
  chartTransactionDetailsTotalNotifReceived10,
  chartTransactionDetailsTotalNotifReceived11,
  chartTransactionDetailsTotalNotifReceived12,
  chartTransactionDetailsTotalNotifReceived13,
  chartTransactionDetailsTotalNotifReceived14,
  chartTransactionDetailsTotalNotifReceived15,
  chartTransactionDetailsTotalNotifReceived16,
  chartTransactionDetailsTotalNotifReceived17,
  chartTransactionDetailsTotalNotifReceived18,
  chartTransactionDetailsTotalNotifReceived19,
  chartTransactionDetailsTotalNotifReceived20,
  chartTransactionDetailsTotalNotifReceived21,
  chartTransactionDetailsTotalNotifReceived22,
  chartTransactionDetailsTotalNotifReceived23,
  chartTransactionDetailsTotalNotifReceived24,
  chartTransactionDetailsTotalNotifReceived25,
  chartTransactionDetailsTotalNotifReceived26,
  chartTransactionDetailsTotalNotifReceived27,
  chartTransactionDetailsTotalNotifReceived28,
  chartTransactionDetailsTotalNotifReceived29,
  chartTransactionDetailsTotalNotifReceived30,
  chartTransactionDetailsTotalPushOffer0,
  chartTransactionDetailsTotalPushOffer1,
  chartTransactionDetailsTotalPushOffer2,
  chartTransactionDetailsTotalPushOffer3,
  chartTransactionDetailsTotalPushOffer4,
  chartTransactionDetailsTotalPushOffer5,
  chartTransactionDetailsTotalPushOffer6,
  chartTransactionDetailsTotalPushOffer7,
  chartTransactionDetailsTotalPushOffer8,
  chartTransactionDetailsTotalPushOffer9,
  chartTransactionDetailsTotalPushOffer10,
  chartTransactionDetailsTotalPushOffer11,
  chartTransactionDetailsTotalPushOffer12,
  chartTransactionDetailsTotalPushOffer13,
  chartTransactionDetailsTotalPushOffer14,
  chartTransactionDetailsTotalPushOffer15,
  chartTransactionDetailsTotalPushOffer16,
  chartTransactionDetailsTotalPushOffer17,
  chartTransactionDetailsTotalPushOffer18,
  chartTransactionDetailsTotalPushOffer19,
  chartTransactionDetailsTotalPushOffer20,
  chartTransactionDetailsTotalPushOffer21,
  chartTransactionDetailsTotalPushOffer22,
  chartTransactionDetailsTotalPushOffer23,
  chartTransactionDetailsTotalPushOffer24,
  chartTransactionDetailsTotalPushOffer25,
  chartTransactionDetailsTotalPushOffer26,
  chartTransactionDetailsTotalPushOffer27,
  chartTransactionDetailsTotalPushOffer28,
  chartTransactionDetailsTotalPushOffer29,
  chartTransactionDetailsTotalPushOffer30,
  chartTransactionDetailsTotalTopUpNotifReceived0,
  chartTransactionDetailsTotalTopUpNotifReceived1,
  chartTransactionDetailsTotalTopUpNotifReceived2,
  chartTransactionDetailsTotalTopUpNotifReceived3,
  chartTransactionDetailsTotalTopUpNotifReceived4,
  chartTransactionDetailsTotalTopUpNotifReceived5,
  chartTransactionDetailsTotalTopUpNotifReceived6,
  chartTransactionDetailsTotalTopUpNotifReceived7,
  chartTransactionDetailsTotalTopUpNotifReceived8,
  chartTransactionDetailsTotalTopUpNotifReceived9,
  chartTransactionDetailsTotalTopUpNotifReceived10,
  chartTransactionDetailsTotalTopUpNotifReceived11,
  chartTransactionDetailsTotalTopUpNotifReceived12,
  chartTransactionDetailsTotalTopUpNotifReceived13,
  chartTransactionDetailsTotalTopUpNotifReceived14,
  chartTransactionDetailsTotalTopUpNotifReceived15,
  chartTransactionDetailsTotalTopUpNotifReceived16,
  chartTransactionDetailsTotalTopUpNotifReceived17,
  chartTransactionDetailsTotalTopUpNotifReceived18,
  chartTransactionDetailsTotalTopUpNotifReceived19,
  chartTransactionDetailsTotalTopUpNotifReceived20,
  chartTransactionDetailsTotalTopUpNotifReceived21,
  chartTransactionDetailsTotalTopUpNotifReceived22,
  chartTransactionDetailsTotalTopUpNotifReceived23,
  chartTransactionDetailsTotalTopUpNotifReceived24,
  chartTransactionDetailsTotalTopUpNotifReceived25,
  chartTransactionDetailsTotalTopUpNotifReceived26,
  chartTransactionDetailsTotalTopUpNotifReceived27,
  chartTransactionDetailsTotalTopUpNotifReceived28,
  chartTransactionDetailsTotalTopUpNotifReceived29,
  chartTransactionDetailsTotalTopUpNotifReceived30,
  cardNotifReceivedChartData0V,
  cardNotifReceivedChartData1V,
  cardNotifReceivedChartData2V,
  cardNotifReceivedChartData3V,
  cardNotifReceivedChartData4V,
  cardNotifReceivedChartData5V,
  cardNotifReceivedChartData0W,
  cardNotifReceivedChartData1W,
  cardNotifReceivedChartData2W,
  cardNotifReceivedChartData3W,
  cardNotifReceivedChartData4W,
  cardNotifReceivedChartData5W,
  cardSentToScoringChartData0V,
  cardSentToScoringChartData1V,
  cardSentToScoringChartData2V,
  cardSentToScoringChartData3V,
  cardSentToScoringChartData4V,
  cardSentToScoringChartData5V,
  cardSentToScoringChartData0W,
  cardSentToScoringChartData1W,
  cardSentToScoringChartData2W,
  cardSentToScoringChartData3W,
  cardSentToScoringChartData4W,
  cardSentToScoringChartData5W,
  cardPushOfferChartData0V,
  cardPushOfferChartData1V,
  cardPushOfferChartData2V,
  cardPushOfferChartData3V,
  cardPushOfferChartData4V,
  cardPushOfferChartData5V,
  cardPushOfferChartData0W,
  cardPushOfferChartData1W,
  cardPushOfferChartData2W,
  cardPushOfferChartData3W,
  cardPushOfferChartData4W,
  cardPushOfferChartData5W,
  cardTopupNotifReceivedChartData0V,
  cardTopupNotifReceivedChartData1V,
  cardTopupNotifReceivedChartData2V,
  cardTopupNotifReceivedChartData3V,
  cardTopupNotifReceivedChartData4V,
  cardTopupNotifReceivedChartData5V,
  cardTopupNotifReceivedChartData0W,
  cardTopupNotifReceivedChartData1W,
  cardTopupNotifReceivedChartData2W,
  cardTopupNotifReceivedChartData3W,
  cardTopupNotifReceivedChartData4W,
  cardTopupNotifReceivedChartData5W,

            } = this.state;



      if (currentUser === null) {
         return <Redirect to='/login'/>;
      }



// Card Chart 1
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [cardNotifReceivedChartData0V,
      cardNotifReceivedChartData1V,
      cardNotifReceivedChartData2V,
      cardNotifReceivedChartData3V,
      cardNotifReceivedChartData4V,
      cardNotifReceivedChartData5V],
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

// Card Chart 2
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: 
      [cardSentToScoringChartData0V,
      cardSentToScoringChartData1V,
      cardSentToScoringChartData2V,
      cardSentToScoringChartData3V,
      cardSentToScoringChartData4V,
      cardSentToScoringChartData5V],
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


// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data:  [cardPushOfferChartData0V,
        cardPushOfferChartData1V,
        cardPushOfferChartData2V,
        cardPushOfferChartData3V,
        cardPushOfferChartData4V,
        cardPushOfferChartData5V],
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
  labels: ['', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data:   [cardTopupNotifReceivedChartData0V,
        cardTopupNotifReceivedChartData1V,
        cardTopupNotifReceivedChartData2V,
        cardTopupNotifReceivedChartData3V,
        cardTopupNotifReceivedChartData4V,
        cardTopupNotifReceivedChartData5V],
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




// sparkline charts
const sparkLineChartData = [
  {
    data: chartData1,
    label: 'Biru',
  },
  {
    data: chartData2,
    label: 'Merah',
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


this.state.buatChart.map((buatChart, key) => {
  let tnr= buatChart.totalNotifReceived;
  let tpo=buatChart.totalPushOffer;
  
  console.log(tnr)
  console.log(tpo)


         
})


// Main Chart
const x= chartTransactionDetails;
console.log(x)

var elements = 27;
var data1 = 
[chartTransactionDetailsTotalNotifReceived0,
chartTransactionDetailsTotalNotifReceived1,
chartTransactionDetailsTotalNotifReceived2,
chartTransactionDetailsTotalNotifReceived3,
chartTransactionDetailsTotalNotifReceived4,
chartTransactionDetailsTotalNotifReceived5,
chartTransactionDetailsTotalNotifReceived6,
chartTransactionDetailsTotalNotifReceived7,
chartTransactionDetailsTotalNotifReceived8,
chartTransactionDetailsTotalNotifReceived9,
chartTransactionDetailsTotalNotifReceived10,
chartTransactionDetailsTotalNotifReceived11,
chartTransactionDetailsTotalNotifReceived12,
chartTransactionDetailsTotalNotifReceived13,
chartTransactionDetailsTotalNotifReceived14,
chartTransactionDetailsTotalNotifReceived15,
chartTransactionDetailsTotalNotifReceived16,
chartTransactionDetailsTotalNotifReceived17,
chartTransactionDetailsTotalNotifReceived18,
chartTransactionDetailsTotalNotifReceived19,
chartTransactionDetailsTotalNotifReceived20,
chartTransactionDetailsTotalNotifReceived21,
chartTransactionDetailsTotalNotifReceived22,
chartTransactionDetailsTotalNotifReceived23,
chartTransactionDetailsTotalNotifReceived24,
chartTransactionDetailsTotalNotifReceived25,
chartTransactionDetailsTotalNotifReceived26,
chartTransactionDetailsTotalNotifReceived27,
chartTransactionDetailsTotalNotifReceived28,
chartTransactionDetailsTotalNotifReceived29,
chartTransactionDetailsTotalNotifReceived30];


var data2 = [chartTransactionDetailsTotalPushOffer0,
  chartTransactionDetailsTotalPushOffer1,
  chartTransactionDetailsTotalPushOffer2,
  chartTransactionDetailsTotalPushOffer3,
  chartTransactionDetailsTotalPushOffer4,
  chartTransactionDetailsTotalPushOffer5,
  chartTransactionDetailsTotalPushOffer6,
  chartTransactionDetailsTotalPushOffer7,
  chartTransactionDetailsTotalPushOffer8,
  chartTransactionDetailsTotalPushOffer9,
  chartTransactionDetailsTotalPushOffer10,
  chartTransactionDetailsTotalPushOffer11,
  chartTransactionDetailsTotalPushOffer12,
  chartTransactionDetailsTotalPushOffer13,
  chartTransactionDetailsTotalPushOffer14,
  chartTransactionDetailsTotalPushOffer15,
  chartTransactionDetailsTotalPushOffer16,
  chartTransactionDetailsTotalPushOffer17,
  chartTransactionDetailsTotalPushOffer18,
  chartTransactionDetailsTotalPushOffer19,
  chartTransactionDetailsTotalPushOffer20,
  chartTransactionDetailsTotalPushOffer21,
  chartTransactionDetailsTotalPushOffer22,
  chartTransactionDetailsTotalPushOffer23,
  chartTransactionDetailsTotalPushOffer24,
  chartTransactionDetailsTotalPushOffer25,
  chartTransactionDetailsTotalPushOffer26,
  chartTransactionDetailsTotalPushOffer27,
  chartTransactionDetailsTotalPushOffer28,
  chartTransactionDetailsTotalPushOffer29,
  chartTransactionDetailsTotalPushOffer30];


var data3 = [chartTransactionDetailsTotalTopUpNotifReceived0,
  chartTransactionDetailsTotalTopUpNotifReceived1,
  chartTransactionDetailsTotalTopUpNotifReceived2,
  chartTransactionDetailsTotalTopUpNotifReceived3,
  chartTransactionDetailsTotalTopUpNotifReceived4,
  chartTransactionDetailsTotalTopUpNotifReceived5,
  chartTransactionDetailsTotalTopUpNotifReceived6,
  chartTransactionDetailsTotalTopUpNotifReceived7,
  chartTransactionDetailsTotalTopUpNotifReceived8,
  chartTransactionDetailsTotalTopUpNotifReceived9,
  chartTransactionDetailsTotalTopUpNotifReceived10,
  chartTransactionDetailsTotalTopUpNotifReceived11,
  chartTransactionDetailsTotalTopUpNotifReceived12,
  chartTransactionDetailsTotalTopUpNotifReceived13,
  chartTransactionDetailsTotalTopUpNotifReceived14,
  chartTransactionDetailsTotalTopUpNotifReceived15,
  chartTransactionDetailsTotalTopUpNotifReceived16,
  chartTransactionDetailsTotalTopUpNotifReceived17,
  chartTransactionDetailsTotalTopUpNotifReceived18,
  chartTransactionDetailsTotalTopUpNotifReceived19,
  chartTransactionDetailsTotalTopUpNotifReceived20,
  chartTransactionDetailsTotalTopUpNotifReceived21,
  chartTransactionDetailsTotalTopUpNotifReceived22,
  chartTransactionDetailsTotalTopUpNotifReceived23,
  chartTransactionDetailsTotalTopUpNotifReceived24,
  chartTransactionDetailsTotalTopUpNotifReceived25,
  chartTransactionDetailsTotalTopUpNotifReceived26,
  chartTransactionDetailsTotalTopUpNotifReceived27,
  chartTransactionDetailsTotalTopUpNotifReceived28,
  chartTransactionDetailsTotalTopUpNotifReceived29,
  chartTransactionDetailsTotalTopUpNotifReceived30];


var labels = ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];


const mainChart = {
  labels: labels,
  datasets: [
    {
      label: 'Total Notif Received',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandPrimary,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'Total Push Offer',
      backgroundColor: 'transparent',
      borderColor: brandWarning,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'Total Top Up Notif Received',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
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
          max: 3000000,
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




console.log(dataPackage)





      return (
        <div className="animated fadeIn">   
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Card className="text-white bg-info">
                <CardBody className="pb-0">
                  <div className="text-value"> {cardNotifReceived}</div>
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
                  <div className="text-value"> {cardSentToScoring}</div>
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
                  <div className="text-value"> {cardPushOffer}</div>
                  <div>Push Offer
                  {/*<strong>{currentUser.username}</strong>*/}
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
                  <div className="text-value"> {cardTopupNotifReceived}</div>
                  <div>Topup Notifs Received</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                  <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
                </div>
              </Card>
            </Col>
          </Row>


    <Row>
      <Col>
        <Card>
          <CardBody>
            <Row>
              <Col sm="5">
                <CardTitle className="mb-0">Transactions</CardTitle>
      <div className="small text-muted">{transactionDate}</div>
              </Col>
              <Col sm="7" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
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
      <strong>{chartTransactionOffersAccepted} (95%)</strong>
                <Progress className="progress-xs mt-2" color="success" value="95"/>
              </Col>
        
              <Col sm={12} md className="mb-sm-2 mb-0">
                <div className="text-muted">Full Repayment</div>
                <strong>{chartTransactionFullRepayment} (60%)</strong>
                <Progress className="progress-xs mt-2" color="warning" value="60" />
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Col>
    </Row>







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
      <strong className="h4">{progresStaticAvailability}</strong>
                      <div className="chart-wrapper">
                        <Line data={makeSparkLineData(0, brandPrimary)} options={sparklineChartOpts} width={100} height={30} />
                      </div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="callout callout-danger">
                      <small className="text-muted">Avg.TPS</small>
                      <br />
      <strong className="h4">{progressAverageTPS}</strong>
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
                    {progressStatisticAverageOfPackages0}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value={String( progressStatisticAverageOfPackagesAO)} />
                    <Progress className="progress-xs" color="danger" value={String( progressStatisticAverageOfPackagesRO)}/>
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    {progressStatisticAverageOfPackages1}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value={String( progressStatisticAverageOfPackagesAO1)} />
                    <Progress className="progress-xs" color="danger" value={String( progressStatisticAverageOfPackagesRO1)} />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    {progressStatisticAverageOfPackages2}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value={String(progressStatisticAverageOfPackagesAO2)}/>
                    <Progress className="progress-xs" color="danger" value={String(progressStatisticAverageOfPackagesRO2)} />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    {progressStatisticAverageOfPackages3}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value={String(progressStatisticAverageOfPackagesAO3)} />
                    <Progress className="progress-xs" color="danger" value={String(progressStatisticAverageOfPackagesRO3)}/>
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                    {progressStatisticAverageOfPackages4}
                    </span>
                  </div>
                 
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value={String(progressStatisticAverageOfPackagesAO4)} />
                    <Progress className="progress-xs" color="danger" value={String(progressStatisticAverageOfPackagesAO4)}/>
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
      <span className="ml-auto font-weight-bold">{progressStatisticRepaid}%</span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="warning" value={String(progressStatisticRepaid)}/>
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <i className="icon-close progress-group-icon"></i>
                      <span className="title">Unrepaid</span>
      <span className="ml-auto font-weight-bold">{progressStatisticUnRepaid}%</span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="warning" value={String(progressStatisticUnRepaid)} />
                    </div>
                  </div>




                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                <span className="title">{progressStatisticCalculateOfPackageName0}</span>
                <span className="ml-auto font-weight-bold">{progressStatisticCalculateOfPackageNameValue0} <span className="text-muted small">(56%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success"value={String(progressStatisticCalculateOfPackageNameValue0)} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">{progressStatisticCalculateOfPackageName1}</span>
                      <span className="ml-auto font-weight-bold">{progressStatisticCalculateOfPackageNameValue1}  <span className="text-muted small">(15%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value={String(progressStatisticCalculateOfPackageNameValue1)} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">{progressStatisticCalculateOfPackageName2}</span>
                      <span className="ml-auto font-weight-bold">{progressStatisticCalculateOfPackageNameValue2}  <span className="text-muted small">(11%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value={String(progressStatisticCalculateOfPackageNameValue2)} />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">{progressStatisticCalculateOfPackageName3}</span>
                      <span className="ml-auto font-weight-bold">{progressStatisticCalculateOfPackageNameValue3}  <span className="text-muted small">(8%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value={String(progressStatisticCalculateOfPackageNameValue3)} />
                    </div>
                  </div>

                  <div className="progress-group">
                    <div className="progress-group-header">
                      <i className="cui-info progress-group-icon"></i>
                      <span className="title">{progressStatisticCalculateOfPackageName4}</span>
                      <span className="ml-auto font-weight-bold">{progressStatisticCalculateOfPackageNameValue4} <span className="text-muted small">(4%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress className="progress-xs" color="success" value={String(progressStatisticCalculateOfPackageNameValue4)}/>
                    </div>
                  </div>

                  <div className="divider text-center">
                    <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
                            title="" data-original-title="show more"><i className="icon-options"></i></Button>
                  </div>
                </ul>
              </Col>
            </Row>

  {/* table */}
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

    {this.state.data.map((data, key) => {
  return <List namex={data.pack.name}
               statusx={data.pack.status} 
               startDatex={data.pack.startDate} 
               typex={data.type}
               usagex={data.usage}
               usageDatex={data.usageDate}
               thresholdx={data.threshold}
               statusx={data.status}
         />
})}
          
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
      