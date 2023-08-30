//! npm install nodemailer
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    //* 1) Kreiranje na transporter

    // const transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: "YOUR EMAIL_ADRESS",
    //     pass: "YOUR EMAIL_PASSWORD",
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.verify((err, succ) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });

    //* 2) Da gi definirame opcciite na emajlot,
    const mailOptions = {
      from: "Semos Academy <semos@academy.mk>",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    //* 3) Da go ispratime emajlot
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;

//? Da se kreira web servis koj kje ima opcija za subscribe
//? i na sekoj subskrajbnat korisnik da mu se iprakja email, na ovoj nachin
//? naslov na emaajlot Vi blagodaram na doverbata
//? emailot da e od korisnikot
//? i porakata da e Vi blagodaram za doverbata imeto na korisnikot,i odma do imeto datumot na subskrajbot
//? da se implementira ili so mailgun ili so nodemailer znaci izborot e vash
