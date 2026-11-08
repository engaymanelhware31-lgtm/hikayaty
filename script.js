@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
:root{--purple:#7657d5;--pink:#ff79a9;--yellow:#ffd66b;--ink:#34314c;--muted:#817b96;--lav:#f5f0ff}
*{box-sizing:border-box}
body{margin:0;font-family:'Cairo',Tahoma,sans-serif;color:var(--ink);background:radial-gradient(circle at 12% 8%,#ffe6ef 0,transparent 25%),radial-gradient(circle at 90% 18%,#e6dcff 0,transparent 28%),#fffaf2;min-height:100vh}
.topbar{max-width:1100px;margin:auto;padding:22px 24px;display:flex;justify-content:space-between;align-items:center}
.brand{font-size:27px;font-weight:900;color:var(--purple);text-decoration:none}
.brand span,footer span{color:var(--pink)}
.tagline{font-size:13px;background:#fff;border:1px solid #f0e9ff;padding:8px 15px;border-radius:30px;color:#71698a}
main{max-width:850px;margin:10px auto 50px;padding:0 18px}
.intro{text-align:center;margin:22px auto 28px}
.spark{color:#f3b82f;font-size:24px}
.intro h1{font-size:clamp(26px,5vw,42px);line-height:1.45;margin:5px 0 8px}
.intro h1 span{color:var(--purple)}
.intro p{color:var(--muted);line-height:1.9;margin:0 auto;max-width:650px}
.workspace{background:#fff;border:1px solid #eee7fb;border-radius:27px;padding:clamp(18px,4vw,34px);box-shadow:0 18px 55px #65509b12}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:25px}
.steps div{background:var(--lav);border-radius:15px;padding:11px;text-align:center;display:flex;align-items:center;justify-content:center;gap:9px;font-size:13px}
.steps b{background:#fff;color:var(--purple);width:27px;height:27px;border-radius:50%;display:grid;place-items:center}
.upload-box{border:2px dashed #c9b9f4;background:#fcfaff;border-radius:21px;min-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;cursor:pointer;padding:22px}
.upload-box:hover{background:#f7f2ff;border-color:var(--purple)}
.upload-icon{font-size:40px}
.upload-box strong{font-size:17px}
.upload-box small{color:var(--muted)}
.upload-action{margin-top:6px;background:var(--purple);color:#fff;border-radius:12px;padding:8px 20px;font-size:13px}
input[type=file]{display:none}
.preview{display:flex;align-items:center;gap:14px;margin:16px 0;padding:12px;background:#fff9ed;border-radius:16px}
.preview img{width:76px;height:76px;object-fit:cover;border-radius:13px;border:2px solid var(--ink)}
.preview div{display:flex;flex-direction:column;min-width:0}
.preview small{color:var(--muted);overflow-wrap:anywhere}
.text-button{margin-right:auto;border:0;background:transparent;color:var(--purple);font:inherit;cursor:pointer}
.options{margin:25px 0 16px}
.options-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.options h2{font-size:17px;margin:0}
.selection-count{background:var(--lav);color:var(--purple);font-weight:800;font-size:13px;padding:4px 12px;border-radius:20px}
.picker-hint{color:var(--muted);font-size:12.5px;margin:0 0 14px;line-height:1.7}
.picker-hint.warn{color:#d94a4a;font-weight:700}
.shape-picker{display:grid;grid-template-columns:repeat(auto-fill,minmax(105px,1fr));gap:10px;max-height:520px;overflow-y:auto;padding:4px}
.shape-item{font:inherit;background:#fff;border:2px solid #eee7fb;border-radius:12px;padding:6px;cursor:pointer;display:flex;flex-direction:column;gap:5px;transition:border-color .18s,background .18s,transform .18s}
.shape-item:hover{border-color:#c9b9f4;background:#fcfaff;transform:translateY(-1px)}
.shape-item.selected{border-color:var(--purple);background:#f4efff;box-shadow:0 0 0 2px #d6c8ff inset}
.shape-preview{position:relative;aspect-ratio:1;background:#fff;border-radius:8px;overflow:hidden}

/* تنسيقات الطبقات للأشكال */
.shape-svg-back, .shape-svg-front { position: absolute; inset: 0; width: 100%; height: 100%; }
.shape-svg-back { z-index: 1; }
.shape-svg-front { z-index: 3; pointer-events: none; }
.shape-photo-fake { position: absolute; left: 50%; top: 37.5%; transform: translate(-50%, -50%); width: 40%; height: 40%; border-radius: 50%; background: #f0f0f0; border: 1.5px dashed #999; z-index: 2; }

.shape-name{font-size:11px;font-weight:700;color:var(--ink);text-align:center;line-height:1.3;padding:2px}
.create-button{display:block;margin:18px auto 10px;border:0;border-radius:15px;padding:14px 38px;background:linear-gradient(110deg,var(--purple),#a17bea);color:white;font:700 17px 'Cairo',sans-serif;box-shadow:0 8px 20px #7657d53b;cursor:pointer}
.create-button:disabled{opacity:.45;cursor:not-allowed}
.privacy{text-align:center;color:#9891a7;font-size:12px;line-height:1.8}
.results{border-top:1px solid #eee8f8;margin-top:30px;padding-top:22px;text-align:center}
.results h2{margin-bottom:4px}
.results>p{color:var(--muted);font-size:13px}
.result-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
.book-page{background:#fff;border:1px solid #eee7fb;border-radius:16px;padding:10px;box-shadow:0 4px 14px #65509b10;display:flex;flex-direction:column;gap:8px}

/* تنسيقات الطبقات لصفحات الكتاب */
.page-canvas{position:relative;aspect-ratio:1;background:#fff;border-radius:10px;overflow:hidden}
.page-svg-back, .page-svg-front { position: absolute; inset: 0; width: 100%; height: 100%; }
.page-svg-back { z-index: 1; }
.page-svg-front { z-index: 3; pointer-events: none; }
.page-photo{position:absolute;left:50%;top:37.5%;transform:translate(-50%, -50%);width:40%;height:40%;border-radius:50%;object-fit:cover;border:2.5px solid var(--ink);background:#fff;z-index:2}

.page-footer{display:flex;justify-content:space-between;font-size:12px;padding:0 4px}
.page-num{color:var(--muted)}
.page-title{font-weight:800;color:var(--purple)}
.result-actions{margin:20px}
.secondary-button{font:inherit;border:1px solid var(--purple);color:var(--purple);background:#fff;border-radius:12px;padding:10px 24px;cursor:pointer}
.secondary-button:hover{background:#f4efff}
footer{text-align:center;padding:18px;color:#9b94aa;font-size:12px}
@media(max-width:600px){
  .topbar{padding:16px;gap:8px}
  .tagline{font-size:11px}
  .steps{grid-template-columns:1fr}
  .steps div{justify-content:flex-start;padding-right:18px}
  .result-grid{grid-template-columns:repeat(2,1fr)}
  .shape-picker{grid-template-columns:repeat(3,1fr);max-height:460px}
}
@media print{
  body{background:#fff}
  .topbar,.intro,.steps,.upload-box,.preview,.options,.create-button,.privacy,footer,.result-actions,.results>h2,.results>p{display:none!important}
  .workspace{box-shadow:none;border:0;padding:0;max-width:none;background:#fff}
  .results{display:block!important;border:0;margin:0;padding:0;text-align:initial}
  .result-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10mm;padding:10mm;margin:0}
  .book-page{page-break-inside:avoid;box-shadow:none;border:1px solid #ccc}
  .book-page:nth-child(2n){page-break-after:always}
}
