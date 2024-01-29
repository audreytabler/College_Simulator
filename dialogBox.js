import Phaser from 'phaser'

class DialogBox {
  constructor(scene, width, height) {
    this.scene = scene;

    this.isAnimating = false;
    this.clickToSkip = false;

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
          font: '20px Roboto',
          fill: 'white',
          wordWrap: { width: (width - 20) }
      }
  });
    this.dialogText.setOrigin(0, 0);

    this.dialogBox.setVisible(true);
    this.dialogText.setVisible(true);
    
  }

  handleClicks(){
    this.scene.input.on('pointerdown', function () {
      if (this.isAnimating)
          this.clickToSkip = true;
      else if (this.dialogBox.hasNextDialog)
              this.dialogBox.triggerNextDialog;
  }, this);
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

  show(text) {
    this.dialogBox.setVisible(true);
    this.dialogText.setVisible(true)
    this.handleClicks()
    this.setTextWithAnimation(text);
  }

  hide() {
    this.dialogBox.setVisible(false);
    this.dialogText.setVisible(false);
    this.dialogText.setText('');
    this.isAnimating = false;
    this.clickToSkip = false;
  }
}

export default DialogBox;
