import { createCanvas, loadImage, registerFont} from 'canvas';
import fs from 'fs';

async function signatureGenerator(user, layouts) {
  const width = 1428;
  const height = 532;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  const template = await loadImage('/home/mess/Files/NodeJs/projeto-assinatura/public/assets/background1.png');

  context.drawImage(template, 0, 0, width, height);

  layouts.forEach( (l) =>  {
    registerFont(l.fontPath, { family: l.fontFamily })
  });

  layouts.forEach( (layout) => {

    context.fillStyle = layout.fontColor;
    context.font = `${layout.fontSize} "${layout.fontFamily}"`;
    context.textBaseline = 'top';

    if (layout.name == 'nome') {
      context.fillText(`${user.name} ${user.lastname}`, layout.x, layout.y);
    } else {
      context.fillText(user[layout.name], layout.x, layout.y);
    }
  });

  const buffer = canvas.toBuffer('image/png');
  const filePath = `/home/mess/Files/NodeJs/projeto-assinatura/public/results/${user.name+user.lastname}.png`;
  fs.writeFileSync(filePath, buffer);

};

/*signatureGenerator(matheus, layoutConfig).then(
  () => { fs.existsSync(`../../public/results/${matheus.name+matheus.lastname}.png`)? console.log('Gerou' ):  console.log('NAO Gerou')})*/

export { signatureGenerator };
