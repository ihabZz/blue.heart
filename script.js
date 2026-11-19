const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

const words = [];
let progress = 0;

function heart(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t)
        - 5 * Math.cos(2*t)
        - 2 * Math.cos(3*t)
        - Math.cos(4*t))
    };
}

// إنشاء القلب بالطريقة الأصلية
for (let i = 0; i < 500; i++) {
    let t = Math.random() * Math.PI * 2;
    let r = Math.sqrt(Math.random());

    let p = heart(t);

    words.push({
        x: 250 + p.x * 10 * r,
        y: 220 + p.y * 12 * r,
        size: 7 + Math.random() * 5,
        delay: Math.random()
    });
}

function animate() {
    ctx.clearRect(0, 0, 500, 450);

    progress = Math.min(progress + 0.004, 1);

    let pulse = 1 + Math.sin(Date.now() * 0.003) * 0.04;

    ctx.save();
    ctx.translate(250, 220);
    ctx.scale(pulse, pulse);
    ctx.translate(-250, -220);

    words.forEach(word => {
        if (word.delay > progress) return;

        ctx.font = `bold ${word.size}px Arial`;
        ctx.fillStyle = "#65baff";
        ctx.shadowColor = "#168cff";
        ctx.shadowBlur = 10;

        ctx.fillText("I LOVE YOU", word.x, word.y);
    });

    ctx.restore();
    requestAnimationFrame(animate);
}

animate();

// تشغيل الموسيقى عند الضغط
const music = document.getElementById("music");
const btn = document.getElementById("musicBtn");

btn.addEventListener("click", async () => {
    try {
        if (music.paused) {
            music.volume = 1;
            await music.play();
            btn.textContent = "❚❚ Pause Music";
        } else {
            music.pause();
            btn.textContent = "▶ Play Our Song";
        }
    } catch (error) {
        alert("Music error: " + error.message);
    }
});



