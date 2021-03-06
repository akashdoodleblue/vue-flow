const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
    try {
        let isUser = await User.find({ email: req.body.email });
        console.log(isUser);
         if (isUser.length >= 1) {
           return res.status(409).json({
             message: "email already in use"
           });
         }
         const userData = new User({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           phoneno: req.body.phoneno
         });
         let user = await userData.save();
         const token = await user.generateAuthToken();
         res.status(201).json({ user, token });
       } catch (err) {
         res.status(400).json({ err: err });
       }
};
exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if (!user) {
          return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
      } catch (err) {
          console.log(err)
        res.status(400).send({error : err.message});
      }
};
exports.getUserDetails = async (req, res) => {};