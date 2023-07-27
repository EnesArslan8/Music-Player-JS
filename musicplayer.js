class MusicPlayer{
    constructor(musicList){
        this.musicList=musicList;
        this.index=0;
    }

    getMusic(){
        return this.musicList[this.index];
    }
    next(){
        if(this.index + 1 < this.musicList.length){
            return this.index++; 
        }else{
            this.index=0;
        }
        
        
    }
    prev(){
        if(this.index != 0){
            return this.index--;
        }else{
            this.index=this.musicList.length-1;
        }
        
    }
}