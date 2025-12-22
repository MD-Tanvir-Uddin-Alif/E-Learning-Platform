from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv
import os
load_dotenv()


conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),   
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)


async def send_verification_email(email: str, token: str):
    verification_link = f"http://localhost:8000/auth/verify-email?token={token}"

    html = f"""
    <h3>Email Verification</h3>
    <p>Click the link below to verify your account:</p>
    <a href="{verification_link}">{verification_link}</a>
    """

    message = MessageSchema(
        subject="Verify Your Email",
        recipients=[email],
        body=html,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)




async def send_reset_password_email(email: str, token: str):
    """Sends a password reset email to the user."""
    # In production, change localhost to your frontend domain
    reset_link = f"http://localhost:3000/reset-password?token={token}"

    html = f"""
    <h3>Password Reset Request</h3>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <a href="{reset_link}">Reset Password</a>
    <p>If you didn't ask to reset your password, you can ignore this email.</p>
    """

    message = MessageSchema(
        subject="Reset Your Password",
        recipients=[email],
        body=html,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)