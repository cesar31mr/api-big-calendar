const dates = require('../models/date_model');

function saveDate(req, res) {
    const newDate = new dates();
    const { start, end, title, user } = req.body;
    newDate.start = start;
    newDate.end = end;
    newDate.title = title;
    newDate.user = user;

    newDate.save().then((dateStored) => {
        if (dateStored) {
            res.status(200).send({ date: dateStored });
        } else {
            res.status(404).send({ message: 'No se ha registrado el recordatorio' });
        }
    }
    ).catch((err) => {
        res.status(500).send({ message: 'Error al guardar el recordatorio' });
    });
}

function getDatesByUser(req, res) {
    const userId = req.body.user;

    dates.find({ user: userId }).then((dates) => {
        if (dates) {
            res.status(200).send({ dates });
        } else {
            res.status(404).send({ message: 'No hay recordatorios' });
        }
    }).catch((err) => {
        res.status(500).send({ message: 'Error en la petición' });
    });
}

function updateDate(req, res) {
    const update = req.body

    dates.findByIdAndUpdate(update._id, update).then((dateUpdated) => {
        if (dateUpdated) {
            res.status(200).send({ date: dateUpdated });
        } else {
            res.status(404).send({ message: 'No se ha podido actualizar el recordatorio' });
        }
    }).catch((err) => {
        console.log(`err ${err}`);
        res.status(500).send({ message: 'Error en la petición' });
    });
}

function deleteDate(req, res) {
    const dateId = req.body.id;

    dates.findByIdAndDelete(dateId).then((dateDeleted) => {
        if (dateDeleted) {
            res.status(200).send({ date: dateDeleted });
        } else {
            res.status(404).send({ message: 'No se ha podido eliminar el recordatorio' });
        }
    }).catch((err) => {
        res.status(500).send({ message: 'Error en la petición' });
    });
}

module.exports = {
    saveDate,
    getDatesByUser,
    updateDate,
    deleteDate
};