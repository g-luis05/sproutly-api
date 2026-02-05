

export const otpEmailTemplate = (code: string) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Verification code</title>
</head>
<body style="
    margin: 0;
    padding: 0;
    background-color: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table width="100%" max-width="420px" cellpadding="0" cellspacing="0" style="
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    padding: 32px;
                ">
                    <tr>
                        <td align="center">
                            <h2 style="
                                margin: 0 0 12px;
                                color: #333333;
                            ">
                                Verification code
                            </h2>

                            <p style="
                                margin: 0 0 24px;
                                color: #555555;
                                font-size: 14px;
                            ">
                                Use this code to login to
                                <strong>SproutlyApp</strong>
                            </p>

                            <div style="
                                background-color: #f0f4ff;
                                border: 1px dashed #4f6ef7;
                                border-radius: 6px;
                                padding: 16px 24px;
                                font-size: 28px;
                                letter-spacing: 6px;
                                font-weight: bold;
                                color: #4f6ef7;
                                display: inline-block;
                                margin-bottom: 24px;
                            ">
                                ${code}
                            </div>

                            <p style="
                                margin: 0;
                                font-size: 13px;
                                color: #777777;
                            ">
                                This code expires in <strong>10 minutes</strong>.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top: 32px; border-top: 1px solid #eeeeee;">
                            <p style="
                                margin: 0;
                                font-size: 12px;
                                color: #999999;
                                text-align: center;
                            ">
                                If you didn't request this code, you can safely ignore this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}