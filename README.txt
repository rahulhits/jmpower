JM POWER GREEN - WEBSITE HINDI VERSION
- Hindi pages are in the hi/ folder (www.yourdomain.com/hi/).
- Every page has an English | हिंदी button at the top to switch language.
- Form enquiries from Hindi pages arrive in English, marked "Language: Hindi".

FILES
==============================

HOW TO UPLOAD TO BIGROCK (cPanel)
1. Log in to BigRock > Manage Hosting > cPanel.
2. Open File Manager > public_html.
3. Upload jmpower-website.zip, right-click > Extract.
   Make sure index.html sits directly inside public_html
   (move the files up one level if they land in a sub-folder).
4. In cPanel > SSL/TLS Status, run AutoSSL so https works.
5. Open your domain and test the contact form.

THINGS TO UPDATE BEFORE GOING LIVE
- Social media links: open each .html file (or ask Claude to rebuild)
  and replace href="#" for Facebook, Instagram, YouTube and LinkedIn.
- Create the mailbox info@jmpowergreen.com in cPanel > Email Accounts.
  The forms (send.php) send enquiries to that address.
- Check the wind turbine prices; the cards show "On request" and the
  "Get Price" button opens WhatsApp with the product name filled in.
- Add real photos of your work later (a Gallery page can be added).

HINDI VERSION
- Hindi pages are in the hi/ folder (www.yourdomain.com/hi/).
- Every page has an English | हिंदी button at the top to switch language.
- Form enquiries from Hindi pages arrive in English, marked "Language: Hindi".

FILES
index.html, about.html, services.html, products.html,
careers.html, contact.html, 404.html - English pages
hi/                                  - Hindi pages (same names)
css/style.css, js/main.js            - design and behaviour
images/                              - logo and favicon
send.php                             - contact & careers form mailer
.htaccess                            - https redirect, caching, 404
