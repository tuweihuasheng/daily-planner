// 为 README 截取干净的应用截图（注入演示数据，不触碰真实用户数据）
// 用法：先 pnpm dev，再 npx electron scripts/capture-readme.cjs
const path = require("node:path");
const { app, BrowserWindow } = require("electron");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "docs", "images");
const url = process.env.CAPTURE_URL || "http://localhost:5000/";

function fmt(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    useContentSize: true,
    width: 1488,
    height: 980,
    webPreferences: { offscreen: true },
  });
  await win.loadURL(url);
  await new Promise((r) => setTimeout(r, 1200));

  // 注入通用演示任务（覆盖当月若干天），均为示例文案
  await win.webContents.executeJavaScript(`(() => {
    const now = new Date();
    const fmt = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const day = (offset) => { const d = new Date(now); d.setDate(d.getDate() + offset); return fmt(d); };
    const mk = (id, text, date, time, priority, completed) => ({ id, text, completed, date, time, priority, tags: [] });
    const tasks = {
      [day(0)]: [
        mk("d1", "整理本周会议纪要", day(0), "09:30", "urgent-important", false),
        mk("d2", "回复合作邮件", day(0), "11:00", "urgent", false),
        mk("d3", "阅读 30 分钟", day(0), "20:00", "important", true),
      ],
      [day(1)]: [
        mk("d4", "项目方案评审", day(1), "14:00", "urgent-important", false),
        mk("d5", "健身房力量训练", day(1), "19:00", "normal", false),
      ],
      [day(3)]: [mk("d6", "撰写月度总结", day(3), "16:00", "important", false)],
      [day(6)]: [mk("d7", "家庭聚餐", day(6), "18:00", "normal", false)],
      [day(-2)]: [mk("d8", "缴纳水电费", day(-2), "10:00", "urgent", true)],
    };
    localStorage.setItem("dailyPlannerTasks", JSON.stringify(tasks));
  })()`);
  await win.loadURL(url);
  await new Promise((r) => setTimeout(r, 1500));

  const shot = async (name) => {
    const image = await win.webContents.capturePage();
    const fs = require("node:fs");
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, name), image.toPNG());
    console.log("captured", name);
  };

  await shot("overview.png");

  // 四象限视图（通过真实点击按钮打开，确保日期范围正确初始化）
  await win.webContents.executeJavaScript(`(() => {
    const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("四象限"));
    if (btn) btn.click();
  })()`);
  await new Promise((r) => setTimeout(r, 800));
  await shot("quadrant.png");

  // 深色模式月视图
  await win.webContents.executeJavaScript(`planner.showQuadrantView = false; planner.themeMode = 'dark'; planner.render();`);
  await new Promise((r) => setTimeout(r, 600));
  await shot("dark.png");

  win.destroy();
  app.quit();
});
