const Notification = require('./notificationModel');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.send(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 'error', message: 'Server error' });
    }
}

exports.createNotification = async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.send({ status: 'success', message: 'Notification created successfully', notification });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: 'error', message: 'Server error' });
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        const id = req.params.id;
        await Notification.findByIdAndDelete(id).then(() => {
            res.send({ status: 'success', message: 'Notification deleted successfully' });
        })
            .catch((err) => {
                res.send({ status: 'error', message: 'Server error: ' + err.message });
            });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            status: 'error',
            message: 'Server error: ' + err.message,
        });
    }
}
