import { defineConfig } from "vite";

const phasermsg = () => {
  return {
    name: "phasermsg",
    buildStart() {
      process.stdout.write(`Building for production...\n`);
    },
    buildEnd() {
      const line = "---------------------------------------------------------";
      const msg = `❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️`;
      process.stdout.write(`${line}\n${msg}\n${line}\n`);

      process.stdout.write(`✨ Done ✨\n`);
    },
  };
};

export default defineConfig({
  base: "./",
  logLevel: "warning",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
          // manualChunks: { phaser: ['phaser'] }는 Phaser만 따로 빼서 번들링하라는 설정으로,
          // 브라우저 캐싱과 성능 최적화를 위한 고급 Vite 설정
          // Phaser는 무거운 라이브러리라 자주 바뀌지 않음 → 별도 파일로 분리해두면 브라우저가 캐시해놓고 재사용 가능
          // 초기 로딩 최적화	앱 코드랑 Phaser 코드가 분리되면, 초기 로딩 시 필요한 코드만 먼저 가져오게 되어 빠름
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  server: {
    port: 8080,
  },
  plugins: [phasermsg()],
});
