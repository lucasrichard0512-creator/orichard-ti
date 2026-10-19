"""V25: genuine Controle+ login, optically cropped (no AI replacement), mapped
into the real LCD aperture at four-times the scene resolution.
Rebuild: python tools/build_monitor_v25.py
"""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

root=Path(__file__).resolve().parents[1]
assets=root/'assets'; sources=root/'sources'
quad=np.float32([[284.8,416.7],[717.6,391.5],[712.7,631.0],[285.6,651.5]])
origin=np.float32([278,385]); w,h=448,274
S=4
Q=(quad-origin)*S
W,H=w*S,h*S
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

def old_display():
    original=Image.open(sources/'sistema-antigo.webp').convert('RGB')
    # No redesign of the user's PDV reference. Keep the full screen legible.
    return original.resize((1920,1080),Image.Resampling.LANCZOS)

def real_controle():
    original=Image.open(sources/'controle-original-real.jpg').convert('RGB')
    # Preserve every real Controle+ element: logo, login box, labels and CTA.
    # Remove ONLY empty desktop space + Windows taskbar. This is a tighter
    # optical framing of the genuine screenshot, never a synthetic dashboard.
    body=original.crop((230,91,1370,732))
    base=Image.new('RGB',(1920,1080),(243,248,246))
    # Crop instead of distorting or changing UI aspect ratio.
    k=min(1920/body.width,1046/body.height)
    new=(round(body.width*k),round(body.height*k))
    body=body.resize(new,Image.Resampling.LANCZOS)
    base.paste(body,((1920-new[0])//2,32+(1048-new[1])//2))
    # Keep green native desktop app title bar, copied from the actual capture.
    title=original.crop((0,0,1600,27)).resize((1920,32),Image.Resampling.LANCZOS)
    base.paste(title,(0,0))
    return base

def modal_background(kind):
    base=old_display().convert('RGBA')
    veil=Image.new('RGBA',base.size,(16,23,30,61))
    base=Image.alpha_composite(base,veil)
    d=ImageDraw.Draw(base)
    l,t,r,b=(478,310,1442,780)
    d.rounded_rectangle((l+13,t+18,r+13,b+18),radius=13,fill=(0,0,0,100))
    d.rounded_rectangle((l,t,r,b),radius=10,fill=(245,247,250,255),outline=(105,126,147,255),width=3)
    d.rounded_rectangle((l,t,r,t+63),radius=10,fill=(219,233,243,255))
    d.rectangle((l,t+44,r,t+63),fill=(219,233,243,255))
    f=lambda bold,size:ImageFont.truetype(BOLD if bold else FONT,size)
    d.text((l+29,t+15),'Sistema Comercial',font=f(True,34),fill=(29,56,85,255))
    d.rectangle((l+30,t+91,r-30,t+93),fill=(218,222,225,255))
    d.rounded_rectangle((l+31,t+128,l+109,t+207),radius=13,fill=(185,74,54,255) if kind=='storage' else (60,120,165,255))
    d.text((l+70,t+166),'!',font=f(True,60),fill=(255,255,255,255),anchor='mm')
    if kind=='freeze':
        title='O programa não está respondendo'
        lines=['Esta operação está demorando mais que o normal.', 'Aguarde ou feche o aplicativo.']
    else:
        title='Armazenamento insuficiente'
        lines=['Não foi possível salvar os arquivos.', 'Verifique o espaço em disco e seus backups.']
    d.text((l+135,t+123),title,font=f(True,39),fill=(25,37,46,255))
    d.text((l+135,t+197),lines[0],font=f(False,27),fill=(58,66,75,255))
    d.text((l+135,t+248),lines[1],font=f(False,27),fill=(58,66,75,255))
    d.rounded_rectangle((r-275,b-87,r-29,b-27),radius=7,fill=(58,122,178,255))
    d.text((r-150,b-55),'Entendi',font=f(True,27),fill='white',anchor='mm')
    return base.convert('RGB')

def grade(rgb,mask):
    yy,xx=np.indices(mask.shape,dtype=np.float32)
    xn=xx/max(W-1,1);yn=yy/max(H-1,1)
    # Native LCD light, gentle edge falloff and slight warm reflection of desk.
    illum=0.995-0.048*((xn-.46)/.67)**2-0.024*((yn-.42)/.8)**2
    light=np.array([1.000,0.998,0.984],np.float32)[None,None,:]
    arr=np.clip(rgb.astype(np.float32)*illum[...,None]*light,0,255).astype('uint8')
    return np.dstack([arr,mask])

def warp(name,im):
    src=np.array(im.convert('RGB'))
    ih,iw=src.shape[:2]
    matrix=cv2.getPerspectiveTransform(np.float32([[0,0],[iw-1,0],[iw-1,ih-1],[0,ih-1]]),Q)
    bgr=cv2.warpPerspective(src,matrix,(W,H),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0))
    mask=np.zeros((H,W),np.uint8)
    cv2.fillConvexPoly(mask,np.rint(Q).astype('int32'),255,lineType=cv2.LINE_AA)
    mask=cv2.GaussianBlur(mask,(3,3),.38)
    out=grade(bgr,mask)
    output=assets/f'screen-{name}.webp'
    Image.fromarray(out,'RGBA').save(output,'WEBP',quality=97,method=6)
    print(f'{name}: {output.stat().st_size/1024:.1f} KiB, {W}x{H}')
    return Image.fromarray(out,'RGBA')

legacy=old_display()
control=real_controle()
control.save(sources/'controle-enquadramento-fiel.png',optimize=True)
warp('legacy',legacy)
warp('freeze',modal_background('freeze'))
warp('storage',modal_background('storage'))
warp('control',control)
# Black glass uses one real mask and a faint controlled reflection, not plain black.
blank=np.zeros((1080,1920,3),np.uint8)
y,x=np.mgrid[:1080,:1920].astype('float32')
glow=np.maximum(0,1-(x/1920-.25)**2-(y/1080-.05)**2)
blank[:]=np.array([4,8,10])[None,None,:] + (glow[...,None]*np.array([11,13,15])[None,None,:]).astype('uint8')
warp('black',Image.fromarray(blank,'RGB'))
# Optical glass sheen is subtle. Never blur UI text or replace actual colors.
gl=np.zeros((H,W,4),dtype='uint8')
yy,xx=np.mgrid[:H,:W].astype('float32')
flare=np.exp(-((xx/W+yy/H*.6-.58)/.19)**2)*5.0
alpha=np.minimum(10,flare).astype('uint8')
poly=np.zeros((H,W),np.uint8)
cv2.fillConvexPoly(poly,np.rint(Q).astype('int32'),255,lineType=cv2.LINE_AA)
gl[:,:,0]=203;gl[:,:,1]=227;gl[:,:,2]=237;gl[:,:,3]=(alpha*poly/255).astype('uint8')
Image.fromarray(gl,'RGBA').save(assets/'screen-reflection.webp','WEBP',quality=96,method=6)
# QA: composed in the same source scene pixels (not a generated desk).
scene=Image.open(assets/'mesa-premium.webp').convert('RGBA')
for name in ('legacy','control'):
    overlay=Image.open(assets/f'screen-{name}.webp').convert('RGBA').resize((w,h),Image.Resampling.LANCZOS)
    img=scene.copy();img.alpha_composite(overlay,(int(origin[0]),int(origin[1])))
    img.save(root/'qa'/f'rig-{name}.png')
print('Wrote original-screenshot crop + actual monitor textures.')
