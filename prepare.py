"""Turns your two Apps Script pages into the Vercel site.
Put Kiosk.html and Admin.html next to this file, then run:  python prepare.py
It writes index.html (kiosk) and admin.html (admin)."""
import sys

def patch(src, dst, extra):
    html = open(src, encoding='utf-8').read()
    if 'shim.js' in html:
        print(src, 'already patched'); return
    if '</head>' not in html:
        sys.exit(src + ': no </head> found')
    html = html.replace('</head>', extra + '\n</head>', 1)
    open(dst, 'w', encoding='utf-8').write(html)
    print('wrote', dst)

shim = '<script src="shim.js"></script>'
patch('Kiosk.html', 'index.html', shim + '\n'
      '<meta name="theme-color" content="#1763B8">\n'
      '<link rel="manifest" href="manifest.json">\n'
      '<link rel="apple-touch-icon" href="icon-192.png">\n'
      "<script>if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');</script>")
patch('Admin.html', 'admin.html', shim)
