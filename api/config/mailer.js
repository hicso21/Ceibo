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
  text: `Eviamos su formulario de adopcion, por favor contactarse por mail a ${email}
  nombre: ${usuario.name},
  apellido: ${usuario.last_name},
  telefono: ${usuario.numberPhone},
  edad: ${usuario.age},
  estado civil: ${usuario.civilStatus},
  ubicacion: ${usuario.location},
  espacio disponible: ${usuario.availableSpace},
  niños: ${usuario.kids},
  otras mascotas: ${usuario.otherPets},
  algun mensaje: ${usuario.message}`
  
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