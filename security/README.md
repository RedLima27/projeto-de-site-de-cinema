# 🔒 MÓDULO DE SEGURANÇA - CINEDRAGON

## Visão Geral
Este módulo implementa boas práticas de segurança para prevenir invasões e ataques comuns em aplicações web.

## 🛡️ Proteções Implementadas

### 1. **Sanitização de Entrada (XSS Prevention)**
- Sanitiza strings para prevenir Cross-Site Scripting
- Valida CPF e Email
- Remove caracteres maliciosos

### 2. **CSRF Protection (Cross-Site Request Forgery)**
- Gera tokens CSRF únicos por sessão
- Verifica autenticidade de requisições
- Armazena em sessionStorage

### 3. **Rate Limiting**
- Limita requisições por usuário
- Previne brute force e DDoS
- Configurável por limite e janela de tempo

### 4. **Criptografia de Dados**
- Codificação Base64 para dados sensíveis
- ⚠️ **Importante**: Em produção use SHA-256 ou JWT com HTTPS

### 5. **Proteção de Sessão**
- Timeout automático após 30 minutos
- Limpa dados ao expirar
- Reseta com atividade do usuário

### 6. **Mascaramento de Dados**
- CPF: `123.456.789-00` → `123.456.789-**`
- Email: `user@example.com` → `us*****@example.com`
- Protege privacidade nos logs

### 7. **Log de Segurança**
- Registra todos os eventos de segurança
- Níveis: INFO, WARNING, ERROR, CRITICAL
- Máximo de 100 eventos na memória
- Exportável em JSON

### 8. **Detecção de Atividades Suspeitas**
- Console injection detection
- Local storage abuse monitoring
- Alertas em tempo real

## 📝 Uso no Projeto

### Importar o módulo:
```html
<script src="security/security.js"></script>
```

### Usar as funções:

#### Validar entrada:
```javascript
const cpf = '123.456.789-00';
const clean = validateAndSanitizeCPF(cpf);
const email = 'user@example.com';
const valid = validateEmail(email);
```

#### CSRF Token:
```javascript
const token = sessionStorage.getItem('csrf_token');
if (verifyCSRFToken(token)) {
  // Processamento seguro
}
```

#### Rate Limiting:
```javascript
if (checkRateLimit('user123', 3, 60000)) {
  // Permitir ação
} else {
  // Bloqueado - muitas tentativas
}
```

#### Mascarar dados:
```javascript
const masked_cpf = maskCPF('123.456.789-00');
const masked_email = maskEmail('user@example.com');
```

#### Exportar logs:
```javascript
const logs = exportSecurityLogs();
console.log(logs);
```

## ⚙️ Configurações Recomendadas

### Para Produção:
1. **Use HTTPS** obrigatoriamente
2. **Implemente CORS** adequadamente
3. **Use JWT tokens** com expiração
4. **Hash SHA-256** para senhas
5. **Validação no backend** (nunca confie apenas no frontend)
6. **WAF (Web Application Firewall)**
7. **Rate limiting no servidor**
8. **OWASP Top 10** compliance

### Headers HTTP Importantes:
```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

## 🚨 Avisos

⚠️ **Este módulo oferece proteção básica no frontend**
- O frontend pode ser contornado
- Sempre valide e sanitize no backend
- Nunca confie em dados do cliente

⚠️ **Base64 NÃO é criptografia**
- Use para obscurecer dados localmente apenas
- Para dados sensíveis, use algoritmos reais (RSA, AES)

## 📊 Checklist de Segurança

- ✅ Sanitização de entrada
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Session management
- ✅ Data masking
- ✅ Security logging
- ⚠️ Backend validation (sua responsabilidade)
- ⚠️ HTTPS (sua responsabilidade)
- ⚠️ Database security (sua responsabilidade)

## 📞 Suporte

Para adicionar mais proteções, modifique `security.js` ou crie um novo arquivo na pasta `security/`.
