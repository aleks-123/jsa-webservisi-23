const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: "<PRIVATE_API_KEY>",
});

const sendMailGun = async (options) => {
  //* 1) Definirrame email opcii

  const emailData = {
    from: "Mailgun Sandbox <postmaster@sandbox43c588f5abfa4eb7a9cbc957f503cbb3.mailgun.org>",
    to: options.email,
    subject: options.subject,
    text: options.messages,
  };

  //* 2) Isprakjame email koristejki Mailgun

  await mg.messages.create(
    "sandbox43c588f5abfa4eb7a9cbc957f503cbb3.mailgun.org",
    emailData
  );
};

module.exports = sendMailGun;
