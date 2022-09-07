using System;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using DAL.Entities.Email;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;


namespace BLL.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly MailSetting _mailSetting;
        public EmailSender(IOptions<MailSetting> mailSetting)
        {
            _mailSetting = mailSetting.Value;
        }
        public async Task<bool> SendEmailAsync(string subject, string email, string content)
        {
            using var smtp = new SmtpClient();
            var sendEmail = new MimeMessage();
            sendEmail.Sender = new MailboxAddress(_mailSetting.DisplayName, _mailSetting.Mail);
            sendEmail.From.Add(new MailboxAddress(_mailSetting.DisplayName, _mailSetting.Mail));
            sendEmail.To.Add(MailboxAddress.Parse(email));
            sendEmail.Subject = subject;
            sendEmail.Body = new TextPart(TextFormat.Html) { Text = content };
            try
            {
                await smtp.ConnectAsync(_mailSetting.Host, _mailSetting.Port, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_mailSetting.Mail, _mailSetting.Password);
                await smtp.SendAsync(sendEmail);
                await smtp.DisconnectAsync(true);
                return true;
            }
            catch
            {
                System.IO.Directory.CreateDirectory("mailssave");
                var emailsavefile = string.Format(@"mailssave/{0}.eml", Guid.NewGuid());
                return false;
            }
        }
    }
}
