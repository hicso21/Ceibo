const nodemailer = require('nodemailer');

const sendEmail = function(fundacion, mascota,usuario,email){

const transporter = nodemailer.createTransport({
 host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const mailOptions =  {
  from: "patitascontecho@gmail.com",
  to: `${fundacion[0].email}`,
  subject: `Hola, ${fundacion[0].name}! Hay un interesado llamado ${usuario.name} ${usuario.last_name} para adoptar a la mascota ${mascota[0].name} `,
  text: `Eviamos su formulario de adopcion, por favor contactarse por mail a ${email}.
  Nombre: ${usuario.name},
  Apellido: ${usuario.last_name},
  Telefono: ${usuario.numberPhone},
  Edad: ${usuario.age},
  Estado civil: ${usuario.civilStatus},
  Ubicacion: ${usuario.location},
  Espacio disponible: ${usuario.availableSpace},
  Niños: ${usuario.kids},
  Otras mascotas: ${usuario.otherPets},
  Algun mensaje: ${usuario.message}.`,
  /* html: '<a href="https://ibb.co/njqbBs8%22%3E"><img src="https://i.ibb.co/vkCHhxv/Sigamos-adoptando-juntos-3.png" alt="Sigamos-adoptando-juntos-3" border="0"></a>' */
  attachments: [
    {
      filename: 'folletoMail.png',
      path: './folletoMail.png',
    }
  ]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log("Email enviado");
  }
}); 
}

module.exports = {sendEmail}