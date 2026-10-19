# Saytni bitta HTML faylga yig'adi (claude.ai artifact uchun).
# Ishlatish: python3 tools/build-artifact.py <chiqish-papkasi>  -> <papka>/iqlimtex-hvac.html
import re,sys
S=sys.argv[1]
html=open('index.html').read(); css=open('css/style.css').read()
data=open('js/data.js').read(); ill=open('js/illustrations.js').read(); app=open('js/app.js').read()
body=re.search(r'<body>(.*)</body>',html,re.S).group(1)
body=re.sub(r'\s*<script src="js/[^"]+"></script>','',body)
old='''    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent("Saytdan so'rov: " + name)}&body=${encodeURIComponent(body)}`;'''
assert old in app
app=app.replace(old,'''    const box = document.getElementById("sentNote");
    box.textContent = "So'rov matni tayyor. Uni nusxalab, " + SITE.email + " ga yoki Telegram @" + SITE.telegram + " (texnik mutaxassis) ga yuboring yoki " + SITE.phone + " raqamiga qo'ng'iroq qiling:\\n\\n" + body;
    box.hidden = false;
    navigator.clipboard?.writeText(body).catch(() => {});''')
a='</form>\n        </div>\n    </section>\n\n    <footer'
assert body.count(a)==1
body=body.replace(a,'</form>\n            <pre class="sent-note" id="sentNote" hidden></pre>\n        </div>\n    </section>\n\n    <footer')
css+='\n:root{color-scheme:light}\n.sent-note{grid-column:1/-1;white-space:pre-wrap;background:#fff;color:var(--text);padding:16px;border-radius:12px;font:inherit;font-size:14px}\n'
out=f'''<title>IqlimTex HVAC sayti</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
{css}
</style>
{body}
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
<script>
{data}
</script>
<script>
{ill}
</script>
<script>
{app}
</script>
'''
open(S+'/iqlimtex-hvac.html','w').write(out)
