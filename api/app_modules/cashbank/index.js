/*=============================================================================
 |       Author:  Gunadi Rismananda
 |         Dept:  IT - USTP
 |          
 |  Description:  Handling API ROUTE Untuk Module CashBank
 |
 | Dependencies:  express     --> webserver framework 
 |                body-parser --> parsing semua request http menjadi JSON
 |                passport    --> library authentication untuk login. (Login menggunakan JWT)
 |                
 |
 *===========================================================================*/


const router = require('express').Router();

const bankinformation = require('./BankInformation/binfController')
const paymentvoucher = require('./PaymentVoucher/pvController')

router.route(`/bankinformation`)
    .get(bankinformation.get)
    .post(bankinformation.post)

router.route(`/paymentvoucher`)
    .get(paymentvoucher.get)
    .post(paymentvoucher.post)



module.exports = router;