//Registrar el ususario
//Iniciar sesion
//Cerrar sesion
//Obtener informacion del usuario
//Crear transacciones
//Pedir prestamos
//Borrar cuenta
//Actualizar

import User from "../models/UserModel.js";
import UserModel from "../models/UserModel.js";
import ManagerAccount from "./AccountClass.js";
import ManagerCard from "./CardClass.js";

class ManagerUser {
    constructor(
        email,
        phone,
        name,
        lastName,
        islnSession,
        isAdmin,
        password
    ) {

        this.email = email,
            this.phone = phone;
        this.name = name;
        this.lastName = lastName;
        this.islnSession = islnSession;
        this.isAdmin = isAdmin;
        this.password = password;

    }

    async register() {
        try {
            const user = await UserModel.create({
                email: this.email,
                phone: this.phone,
                name: this.name,
                lastName: this.lastName,
                islnSession: this.islnSession,
                isAdmin: this.isAdmin,
                password: this.password

            });

            const MA = new ManagerAccount(user._id, 12345, "Ahorro", 10000);
            const currentAcount = await MA.createAccount();
            const MC = new ManagerCard(user._id,currentAcount._id,"16 digitos al azar","Debito","De la fecha actual sumar 3 años", "active");
                await MC.createCard();
                return user;
        } catch (error) {
            throw new Error(`¡Error al registrar usuario!: ${error}`);
        }
    }

    async Login(email, password){
        try {
            const user = await UserModel.findOne({email: email});
            if(!user){
                throw new Error("¡Usuario no registrado!")
            }
            if(user.password !== password){
                throw new Error("¡Contraseña incorrecta!") 
            }
            return "Succeeded"
            
        } catch (error) {
            throw new Error(`¡Error al iniciar sesion!: ${error}`);
        }
    }

    async getuserInfo(id){
        try {
            const user = await UserModel.findById(id);
            return user;
            
        } catch (error) {
            throw new Error(`¡Error al obtener informacion del usuario!: ${error}`);
        }
    }

    async updateEmail(id,email){
        try {
            if(!email){
                throw new Error("¡Correo Invalido!");
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{email:email}
        })
        return "Oki"
        } catch (error) {
            throw new Error("¡Error al actualizar el correo!");
        }
    }
    async updatePhone(id,phone){
        try {
            if(!phone){
                throw new Error("¡Telefono Invalido!");
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{phone:phone}
        })
        return "Oki"
        } catch (error) {
            throw new Error("¡Error al actualizar el numero telefonico!");
        }
    }

    async updatePassword(id,password){
        try {
            if(!password){
                throw new Error("¡Contraseña Invalida!");
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{password:password}
        })
        return "Oki"
        } catch (error) {
            throw new Error("¡Error al actualizar la contraseña!");
        }
    }

    //Pendiente eliminar usuario
}

export default ManagerUser;
