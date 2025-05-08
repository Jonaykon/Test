// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: battery-three-quarters;
let chartResolution = new Size(250,100);
let colors = ["#68CE67","#3B82F7","#B260EA","#87E3E1"];
let lineThickness = 2;

function createChart(d){let p=d.map(a=>a.split("\n").map(b=>b.replace(",", ".").split(";").map(Number))); let x=p.flatMap(a=>a.map(b=>b[0])); let y=p.flatMap(a=>a.map(b=>b[1])); [a,b] = [Math.min(...x), Math.max(...x)]; [c,e] = [Math.min(...y), Math.max(...y)]; let g=new DrawContext(); g.size=chartResolution; g.opaque=false; g.respectScreenScale=true; let w=chartResolution.width, l=chartResolution.height; p.forEach((m,n)=>{g.setStrokeColor(new Color(colors[n%colors.length])); g.setLineWidth(lineThickness); let q=new Path(); m.forEach((r,s)=>{let [t,u]=r, v=(b-a===0)?w/2:((t-a)/(b-a))*w, z=(e-c===0)?l/2:l-((u-c)/(e-c))*l; s?q.addLine(new Point(v,z)):q.move(new Point(v,z));}); g.addPath(q); g.strokePath();}); return g;}

let fm = FileManager.local();
let folderPath = fm.bookmarkedPath("Battery History");
let files = fm.listContents(folderPath);
let datasets = [];
for (let i = 0; i < files.length; i++) {
  datasets.push(fm.readString(fm.joinPath(folderPath, files[i])))
}

console.log("File Contents:\n\n" + datasets.join("\n\n"));

let chart = createChart(datasets);
let widget = new ListWidget();
widget.addImage(chart.getImage());

if (config.runsInWidget) {
  Script.setWidget(widget);
  Script.complete();
} else {
  widget.presentMedium();
}
