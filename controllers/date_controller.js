const dates = require('../models/date_model');

function saveDate(req, res) {
    const newDate = new dates();
    const { start, end, title } = req.body;
    newDate.start = start;
    newDate.end = end;
    newDate.title = title;
    newDate.user = req.params.id;

    newDate.save((err, dateStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar el recordatorio' });
        if (dateStored) {
            res.status(200).send({ date: dateStored });
        } else {
            res.status(404).send({ message: 'No se ha registrado el recordatorio' });
        }
    });
}

function getDatesByUser(req, res) {
    const userId = req.params.id;

    dates.find({ user: userId }, (err, dates) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!dates) return res.status(404).send({ message: 'No hay recordatorios' });
        res.status(200).send({ dates });
    });
}

function updateDate(req, res) {
    const dateId = req.params.id;
    const update = req.body

    dates.findByIdAndUpdate(dateId, update, (err, dateUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!dateUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el recordatorio' });
        res.status(200).send({ date: dateUpdated });
    });
}

function deleteDate(req, res) {
    const dateId = req.params.id;

    dates.findByIdAndDelete(dateId, (err, dateDeleted) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!dateDeleted) return res.status(404).send({ message: 'No se ha podido eliminar el recordatorio' });
        res.status(200).send({ date: dateDeleted });
    });
}

module.exports = {
    saveDate,
    getDatesByUser,
    updateDate,
    deleteDate
};