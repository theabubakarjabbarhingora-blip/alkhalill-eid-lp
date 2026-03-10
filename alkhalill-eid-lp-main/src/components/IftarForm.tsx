import { useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');
.iftar-wrapper {
  --iftar-primary: #0d467e;
  --iftar-primary-light: #085c97;
  --iftar-cyan: #019ab7;
  --iftar-gold: #f8a81a;
  --iftar-gold-hover: #e55925;
  --iftar-gold-light: rgba(248, 168, 26, 0.1);
  --iftar-success: #20aa4b;
  --iftar-error: #e55925;
  --iftar-bg: #F8FAFC;
  --iftar-border: rgba(13, 70, 126, 0.1);
  
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: auto;
  background: transparent;
  position: relative;
  overflow: hidden;
  padding: 0;
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

.iftar-wrapper * { margin: 0; padding: 0; box-sizing: border-box; }
.iftar-wrapper .ur-text { direction: rtl; display: inline-block; font-family: 'Mehr Nastaliq', 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Amiri', serif; }
.iftar-wrapper .bg-orb { position: absolute; border-radius: 50%; filter: blur(60px); animation: iftarPulse 4s ease-in-out infinite; pointer-events: none; }
.iftar-wrapper .bg-orb-1 { top: 0; left: 25%; width: 300px; height: 300px; background: var(--iftar-primary); opacity: 0.1; }
.iftar-wrapper .bg-orb-2 { bottom: 0; right: 25%; width: 250px; height: 250px; background: var(--iftar-gold); opacity: 0.15; animation-delay: 1s; }
.iftar-wrapper .bg-orb-3 { top: 50%; left: 50%; width: 200px; height: 200px; background: var(--iftar-primary-light); opacity: 0.1; animation-delay: 2s; transform: translate(-50%, -50%); }

@keyframes iftarPulse { 0%, 100% { transform: scale(1); opacity: 0.1; } 50% { transform: scale(1.1); opacity: 0.2; } }

.iftar-wrapper .whatsapp-float { position: fixed; bottom: 24px; right: 24px; z-index: 9999; background: var(--iftar-success); padding: 16px; border-radius: 50%; box-shadow: 0 10px 40px rgba(32, 170, 75, 0.35); color: white; text-decoration: none; transition: transform 0.3s; }
.iftar-wrapper .whatsapp-float:hover { transform: scale(1.1); }
.iftar-wrapper .whatsapp-float svg { width: 24px; height: 24px; fill: white; display: block; }

.iftar-wrapper .container { position: relative; display: flex; align-items: center; justify-content: center; min-height: auto; width: 100%; padding: 0 16px; margin: 0 auto; }
.iftar-wrapper .wrapper { width: 100%; max-width: 900px; margin: 0 auto; }

.iftar-wrapper .header { text-align: center; margin-bottom: 32px; }
.iftar-wrapper .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.12); color: hsl(38, 94%, 54%); padding: 8px 20px; border-radius: 50px; font-size: 14px; font-weight: 600; margin-bottom: 16px; border: 1px solid rgba(255, 255, 255, 0.3); }
.iftar-wrapper .badge-dot { width: 8px; height: 8px; background: var(--iftar-gold); border-radius: 50%; animation: iftarPulse 2s infinite; }

.iftar-wrapper .header h1 { font-size: 36px; font-weight: 800; color: #ffffff; margin-bottom: 12px; line-height: 1.4; letter-spacing: -0.02em; }
.iftar-wrapper .header h1 span { color: hsl(38, 94%, 54%); }
.iftar-wrapper .header p { color: rgba(255, 255, 255, 0.88); font-size: 18px; font-weight: 500; }

.iftar-wrapper .main-card { background: #ffffff; border-radius: 24px; border: 1px solid var(--iftar-border); overflow: hidden; box-shadow: 0 20px 40px rgba(13, 70, 126, 0.12); }

.iftar-wrapper .steps-header { background: linear-gradient(135deg, #fff8e6, #ffffff); padding: 28px 24px; border-bottom: 1px solid rgba(248, 168, 26, 0.25); }
.iftar-wrapper .steps { display: flex; justify-content: space-between; align-items: center; max-width: 480px; margin: 0 auto; }
.iftar-wrapper .step-item { display: flex; align-items: center; position: relative; z-index: 2; }
.iftar-wrapper .step-content { display: flex; flex-direction: column; align-items: center; }

.iftar-wrapper .step-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; transition: all 0.25s; background: #ffffff; color: var(--iftar-primary); border: 1px solid rgba(13, 70, 126, 0.15); box-shadow: 0 3px 6px rgba(15, 23, 42, 0.06); }
.iftar-wrapper .step-circle.active { background: var(--iftar-gold); color: #ffffff; transform: scale(1.05); box-shadow: 0 6px 14px rgba(248, 168, 26, 0.45); border-color: transparent; }
.iftar-wrapper .step-circle.completed { background: #20aa4b; color: #ffffff; border-color: transparent; }
.iftar-wrapper .step-circle.inactive { background: #f1f5f9; color: rgba(15, 23, 42, 0.6); }

.iftar-wrapper .step-labels { text-align: center; margin-top: 8px; }
.iftar-wrapper .step-labels span { display: block; font-size: 12px; transition: all 0.3s; }
.iftar-wrapper .step-labels .en { color: var(--iftar-primary); font-weight: 600; }
.iftar-wrapper .step-labels .ur { color: var(--iftar-gold); }

.iftar-wrapper .step-line { flex: 1; height: 3px; margin: 0 8px; border-radius: 999px; background: rgba(248, 168, 26, 0.25); transition: all 0.4s; position: relative; top: -14px; }
.iftar-wrapper .step-line.active { background: var(--iftar-gold); box-shadow: 0 0 0 1px rgba(248, 168, 26, 0.25); }

.iftar-wrapper .form-content { padding: 40px; background: #fff; }
.iftar-wrapper .form-inner { max-width: 700px; margin: 0 auto; }
.iftar-wrapper .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }

.iftar-wrapper .form-group { margin-bottom: 24px; }
.iftar-wrapper .form-label { display: flex; justify-content: space-between; margin-bottom: 8px; }
.iftar-wrapper .form-label .en { color: var(--iftar-primary); font-size: 14px; font-weight: 600; }
.iftar-wrapper .form-label .ur { color: var(--iftar-primary); font-size: 15px; font-weight: 600; }
.iftar-wrapper .form-label .req { color: var(--iftar-error); }

.iftar-wrapper .form-input { width: 100%; padding: 16px 20px; background: var(--iftar-bg); border: 1px solid var(--iftar-border); border-radius: 12px; color: var(--iftar-primary); font-size: 16px; outline: none; transition: all 0.3s; }
.iftar-wrapper .form-input:focus { border-color: var(--iftar-gold); box-shadow: 0 0 0 4px var(--iftar-gold-light); background: #fff; }
.iftar-wrapper .form-input::placeholder { color: rgba(15, 38, 70, 0.4); }
.iftar-wrapper .form-input.error { border-color: var(--iftar-error) !important; box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important; }

.iftar-wrapper .input-hint { color: rgba(15, 38, 70, 0.5); font-size: 12px; margin-top: 6px; display: block; }

.iftar-wrapper .box-counter { background: var(--iftar-bg); border-radius: 20px; padding: 28px; border: 1px solid var(--iftar-border); text-align: center; transition: all 0.3s; }
.iftar-wrapper .box-counter:hover { border-color: var(--iftar-gold); box-shadow: 0 10px 30px rgba(0,0,0,0.03); }

.iftar-wrapper .counter-header { display: flex; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 12px; }
.iftar-wrapper .counter-header span { font-size: 15px; font-weight: 600; }
.iftar-wrapper .counter-header .en { color: var(--iftar-primary); }
.iftar-wrapper .counter-header .ur { color: var(--iftar-gold); }

.iftar-wrapper .counter-controls { display: flex; align-items: center; justify-content: center; gap: 24px; margin: 24px 0; }
.iftar-wrapper .counter-btn { width: 48px; height: 48px; border-radius: 12px; border: none; font-size: 24px; font-weight: bold; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.iftar-wrapper .counter-btn.minus { background: #e2e8f0; color: #64748b; }
.iftar-wrapper .counter-btn.minus:hover { background: #cbd5e1; color: #334155; }
.iftar-wrapper .counter-btn.plus { background: var(--iftar-gold); color: #ffffff; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3); }
.iftar-wrapper .counter-btn.plus:hover { background: var(--iftar-gold-hover); transform: translateY(-2px); }

.iftar-wrapper .counter-value { font-size: 48px; font-weight: 800; color: var(--iftar-primary); min-width: 60px; }
.iftar-wrapper .counter-per-box { color: rgba(15, 38, 70, 0.6); font-size: 14px; margin-bottom: 20px; font-weight: 500; }

.iftar-wrapper .total-box { background: #fff; border-radius: 12px; padding: 16px; border: 1px solid var(--iftar-border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
.iftar-wrapper .total-box p { color: rgba(15, 38, 70, 0.6); font-size: 13px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
.iftar-wrapper .total-box .amount { font-size: 32px; font-weight: 800; color: var(--iftar-primary); margin-top: 4px; letter-spacing: -0.5px; }
.iftar-wrapper .total-box .amount span { color: var(--iftar-gold); }

.iftar-wrapper .bank-card { background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); border-radius: 20px; padding: 32px; border: 1px solid var(--iftar-border); margin-bottom: 24px; position: relative; overflow: hidden; }
.iftar-wrapper .bank-card::before { content: ''; position: absolute; top: 0; right: 0; width: 150px; height: 150px; background: var(--iftar-gold-light); border-radius: 50%; transform: translate(30%, -30%); }

.iftar-wrapper .bank-header { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 32px; position: relative; z-index: 1; }
.iftar-wrapper .bank-header .icon { font-size: 40px; background: #fff; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.iftar-wrapper .bank-header .info { text-align: left; }
.iftar-wrapper .bank-header .name { font-size: 20px; font-weight: 700; color: var(--iftar-primary); }
.iftar-wrapper .bank-header .name-ur { color: var(--iftar-gold); font-size: 16px; margin-top: 2px; }

.iftar-wrapper .bank-detail { display: flex; align-items: center; justify-content: space-between; background: #ffffff; padding: 16px 20px; border-radius: 12px; border: 1px solid var(--iftar-border); margin-bottom: 12px; transition: all 0.2s; position: relative; z-index: 1; }
.iftar-wrapper .bank-detail:hover { border-color: var(--iftar-gold); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.03); }

.iftar-wrapper .bank-detail-info { flex: 1; min-width: 0; }
.iftar-wrapper .bank-detail-labels { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; }
.iftar-wrapper .bank-detail-labels .en { color: rgba(15, 38, 70, 0.5); font-weight: 600; text-transform: uppercase; }
.iftar-wrapper .bank-detail-labels .ur { color: var(--iftar-gold); }
.iftar-wrapper .bank-detail-value { color: var(--iftar-primary); font-family: 'Courier New', monospace; font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; letter-spacing: 0.5px; }

.iftar-wrapper .copy-btn { margin-left: 12px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; background: var(--iftar-gold-light); color: var(--iftar-gold-hover); transition: all 0.3s; white-space: nowrap; }
.iftar-wrapper .copy-btn:hover { background: var(--iftar-gold); color: #fff; }
.iftar-wrapper .copy-btn.copied { background: #10B981; color: white; }

.iftar-wrapper .amount-box { margin-top: 32px; padding: 24px; border-radius: 16px; background: #fff; border: 2px dashed var(--iftar-gold); text-align: center; position: relative; z-index: 1; }
.iftar-wrapper .amount-box p { color: rgba(15, 38, 70, 0.6); font-size: 14px; margin: 0; font-weight: 500; }
.iftar-wrapper .amount-box .value { font-size: 36px; font-weight: 800; color: var(--iftar-gold); margin-top: 4px; }

.iftar-wrapper .upload-area { border: 2px dashed var(--iftar-border); border-radius: 20px; padding: 32px; text-align: center; margin-bottom: 24px; cursor: pointer; transition: all 0.3s; background: var(--iftar-bg); max-width: 460px; margin-left: auto; margin-right: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px; }
.iftar-wrapper .upload-area:hover { border-color: var(--iftar-gold); background: var(--iftar-gold-light); }
.iftar-wrapper .upload-area.has-file { border-style: solid; border-color: #10B981; background: rgba(16, 185, 129, 0.04); padding: 20px 24px; }
.iftar-wrapper .upload-area input { display: none; }

.iftar-wrapper .upload-icon { width: 72px; height: 72px; margin: 0 auto 12px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.iftar-wrapper .upload-icon svg { width: 40px; height: 40px; stroke: rgba(15, 38, 70, 0.4); fill: none; transition: all 0.3s; }
.iftar-wrapper .upload-icon.success { background: #10B981; }
.iftar-wrapper .upload-icon.success svg { stroke: white; }
.iftar-wrapper .upload-area:hover .upload-icon svg { stroke: var(--iftar-gold); }

.iftar-wrapper .upload-area h3 { color: var(--iftar-primary); font-size: 18px; font-weight: 700; margin: 0; }
.iftar-wrapper .upload-area .ur { color: var(--iftar-gold); font-size: 15px; margin-top: 4px; }
.iftar-wrapper .upload-area .hint { color: rgba(15, 38, 70, 0.5); font-size: 12px; margin-top: 12px; }
.iftar-wrapper .file-name { color: #10B981; font-size: 14px; font-weight: 600; margin-top: 12px; display: inline-block; padding: 4px 12px; background: rgba(16, 185, 129, 0.1); border-radius: 50px; }

.iftar-wrapper .summary { background: #fff; border-radius: 20px; padding: 28px; border: 1px solid var(--iftar-border); margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
.iftar-wrapper .summary-header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--iftar-border); padding-bottom: 16px; }
.iftar-wrapper .summary-header h4 { font-weight: 800; margin: 0; font-size: 18px; }
.iftar-wrapper .summary-header .en { color: var(--iftar-primary); }
.iftar-wrapper .summary-header .ur { color: var(--iftar-gold); }

.iftar-wrapper .summary-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed rgba(15, 38, 70, 0.1); font-size: 14px; }
.iftar-wrapper .summary-row:last-child { border-bottom: none; }
.iftar-wrapper .summary-row .label { color: rgba(15, 38, 70, 0.6); }
.iftar-wrapper .summary-row .value { color: var(--iftar-primary); font-weight: 600; }

.iftar-wrapper .summary-total { display: flex; justify-content: space-between; padding-top: 16px; margin-top: 8px; border-top: 2px solid var(--iftar-border); }
.iftar-wrapper .summary-total .label { color: var(--iftar-primary); font-weight: 800; font-size: 16px; }
.iftar-wrapper .summary-total .value { font-size: 24px; font-weight: 800; color: var(--iftar-gold); }

.iftar-wrapper .btn-group { display: flex; gap: 16px; }
.iftar-wrapper .btn { flex: 1; padding: 16px; border-radius: 12px; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.3s; text-align: center; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }

.iftar-wrapper .btn-outline { border: 2px solid var(--iftar-border); color: var(--iftar-primary); background: transparent; }
.iftar-wrapper .btn-outline:hover { border-color: var(--iftar-primary); background: transparent; }

.iftar-wrapper .btn-primary { background: linear-gradient(135deg, var(--iftar-gold), var(--iftar-error)); color: #ffffff; border: none; box-shadow: 0 4px 15px rgba(229, 89, 37, 0.3); }
.iftar-wrapper .btn-primary:hover { box-shadow: 0 8px 25px rgba(229, 89, 37, 0.4); transform: translateY(-2px); }
.iftar-wrapper .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

.iftar-wrapper .btn-full { width: 100%; margin-top: 32px; }

.iftar-wrapper .whatsapp-help { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 16px; border-radius: 12px; background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.2); color: #128C7E; margin-bottom: 24px; text-decoration: none; transition: all 0.3s; font-weight: 600; }
.iftar-wrapper .whatsapp-help:hover { background: rgba(37, 211, 102, 0.15); }
.iftar-wrapper .whatsapp-help svg { width: 20px; height: 20px; fill: #128C7E; }

.iftar-wrapper .footer { text-align: center; margin-top: 40px; }
.iftar-wrapper .footer p { color: rgba(255, 255, 255, 0.95); font-size: 14px; font-weight: 600; }

.iftar-wrapper .success-container { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
.iftar-wrapper .success-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 30px; padding: 40px; max-width: 420px; width: 100%; border: 1px solid white; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); }

.iftar-wrapper .success-icon { width: 96px; height: 96px; margin: 0 auto 24px; border-radius: 50%; background: linear-gradient(135deg, #10B981, #059669); display: flex; align-items: center; justify-content: center; animation: iftarBounce 0.6s ease; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4); }
@keyframes iftarBounce { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
.iftar-wrapper .success-icon svg { width: 48px; height: 48px; stroke: white; fill: none; }

.iftar-wrapper .success-card h2 { font-size: 32px; font-weight: 800; color: var(--iftar-primary); margin-bottom: 8px; }
.iftar-wrapper .success-card .subtitle { color: var(--iftar-gold); font-size: 20px; margin-bottom: 24px; font-weight: 600; }

.iftar-wrapper .success-box { background: var(--iftar-bg); border-radius: 20px; padding: 24px; margin-bottom: 24px; border: 1px dashed var(--iftar-border); }
.iftar-wrapper .success-box p { color: rgba(15, 38, 70, 0.6); font-size: 14px; margin: 0; }
.iftar-wrapper .success-box .amount { font-size: 40px; font-weight: 800; color: var(--iftar-primary); margin: 8px 0; }
.iftar-wrapper .success-box .boxes { color: var(--iftar-gold); font-size: 15px; font-weight: 600; }

.iftar-wrapper .hadith { color: rgba(15, 38, 70, 0.5); font-size: 14px; font-style: italic; margin-bottom: 32px; line-height: 1.6; }

.iftar-wrapper .step-section { display: none; animation: fadeIn 0.5s ease; }
.iftar-wrapper .step-section.active { display: block; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .iftar-wrapper .header h1 { font-size: 26px; }
  .iftar-wrapper .form-content { padding: 24px 16px; }
  .iftar-wrapper .counter-value { font-size: 42px; }
  .iftar-wrapper .steps { gap: 8px; }
  .iftar-wrapper .step-line { margin: 0 4px; top: -12px; }
  .iftar-wrapper .step-circle { width: 36px; height: 36px; font-size: 13px; }
  .iftar-wrapper .btn-group { flex-direction: column; }
  .iftar-wrapper .steps-header { padding: 24px 16px; }
  .iftar-wrapper .form-grid { gap: 16px; }
  .iftar-wrapper .form-input { padding: 14px 16px; font-size: 15px; }
  .iftar-wrapper .box-counter { padding: 20px 16px; }
  .iftar-wrapper .counter-btn { width: 44px; height: 44px; font-size: 20px; }
  .iftar-wrapper .counter-controls { gap: 16px; }
  .iftar-wrapper .total-box .amount { font-size: 28px; }
  .iftar-wrapper .bank-card { padding: 20px 16px; }
  .iftar-wrapper .bank-detail { padding: 14px 12px; flex-wrap: wrap; gap: 10px; }
  .iftar-wrapper .bank-detail-value { font-size: 13px; }
  .iftar-wrapper .copy-btn { margin-left: 0; width: 100%; margin-top: 8px; padding: 10px; }
  .iftar-wrapper .bank-detail-info { width: 100%; }
  .iftar-wrapper .amount-box .value { font-size: 28px; }
  .iftar-wrapper .upload-area { padding: 24px 16px; min-height: 180px; }
  .iftar-wrapper .upload-icon { width: 60px; height: 60px; }
  .iftar-wrapper .upload-icon svg { width: 30px; height: 30px; }
  .iftar-wrapper .upload-area h3 { font-size: 16px; }
  .iftar-wrapper .summary { padding: 20px 16px; }
  .iftar-wrapper .summary-total .value { font-size: 20px; }
  .iftar-wrapper .btn { padding: 14px; font-size: 14px; }
  .iftar-wrapper .whatsapp-help { padding: 14px; font-size: 13px; flex-wrap: wrap; justify-content: center; text-align: center; }
  .iftar-wrapper .success-card { padding: 24px 20px; }
  .iftar-wrapper .success-icon { width: 80px; height: 80px; }
  .iftar-wrapper .success-icon svg { width: 40px; height: 40px; }
  .iftar-wrapper .success-card h2 { font-size: 26px; }
  .iftar-wrapper .success-card .subtitle { font-size: 18px; }
  .iftar-wrapper .success-box .amount { font-size: 32px; }
  .iftar-wrapper .header .badge { font-size: 12px; padding: 6px 14px; }
  .iftar-wrapper .header p { font-size: 14px; }
  .iftar-wrapper .whatsapp-float { bottom: 16px; right: 16px; padding: 14px; }
  .iftar-wrapper .whatsapp-float svg { width: 22px; height: 22px; }
}
@media (max-width: 480px) {
  .iftar-wrapper { padding: 20px 12px; }
  .iftar-wrapper .header { margin-bottom: 20px; }
  .iftar-wrapper .header h1 { font-size: 22px; line-height: 1.4; }
  .iftar-wrapper .form-content { padding: 20px 14px; }
  .iftar-wrapper .form-inner { padding: 0; }
  .iftar-wrapper .step-circle { width: 36px; height: 36px; font-size: 13px; }
  .iftar-wrapper .step-line { width: 24px; margin: 0 4px; }
  .iftar-wrapper .step-labels span { font-size: 10px; }
  .iftar-wrapper .form-label { font-size: 13px; }
  .iftar-wrapper .form-input { padding: 12px 14px; font-size: 14px; }
  .iftar-wrapper .input-hint { font-size: 10px; }
  .iftar-wrapper .counter-value { font-size: 36px; }
  .iftar-wrapper .counter-btn { width: 44px; height: 44px; font-size: 18px; }
  .iftar-wrapper .counter-per-box { font-size: 12px; }
  .iftar-wrapper .total-box { padding: 12px; }
  .iftar-wrapper .total-box p { font-size: 12px; }
  .iftar-wrapper .total-box .amount { font-size: 24px; }
  .iftar-wrapper .btn-full { margin-top: 20px; }
  .iftar-wrapper .bank-header .icon { font-size: 24px; }
  .iftar-wrapper .bank-header .name { font-size: 16px; }
  .iftar-wrapper .bank-detail-labels { font-size: 10px; }
  .iftar-wrapper .bank-detail-value { font-size: 11px; word-break: break-all; white-space: normal; }
  .iftar-wrapper .copy-btn { font-size: 12px; padding: 8px; }
  .iftar-wrapper .amount-box { padding: 14px; }
  .iftar-wrapper .amount-box p { font-size: 12px; }
  .iftar-wrapper .amount-box .value { font-size: 22px; }
  .iftar-wrapper .upload-area { padding: 20px 14px; }
  .iftar-wrapper .upload-area h3 { font-size: 14px; }
  .iftar-wrapper .upload-area .ur { font-size: 12px; }
  .iftar-wrapper .upload-area .hint { font-size: 10px; }
  .iftar-wrapper .summary-row { font-size: 12px; }
  .iftar-wrapper .summary-total .label { font-size: 13px; }
  .iftar-wrapper .summary-total .value { font-size: 18px; }
  .iftar-wrapper .btn { padding: 12px; font-size: 13px; border-radius: 10px; }
}
`;

const IftarForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [boxes, setBoxes] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const amount = useMemo(() => boxes * 5500, [boxes]);
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const updateBoxes = (delta: number) => {
    setBoxes((b) => Math.max(1, b + delta));
  };

  const goToStep = (s: number) => {
    if (s === 2) {
      let ok = true;
      const ne = name.trim().length >= 2;
      const ee = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
      const pe = /^\+?\d{10,14}$|^03\d{9}$/.test(phone.trim());
      setNameErr(!ne);
      setEmailErr(!ee);
      setPhoneErr(!pe);
      ok = ne && ee && pe;
      if (!ok) return;
    }
    if (s === 3) {
      if (step !== 2) return;
    }
    setStep(s);
  };

  const handleFile = (f: File | null) => {
    setFile(f);
  };

  const handleWhatsApp = () => {
    const message = `Assalam-o-Alaikum!
I want to contribute for Eid Package.
Name: ${name}
Phone: ${phone}
Packages: ${boxes}
Amount: Rs. ${amount}

Please share payment details or confirm my pledge.`;
    const url = `https://wa.me/923337299566?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const submit = async () => {
    if (!file || submitting) return;
    setSubmitting(true);
    try {
      const endpoint =
        import.meta.env.VITE_IFTAR_SMTP_ENDPOINT || "https://alkhalilwelfare.org/iftar-mail.php";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("boxes", String(boxes));
      formData.append("amount", String(amount));
      formData.append("screenshot", file);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setSuccess(true);
      toast({
        title: "Form submitted",
        description: "We have received your Eid Package donation details.",
      });
    } catch (error) {
      toast({
        title: "Email not sent",
        description: "Please try again or share details on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setBoxes(1);
    setFile(null);
    setSuccess(false);
    setNameErr(false);
    setEmailErr(false);
    setPhoneErr(false);
  };

  const circleClass = (idx: number) => {
    if (step === idx) return "step-circle active";
    if (step > idx) return "step-circle completed";
    return "step-circle inactive";
  };

  const lineClass = (idx: number) => (step > idx ? "step-line active" : "step-line");

  return (
    <section id="iftarFormSection" className="py-20 bg-gradient-teal relative overflow-hidden" style={{ scrollMarginTop: 100 }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {!success ? (
        <div className="iftar-wrapper">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
          <a href="https://wa.me/923337299566" target="_blank" className="whatsapp-float" rel="noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <div className="container">
            <div className="wrapper">
              <div className="hero-section">
                <div className="header">
                  <div className="badge">
                    <span className="badge-dot" />
                    <span className="ur-text">عید الفطر</span> • Eid ul Fitr Campaign
                  </div>
                  <h1 className="font-urdu">
                    <span className="ur-text">خوشیاں بانٹیں</span> <span className="ur-text">عید منائیں</span>
                  </h1>
                  <p>Provide Eid Packages • Share the Joy</p>
                </div>
              </div>
              <div>
                <div className="proa-form">
                  <div className="main-card">
                    <div className="steps-header">
                      <div className="steps">
                        <div className="step-item">
                          <div className="step-content">
                            <div className={circleClass(1)}>1</div>
                            <div className="step-labels">
                              <span className="en">Info</span>
                              <span className="ur ur-text">معلومات</span>
                            </div>
                          </div>
                        </div>
                        <div className={lineClass(1)} />
                        <div className="step-item">
                          <div className="step-content">
                            <div className={circleClass(2)}>2</div>
                            <div className="step-labels">
                              <span className="en">Bank Transfer</span>
                              <span className="ur ur-text">بینک ٹرانسفر</span>
                            </div>
                          </div>
                        </div>
                        <div className={lineClass(2)} />
                        <div className="step-item">
                          <div className="step-content">
                            <div className={circleClass(3)}>3</div>
                            <div className="step-labels">
                              <span className="en">Confirm</span>
                              <span className="ur ur-text">تصدیق</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-content">
                      <div className="form-inner">
                        <div className={step === 1 ? "step-section active" : "step-section"}>
                          <div className="form-grid">
                            <div>
                              <div className="form-group">
                                <div className="form-label">
                                  <span className="en">Name <span className="req">*</span></span>
                                  <span className="ur ur-text">نام <span className="req">*</span></span>
                                </div>
                                <input
                                  type="text"
                                  className={`form-input ${nameErr ? "error" : ""}`}
                                  placeholder="Enter your full name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <div className="form-label">
                                  <span className="en">Email <span className="req">*</span></span>
                                  <span className="ur ur-text">ای میل <span className="req">*</span></span>
                                </div>
                                <input
                                  type="email"
                                  className={`form-input ${emailErr ? "error" : ""}`}
                                  placeholder="your@email.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <div className="form-label">
                                  <span className="en">Phone/WhatsApp <span className="req">*</span></span>
                                  <span className="ur ur-text">فون/واٹس ایپ <span className="req">*</span></span>
                                </div>
                                <input
                                  type="tel"
                                  className={`form-input ${phoneErr ? "error" : ""}`}
                                  placeholder="03XXXXXXXXX"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                                <small className="input-hint">Format: 03XXXXXXXXX or +923XXXXXXXXX</small>
                              </div>
                            </div>
                            <div>
                              <div className="box-counter">
                                <div className="counter-header">
                                  <span className="en">Number of Packages</span>
                                  <span className="ur ur-text">عید پیکیج</span>
                                </div>
                                <div className="counter-controls">
                                  <button type="button" className="counter-btn minus" onClick={() => updateBoxes(-1)}>−</button>
                                  <span className="counter-value">{boxes}</span>
                                  <button type="button" className="counter-btn plus" onClick={() => updateBoxes(1)}>+</button>
                                </div>
                                <p className="counter-per-box">× Rs. 5,500 per package / <span className="ur-text">فی پیکیج</span></p>
                                <div className="total-box">
                                  <p>Total Amount / <span className="ur-text">کل رقم</span></p>
                                  <p className="amount">Rs. <span>{amount}</span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button type="button" className="btn btn-primary btn-full" onClick={() => goToStep(2)}>
                            Continue to Payment → <span className="ur-text">ادائیگی کی طرف</span>
                          </button>
                        </div>
                        <div className={step === 2 ? "step-section active" : "step-section"}>
                          <div className="text-center mb-6">
                             <h3 className="text-xl font-bold text-[#0d467e] mb-1">Direct Bank Transfer</h3>
                             <p className="text-[#f8a81a] ur-text text-lg">براہ راست بینک ٹرانسفر</p>
                          </div>
                          <div className="bank-card">
                            <div className="bank-header">
                              <span className="icon">🏦</span>
                              <div className="info">
                                <div className="name">Meezan Bank</div>
                                <div className="name-ur ur-text">میزان بینک</div>
                              </div>
                            </div>
                            <div className="bank-detail">
                              <div className="bank-detail-info">
                                <div className="bank-detail-labels">
                                  <span className="en">Account Title</span>
                                  <span className="ur ur-text">اکاؤنٹ ٹائٹل</span>
                                </div>
                                <div className="bank-detail-value">Maahad ul Khalil Al Islami (Al-Khalil Welfare)</div>
                              </div>
                              <button type="button" className={`copy-btn ${copiedKey === "acc" ? "copied" : ""}`} onClick={() => copyText("Maahad ul Khalil Al Islami (Al-Khalil Welfare)", "acc")}>Copy</button>
                            </div>
                            <div className="bank-detail">
                              <div className="bank-detail-info">
                                <div className="bank-detail-labels">
                                  <span className="en">Account Number</span>
                                  <span className="ur ur-text">اکاؤنٹ نمبر</span>
                                </div>
                                <div className="bank-detail-value">01850112692200</div>
                              </div>
                              <button type="button" className={`copy-btn ${copiedKey === "num" ? "copied" : ""}`} onClick={() => copyText("01850112692200", "num")}>Copy</button>
                            </div>
                            <div className="bank-detail">
                              <div className="bank-detail-info">
                                <div className="bank-detail-labels">
                                  <span className="en">IBAN</span>
                                  <span className="ur ur-text">آئی بی اے این</span>
                                </div>
                                <div className="bank-detail-value">PK30MEZN0001850112692200</div>
                              </div>
                              <button type="button" className={`copy-btn ${copiedKey === "iban" ? "copied" : ""}`} onClick={() => copyText("PK30MEZN0001850112692200", "iban")}>Copy</button>
                            </div>
                            <div className="amount-box">
                              <p>Amount to Pay / <span className="ur-text">ادا کی جانے والی رقم</span></p>
                              <p className="value">Rs. <span>{amount}</span></p>
                            </div>
                          </div>
                          <a href="https://wa.me/923337299566" target="_blank" className="whatsapp-help" rel="noreferrer">
                            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            Need Help? Contact WhatsApp / <span className="ur-text">مدد کے لیے واٹس ایپ</span>
                          </a>
                          <div className="btn-group">
                            <button type="button" className="btn btn-outline" onClick={() => goToStep(1)}>← Back / <span className="ur-text">واپس</span></button>
                            <button type="button" className="btn btn-primary" onClick={() => goToStep(3)}>Next / <span className="ur-text">آگے</span> →</button>
                          </div>
                        </div>
                        <div className={step === 3 ? "step-section active" : "step-section"}>
                          <label className={`upload-area ${file ? "has-file" : ""}`} onClick={() => {}}>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFile(e.target.files?.[0] || null)}
                            />
                            <div className={`upload-icon ${file ? "success" : ""}`}>
                              {!file ? (
                                <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              ) : (
                                <svg viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <h3>{file ? "Screenshot Attached" : "Upload Payment Screenshot"}</h3>
                            <p className="ur ur-text">{file ? "اسکرین شاٹ منسلک" : "ادائیگی کا اسکرین شاٹ اپلوڈ کریں"}</p>
                            <p className="hint">PNG, JPG (Max 5MB)</p>
                            <p className="file-name" style={{ display: file ? "block" : "none" }}>{file?.name}</p>
                          </label>
                          <div className="summary">
                            <div className="summary-header">
                              <h4 className="en">Summary</h4>
                              <h4 className="ur ur-text">خلاصہ</h4>
                            </div>
                            <div className="summary-row">
                              <span className="label">Name / <span className="ur-text">نام</span></span>
                              <span className="value">{name || "-"}</span>
                            </div>
                            <div className="summary-row">
                              <span className="label">Email / <span className="ur-text">ای میل</span></span>
                              <span className="value">{email || "-"}</span>
                            </div>
                            <div className="summary-row">
                              <span className="label">Phone/WhatsApp / <span className="ur-text">فون/واٹس ایپ</span></span>
                              <span className="value">{phone || "-"}</span>
                            </div>
                            <div className="summary-row">
                              <span className="label">Packages / <span className="ur-text">پیکیج</span></span>
                              <span className="value">{boxes}</span>
                            </div>

                            <div className="summary-total">
                              <span className="label">Total / <span className="ur-text">کل رقم</span></span>
                              <span className="value">Rs. {amount}</span>
                            </div>
                          </div>
                          <div className="btn-group">
                            <button type="button" className="btn btn-outline" onClick={() => goToStep(2)}>← Back / <span className="ur-text">واپس</span></button>
                            <button type="button" className="btn btn-primary" onClick={submit} disabled={!file || submitting}>
                              Submit / <span className="ur-text">جمع کروائیں</span> 🤲
                            </button>
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-dashed border-gray-200 text-center">
                            <p className="text-sm text-gray-500 mb-4">Can't upload screenshot? Send details via WhatsApp</p>
                            <button 
                              type="button" 
                              className="btn w-full bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center justify-center gap-2 border-none shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                              onClick={handleWhatsApp}
                            >
                              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                              Send via WhatsApp / <span className="ur-text">واٹس ایپ کریں</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <p>Al-Khalil Welfare • <span className="ur-text">خدمت | دیانت | انسانیت</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="iftar-wrapper">
          <div className="success-container">
            <div className="success-card">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="ur-text">جزاک اللہ خیراً</h2>
              <p className="subtitle">JazakAllah Khair!</p>
              <div className="success-box">
                <p>Your donation of</p>
                <p className="amount">Rs. {amount}</p>
                <p className="boxes"><span>{boxes}</span> Eid Package(s) • <span className="ur-text">عید پیکیج</span></p>
              </div>
              <p className="hadith">"May Allah accept your contribution and bring joy to your life."</p>
              <div className="btn-group">
                <button className="btn btn-outline" onClick={reset}>Donate Again</button>
                <a href="https://wa.me/923337299566" className="btn btn-primary" style={{ gap: 8 }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IftarForm;
