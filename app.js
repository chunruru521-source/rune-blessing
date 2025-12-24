// Rune Blessing — static, deterministic daily draw per person.
// Default: zh-TW, toggle to EN. Rune glyph stays same.

const STORAGE = {
  seed: "rb_seed_v1",
  lang: "rb_lang_v1",
  lastDraw: "rb_last_draw_v1", // { date: "YYYY-MM-DD", picks:[i1,i2?] }
};

const LANGS = ["zh-TW", "en"];

// UI strings
const I18N = {
  "zh-TW": {
    brandSub: "羊皮紙上的每日符文祝福",
    meditationTitle: "靜心：回到當下",
    meditationLead:
      "在抽牌之前，先讓心回到當下。當心更安住，訊息更清澈——如《瑜伽經》所指向的「心識的寂止」。",
    startMeditation: "開始靜心（約 60 秒）",
    continueToWheel: "進入輪盤",
    meditationNote:
      "提示：你可以閉眼、放鬆下顎，讓呼吸自然落下。若分心，只要溫柔地帶回呼吸即可。",
    wheelTitle: "符文輪盤",
    wheelSubtitle:
      "這不是抽獎。它像一個古老的圓環——把你帶回「你與宇宙共振」的那個點。",
    wheelCenter: "BREATHE",
    drawBtn: "領取今日祝福",
    redrawInfoBtn: "為什麼我今天是固定的？",
    wheelNote:
      "每位來訪者每天的結果是固定的（但你和別人可以相同或不同）。你每天最多會收到兩張：主祝福＋隱藏助力。",
    resultTitle: "你的今日符文",
    todayPill: "今日",
    fixedPill: "固定（每日）",
    mainBlessing: "今日主祝福",
    hiddenSupport: "隱藏助力",
    backToWheel: "回到輪盤",
    seedHint:
      "小提醒：這個網站會在你的裝置上保存一個匿名 seed，用來讓「每日抽取」固定。清除瀏覽器資料後會重置。",
    tab_ancient: "古老智慧",
    tab_modern: "現代智慧",
    tab_question: "提問",
    tab_blessing: "祝福",
    whyFixedTitle: "為什麼今天會固定？",
    whyFixedBody:
      "我們用「你的匿名 seed × 今日日期」來生成結果，所以你今天重複進來會看到同一組符文。明天會自然更新。"
  },
  en: {
    brandSub: "Daily rune blessing on parchment",
    meditationTitle: "Meditation: Arrive in the present",
    meditationLead:
      "Before drawing, return to now. When the mind settles, the message becomes clearer—like the Yoga Sutras pointing toward the stilling of the mind.",
    startMeditation: "Start meditation (about 60s)",
    continueToWheel: "Enter the wheel",
    meditationNote:
      "Tip: soften your jaw. Let the breath fall naturally. If attention drifts, gently return to breathing.",
    wheelTitle: "Rune Wheel",
    wheelSubtitle:
      "Not a lottery. A quiet circle—bringing you back to resonance with the Universe.",
    wheelCenter: "BREATHE",
    drawBtn: "Receive today’s blessing",
    redrawInfoBtn: "Why is today fixed?",
    wheelNote:
      "Your result is fixed for the day (you may match or differ from others). You may receive up to two runes: main blessing + hidden support.",
    resultTitle: "Your Runes for Today",
    todayPill: "Today",
    fixedPill: "Fixed (daily)",
    mainBlessing: "Main Blessing",
    hiddenSupport: "Hidden Support",
    backToWheel: "Back to wheel",
    seedHint:
      "Note: we store an anonymous seed on your device to keep the daily draw consistent. Clearing browser data will reset it.",
    tab_ancient: "Ancient Wisdom",
    tab_modern: "Modern Wisdom",
    tab_question: "Question",
    tab_blessing: "Blessing",
    whyFixedTitle: "Why is it fixed today?",
    whyFixedBody:
      "We generate your draw from an anonymous seed × today’s date, so returning today shows the same runes. It refreshes naturally tomorrow."
  }
};

// Elder Futhark (24) — concise texts (you can refine later).
const RUNES = [
  {
    glyph: "ᚠ",
    name: "Fehu",
    zh: {
      ancient: "牛群、流動的財富、可被照料的資源。",
      modern: "把能量放在「可持續」的供給：時間、金錢、關係、靈感。",
      question: "我今天真正想要滋養的是什麼？我願意如何照料它？",
      blessing: "願你擁有足夠，且懂得流動；擁有資源，也擁有分享的心。"
    },
    en: {
      ancient: "Cattle, movable wealth, tended resources.",
      modern: "Invest in sustainable supply: time, money, relationships, inspiration.",
      question: "What do I truly want to nourish today—and how will I tend it?",
      blessing: "May you have enough, and may it flow through you with grace."
    }
  },
  {
    glyph: "ᚢ",
    name: "Uruz",
    zh: {
      ancient: "野牛之力、原始生命力、身體與意志。",
      modern: "回到身體：力量不是逼迫，而是穩定地站立。",
      question: "我今天可以用哪一種更溫柔的方式變強？",
      blessing: "願你在身體裡醒來，力量帶著慈悲，而非緊繃。"
    },
    en: {
      ancient: "Aurochs strength, primal vitality, body and will.",
      modern: "Return to the body. Strength is steady presence, not force.",
      question: "How can I grow stronger today with gentleness?",
      blessing: "May your power awaken in kindness, not tension."
    }
  },
  {
    glyph: "ᚦ",
    name: "Thurisaz",
    zh: {
      ancient: "荊棘與巨人、界線、保護與淨化。",
      modern: "說清楚你的界線：不是攻擊，是自我守護。",
      question: "我今天需要在哪裡說「不」來說「是」給自己？",
      blessing: "願你被清晰的界線守護，讓真正重要的進得來。"
    },
    en: {
      ancient: "Thorn/giant, boundaries, protection and cleansing.",
      modern: "Name your boundary clearly—self-protection, not aggression.",
      question: "Where do I need to say 'no' to say 'yes' to myself?",
      blessing: "May clear boundaries protect what matters most."
    }
  },
  {
    glyph: "ᚨ",
    name: "Ansuz",
    zh: {
      ancient: "神聖氣息、言語、訊息、靈感的降臨。",
      modern: "今天適合聽：聽自己、聽他人、聽宇宙的細語。",
      question: "我是不是在用同一種舊語氣講新事情？",
      blessing: "願你說出的每一句，都更靠近真實；願你聽見更高的引導。"
    },
    en: {
      ancient: "Sacred breath, speech, messages, inspiration arriving.",
      modern: "A day to listen—within, without, and between.",
      question: "Am I using an old tone to speak something new?",
      blessing: "May your words align with truth; may guidance reach you."
    }
  },
  {
    glyph: "ᚱ",
    name: "Raidho",
    zh: {
      ancient: "旅程、節奏、道路與秩序。",
      modern: "不是快就是對；是「合節奏」才會順。",
      question: "我今天的步伐，跟我的心一致嗎？",
      blessing: "願你走在自己的節奏裡，路在腳下自然展開。"
    },
    en: {
      ancient: "Journey, rhythm, the road and right order.",
      modern: "Not fast = right. Right rhythm = ease.",
      question: "Is my pace aligned with my heart today?",
      blessing: "May your path unfold in your true rhythm."
    }
  },
  {
    glyph: "ᚲ",
    name: "Kenaz",
    zh: {
      ancient: "火炬、洞見、技藝之光。",
      modern: "點亮一盞小燈就夠了：今天適合做「清楚的一步」。",
      question: "我需要把哪個地方照亮，而不是逼自己答案一次到位？",
      blessing: "願你的洞見溫暖而明確，照亮你要走的下一步。"
    },
    en: {
      ancient: "Torch, insight, craft-light.",
      modern: "One small light is enough—take one clear step.",
      question: "What can I illuminate instead of forcing a full answer now?",
      blessing: "May warm clarity guide your next step."
    }
  },
  {
    glyph: "ᚷ",
    name: "Gebo",
    zh: {
      ancient: "禮物、交換、盟約。",
      modern: "健康的給與收：不是犧牲，是互惠與尊重。",
      question: "我今天的付出，是出於愛，還是出於焦慮？",
      blessing: "願你遇見善意的流動：給得剛好，收得心安。"
    },
    en: {
      ancient: "Gift, exchange, sacred reciprocity.",
      modern: "Healthy giving/receiving: mutual respect, not sacrifice.",
      question: "Is my giving from love or from anxiety today?",
      blessing: "May reciprocity flow with ease and trust."
    }
  },
  {
    glyph: "ᚹ",
    name: "Wunjo",
    zh: {
      ancient: "喜悅、合奏、歸位。",
      modern: "喜悅不是獎品，是你對齊之後自然浮現的狀態。",
      question: "什麼讓我感覺「回家」？我能給自己一小口嗎？",
      blessing: "願你回到心的歸位，簡單的喜悅在此刻發光。"
    },
    en: {
      ancient: "Joy, harmony, right-belonging.",
      modern: "Joy isn’t a prize—it's alignment made visible.",
      question: "What feels like home—and can I take a small sip of it today?",
      blessing: "May simple joy glow as you return to center."
    }
  },
  {
    glyph: "ᚺ",
    name: "Hagalaz",
    zh: {
      ancient: "冰雹、突變、不可控的洗牌。",
      modern: "當外界打亂你：回到內在的穩定核心。",
      question: "我可以放下控制的哪一部分，讓生命自己修復？",
      blessing: "願混亂成為清理，願你在風暴裡仍記得呼吸。"
    },
    en: {
      ancient: "Hail, disruption, reshuffling beyond control.",
      modern: "When life scrambles things, return to inner steadiness.",
      question: "What control can I release so life can repair itself?",
      blessing: "May disruption cleanse; may you remember breath in the storm."
    }
  },
  {
    glyph: "ᚾ",
    name: "Naudhiz",
    zh: {
      ancient: "需要、摩擦、鍛鍊之火。",
      modern: "限制不是詛咒：它讓你看見真正的渴望。",
      question: "我真正需要的是什麼？我敢不敢承認？",
      blessing: "願你在需要之中找到路，讓渴望成為清晰的火。"
    },
    en: {
      ancient: "Need, friction, fire of discipline.",
      modern: "Constraint reveals true desire, not punishment.",
      question: "What do I truly need—and can I admit it?",
      blessing: "May your need become a clear, guiding flame."
    }
  },
  {
    glyph: "ᛁ",
    name: "Isa",
    zh: {
      ancient: "冰、停滯、凝結。",
      modern: "今天不適合硬推：先穩住，再前進。",
      question: "我在哪裡用力過猛，反而更凍住？",
      blessing: "願你在停下來的地方，聽見更深的答案。"
    },
    en: {
      ancient: "Ice, stillness, consolidation.",
      modern: "Not a day to force—stabilize first, then move.",
      question: "Where does pushing harder freeze me more?",
      blessing: "May stillness reveal the deeper answer."
    }
  },
  {
    glyph: "ᛃ",
    name: "Jera",
    zh: {
      ancient: "一年、收成、因果的成熟。",
      modern: "你正在收割你曾經照料的東西：耐心是魔法。",
      question: "我願意讓什麼慢慢成熟，而不催促？",
      blessing: "願你看見循環的善意：該來的，會在對的季節到。"
    },
    en: {
      ancient: "Year, harvest, ripening cycles.",
      modern: "You reap what you tended. Patience is magic.",
      question: "What can I let ripen without rushing?",
      blessing: "May what’s meant for you arrive in its right season."
    }
  },
  {
    glyph: "ᛇ",
    name: "Eihwaz",
    zh: {
      ancient: "世界樹、軸心、跨界的耐力。",
      modern: "你有穿越的力量：先對齊，再行動。",
      question: "我現在的選擇，是否與更長遠的我一致？",
      blessing: "願你站穩內在軸心，穿越不確定仍不偏離。"
    },
    en: {
      ancient: "World-tree axis, endurance across realms.",
      modern: "Align first, then act—your crossing is possible.",
      question: "Is my choice aligned with the longer version of me?",
      blessing: "May you stay true to your inner axis through uncertainty."
    }
  },
  {
    glyph: "ᛈ",
    name: "Perthro",
    zh: {
      ancient: "容器、命運之杯、未知之籤。",
      modern: "未知不是空白，是宇宙保留給你的驚喜空間。",
      question: "我願意在哪裡鬆開答案，讓更大的安排介入？",
      blessing: "願你的杯成為祝福的容器：盛住未知，也盛住信任。"
    },
    en: {
      ancient: "Cup of fate, lots, the mystery container.",
      modern: "The unknown is not blank—it's space for grace.",
      question: "Where can I loosen the answer and allow a larger design?",
      blessing: "May your cup hold mystery with trust—and receive blessing."
    }
  },
  {
    glyph: "ᛉ",
    name: "Algiz",
    zh: {
      ancient: "守護、角、護界。",
      modern: "你可以被保護：把自己的界線立起來。",
      question: "我今天最需要被守護的是什麼？",
      blessing: "願你被看不見的護持環繞，安全地做你自己。"
    },
    en: {
      ancient: "Protection, the elk-sedge, sacred boundary.",
      modern: "You can be protected—stand your boundary.",
      question: "What needs protection most in me today?",
      blessing: "May unseen guardianship surround you in safety."
    }
  },
  {
    glyph: "ᛋ",
    name: "Sowilo",
    zh: {
      ancient: "太陽、勝利、生命的中心火。",
      modern: "把焦點拉回核心：今天做最重要的一件事。",
      question: "我真正的『是』是什麼？",
      blessing: "願你像太陽一樣清楚：照亮自己，也照亮他人。"
    },
    en: {
      ancient: "Sun, victory, central life-fire.",
      modern: "Return to the core—do the most important thing.",
      question: "What is my true 'yes' today?",
      blessing: "May you shine with clarity, lighting your way."
    }
  },
  {
    glyph: "ᛏ",
    name: "Tiwaz",
    zh: {
      ancient: "正直、方向、承擔。",
      modern: "做對的事不一定舒服，但會讓你更自由。",
      question: "我今天的勇氣要用在哪裡？",
      blessing: "願你以正直前行，方向清楚，心不分裂。"
    },
    en: {
      ancient: "Integrity, direction, rightful courage.",
      modern: "The right thing may not be comfy—but it frees you.",
      question: "Where does my courage belong today?",
      blessing: "May integrity steady your steps and unify your heart."
    }
  },
  {
    glyph: "ᛒ",
    name: "Berkano",
    zh: {
      ancient: "樺樹、新生、照料與成長。",
      modern: "今天適合溫柔培育，不必急著長大。",
      question: "我能怎麼照顧我正在萌芽的東西？",
      blessing: "願你被溫柔養大：慢慢來，也會到。"
    },
    en: {
      ancient: "Birch, birth, nurture and growth.",
      modern: "A day for gentle tending; no need to rush maturity.",
      question: "How can I care for what is sprouting in me?",
      blessing: "May you grow in gentleness—slow is still forward."
    }
  },
  {
    glyph: "ᛖ",
    name: "Ehwaz",
    zh: {
      ancient: "馬、合作、移動與信任。",
      modern: "前進需要夥伴：也包括『你的身體』。",
      question: "我願意相信誰？我願意跟誰同步？",
      blessing: "願你移動順暢：信任帶來速度，合作帶來安全。"
    },
    en: {
      ancient: "Horse, partnership, movement and trust.",
      modern: "Progress needs a partner—often your own body.",
      question: "Whom can I trust—and move in sync with today?",
      blessing: "May trust bring momentum; may partnership bring safety."
    }
  },
  {
    glyph: "ᛗ",
    name: "Mannaz",
    zh: {
      ancient: "人、群體、自我認同。",
      modern: "你是人，也在群體裡：今天適合回到『真實的我』。",
      question: "我是在表演，還是在活？",
      blessing: "願你回到自我一致：在人群中仍不失去自己。"
    },
    en: {
      ancient: "Human, community, selfhood.",
      modern: "Be real within the collective—return to your true self.",
      question: "Am I performing—or living?",
      blessing: "May you stay aligned with yourself, even among many."
    }
  },
  {
    glyph: "ᛚ",
    name: "Laguz",
    zh: {
      ancient: "水、流動、直覺。",
      modern: "不要硬想：讓答案像水一樣自己浮上來。",
      question: "我可以把控制放掉一點點嗎？",
      blessing: "願你的直覺清澈而溫柔，帶你回到最自然的路。"
    },
    en: {
      ancient: "Water, flow, intuition.",
      modern: "Stop forcing; let the answer rise like water.",
      question: "Can I release control—just a little?",
      blessing: "May your intuition be clear and kind, guiding you home."
    }
  },
  {
    glyph: "ᛜ",
    name: "Ingwaz",
    zh: {
      ancient: "種子、內在蓄勢、孕育。",
      modern: "還沒發芽不代表沒有進展：內在正在長。",
      question: "我願意相信『看不見的成長』嗎？",
      blessing: "願你安住於孕育：沉默不是停滯，是準備。"
    },
    en: {
      ancient: "Seed, inner gestation, contained power.",
      modern: "Unseen growth is still growth—something is forming.",
      question: "Can I trust growth I cannot yet see?",
      blessing: "May you rest in gestation; silence is preparation."
    }
  },
  {
    glyph: "ᛞ",
    name: "Dagaz",
    zh: {
      ancient: "黎明、轉化、破曉之刻。",
      modern: "你可能正在跨過一條看不見的門檻。",
      question: "如果真的要變好了，我會先擔心什麼？",
      blessing: "願你迎向破曉：黑暗到光明的轉換，發生在你之內。"
    },
    en: {
      ancient: "Dawn, breakthrough, the turning point.",
      modern: "You may be crossing an unseen threshold.",
      question: "If things truly improve, what would I fear first?",
      blessing: "May dawn rise within you—the shift from dark to light."
    }
  },
  {
    glyph: "ᛟ",
    name: "Othala",
    zh: {
      ancient: "祖源、家、歸屬與傳承。",
      modern: "什麼是你的『內在家』？今天適合回來。",
      question: "我現在的歸屬感，來自哪裡？",
      blessing: "願你被歸屬感擁抱：不必證明，你本來就值得在。"
    },
    en: {
      ancient: "Ancestry, home, inheritance and belonging.",
      modern: "What is your inner home? Return to it today.",
      question: "Where does my sense of belonging come from right now?",
      blessing: "May belonging hold you—no proof required."
    }
  }
];

function $(id){ return document.getElementById(id); }

function getLang(){
  const saved = localStorage.getItem(STORAGE.lang);
  return LANGS.includes(saved) ? saved : "zh-TW";
}
function setLang(lang){
  localStorage.setItem(STORAGE.lang, lang);
  document.documentElement.lang = (lang === "zh-TW") ? "zh-Hant" : "en";
}

function ensureSeed(){
  let seed = localStorage.getItem(STORAGE.seed);
  if(!seed){
    seed = crypto.randomUUID();
    localStorage.setItem(STORAGE.seed, seed);
  }
  return seed;
}

// Simple deterministic hash (FNV-1a-ish)
function hash32(str){
  let h = 2166136261;
  for (let i=0;i<str.length;i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function yyyyMmDd(d=new Date()){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function dailyPick(seed, dateStr){
  const base = `${seed}::${dateStr}`;
  const h1 = hash32(base);
  const i1 = h1 % RUNES.length;

  // Chance for 2nd rune (~25%). Also ensure different index.
  const h2 = hash32(base + "::support");
  const hasSecond = (h2 % 100) < 25;

  let i2 = null;
  if(hasSecond){
    i2 = (h2 % RUNES.length);
    if(i2 === i1) i2 = (i2 + 7) % RUNES.length;
  }
  return { i1, i2 };
}

function getDailyDraw(){
  const seed = ensureSeed();
  const dateStr = yyyyMmDd();

  const cachedRaw = localStorage.getItem(STORAGE.lastDraw);
  if(cachedRaw){
    try{
      const cached = JSON.parse(cachedRaw);
      if(cached?.date === dateStr && Array.isArray(cached.picks)){
        const [i1,i2] = cached.picks;
        return { dateStr, seed, i1, i2: (typeof i2 === "number") ? i2 : null };
      }
    }catch{}
  }

  const { i1, i2 } = dailyPick(seed, dateStr);
  localStorage.setItem(STORAGE.lastDraw, JSON.stringify({ date: dateStr, picks: [i1, i2] }));
  return { dateStr, seed, i1, i2 };
}

function renderWheel(){
  const el = $("wheelRunes");
  el.innerHTML = "";
  const n = RUNES.length;
  for(let i=0;i<n;i++){
    const angle = (360/n)*i - 90; // start at top
    const r = 46; // percent radius
    const mark = document.createElement("div");
    mark.className = "runeMark";
    mark.style.transform = `rotate(${angle}deg) translate(${r}%, 0)`;
    const span = document.createElement("span");
    span.textContent = RUNES[i].glyph;
    span.style.transform = `translate(-50%, -50%) rotate(${-angle}deg)`;
    mark.appendChild(span);
    el.appendChild(mark);
  }
}

function setTexts(lang){
  const t = I18N[lang];
  $("brandSub").textContent = t.brandSub;

  $("t_meditationTitle").textContent = t.meditationTitle;
  $("t_meditationLead").textContent = t.meditationLead;
  $("startMeditationBtn").textContent = t.startMeditation;
  $("toWheelBtn").textContent = t.continueToWheel;
  $("t_meditationNote").textContent = t.meditationNote;

  $("t_wheelTitle").textContent = t.wheelTitle;
  $("t_wheelSubtitle").textContent = t.wheelSubtitle;
  $("t_wheelCenter").textContent = t.wheelCenter;
  $("drawBtn").textContent = t.drawBtn;
  $("redrawInfoBtn").textContent = t.redrawInfoBtn;
  $("t_wheelNote").textContent = t.wheelNote;

  $("t_resultTitle").textContent = t.resultTitle;
  $("todayPill").textContent = t.todayPill;
  $("fixedPill").textContent = t.fixedPill;
  $("t_mainBlessing").textContent = t.mainBlessing;
  $("t_hiddenSupport").textContent = t.hiddenSupport;
  $("backToWheelBtn").textContent = t.backToWheel;
  $("t_seedHint").textContent = t.seedHint;

  // tabs label
  document.querySelectorAll(".tab").forEach(btn=>{
    const tab = btn.getAttribute("data-tab");
    btn.textContent = t[`tab_${tab}`];
  });
}

function meditationScript(lang){
  // 60s-ish calm script with Yoga Sutras flavor + cosmic blessing
  if(lang === "en"){
    return [
      "Close your eyes if it feels safe.",
      "Let the breath come exactly as it is—no fixing.",
      "",
      "Inhale… feel the body receive.",
      "Exhale… feel the mind soften.",
      "",
      "If thoughts arise, notice them kindly,",
      "and return—again and again—to the breath.",
      "",
      "As the Yoga Sutras suggest: when the mind settles, clarity appears.",
      "Let this moment be your home.",
      "",
      "May you be guided by what is true.",
      "May you be protected by what is gentle.",
      "May your next step be illuminated."
    ].join("\n");
  }

  return [
    "如果你願意，輕輕閉上眼。",
    "讓呼吸如其所是——不需要修正。",
    "",
    "吸氣……讓身體收回來。",
    "吐氣……讓心稍微鬆一點。",
    "",
    "念頭起來也沒關係，溫柔看見，",
    "然後一次又一次，把注意力帶回呼吸。",
    "",
    "如《瑜伽經》所指向：心識寂止時，清明自然顯現。",
    "讓此刻成為你的家。",
    "",
    "願你被真實引導。",
    "願你被溫柔護持。",
    "願你下一步被光照亮。"
  ].join("\n");
}

function show(el){ el.hidden = false; }
function hide(el){ el.hidden = true; }

function formatTimer(sec){
  const m = String(Math.floor(sec/60)).padStart(2,"0");
  const s = String(sec%60).padStart(2,"0");
  return `${m}:${s}`;
}

let timer = null;

function startMeditation(lang){
  const scriptEl = $("meditationScript");
  scriptEl.textContent = meditationScript(lang);
  show(scriptEl);

  let seconds = 60;
  $("timerText").textContent = formatTimer(seconds);
  $("timerDot").classList.add("on");
  $("toWheelBtn").disabled = true;

  if(timer) clearInterval(timer);
  timer = setInterval(()=>{
    seconds--;
    $("timerText").textContent = formatTimer(Math.max(seconds,0));
    if(seconds <= 0){
      clearInterval(timer);
      timer = null;
      $("timerDot").classList.remove("on");
      $("toWheelBtn").disabled = false;
    }
  }, 1000);
}

function spinWheel(){
  // just visual spin; the actual draw is deterministic and shown after clicking "draw"
  const turns = 4 + Math.random()*3;
  const deg = turns*360 + Math.floor(Math.random()*360);
  $("wheelBtn").style.transform = `rotate(${deg}deg)`;
}

function getRuneText(rune, lang){
  if(lang === "en") return rune.en;
  return rune.zh;
}

function renderResult(lang){
  const { dateStr, seed, i1, i2 } = getDailyDraw();
  const r1 = RUNES[i1];
  const r2 = (typeof i2 === "number") ? RUNES[i2] : null;

  // pills
  $("todayPill").textContent = `${I18N[lang].todayPill} · ${dateStr}`;
  $("fixedPill").textContent = I18N[lang].fixedPill;

  // rune 1
  $("rune1Glyph").textContent = r1.glyph;
  $("rune1Name").textContent = r1.name;
  const r1Text = getRuneText(r1, lang);

  // rune 2
  if(r2){
    show($("rune2Card"));
    $("rune2Glyph").textContent = r2.glyph;
    $("rune2Name").textContent = r2.name;
  } else {
    hide($("rune2Card"));
  }

  // default tabs to ancient
  setPanel("r1", "ancient", r1Text);
  setActiveTab("r1", "ancient");

  if(r2){
    const r2Text = getRuneText(r2, lang);
    setPanel("r2", "ancient", r2Text);
    setActiveTab("r2", "ancient");
  }

  $("t_seedHint").textContent = I18N[lang].seedHint + ` (seed: ${seed.slice(0,8)}…)`;
}

function setPanel(target, tab, textObj){
  const panel = $(target === "r1" ? "r1Panel" : "r2Panel");
  panel.textContent = textObj[tab];
}

function setActiveTab(target, tab){
  document.querySelectorAll(`.tab[data-target="${target}"]`).forEach(btn=>{
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
  });
}

function wireTabs(lang){
  document.querySelectorAll(".tab").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const tab = btn.getAttribute("data-tab");
      const target = btn.getAttribute("data-target");
      const { i1, i2 } = getDailyDraw();
      const rune = (target === "r1") ? RUNES[i1] : RUNES[i2];
      const textObj = getRuneText(rune, lang);
      setPanel(target, tab, textObj);
      setActiveTab(target, tab);
    });
  });
}

function showWhyFixed(lang){
  alert(`${I18N[lang].whyFixedTitle}\n\n${I18N[lang].whyFixedBody}`);
}

function init(){
  const lang = getLang();
  setLang(lang);
  setTexts(lang);

  $("year").textContent = new Date().getFullYear();

  renderWheel();

  // Steps
  const stepMeditation = $("stepMeditation");
  const stepWheel = $("stepWheel");
  const stepResult = $("stepResult");

  $("startMeditationBtn").addEventListener("click", ()=>{
    startMeditation(getLang());
  });

  $("toWheelBtn").addEventListener("click", ()=>{
    hide(stepMeditation);
    show(stepWheel);
    spinWheel();
  });

  $("wheelBtn").addEventListener("click", ()=>{
    spinWheel();
  });

  $("drawBtn").addEventListener("click", ()=>{
    hide(stepWheel);
    show(stepResult);
    renderResult(getLang());
  });

  $("redrawInfoBtn").addEventListener("click", ()=>{
    showWhyFixed(getLang());
  });

  $("backToWheelBtn").addEventListener("click", ()=>{
    hide(stepResult);
    show(stepWheel);
    spinWheel();
  });

  // Tabs
  wireTabs(lang);

  // Language toggle
  $("langBtn").addEventListener("click", ()=>{
    const current = getLang();
    const next = (current === "zh-TW") ? "en" : "zh-TW";
    setLang(next);
    setTexts(next);
    // refresh panels if currently on result
    if(!stepResult.hidden){
      renderResult(next);
    }
  });

  // first view: meditation
  show(stepMeditation);
  hide(stepWheel);
  hide(stepResult);
  $("timerText").textContent = "01:00";
}

init();
// ===== Christmas Snow (Only on 2025-12-25, local time) =====
(function christmasSnow() {
  const now = new Date();
  const isChristmas2025 =
    now.getFullYear() === 2025 &&
    now.getMonth() === 11 && // 0=Jan ... 11=Dec
    now.getDate() === 25;

  if (!isChristmas2025) return;

  // Create canvas overlay
  const canvas = document.createElement("canvas");
  canvas.id = "snow-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  // Snow particles
  const count = Math.min(180, Math.floor((w * h) / 12000) + 60);
  const flakes = Array.from({ length: count }).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 1 + Math.random() * 2.5,
    vx: -0.6 + Math.random() * 1.2,
    vy: 0.7 + Math.random() * 1.8,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.008 + Math.random() * 0.02
  }));

  function step() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.9;

    for (const f of flakes) {
      f.wobble += f.wobbleSpeed;
      f.x += f.vx + Math.sin(f.wobble) * 0.35;
      f.y += f.vy;

      if (f.y > h + 10) {
        f.y = -10;
        f.x = Math.random() * w;
      }
      if (f.x < -10) f.x = w + 10;
      if (f.x > w + 10) f.x = -10;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  step();
})();
