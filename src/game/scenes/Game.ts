import { Scene } from "phaser";

/**
 * Game 씬
 *
 * 이 씬은 실제 게임 플레이 화면을 담당하며, 사용자에게 메시지를 보여주고
 * 클릭 시 GameOver 씬으로 전환하는 간단한 인터랙션을 포함합니다.
 *
 * - 배경 이미지(`background`)를 중앙에 반투명하게 표시
 * - 메시지 텍스트(`msg_text`)를 가운데 출력
 * - 화면 클릭 시 'GameOver' 씬으로 전환
 */
export class Game extends Scene {
  /** 메인 카메라 객체 */
  camera: Phaser.Cameras.Scene2D.Camera;

  /** 배경 이미지 객체 */
  background: Phaser.GameObjects.Image;

  /** 안내 텍스트 객체 */
  msg_text: Phaser.GameObjects.Text;

  /**
   * Game 씬 생성자
   * super('Game')을 통해 씬 키를 'Game'으로 설정
   */
  constructor() {
    super("Game");
  }

  /**
   * 씬이 생성될 때 호출되는 메서드
   * 게임 오브젝트들을 배치하고, 사용자 입력 이벤트를 등록합니다.
   */
  create() {
    // 카메라 설정: 배경색을 연두색(0x00ff00)으로 설정
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    // 배경 이미지 추가 (중앙 좌표: 512, 384)
    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5); // 반투명 처리

    // 메시지 텍스트 추가
    this.msg_text = this.add.text(
      512,
      384,
      "Make something fun!\nand share it with us:\nsupport@phaser.io",
      {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      }
    );
    this.msg_text.setOrigin(0.5); // 텍스트 중심 정렬

    // 마우스 클릭(또는 터치) 한 번 발생 시 GameOver 씬으로 이동
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }
}
