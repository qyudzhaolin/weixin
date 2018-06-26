//js图片预加载
var imgSrc = img;
var imgArray = [
    {id:"jyhk",src:imgSrc+"/ico/jyhk.png"},
    {id:"2wm",src:imgSrc+"/ico/2wm.png"}
];
for( var i = 1; i < 11; i++){
    imgArray.push(
        {id: "ico"+i, src:imgSrc+"/ico/ico-"+i+"g.png"}
    )
}
for(var i = 1; i < 7; i++){
    imgArray.push(
        {id: "back"+i, src:imgSrc+"/ico/back"+i+".jpg"}
    )
}
var queue = new createjs.LoadQueue(true);
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete);
queue.setMaxConnections(5);
queue.loadManifest(imgArray)
function handleComplete() {
    console.log(imgArray);
}