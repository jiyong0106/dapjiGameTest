import { Scene } from "phaser";

export class Game extends Scene {
  /** 플레이어 객체 */
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  /** 방향키 입력 */
  cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Game");
  }

  preload() {
    // 타일맵 JSON (.tmj)
    this.load.tilemapTiledJSON("map", "assets/map.tmj");

    // 타일셋 이미지 (Tiled에서 연결한 tiles 이름과 일치해야 함)
    this.load.image("tiles", "assets/tiles.png");

    // 플레이어 스프라이트 시트
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // 1. 타일맵 로드
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tiles", "tiles");

    // 2. 타일 레이어 생성
    const layer = map.createLayer("Tile Layer 1", tileset!, 0, 0);
    layer?.setDepth(0); // 배경 레이어

    // 3. 플레이어 생성 (타일 위에 위치하도록)
    this.player = this.physics.add.sprite(100, 100, "player");
    // this.player.setScale(2);
    this.player.setDepth(1); // 타일보다 위에 그리기

    // 4. 방향키 입력 등록
    this.cursor = this.input.keyboard!.createCursorKeys();

    // 5. 걷기 애니메이션 정의
    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    // ✅ 클릭 시 GameOver 씬 이동
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }

  update() {
    const speed = 100;
    const { left, right, up, down } = this.cursor;
    this.player.setVelocity(0);

    if (left?.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play("walk-left", true);
    } else if (right?.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play("walk-right", true);
    } else if (up?.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("walk-up", true);
    } else if (down?.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("walk-down", true);
    } else {
      this.player.anims.stop();
    }
  }
}
