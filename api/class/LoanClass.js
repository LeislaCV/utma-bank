//Solicitar
//Pagar
//Mostrar prestamo
//Validar usuario

import LoanModel from "../models/LoanModel.js"
import PaymentModel from "../models/PaymentModel.js";

class LoanManager {
    constructor(
    userId,
        loanType,
        amount,
        interestRate,
        numberPayments,
        startDate,
        endDate,
        status
    ){

    this.userId = userId;
    this.loanType = loanType;
    this.amount = amount;
    this.interestRate = interestRate;
    this.numberPayments = numberPayments;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    }

    async createLoan(){
        try {
            const loan = await LoanModel.create({
                userId: this.userId ,
               loanType: this.loanType, 
               amount: this.amount, 
                interestRate:this.interestRate, 
                numberPayments: this.numberPayments,
                startDate: this.startDate, 
                endDate: this.endDate, 
                status: this.status, 
                });
            return loan;
        }catch (error) {
            throw new Error(`¡No se pudo crear!: ${error}`);
        }
    }

    async playLoan(
        userId,
        loanId,
        amouont,
        numberPayment){
            try {
                const payment = await PaymentModel.create({
                    userId,
                    loanId,
                    amouont,
                    numberPayment
                });
                return payment;
            } catch (error) {
                throw new Error(`¡Hubo un error al intentar pagar!: ${error}`);
            }
        }

        async getLoan(id){
            try {
                const loans = await LoanModel.findById(id);
                return loans;
            } catch (error) {
                throw new Error(`¡Hubo un error al obtener los prestamos!: ${error}`);
            }
        }

        async validarUsuarip(){
            /* El usuario debe tener al menos 3 dias en la plataforma
            Haber hecho dos transacciones
            Y mantener un saldo superiror a 5000*/
        }
    
}