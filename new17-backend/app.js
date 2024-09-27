const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const mongoUrl =
  "mongodb+srv://sheikhhamad1830:admin@cluster0.cibxdka.mongodb.net/?retryWrites=true&w=majority";
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
var nodemailer = require("nodemailer");
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("err", err);
  });
require("./UserDetails");
app.use(express.static("uploads/"));

const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.send({ data: "User Not Found" });
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.send({
        status: "ok",
        data: token,
        userType: oldUser.userType,
      });
    } else {
      return res.send({ error: "error" });
    }
  }
});

app.get("/get-all-user", async (req, res) => {
  try {
    const data = await User.find({});
    res.send({ status: "Ok", data: data });
  } catch (error) {
    return res.send({ error: error });
  }
});

app.post("/update-user", async (req, res) => {
  const { name, email, mobile, image, gender, profession } = req.body;
  console.log(req.body);
  try {
    await User.updateOne(
      { email: email },
      {
        $set: {
          name,
          mobile,
          image,
          gender,
          profession,
        },
      }
    );
    res.send({ status: "Ok", data: "Updated" });
  } catch (error) {
    return res.send({ error: error });
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});

// app.get("/userdata", async (req, res) => {});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/register", upload.single("file"), async (req, res) => {
  console.log("File uploaded:", req.file);
  const { name, email, mobile, password, userType } = req.body;
  console.log(req.body);
  // res.json(req.file);
  console.log("req.filePath", req.file.path);
  const imagePath = req.file.path; // File path of the uploaded image

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ status: "error", data: "User already exists" });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      email: email,
      mobile: mobile,
      password: encryptedPassword,
      file: imagePath, // Store image path in the database
      userType,
    });
    res.send({ status: "ok", data: "User created successfully" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/delete-user", async (req, res) => {
  const { id } = req.body;
  try {
    await User.deleteOne({ _id: id });
    res.send({ status: "Ok", data: "User Deleted" });
  } catch (error) {
    return res.send({ error: error });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://192.168.60.27:5001/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sheikhhamad1830@gmail.com",
        pass: "psen hkmo cqeu khuh",
      },
    });

    var mailOptions = {
      from: "sheikhhamad1830@gmail.com",
      to: "hamadurrehman1830@gmail.com",
      subject: "Password Reset",
      html: `Click <a href="${link}">here</a> to reset your password.`,
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
    // res.send("Verified");
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.listen(5001, () => {
  console.log("Node Server Started...");
});
``;
// const express = require("express");
// const bodyParser = require("body-parser");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const app = express();
// app.use(bodyParser.json());

// // MongoDB setup
// // mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
// // const User = mongoose.model('User', { email: String, password: String, resetToken: String, resetTokenExpiration: Date });

// const mongoUrl =
//   "mongodb+srv://sheikhhamad1830:admin@cluster0.cibxdka.mongodb.net/?retryWrites=true&w=majority";
// const JWT_SECRET =
//   "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

// mongoose
//   .connect(mongoUrl)
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
// require("./UserDetails");
// app.use(express.static("uploads/"));

// const User = mongoose.model("UserInfo");

// app.get("/", (req, res) => {
//   res.send({ status: "Started" });
// });
// // Nodemailer setup
// // const transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //         user: 'sheikhhamad1830@gmail.com',
// //         pass: 'your-password'
// //     }
// // });
// app.post("/login-user", async (req, res) => {
//   const { email, password } = req.body;

//   const oldUser = await User.findOne({ email: email });

//   if (!oldUser) {
//     return res.send({ data: "User Not Found" });
//   }

//   if (await bcrypt.compare(password, oldUser.password)) {
//     const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

//     if (res.status(201)) {
//       return res.send({ status: "ok", data: token });
//     } else {
//       return res.send({ error: "error" });
//     }
//   }
// });

// // Generate a unique token
// // function generateToken() {
// //     return crypto.randomBytes(20).toString('hex');
// // }

// // Route to request password reset
// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   const oldUser = await User.findOne({ email });

//   if (!oldUser) {
//     return res.status(404).send("User not found");
//   }

//   const secret = JWT_SECRET + oldUser.password;
//   const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//     expiresIn: "5m",
//   });
//   const link = `http://192.168.60.27:5001/reset-password/${oldUser._id}/${token}`;
//   // const token = generateToken();
//   // user.resetToken = token;
//   // user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
//   // await user.save();
//   console.log("link", link);
//   // const resetLink = `http://192.168.60.27:5001/reset-password?token=${token}`;
// //   const mailOptions = {
// //     from: "your-email@gmail.com",
// //     to: email,
// //     subject: "Password Reset",
// //     html: `Click <a href="${link}">here</a> to reset your password.`,
// //   };

// //   transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       console.error(error);
// //       return res.status(500).send("Error sending email");
// //     }
// //     console.log("Email sent: " + info.response);
// //     res.send("Email sent successfully");
// //   });
// });

// // Route to handle password reset
// app.post("/reset-password", async (req, res) => {
//   const { token, newPassword } = req.body;
//   const user = await User.findOne({
//     resetToken: token,
//     resetTokenExpiration: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res.status(400).send("Invalid or expired token");
//   }

//   user.password = newPassword;
//   user.resetToken = undefined;
//   user.resetTokenExpiration = undefined;
//   await user.save();

//   res.send("Password reset successfully");
// });

// app.listen(5001, () => {
//   console.log("Server is running on port 5001");
// });
