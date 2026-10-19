from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
from pathlib import Path
import numpy as np, cv2
p=Path(__file__).resolve().parent
if p.name=='tools': p=p.parent
assets=p/'assets';qa=p/'qa'
S=3
# Canvas coordinates of the inside glass. Bezel is kept from the original photograph.
quad=np.float32([[284.8,416.7],[717.6,391.5],[712.7,631.0],[285.6,651.5]])
minx,miny=278,385
ww,hh=448,274
q=(quad-np.array([minx,miny],dtype=np.float32))*S
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
font_b='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

def diagnostic(kind):
    old=Image.open(assets/'sistema-antigo.webp').convert('RGB')
    if kind=='legacy':return old
    old=ImageEnhance.Brightness(old).enhance(.85)
    base=old.convert('RGBA');shade=Image.new('RGBA',base.size,(8,18,24,32));base=Image.alpha_composite(base,shade)
    dr=ImageDraw.Draw(base)
    sw,sh=base.size
    bw,bh=int(sw*.57),int(sh*.43)
    x,y=(sw-bw)//2,(sh-bh)//2
    dr.rounded_rectangle((x+8,y+13,x+bw+8,y+bh+13), radius=20, fill=(8,20,29,80))
    dr.rounded_rectangle((x,y,x+bw,y+bh),radius=16,fill=(249,250,250,255),outline=(141,157,165,255),width=3)
    dr.rounded_rectangle((x,y,x+bw,y+65),radius=16,fill=(226,234,240,255))
    dr.rectangle((x,y+46,x+bw,y+65),fill=(226,234,240,255))
    dr.text((x+28,y+18),'Sistema Comercial',font=ImageFont.truetype(font_b,30),fill=(38,54,68))
    dr.line((x+30,y+96,x+bw-30,y+96),fill=(216,223,228),width=2)
    if kind=='freeze':
        title='O programa não está respondendo'
        copy='Esta operação está demorando mais que o normal.'
        more='Aguarde ou feche o aplicativo.'
        dot=(194,77,59)
    else:
        title='Armazenamento insuficiente'
        copy='Não foi possível salvar as informações.'
        more='Libere espaço e verifique seus backups.'
        dot=(202,85,55)
    dr.rounded_rectangle((x+28,y+126,x+78,y+176),radius=12,fill=(*dot,255))
    dr.text((x+48,y+128),'!',font=ImageFont.truetype(font_b,40),fill='white',anchor='mt')
    dr.text((x+96,y+124),title,font=ImageFont.truetype(font_b,36),fill=(30,43,50))
    dr.text((x+96,y+183),copy,font=ImageFont.truetype(font,26),fill=(65,83,96))
    dr.text((x+96,y+221),more,font=ImageFont.truetype(font,24),fill=(86,102,112))
    btn=(x+bw-241,y+bh-79,x+bw-29,y+bh-28)
    dr.rounded_rectangle(btn,radius=8,fill=(42,119,177))
    dr.text(((btn[0]+btn[2])//2,(btn[1]+btn[3])//2),'Entendi',font=ImageFont.truetype(font_b,23),fill='white',anchor='mm')
    return base.convert('RGB')

def warp(name,original):
    original=np.array(original.convert('RGB'))
    h,w=original.shape[:2]
    # Supersample destination for accurate perspective and crisp text.
    Q=q.astype(np.float32)
    M=cv2.getPerspectiveTransform(np.float32([[0,0],[w-1,0],[w-1,h-1],[0,h-1]]),Q)
    cw,ch=ww*S,hh*S
    warped=cv2.warpPerspective(original,M,(cw,ch),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0))
    coverage=np.zeros((ch,cw),np.uint8)
    cv2.fillConvexPoly(coverage,np.rint(Q).astype(np.int32),255,lineType=cv2.LINE_AA)
    # Inset alpha to avoid bright pixel bleed on monitor's physical bezel.
    coverage=cv2.GaussianBlur(coverage,(3,3),.62)
    # Optical image grade: photographic screen, not sterile white decal.
    yy,xx=np.indices((ch,cw))
    xx=xx/max(cw-1,1); yy=yy/max(ch-1,1)
    glow=1.008-(.045*(xx-.24)**2)-.034*yy
    rgb=(np.clip(warped.astype(np.float32)*glow[...,None],0,255)).astype(np.uint8)
    out=np.dstack([rgb,coverage])
    target=assets/f'screen-{name}.webp'
    Image.fromarray(out,'RGBA').save(target,'WEBP',quality=97,method=6)
    print(name,'size',target.stat().st_size)
    return Image.fromarray(out,'RGBA')
for label in ['legacy','freeze','storage']:
    warp(label,diagnostic(label))
warp('control',Image.open(assets/'controle-real.webp'))
# The blank dark display retains subtle internal glass reflections, not a dead flat shape.
blank=Image.new('RGB',(1920,1080),(6,10,12));arr=np.array(blank).astype(np.float32)
Y,X=np.indices(arr.shape[:2]);spot=np.maximum(0,1-((X/1920-.20)**2/.9+(Y/1080-.05)**2/.85))
arr+=spot[...,None]*np.array([10,15,17])[None,None,:]
warp('black',Image.fromarray(np.uint8(np.clip(arr,0,255))))
# Gentle glass highlight, masked precisely to the physical screen aperture.
w=ww*S;h=hh*S
YY,XX=np.mgrid[:h,:w].astype(np.float32)
sweep=(XX/w+YY/h*.75)
light=np.exp(-((sweep-.69)/.19)**2)*7.0 + np.exp(-((sweep-1.64)/.26)**2)*3.1
alpha=np.uint8(np.clip(light,0,13))
poly=np.zeros((h,w),np.uint8);cv2.fillConvexPoly(poly,np.rint(q).astype(np.int32),255,lineType=cv2.LINE_AA)
alpha=(alpha.astype(np.float32)*poly.astype(np.float32)/255).astype(np.uint8)
shine=np.dstack([np.full_like(alpha,210),np.full_like(alpha,233),np.full_like(alpha,242),alpha])
Image.fromarray(shine).save(assets/'screen-reflection.webp','WEBP',quality=93,method=6)
# Better texture rendition for camera assets; alpha handled in premultiplied colors.
original=Image.open(assets/'mesa-limpa.png').convert('RGBA')
alpha=original.getchannel('A')
color=original.convert('RGB')
color=ImageEnhance.Contrast(color).enhance(1.045)
color=ImageEnhance.Sharpness(color).enhance(1.09)
color=ImageEnhance.Color(color).enhance(1.055)
original=Image.merge('RGBA',(*color.split(),alpha))
original.save(assets/'mesa-premium.webp','WEBP',quality=99,method=6)
print('mesa-premium', (assets/'mesa-premium.webp').stat().st_size)
# Tiny monochrome grain tile, low alpha through CSS.
rng=np.random.default_rng(96)
noise=rng.integers(30,190,(192,192),dtype=np.uint8)
na=np.full(noise.shape,255,np.uint8)
Image.fromarray(np.dstack([noise,noise,noise,na])).save(assets/'grain.webp','WEBP',quality=50)
