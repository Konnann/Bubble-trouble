class Hero {

    constructor() {
        this.x = 400;
        this.y = 544; // canvas height - sprite height
        this.height = 56;
        this.width = 47.25;
        this.velocity = 5;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.spritesheet = new Image();
        this.spritesheet.src = "./src/hero_47-25x56.png";
        this.currentFrame = 0;
        this.isShooting = false;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;

    }

    update() {

        //Keyboard event handling
        window.addEventListener('keypress', keyPress);
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);

        function keyDown(event) {
            if (event.code == "ArrowLeft") {
                hero.isMovingLeft = true;
            } else if (event.code == "ArrowRight") {
                hero.isMovingRight = true;
            }
        }

        function keyUp(event) {
            if (event.code == "ArrowLeft") {
                hero.isMovingLeft = false;
            } else if (event.code == "ArrowRight") {
                hero.isMovingRight = false;
            }
        }

        function keyPress(event) {
            if (event.keyCode == 32) {
                hero.shoot();
                hero.isShooting = true;
            }
        }

        //hero movement
        if (this.isMovingRight) {
            if(this.x + this.velocity < 800 - this.width) {
                this.x += this.velocity;
            }else {
                this.x = 800 - this.width;
            }
        } else if (this.isMovingLeft) {
            if(this.x - this.velocity > 0) {
                this.x -= this.velocity;
            }else{
                this.x = 0;
            }
        }

        //collision detection
        for (let b of balls) {
            if (hero.intersects(b)) {
                alert('You died');
            }
        }
    }



    draw(ctx) {
        
        //sprite animation
        if (this.isShooting) {
            ctx.drawImage(this.spritesheet, 0, 112, this.width, this.height, this.x, this.y, this.width, this.height);
            this.isShooting = false;

        } else if (this.isMovingRight) {
            //TODO: slow down frame rate
            let imageX = this.currentFrame % 189;
            this.currentFrame += 47.25;
            ctx.drawImage(this.spritesheet, imageX, 0, this.width, this.height, this.x, this.y, this.width, this.height);

        } else if (this.isMovingLeft) {
            let imageX = this.currentFrame % 189;
            this.currentFrame += 47.25;
            ctx.drawImage(this.spritesheet, imageX, 56, this.width, this.height, this.x, this.y, this.width, this.height);
            
        } else {
            ctx.drawImage(this.spritesheet, 0, 112, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }




    shoot(){
        //this.isMovingLeft = false;
        //this.isMovingRight = false;
        arr.shoot(this.x, this.y);
    }

    intersects(ball) {
        // /find distance between circle center and rect center (horizontal and vertical)
        let horizontalDist = Math.abs(ball.x - (this.x + this.width / 2));
        let verticalDist = Math.abs(ball.y - (this.y + this.height / 2));

        //if the distance is bigger than half rect + half circle they're too far apart
        if (horizontalDist > (this.width / 2) + ball.r) {
            return false;
        } else if (verticalDist > (this.height / 2) + ball.r) {
            return false;
        }
        //if distance is less than half rect = definitely colliding
        if (horizontalDist <= this.width / 2) {
            return true;
        } else if (verticalDist <= this.height / 2) {
            return true;
        }

        //check for collision at the corner , compare distance between circle and rectangle centers
        let dX = horizontalDist - this.width / 2;
        let dY = verticalDist - this.height / 2;

        if (dX * dX + dY * dY <= (ball.r * ball.r)) {
            return true;
        } else {
            return false;
        }
    }



}
