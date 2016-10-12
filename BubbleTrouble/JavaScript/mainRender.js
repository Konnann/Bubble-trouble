//call all renders from classes here
var ctx = document.getElementById("canvas").getContext("2d");
function render(){
    let canvas = new Image();
    canvas.src = "./src/background.png";
    ctx.drawImage(canvas, 0, 0);
    arr.draw(ctx);
    
    for(let ball of balls)
    {
        ball.draw(ctx);
    }

    //ball.draw(ctx);
    hero.draw(ctx);
    score();

    if(hero.isHit){
        ctx.font = "70px serif";
        ctx.fillText("A ball got you!", 180, 280);
        ctx.font = "30px serif";
        ctx.fillText("(click to restart level)", 250, 340);
    }

    if(victory){
        let freddie = new Image();
        freddie.src = './src/Victory338x450.png';
        ctx.font = "120px serif";
        ctx.fillStyle = 'white';
        ctx.fillText('YOU ARE', 70, 280, 300);
        ctx.fillText('VICTORIOUS', 50, 370, 350);
        ctx.drawImage(freddie, 400, 0, 370, 600);

    }
}
