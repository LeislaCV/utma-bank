//Calcular un numeros de cuentas
//Calcular numero de tarjeta
//CVV
//Crear fecha expiracion

class ManagerCreditCard {
    constructor(
        numberAccount,
        cvv,
        expirationDate
        
    ){
        this.numberAccount = numberAccount;
        this.cvv = cvv; 
        this.expirationDate = expirationDate;
    }

    //Numero de cuenta
    async digitCardAccount(){
        try { 
            let number= "";
            for (let i =0; i < 16; i++){
                number += Mathfloor(Math.random() * 10).toString();
            }
        } catch (error) {
            throw new Error(`¡Error al generar la cuenta!: ${error}`);
        }
        return number;   
        }

        //Numero de CVV
        async generateCVV(){
            try {
                let cvv = "";
                for (let i = 0; i < 3; i++)
                    cvv += Mathfloor(Math.random() * 10).toString();
            } catch (error) {
                throw new Error(`¡Error al generar CVV!: ${error}`);
            }
            return cvv;
        }
    }
