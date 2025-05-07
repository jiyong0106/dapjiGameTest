import { Scene } from "phaser";

/**
 * GameOver 씬
 *
 * 이 씬은 게임이 종료된 후 표시되는 결과 화면입니다.
 *
 * - 빨간색 배경 위에 반투명 배경 이미지를 출력
 * - 'Game Over'라는 텍스트를 중앙에 표시
 * - 사용자가 화면을 클릭하면 MainMenu 씬으로 전환됩니다.
 */
export class GameOver extends Scene {
  /** 메인 카메라 객체 */
  camera: Phaser.Cameras.Scene2D.Camera;

  /** 배경 이미지 객체 */
  background: Phaser.GameObjects.Image;

  /** 'Game Over' 텍스트 객체 */
  gameover_text: Phaser.GameObjects.Text;

  /**
   * GameOver 씬 생성자
   * super('GameOver')을 통해 씬의 고유 키를 설정
   */
  constructor() {
    super("GameOver");
  }

  /**
   * 씬이 생성될 때 호출되는 메서드
   * 배경과 텍스트를 생성하고, 클릭 이벤트를 등록하여 메인 메뉴로 돌아갑니다.
   */
  create() {
    // 카메라 배경색을 빨간색으로 설정
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    // 반투명 배경 이미지 표시
    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    // 중앙에 'Game Over' 텍스트 출력
    this.gameover_text = this.add.text(512, 384, "Game Over", {
      fontFamily: "Arial Black",
      fontSize: 64,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center",
    });
    this.gameover_text.setOrigin(0.5); // 텍스트 가운데 정렬

    // 화면 클릭 시 MainMenu 씬으로 전환
    this.input.once("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
