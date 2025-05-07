import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

/**
 * Phaser 게임 설정 객체입니다.
 *
 * - type: Phaser가 자동으로 WebGL 또는 Canvas 중 선택해서 렌더링합니다.
 * - width, height: 게임 캔버스의 크기 (1024x768)
 * - parent: HTML의 어떤 요소에 Phaser 캔버스를 렌더링할지 결정합니다. (후에 덮어씌워짐)
 * - backgroundColor: 캔버스 초기 배경색
 * - scene: 사용할 씬(화면)들을 등록하는 배열입니다. => 각 scene의 생성자 이름
 *
 * 참고: 각 씬은 src/game/scenes/ 아래에 정의되어 있습니다.
 */
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [
    Boot, // 초기 로딩 전용 씬
    Preloader, // 리소스 로딩 씬
    MainMenu, // 메인 메뉴 씬
    MainGame, // 실제 게임 플레이 씬
    GameOver, // 게임 오버 화면 씬
  ],
};

/**
 * Phaser 게임을 시작하는 함수입니다.
 *
 * @param parent - Phaser 캔버스를 삽입할 HTML 요소의 id
 * @returns Phaser.Game 인스턴스
 *
 * 이 함수는 src/main.ts에서 호출되며, Phaser 게임을 'game-container' 요소에 마운트합니다.
 */
const StartGame = (parent: string) => {
  // parent 설정만 외부에서 덮어씌우고, 나머지는 config를 그대로 사용
  //게임이 그려질 영역 상위 id에 parent가 들어감
  return new Game({ ...config, parent });
};

export default StartGame;
//여기 startgame함수는 상위 main.ts의 document.addEventListener로 이어짐,
