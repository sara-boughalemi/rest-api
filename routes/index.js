const router = require("express").Router();
const User = require("../models/User");

router.get("/User", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ status: true, message: "DATA LIST", data: user });
  } catch (error) {
    res.status(200).json({ status: false, message: error });
  }
});
router.post("/createUser", async (req, res) => {
  try {
    const { fullName, phoneNumber, email } = req.body;

    const usedFullName = await User.findOne({ fullName });
    const usedPhoneNumber = await User.findOne({ phoneNumber });
    const usedEmail = await User.findOne({ email });

    if (usedFullName) {
      res.status(200).json({ status: false, message: "exists" });
    } else if (usedPhoneNumber) {
      res.status(200).json({ status: false, message: "exists" });
    } else if (usedEmail) {
      res.status(200).json({ status: false, message: "exists" });
    } else {
      const newUser = await User.create({ fullName, phoneNumber, email });
      res
        .status(200)
        .json({ status: true, message: "User created", data: newUser });
    }
  } catch (error) {
    res.status(200).json({ status: false, message: error });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ status: true, message: "user infos", data: user });
    } else {
      res
        .status(200)
        .json({ status: true, message: "does not existe", data: user });
    }
  } catch (error) {
    res.status(200).json({ status: false, message: error });
  }
});
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      await User.findByIdAndDelete(id);
      res.status(200).json({ status: true, message: " deleted", data: user });
    } else {
      res.status(200).json({ status: true, message: " does not exists" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
});
router.put("/editUser/:id", async(req, res) => {
    try {
        const {fullName, phoneNumber, email} = req.body
        const {id} = req.params

        const user = await User.findById(id)
        const usedFullName = await User.findOne({fullName})
        const usedPhoneNumber = await User.findOne({phoneNumber})
        const usedEmail = await User.findOne({email})

        if (user) {
           if (usedFullName) {
                res.status(200).json({status: false, message:"FullName already exists"})
            } else if (usedPhoneNumber) {
                res.status(200).json({status: false, message:"PhoneNumber already exists"})
            } else if (usedEmail) {
                res.status(200).json({status: false, message:"Email already exists"})
            } else {
                const newUser = await User.findByIdAndUpdate(id, {fullName, phoneNumber, email})
                res.status(200).json({status: true, message:"user created", data: newUser})
            }
        } else {
            res.status(200).json({status: true, message:"user does not exists"})
        }
    } catch(error) {
        res.status(500).json({status: false, message: error })
    }
})

module.exports = router;
