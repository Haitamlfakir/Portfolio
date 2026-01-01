# EmailJS Setup Instructions

To make the contact form work and send emails to your inbox, follow these steps:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions
5. Copy your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** Contact Form

**Subject:** New Contact Form Message: {{subject}}

**Content:**
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (also called API Key)

## Step 5: Update script.js

Open `script.js` and replace these values:

1. Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key:
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace this
```

2. Replace `YOUR_SERVICE_ID` with your Service ID:
```javascript
const serviceID = 'YOUR_SERVICE_ID'; // Replace this
```

3. Replace `YOUR_TEMPLATE_ID` with your Template ID:
```javascript
const templateID = 'YOUR_TEMPLATE_ID'; // Replace this
```

4. (Optional) Update the recipient email if needed:
```javascript
to_email: 'haytamlfakir@gmail.com' // Your email address
```

## Example Configuration

After setup, your code should look like this:

```javascript
emailjs.init("abc123xyz456"); // Your Public Key

const serviceID = 'service_abc123';
const templateID = 'template_xyz789';
```

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the message
4. You should receive an email with the form data

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Not receiving emails**: Verify EmailJS service connection in dashboard
- **Wrong email format**: Check your email template variables match the templateParams
- **Rate limit exceeded**: Free tier has 200 emails/month limit

## Security Note

The Public Key is safe to use in client-side code. Never share your Private Key or Service credentials.

For more help, visit: https://www.emailjs.com/docs/

