"""Build an alternating source-request / captured-site review PDF."""
import io, json, os
from pathlib import Path
from xml.sax.saxutils import escape
import fitz
from reportlab.pdfgen import canvas
from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[2]
source_path = os.environ.get('REVIEW_SOURCE_PDF')
if not source_path:
 raise SystemExit('Set REVIEW_SOURCE_PDF to the original annotated PDF.')
SOURCE = Path(source_path).expanduser()
CAPTURE_DIR = Path(os.environ.get('REVIEW_CAPTURE_DIR', ROOT / 'output/pdf'))
OUT = CAPTURE_DIR / 'resisting-stigma-edit-review.pdf'
source = fitz.open(SOURCE)
captures = json.loads((CAPTURE_DIR / 'captures.json').read_text())['captures']
assert len(captures) == len(source) == 81
W, H = 1600, 1200
c = canvas.Canvas(str(OUT), pagesize=(W,H))
c.setTitle('Resisting Stigma - Annotated Requests and Website Review')
c.setAuthor('VCH Learning Technologies')

def text(s,x,y,w,size=13,color='#243348'):
 style=ParagraphStyle('body',fontName='Helvetica',fontSize=size,leading=size*1.35,textColor=color,spaceAfter=8)
 p=Paragraph(s,style);_,h=p.wrap(w,10000);p.drawOn(c,x,y-h);return y-h-12

def frame(n,kind):
 c.setFillColorRGB(.13,.19,.27);c.rect(0,H-84,W,84,fill=1,stroke=0)
 c.setFillColorRGB(1,1,1);c.setFont('Helvetica-Bold',23);c.drawString(40,H-42,f'Source page {n:02d} | {kind}')
 c.setFont('Helvetica',12);c.drawString(40,H-66,'Resisting Stigma - local branch review - November 17, 2026')
 c.setFillColorRGB(.35,.4,.46);c.setFont('Helvetica',11)
 c.drawString(40,24,'Branch: beta | Local changes only | Image replacements pending on source pages 47, 50, 57')
 c.drawRightString(W-40,24,f'{2*n-1 if kind.startswith("Original") else 2*n} / 162')

def picture(img,box):
 x,y,w,h=box
 im=Image.open(img).convert('RGB')
 encoded=io.BytesIO();im.save(encoded,format='JPEG',quality=88,subsampling=0);encoded.seek(0)
 reader=ImageReader(encoded);iw,ih=reader.getSize();scale=min(w/iw,h/ih);dw,dh=iw*scale,ih*scale
 c.drawImage(reader,x+(w-dw)/2,y+(h-dh)/2,width=dw,height=dh,mask='auto')

for r in captures:
 n=r['page'];assert Path(r['screenshot']).is_file()
 frame(n,'Original page and requested edits')
 pix=source[n-1].get_pixmap(matrix=fitz.Matrix(1.4,1.4),annots=True)
 picture(io.BytesIO(pix.tobytes('png')),(32,65,1060,1030))
 y=H-115;y=text('<b>Requested edits</b>',1120,y,440,19)
 if not r['requests']:y=text('No annotations on this source page.',1120,y,440)
 for a in r['requests']:
  content=escape(a['info'].get('content','') or '(Highlight only)').replace('\r','<br/>').replace('\n','<br/>')
  y=text(f'<b>#{a["id"]} - {escape(a["info"].get("title",""))}</b><br/>{content}',1120,y,440,12)
 assert y>70,(n,y)
 c.showPage()
 frame(n,'Website after edits')
 y=text(f'<b>{escape(r["route"])}</b> - {escape(r["status"])}',40,H-105,W-80,14)
 if r.get('followingScreenshot'):
  width = (W-105)/2
  label_y = text('<b>1. Standalone video slide</b>',40,y,width,16)
  text('<b>2. Following quiz question</b>',65+width,y,width,16)
  height = width * 3/4
  picture(r['screenshot'],(40,label_y-height,width,height))
  picture(r['followingScreenshot'],(65+width,label_y-height,width,height))
 else:
  picture(r['screenshot'],(40,70,W-80,y-85))
 c.showPage()
c.save()
check=fitz.open(OUT);assert len(check)==162
print(f'{OUT}: {len(check)} pages; {OUT.stat().st_size/1024/1024:.1f} MB')
