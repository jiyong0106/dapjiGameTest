import { Scene, GameObjects } from "phaser";

/**
 * MainMenu 씬
 *
 * 이 씬은 게임의 메인 메뉴 화면을 구성합니다.
 * - 배경 이미지와 로고를 화면 중앙에 표시
 * - "Main Menu"라는 텍스트 출력
 * - 클릭 시 Game 씬으로 전환됩니다.
 */
export class MainMenu extends Scene {
  /** 배경 이미지 객체 */
  background: GameObjects.Image;

  /** 로고 이미지 객체 */
  logo: GameObjects.Image;

  /** 메뉴 타이틀 텍스트 */
  title: GameObjects.Text;

  /**
   * MainMenu 씬 생성자
   * super('MainMenu')을 통해 씬의 고유 키를 설정합니다.
   */
  constructor() {
    super("MainMenu");
  }

  /**
   * 씬이 생성될 때 호출됩니다.
   * 배경, 로고, 텍스트를 렌더링하고, 클릭 이벤트 등록 후 Game 씬으로 전환합니다.
   */
  create() {
    // 배경 이미지 중앙 배치
    this.background = this.add.image(512, 384, "background");

    // 로고 이미지 위치
    this.logo = this.add.image(512, 300, "logo");

    // 텍스트 출력
    this.title = this.add
      .text(512, 460, "Click to Start", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    // 클릭 시 게임 씬으로 이동
    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
