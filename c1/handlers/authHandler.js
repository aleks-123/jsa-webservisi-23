const User = require("../pkg/user/userShema");
// npm install jsonwebtoken
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // kreirame korisnik, kako input kreirame nash objket
    // zaradi pogolema bezbednost
    // i sanatizacija na kodot
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // da generiraame token
    // kako prv parametar e payloadot, vtor parametar e tajnata recinica i kako tret rokot na istek
    // const token = jwt.sign(
    //   { id: newUser._id, name: newUser.name },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: process.env.JWT_EXPIRES,
    //   }
    // );

    // res.kkoies ima tri parametri prviot so kako se vika kukisot vtoriot vrednosta na kukisot i tretiot parametar dodatni opcii
    // res.cookie("jwt", token, {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    //   ),
    //   secure: false,
    //   httpOnly: true,
    // });

    // res.status ni vrakja token status i koirinkisot
    res.status(201).json({
      status: "success",
      // token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Proveruvame dali ima vneseno passvord i email
    if (!email || !password) {
      return res.status(400).send("Please provide email and password!");
    }
    // 2. Proveruvame dali korisnikot postoi
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send("This user with this eamil doest exist in database");
    }

    // 3. Sporeduvame pasvord
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("INVALIDDD PASSSWORRDDD!");
    }

    // 4. Se generira tokenot so sign metoda
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    // 5. go isprakjame cookisot so tokenot
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    // 6. go isprakjame tokenot
    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};

exports.protect = async (req, res) => {
  try {
  } catch (err) {}
};
