class Music{
    constructor(title,singer,img,file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }
    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList=[
    new Music("I Love You","Billie Eilish","billie1.jpg","Billie.mp3"),
    new Music("Little Dark Age","MGMT","mgmt.png","MGMT.mp3"),
    new Music("Sweater Weather","The Neighbourhood","swather.jpg","sweather.mp3")
];