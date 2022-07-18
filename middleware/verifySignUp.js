const Role = require("../models/role.model");
const User = require("../models/user.model");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    let { username, email } = req.body;

    User.findOne({
        username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }

        User.findOne({
            email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    let { roles } = req.body;
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!Role.includes(roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${roles[i]} does not exist!`
                });
                return;
            }
        }
    }
    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};
module.exports = verifySignUp;