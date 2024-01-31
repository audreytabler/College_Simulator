import Phaser from 'phaser'


class DialogBox {
  //data;
  constructor(scene, width, height,data) {
    this.scene = scene;
    this.height = height
    this.width=width

    this.isAnimating = false;
    this.clickToSkip = false;

    this.data =data //data holds json data
    this.dialogLength //how many bubbles in a conversation
    this.dialogIndex = 0;
    this.currentIndex //current index within a conversation

    this.isVisible = false;

    //console.log("data is " + this.data.dialogList.length)
    this.dialogList =[] 

    const x = (scene.sys.game.config.width -(width*0.6))/2; // Adjust as needed
    const y = scene.sys.game.config.height - height - 10; // Adjust as needed
    this.dialogBox = scene.add.graphics();
    this.dialogBox.fillStyle(0xFFFFFF, 0.7); // White background color
    this.dialogBox.fillRoundedRect(0, 0, width, height,15);

    this.dialogBox.setPosition(x, y);
    this.dialogText = scene.make.text({
      x: x+10,
      y: y+10,
      text: 'DEBUG',
      origin: { x: 0, y: 0},
      style: {
          font: '20px Courier New',
          fill: 'white',
          wordWrap: { width: (width - 20) }
      }
  });
    this.dialogText.setOrigin(0, 0);

    this.handleClicks()
    //this.scene.events.on('update', this.updatePosition, this);
    
  }

  getIsVisible(){
    return this.isVisible
  }

  handleClicks(){
    this.scene.input.on('pointerdown', function () {
      if (this.isAnimating)
          this.clickToSkip = true;
      else if (this.currentIndex < this.dialogLength)
        this.nextDialog();
      else this.hide();
  }, this);
  }

  updatePosition() {
    const camera = this.scene.cameras.main;
    const x = camera.scrollX +175; // Adjust as needed
    const y = camera.scrollY+camera.height -this.height -10; // Adjust as needed
    this.dialogBox.setPosition(x, y);
    this.dialogText.setPosition(x+10,y+10)
  }

  setTextWithAnimation(text) {
    this.isAnimating = true;
    this.clickToSkip = false;

    let currentIndex = 0;
    const totalCharacters = text.length;

    const animateCharacter = () => {
        if (this.isAnimating && currentIndex < totalCharacters) { 
            this.dialogText.setText(text.substring(0, currentIndex + 1));
            currentIndex++;
            // Using requestAnimationFrame for smoother animations
            requestAnimationFrame(animateCharacter);
            if (this.clickToSkip) {
              this.isAnimating = false;
              this.dialogText.setText(text);
              return;
          }
        } else {
            this.isAnimating = false;
        }
    };
    animateCharacter();
  }

  startDialog(index){ //stardialog with given index
    if (index>=this.data.dialogList.length)
    this.dialogIndex = this.data.dialogList.length - 1
    else this.dialogIndex = index

   this.dialogLength = this.data.dialogList[index].dialog.length; //length of conversation
   this.currentIndex = 0;
    //which conversation
   
   
   this.nextDialog();
  }

  startDialog(){ //will go off of whatever the last index is
    if (this.dialogIndex >= this.data.dialogList.length)
      this.dialogIndex = this.data.dialogList.length - 1

   this.dialogLength = this.data.dialogList[this.dialogIndex].dialog.length; //length of conversation
   this.currentIndex = 0;

   this.nextDialog();
  }

  nextDialog(){
    this.show(this.data.dialogList[this.dialogIndex].dialog[this.currentIndex].text)
    this.currentIndex++
  }

  show(text) {
    this.dialogBox.setVisible(true);
    this.dialogText.setVisible(true);
    this.isVisible = true;
    //this.handleClicks()
    this.setTextWithAnimation(text);
  }

  hide() {
    this.dialogIndex++;
    this.dialogBox.setVisible(false);
    this.dialogText.setVisible(false);
    this.dialogText.setText('');
    this.isVisible = false;
    this.isAnimating = false;
    this.clickToSkip = false;
  }
}

export default DialogBox;
