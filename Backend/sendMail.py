import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from model.user import user

obj = user()

# Set up your email details
sender_email = "sentryvision112@gmail.com"
# Use the app password here
sender_password = "krqg qycy ptuh wfeb" # Make sure this is your app-specific password
subject = "ANOMALY DETECTED⚠- Urgent Review Required"

def sendMail(email):
    select_query = f"SELECT firstname,lastname FROM users WHERE email = '{email}'"
    obj.cursor.execute(select_query)
    result = obj.cursor.fetchone()
    # Create the email message
    first_name = result["firstname"]
    last_name = result["lastname"]

    body = f"""Dear {first_name} {last_name},

We hope this message finds you well. Our SentryVision software has recently identified an anomaly in your CCTV camera footage. To ensure the safety and security of your property, we kindly request that you review the flagged footage as soon as possible.
Please follow these steps to access and review the flagged footage:
1) Log in to your SentryVision account.
2) Navigate to the 'Alerts' section on the dashboard. Click on the latest anomaly alert to access the footage.
3) Carefully review the footage, paying close attention to the flagged area(s) where the anomaly was detected. After reviewing the footage, please take appropriate actions as you deem necessary.
4) If you have any questions or need assistance reviewing the footage, please do not hesitate to contact our support team at sentryvision112@gmail.com

We appreciate your prompt attention to this matter and your continued trust in SentryVision for your security needs.

Best Regards,
Team SentryVision"""

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))
    
    # Convert the message to a string
    text = message.as_string()
    
    # Log in to the SMTP server and send the email
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, email, text)
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

# sendMail("10kushalbansal.kb@gmail.com")