import React, {Component} from 'react';
import PaidGiftFooter from "./PaidGiftFooter";

export default  (str) => {
    return (!str || /^\s*$/.test(str));
};
// class Function extends React.Component {
//     CardInfoView = (props) => {
//         var paymentInfo = props.paymentInfo;
//         return (
//             <div className="col-sm-6">
//                 <h4>Card info</h4>
//                 <table className="table table-hover">
//                     <tbody>
//                     <tr>
//                         <td>Number:</td>
//                         <td>{paymentInfo.getAccountNumber}</td>
//                     </tr>
//                     <tr>
//                         <td>Type:</td>
//                         <td>{paymentInfo.getAccountType}</td>
//                     </tr>
//                     <tr>
//                         <td>Transaction ID:</td>
//                         <td>{paymentInfo.getTransId}</td>
//                     </tr>
//                     </tbody>
//                 </table>
//             </div>
//         );
//     };
//     formatDateToSQL = (date1) => {
//         return date1.getFullYear() + '-'
//             + (date1.getMonth() < 9 ? '0' : '') + (date1.getMonth() + 1) + '-'
//             + (date1.getDate() < 10 ? '0' : '') + date1.getDate() + ' '
//             + (date1.getHours() < 10 ? '0' : '') + date1.getHours() + ':'
//             + (date1.getMinutes() < 10 ? '0' : '') + date1.getMinutes() + ':'
//             + (date1.getSeconds() < 10 ? '0' : '') + date1.getSeconds();
//     };
//
//
//     maxFileSize = (file, mb) => {
//         var kbFile = file.size / 1000;
//         var kbMax = mb * 1000;
//         if (kbFile > kbMax) {
//             console.log("maxFileSize! " + kbFile + " > " + kbMax);
//             return true;
//         }
//         else {
//             return false;
//         }
//     };
//     PaidGiftView = (props) => {
//         var paymentInfo = JSON.parse(props.data.paymentInfo);
//         var detailsJson = JSON.parse(props.data.detailsJson);
//         var purchaser = detailsJson.purchaser;
//         var recipient = detailsJson.recipient;
//         var isLivePayment = paymentInfo.livemode;
//         console.log(paymentInfo, isLivePayment);
//         var header = (
//             <div className="panel-heading">
//                 {isLivePayment
//                     ? <font>Order Info</font>
//                     : <font color="#000">Order Info <b>(TEST MODE)</b></font>
//                 }
//             </div>
//         );
//         var atUtcString = props.data.at.split("-");
//         var at = new Date(Date.parse(props.data.at + " GMT+0"));
//
//         return (<div className={isLivePayment ? "panel panel-primary" : "panel panel-disabled"}>
//             {header}
//             <div className="panel-body">
//                 <div className="row">
//                     <div className="col-sm-6">
//                         <h4>purchaser</h4>
//                         <table className="table table-hover">
//                             <tbody>
//                             <tr>
//                                 <td>email</td>
//                                 <td>{purchaser.email || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>fullName</td>
//                                 <td>{purchaser.fullName || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>phone</td>
//                                 <td>{purchaser.phone || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>state</td>
//                                 <td>{purchaser.state || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>city</td>
//                                 <td>{purchaser.city || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>Zip Code</td>
//                                 <td>{purchaser.zip || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>address</td>
//                                 <td>{purchaser.address || ""}</td>
//                             </tr>
//                             <tr style={purchaser.sendGift ? null : {display: 'none'}}>
//                                 <td>Card from:</td>
//                                 <td>{purchaser.sendGiftEmail || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>Card Should Say:</td>
//                                 <td>{recipient.cardsay || ""}</td>
//                             </tr>
//
//
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="col-sm-6">
//                         <h4>recipient</h4>
//                         <table className="table table-hover">
//                             <tbody>
//                             <tr>
//                                 <td>email</td>
//                                 <td>{recipient.email || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>fullName</td>
//                                 <td>{recipient.fullName || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>phone</td>
//                                 <td>{recipient.phone || ""}</td>
//                             </tr>
//                             <tr>
//                                 <td>notes</td>
//                                 <td>{recipient.notes || ""}</td>
//                             </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                     <this.CardInfoView paymentInfo={paymentInfo}/>
//                     <div className="col-sm-6">
//                         <h4>Gift</h4>
//                         <table className="table table-hover">
//                             <tbody>
//                             <tr>
//                                 <td>name:</td>
//                                 <td>{props.data.name}</td>
//                             </tr>
//                             <tr>
//                                 <td>price:</td>
//                                 <td>{Math.floor(props.data.price / 100)}</td>
//                             </tr>
//                             <tr>
//                                 <td>CODE</td>
//                                 <td>{props.data.code}</td>
//                             </tr>
//                             <tr>
//                                 <td>When</td>
//                                 <td>{at.toLocaleDateString()} {at.toLocaleTimeString()}</td>
//                             </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <PaidGiftFooter
//                 updateList={props.updateList}
//                 isArchived={props.data.isArchived}
//                 isProcessed={props.data.isProcessed}
//                 adminComment={props.data.adminComment}
//                 id={Number(props.data.id)}
//             />
//
//         </div>)
//     };
//
//     giftListFilter = (array, filterType, search) => {
//         if (search = search.trim()) {
//             array = array.filter(function (item) {
//                 return item.code.includes(search) || item.detailsJson.includes(search);
//             })
//         }
//         array.sort(function (a, b) {
//             var aid = Number(a.id);
//             var bid = Number(b.id);
//             // debugger;
//             return aid === bid ? 0 : bid - aid;
//         });
//         if (filterType == 'new') {
//             array = array.filter(function (item) {
//                 return !Number(item.isProcessed) && !Number(item.isArchived);
//             })
//         } else if (filterType == 'processed') {
//             array = array.filter(function (item) {
//                 return !!Number(item.isProcessed) && !Number(item.isArchived);
//             })
//         } else if (filterType == 'archived') {
//             array = array.filter(function (item) {
//                 return !!Number(item.isArchived);
//             })
//         }
//
//         return array;
//     };
//
// }