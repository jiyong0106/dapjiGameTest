import { Scene } from "phaser";

/**
 * Preloader 씬
 *
 * 게임 실행 전 필요한 리소스를 로딩하는 씬입니다.
 * - Boot 씬에서 미리 불러온 배경 이미지를 사용하여 로딩 화면을 구성
 * - 간단한 프로그레스 바 UI를 표시
 * - 로딩이 완료되면 MainMenu 씬으로 전환
 */
export class Preloader extends Scene {
  /**
   * Preloader 씬 생성자
   * super('Preloader')를 통해 씬 키를 설정
   */
  constructor() {
    super("Preloader");
  }

  /**
   * init(): 씬 초기화
   * Boot 씬에서 미리 로딩된 배경 이미지를 표시하고,
   * 프로그레스 바 UI를 구성합니다.
   */
  init() {
    this.add.image(512, 384, "background");

    // 프로그레스 바 테두리
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    // 프로그레스 바 채움
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    // 로딩 진행률에 따라 바 길이 조정
    this.load.on("progress", (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  /**
   * preload(): 실제 리소스를 로드하는 단계
   * 로고 이미지 등 게임에서 사용할 asset을 메모리에 로드
   */
  preload() {
    this.load.setPath("assets");
    this.load.image("logo", "logo.png");
  }

  /**
   * create(): 로딩 완료 후 실행됨
   * 애니메이션 등 전역 설정을 할 수도 있고,
   * 현재는 MainMenu 씬으로 곧장 전환
   */
  create() {
    this.scene.start("MainMenu");
  }
}
