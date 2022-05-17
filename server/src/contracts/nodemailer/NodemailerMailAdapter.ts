import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../MailAdapter";
import { SMTP_MAILTRAP, SMTP_GOOGLE } from '../config/smtp'

const transport = nodemailer.createTransport({
   service: 'gmail',
   host: SMTP_GOOGLE.host,
   port: SMTP_GOOGLE.port,
   secure: false,
   auth: {
      user: SMTP_GOOGLE.user,
      pass: SMTP_GOOGLE.pass,
   },
   tls: {
      rejectUnauthorized: false,
   },
});

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail({subject, body}: SendMailData) {
      await transport.sendMail({
         from: 'Sancruz <sancruz.dev@gmail.com>',
         to: 'Pereira Sanmir <pereirasanmir@gmail.com>',
         subject,
         html: body,
      });
   };
}


/* CÓDIGO ORIGINAL

import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
      user: "50477523d758c5",
      pass: "58ca3b90fea2d1"
   }
});

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail({subject, body}: SendMailData) {
      await transport.sendMail({
         from: 'Equipe Feedget <oi@feedget.com>',
         to: 'Sanmir Cruz <sancruz.dev@gmail.com>',
         subject,
         html: body,
      });
   };
} */






