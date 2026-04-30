/* ===== UTOPIA BUILDER BUREAU — 终端交互 JS ===== */

const TERM_OUTPUT = document.getElementById('term-output');
const TERM_INPUT  = document.getElementById('term-input');

// ===== 命令响应库（全中文）=====
const RESP = {
  help() {
    return `UBB终端 v0.7.3 — 可用指令：

  help          显示本帮助
  status        查看系统状态
  whoami        显示当前身份
  ls [目录]     列出目录内容
  cat <文件名>   读取文件
  clear         清屏
  zero          关于 N-17/ZERO 的加密信息
  mirror        关于「镜中人」的线索
  decode        解锁隐藏线索
  access <密码> 尝试提升访问等级
  helpme        建设局内部求助（……有人接吗？）

输入指令后按回车执行。`;
  },

  status() {
    const dots = (n) => '▇'.repeat(n) + '░'.repeat(20-n);
    return `系统状态概览：
  ✔  UBB核心引擎 ...... 在线
     ${dots(18)}
  ✔  表层（Layer-01）... 稳定
     ${dots(17)}
  ✔  深区（Layer-02）... 稳定
     ${dots(16)}
  ⚠  深渊（Layer-03）... 访问受限
     ${dots(4)}
  ✔  实体数据库 ........ 7 条记录
  ⚠  异常收容 ........ 1 条警告
  ✔  UBB广播站 ...... 正在广播

  「一切正常运行。——DIR-01」`;
  },

  whoami() {
    return `当前用户：访客（Level 0）
  权限：仅可访问公共区域
  如需提升权限，请联系你的主管。

  （你是访客。别乱跑。）`;
  },

  ls(args) {
    const dir = args[0] || 'root';
    const dirs = {
      root: `etc/    usr/    var/    anomalies/    entities/    logs/

  [目录] etc/         — 系统配置
  [目录] usr/         — 用户目录
  [目录] var/         — 变量存储
  [目录] anomalies/   — 异常档案（访问受限）
  [目录] entities/    — 实体档案（部分可访问）
  [目录] logs/        — 系统日志（访问受限）`,
      etc: `  system.conf    version.txt    broadcast.msg

  [文件] system.conf   — 系统配置
  [文件] version.txt   — 版本：v0.7.3
  [文件] broadcast.msg — 最新广播内容`,
      usr: `  n17/    dir01/    ???

  [目录] n17/      — N-17/ZERO 个人目录
  [目录] dir01/    — 局长目录（访问被拒）
  [目录] ???       — 权限不足，无法显示)`,
      anomalies: `  访问被拒：需要 Level 2 及以上权限。

  （你想看异常档案？去找 N-17 签字。）`,
      entities: `  n17.txt    unknown_01.txt    ???.txt

  [文件] n17.txt         — N-17/ZERO 档案（已解锁）
  [文件] unknown_01.txt  — 权限不足
  [文件] ???.txt         — 文件已损坏`,
      logs: `  访问被拒：需要 Level 3 及以上权限。

  （日志不是给你看的。——DIR-01）`,
    };
    return dirs[dir] || `ls: 无法访问 '${dir}'：没有那个目录\n\n可用目录：root, etc, usr, anomalies, entities, logs`;
  },

  cat(args) {
    const file = args[0];
    const files = {
      'n17.txt': `=== N-17 / ZERO 实体档案 ===
代号：ZERO（零）
年龄：17
身高：150cm
阵营：Unknown Faction
职务：资料记录员 / 设施维修

附带笔记（手写）：
「今天又修了一天空调。
 局长说空调里有异常实体。
 我打开看了，只有一个蜘蛛。
 算异常吗？」`,
      'system.conf': `UBB_SYSTEM_CONFIG v0.7.3
  core_engine = active
  surface_layer = stable
  deep_layer = stable
  abyss_layer = [已加密]
  auto_backup = false   # 深渊层无法备份
  guest_policy = permissive
  # 最后修改：20XX.██.██ by DIR-01`,
      'version.txt': `UTOPIA BUILDER BUREAU — 内部系统
版本：v0.7.3
代号：「纸是唯一不能被收容的异常」
构建日期：20XX.██.██
编译者：DIR-01（大概）`,
      'broadcast.msg': `最新广播 — 20XX.██.██
━━━━━━━━━━━━━━━━━━━━
「请注意，THE ABYSS 层发生未授权访问。
  所有 Level 3 以下成员请留在当前区域。
  重复，请留在当前区域。」

（这广播播了三年了，每次都是同一条。）`,
      'unknown_01.txt': `访问被拒：需要 Level 1 及以上权限才能读取此文件。

（你似乎在找什么人。但你确定你认识 TA 吗？）`,
    };
    if (!file) return 'cat: 缺少文件名\n用法：cat <文件名>';
    return files[file] || `cat: ${file}：没有那个文件或目录`;
  },

  zero() {
    return `正在加载 N-17/ZERO 的加密数据...
  校验中... ██████████████████ 100%

  「碎片代码：#ZR-17
  植入日期：未知
  来源：未知
  稳定性：72.3%
  备注：该个体存在多个相互矛盾的记忆版本。
        建议不要让其接触 THE ABYSS 层的档案。」

  （……你看到这段话的时候，我已经不在了。
    不用担心。乌托邦会自己长大的。）`;
  },

  mirror() {
    return `正在访问 UBB-AN-001 记录...
  警告：实体 UBB-AN-001 分类为 EUCLID 级。

  「镜中人」记录摘要：
  - 首次出现：建设局成立之初
  - 出现地点：任何反射表面
  - 危险等级：EUCLID
  - 备注：该实体似乎认识每一位成员，
    但每个成员看到的「镜中人」都不一样。

  N-17 的笔记：「它跟我说了一句话。
    但我不确定那是它说的，还是我自己想的。」`;
  },

  decode() {
    const el = document.getElementById('decode-reveal');
    if (el) el.style.display = 'block';
    return `解码启动...
  碎片校验码：0x7F3A
  解码中... ██████████████████ 100%

  「隐藏角色线索 — 碎片 #04」

  有一位成员，不在现有记录中。
  代号：N-00。
  被称为「第一个零」。

  如果你在 THE ABYSS 层的墙壁上看到这段刻痕：
  「ZERO×2=？」
  那就是 TA 留下的。

  —— 输入  access 00  尝试解锁。`;
  },

  access(args) {
    if (args[0] === '00') {
      return `访问密匙已接受。
  正在提升权限至 Level ????...
  ██████████████████ 100%

  「欢迎回家，ZERO。
    —— N-00」

  （这段消息不应该存在于系统中。
    建设局档案里从未有过 N-00 的记录。
    但这段欢迎语……确实是说给你听的。）`;
    }
    return `访问被拒：密匙无效或权限不足。

  （你以为乱试就能进去？）`;
  },

  clear() {
    if (TERM_OUTPUT) TERM_OUTPUT.innerHTML = '';
    return '';
  },

  helpme() {
    return `正在连接 UBB 内部求助热线...
  ████████░░░░░░░░░ 42%

  「你好，这里是建设局内部求助热线。
    请描述你的问题，我们会……

    ……（安静了三秒）

    其实没人接的。抱歉。」

  （不过 N-17 说，如果你真的需要帮助，
    去食堂找他。他一般在角落睡觉。）`;
  },
};

// ===== 处理命令 =====
function processCommand(raw) {
  if (!raw.trim()) return;
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  let response = '';
  if (cmd === 'clear') {
    RESP.clear();
    return;
  } else if (RESP[cmd]) {
    response = RESP[cmd](args);
  } else {
    response = `ubb-terminal: 未找到命令：${cmd}
输入 'help' 查看可用指令。

（这个终端不吃生指令。先看看帮助吧。）`;
  }

  if (response) {
    const div = document.createElement('div');
    div.style.marginBottom = '10px';
    const lines = response.split('\n');
    let html = `<span style="color:rgba(110,231,249,0.5);">ubb@terminal:~$</span> ${raw}\n`;
    html += lines.map(l => `<span class="t-dim">${l.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span>`).join('\n');
    div.innerHTML = html;
    if (TERM_OUTPUT) {
      TERM_OUTPUT.appendChild(div);
      TERM_OUTPUT.scrollTop = TERM_OUTPUT.scrollHeight;
    }
  }
}

// ===== 修复 bug：keydown 不是 keydown =====
if (TERM_INPUT) {
  TERM_INPUT.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      processCommand(TERM_INPUT.value);
      TERM_INPUT.value = '';
    }
  });
  // 自动聚焦
  setTimeout(() => TERM_INPUT.focus(), 500);
}

// ===== 初始化欢迎信息 =====
if (TERM_OUTPUT) {
  const welcome = document.createElement('div');
  welcome.innerHTML = `<span class="t-sys">// UTOPIA BUILDER BUREAU — 内部安全终端</span>\n<span class="t-sys">// 终端版本 v0.7.3 — 访客会话（Level 0）</span>\n<span class="t-dim" style="display:inline-block;margin-top:8px;">输入 'help' 查看可用指令。</span>\n`;
  TERM_OUTPUT.appendChild(welcome);
}
