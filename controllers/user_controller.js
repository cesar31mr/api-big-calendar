const user = require('../models/user_model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/lapoderosa');

function signUp(req, res) {
    const newUser = new user();
    const { name, email, password } = req.body;
    newUser.name = name;
    newUser.email = email;
    newUser.active = true;
    newUser.creation = Date.now();

    
    user.findOne({email: email}).then(user => {
        if (user) return res.status(500).send({ message: 'El correo ya está registrado' });
    });
    
    if(!password) return res.status(500).send({ message: 'Introduce la contraseña' });

    bcrypt.hash(password, null, null, (err, hash) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (hash) {
            newUser.password = hash;
            newUser.save().then(userStored => {
                if (!userStored) return res.status(404).send({ message: 'No se ha registrado el usuario' });
                return res.status(200).send({ user: userStored });
            }).catch(err => {
                return res.status(500).send({ message: 'Error al guardar el usuario' });
            });
        }
    });
}

function login(req, res){
    const params = req.body;
    const email = params.email;
    const password = params.password;

    user.findOne({email: email}).then(user => {
        if (!user) return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
        if (!user.active) return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
        bcrypt.compare(password, user.password, (err, check) => {
            if (check) {
                if (params.gettoken) {
                    return res.status(200).send({ token: jwt.createToken(user), user: user, message: "Token generado" });
                } else {
                    user.password = undefined;
                    return res.status(200).send({ token: jwt.createToken(user), user: user, message: "Token no generado" });
                }
            } else {
                return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
            }
        });
    }).catch(err => {
        return res.status(500).send({ message: 'Error en la petición' });
    });
}

function updateUser(req, res) {
    const userId = req.params.id;
    const update = req.body;

    if (userId !== req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para actualizar este usuario' });
    }

    user.findByIdAndUpdate(userId, update).then(userUpdated => {
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
        return res.status(200).send({ user: userUpdated });
    }).catch(err => {
        return res.status(500).send({ message: 'Error en la petición' });
    });
}

module.exports = {
    signUp,
    login,
    updateUser
}