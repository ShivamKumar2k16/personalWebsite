const config = require("../config/auth.config");
const User = require("../models/user.model");
const Role = require("../models/role.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

signup = (req, res) => {
  let { email, username, password, roles } = req.body;

  const user = new User({
    email, username,
    password: bcrypt.hashSync(password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (roles) {
      Role.find(
        {
          name: { $in: roles }
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = role.map(role1 => role1._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(201).send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(201).send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

signin = (req, res) => {
  let { username } = req.body;
  User.findOne({
    username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        username,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

module.exports = {
  signup,
  signin
};