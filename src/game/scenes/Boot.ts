import { Scene } from "phaser";

/**
 * Boot Scene
 *
 * 게임의 가장 첫 번째 씬으로, Preloader에 필요한 최소 리소스(로고, 배경 등)를 로딩.
 * preload 완료 후 자동으로 Preloader 씬으로 넘어감.
 * Boot 씬은 Preloader 화면을 띄우기 위한 최소 리소스
 * 빠르게 Preloader 화면을 보여주기 위함 (로딩 중 흰 화면 방지)
 */
export class Boot extends Scene {
  /**
   * Boot 씬 생성자
   * @constructor
   */
  constructor() {
    super("Boot");
  }

  /**
   * Phaser의 preload 훅
   *
   * Preloader 씬에서 사용할 리소스를 로딩합니다.
   * 리소스는 메모리에 로드되며, 아직 화면에는 표시되지 않습니다.
   */
  preload() {
    this.load.image("background", "assets/bg.png");
  }

  /**
   * Phaser의 create 훅
   *
   * preload가 완료되면 자동으로 호출되며,
   * 이후 Preloader 씬으로 전환합니다.
   */
  create() {
    this.scene.start("Preloader");
  }
}
