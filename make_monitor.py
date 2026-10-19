from PIL import Image,ImageFilter,ImageDraw
from pathlib import Path
import cv2,numpy as np
root=Path(__file__).parent
A=root/'assets'
# Quad is the visible LCD glass measured in the original desk image, in world pixels.
Q=np.float32([[282,417],[711,394],[709,628],[284,665]])
S=3
x0,y0,x1,y1=277,388,717,671
W,H=(x1-x0)*S,(y1-y0)*S
quad=(Q-np.array([x0,y0],np.float32))*S
base=np.float32([[0,0],[1599,0],[1599,899],[0,899]])
M=cv2.getPerspectiveTransform(base,quad)
mask=np.zeros((H,W),dtype=np.uint8)
cv2.fillConvexPoly(mask,np.rint(quad).astype(np.int32),255,lineType=cv2.LINE_AA)
# Small inset attenuation prevents hard bright pixels at the glass/bezel boundary.
d=cv2.distanceTransform((mask>128).astype(np.uint8),cv2.DIST_L2,5)
mask=(mask.astype(np.float32)*np.minimum(1,d/6)).astype(np.uint8)
legacy=np.asarray(Image.open(A/'sistema-antigo.webp').convert('RGB').resize((1600,900),Image.Resampling.LANCZOS))
real=np.asarray(Image.open(A/'controle-real.webp').convert('RGB'))
# Real Controle+ only: remove the Windows taskbar, keep its original actual login UI.
real=real[:857]
real=cv2.resize(real,(1600,900),interpolation=cv2.INTER_LANCZOS4)

def overlay(src,mode):
    im=Image.fromarray(src.copy())
    draw=ImageDraw.Draw(im,'RGBA')
    if mode=='freeze':
        draw.rectangle((0,0,1600,900),fill=(0,0,0,32))
        draw.rounded_rectangle((425,270,1190,615),radius=18,fill=(238,242,247,249),outline=(130,141,154,255),width=4)
        draw.rectangle((425,270,1190,315),fill=(208,216,227,255))
        draw.text((465,282),'Produtos e Serviços - Não respondendo',fill='#1c2a39',stroke_width=0)
        draw.text((470,390),'O programa parou de responder.',fill='#172132')
        draw.text((470,435),'Aguarde ou feche a aplicação.',fill='#293b46')
        draw.rounded_rectangle((840,510,1140,575),radius=10,fill='#e9eef5',outline='#9ba5ad',width=2)
        draw.text((930,530),'Aguarde...',fill='#152c49')
    elif mode=='storage':
        draw.rectangle((0,0,1600,900),fill=(0,0,0,38))
        draw.rounded_rectangle((350,220,1260,665),radius=18,fill=(247,248,250,255),outline=(131,140,154,255),width=5)
        draw.rectangle((350,220,1260,279),fill='#0f5590')
        draw.text((393,240),'Aviso do Sistema',fill='#ffffff')
        draw.text((410,345),'Armazenamento quase cheio',fill='#bf2323')
        draw.text((410,405),'Não foi possível salvar o arquivo.',fill='#1c2732')
        draw.text((410,452),'Verifique espaço e backups.',fill='#1c2732')
        draw.rounded_rectangle((1000,565,1200,620),radius=9,fill='#e6ecf4',outline='#9ba7ae',width=2)
        draw.text((1080,579),'OK',fill='#192a3d')
    return np.asarray(im)

for state,src in [('legacy',legacy),('freeze',overlay(legacy,'freeze')),('storage',overlay(legacy,'storage')),('black',np.zeros_like(legacy)+np.array([8,12,12],np.uint8)),('control',real)]:
    warped=cv2.warpPerspective(src,M,(W,H),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0))
    # Gentle display glass look; preserve text clarity.
    yy,xx=np.mgrid[0:H,0:W]
    light=1+0.018*(1-xx/W)-0.025*(yy/H)
    warped=np.clip(warped.astype(np.float32)*light[...,None],0,255).astype(np.uint8)
    rgba=np.dstack([warped,mask]); out=Image.fromarray(rgba,'RGBA')
    out.save(A/f'lcd-{state}-3x.webp','WEBP',lossless=True,method=5)
    print(state,out.size, (A/f'lcd-{state}-3x.webp').stat().st_size)
# Foreground pen at bottom-left passing in front of the panel: masked original photographed pixels.
# Mask only the pen silhouette, not the old black display behind it.
orig=Image.open(A/'mesa-premium.webp').convert('RGBA')
# Coordinates trace the black/metal tipped pen that overlaps the glass near its lower left.
px0,py0,px1,py1=269,615,323,703
fragment=orig.crop((px0,py0,px1,py1))
m=Image.new('L',fragment.size,0);g=ImageDraw.Draw(m)
# tip and diagonal barrel, with tight strokes to avoid bringing the black monitor with it.
polygon=[(304-px0,642-py0),(308-px0,640-py0),(313-px0,644-py0),(312-px0,652-py0),
         (299-px0,673-py0),(284-px0,694-py0),(277-px0,696-py0),(277-px0,688-py0),
         (290-px0,668-py0),(298-px0,649-py0)]
g.polygon(polygon,fill=255)
m=m.filter(ImageFilter.GaussianBlur(.7))
fragment.putalpha(m)
fragment.save(A/'pen-foreground.png')
print('pen foreground',fragment.size)
