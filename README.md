# ADSTYLE Attendance

Static front end for the ADSTYLE Apps Script backend.

1. Put Kiosk.html and Admin.html (from your Apps Script project) in this folder.
2. Run `python prepare.py` -> creates index.html and admin.html.
3. Paste apps-script-doPost.gs at the end of Code.gs and deploy a New version.
4. Push this folder to GitHub and import it on Vercel (no build command).

Kiosk: `/`   Admin: `/admin`
