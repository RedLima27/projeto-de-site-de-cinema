/**
 * MÓDULO DE SEGURANÇA - CINEDRAGON
 * Proteção contra invasões e vulnerabilidades comuns
 */

// ========== SANITIZAÇÃO DE ENTRADA ==========
/**
 * Sanitiza strings para prevenir XSS (Cross-Site Scripting)
 */
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Valida e sanitiza CPF
 */
function validateAndSanitizeCPF(cpf) {
  // Remove tudo que não é número
  let clean = cpf.replace(/\D/g, '');
  
  // Verifica tamanho
  if (clean.length !== 11) return null;
  
  // Rejeita sequências repetidas (111.111.111-11)
  if (/^(\d)\1+$/.test(clean)) return null;
  
  return clean;
}

/**
 * Valida email com regex segura
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ========== PROTEÇÃO CONTRE CSRF (Cross-Site Request Forgery) ==========
/**
 * Gera um token CSRF único por sessão
 */
function generateCSRFToken() {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  sessionStorage.setItem('csrf_token', token);
  return token;
}

/**
 * Verifica se o token CSRF é válido
 */
function verifyCSRFToken(token) {
  const stored = sessionStorage.getItem('csrf_token');
  return stored && token === stored;
}

// ========== PROTEÇÃO CONTRE RATE LIMITING ==========
const requestLog = {};

/**
 * Previne múltiplas requisições do mesmo usuário em pouco tempo
 */
function checkRateLimit(userId, limit = 3, window = 60000) {
  const now = Date.now();
  
  if (!requestLog[userId]) {
    requestLog[userId] = [];
  }
  
  // Remove requisições fora da janela de tempo
  requestLog[userId] = requestLog[userId].filter(time => now - time < window);
  
  if (requestLog[userId].length >= limit) {
    return false; // Bloqueado
  }
  
  requestLog[userId].push(now);
  return true; // Permitido
}

// ========== CRIPTOGRAFIA SIMPLES DE DADOS SENSÍVEIS ==========
/**
 * Codifica dados sensíveis em Base64 (uso local apenas)
 * ⚠️ IMPORTANTE: Use HTTPS e hash adequado em produção!
 */
function encodeData(data) {
  return btoa(JSON.stringify(data));
}

function decodeData(encoded) {
  try {
    return JSON.parse(atob(encoded));
  } catch (e) {
    console.error('Erro ao decodificar dados:', e);
    return null;
  }
}

// ========== PROTEÇÃO DE SESSÃO ==========
/**
 * Define timeout de sessão (30 minutos)
 */
let sessionTimeout;
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

function resetSessionTimeout() {
  try {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      try {
        clearSessionData();
        // Use banner instead of alert() — alert() blocks setInterval/clock
        const banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:#ef4444;color:#fff;text-align:center;padding:14px;font-weight:700;z-index:99999;font-size:14px';
        banner.textContent = '⏱️ Sessão expirada. A página será recarregada em 3 segundos...';
        document.body.appendChild(banner);
        setTimeout(() => location.reload(), 3000);
      } catch(e) { location.reload(); }
    }, SESSION_DURATION);
  } catch(e) {}
}

function clearSessionData() {
  sessionStorage.clear();
  localStorage.removeItem('user_session');
}

// Resetar timeout em atividade do usuário
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('mousemove', resetSessionTimeout);

// ========== PROTEÇÃO DE DADOS PESSOAIS ==========
/**
 * Máscara CPF: 123.456.789-00 → 123.456.789-**
 */
function maskCPF(cpf) {
  return cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '$1.$2.$3-**');
}

/**
 * Máscara Email: user@example.com → us*****@example.com
 */
function maskEmail(email) {
  const [user, domain] = email.split('@');
  const masked = user.slice(0, 2) + '*'.repeat(user.length - 2);
  return `${masked}@${domain}`;
}

// ========== LOG DE SEGURANÇA ==========
const securityLog = [];

/**
 * Registra eventos de segurança
 */
function logSecurityEvent(event, level = 'INFO', details = {}) {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    level, // INFO, WARNING, ERROR, CRITICAL
    details,
    userAgent: navigator.userAgent,
  };
  
  securityLog.push(log);
  
  // Mantém apenas os últimos 100 eventos
  if (securityLog.length > 100) {
    securityLog.shift();
  }
  
  // Registra eventos críticos no console
  if (level === 'CRITICAL' || level === 'ERROR') {
    console.warn('[SECURITY]', event, details);
  }
}

/**
 * Exporta logs de segurança
 */
function exportSecurityLogs() {
  return JSON.stringify(securityLog, null, 2);
}

// ========== HEADERS DE SEGURANÇA (via meta tags) ==========
function addSecurityHeaders() {
  // Content Security Policy
  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' https://image.tmdb.org https://media.themoviedb.org data:;";
  document.head.appendChild(cspMeta);
  
  // X-UA-Compatible
  const uaMeta = document.createElement('meta');
  uaMeta.httpEquiv = 'X-UA-Compatible';
  uaMeta.content = 'IE=edge';
  document.head.appendChild(uaMeta);
}

// ========== DETECÇÃO DE ATIVIDADES SUSPEITAS ==========
/**
 * Detecta tentativas de console injection
 */
function detectConsoleInjection() {
  try {
    const originalLog = console.log;
    console.log = function(...args) {
      try {
        if (args[0]?.includes?.('alert') || args[0]?.includes?.('eval')) {
          logSecurityEvent('CONSOLE_INJECTION_ATTEMPT', 'WARNING', { args });
        }
      } catch(e) {}
      originalLog.apply(console, args);
    };
  } catch(e) {}
}

/**
 * Detecta tentativas de local storage abuse
 */
function monitorLocalStorage() {
  try {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      try {
        if (typeof value === 'string' && value.length > 1000000) {
          logSecurityEvent('STORAGE_ABUSE_ATTEMPT', 'WARNING', { key, size: value.length });
        }
        originalSetItem.call(this, key, value);
      } catch(e) { originalSetItem.call(this, key, value); }
    };
  } catch(e) {}
}

// ========== INICIALIZAÇÃO ==========
function initSecurity() {
  try { addSecurityHeaders(); } catch(e) {}
  try { detectConsoleInjection(); } catch(e) {}
  try { monitorLocalStorage(); } catch(e) {}
  try { generateCSRFToken(); } catch(e) {}
  try { resetSessionTimeout(); } catch(e) {}
  try { logSecurityEvent('SECURITY_MODULE_INITIALIZED', 'INFO'); } catch(e) {}
}

// Auto-inicializar — não bloqueia outros scripts em caso de erro
try { document.addEventListener('DOMContentLoaded', initSecurity); } catch(e) {}