from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="your-email@gmail.com",
    MAIL_PASSWORD="your-app-password",   
    MAIL_FROM="your-email@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
)


async def send_verification_email(email: str, token: str):
    verification_link = f"http://localhost:8000/verify-email?token={token}"

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
