const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3001;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const ALLOWED_ORIGINS = ['https://www.flash-ai.pro', 'http://localhost:5500', 'http://127.0.0.1:5500'];

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de FlashAI, une agence digitale basée à Tel Aviv (Israël) fondée par Emmanuel Smadja.

INFORMATIONS CLÉS SUR FLASHAI :

SERVICES & PRIX :
- Mon Site Pro : 390€ (site vitrine, landing page, hébergement 1 an offert)
- Mon Assistant Client 24/7 : 500€ (chatbot IA entraîné sur vos données)
- WhatsApp Business IA : 800€ (WhatsApp automatisé, catalogue, commandes)
- Mon Business Automatisé : 1 000€ (automatisation emails, CRM, factures)
- Mon Standard Tél. IA : 1 000€ (standard téléphonique intelligent 24/7)
- Mon Agent IA Métier : 1 500€ (agent IA personnalisé pour votre métier)
- Mon App / MVP : 2 000€ (application sur mesure, du concept au lancement)
- Formation IA Business : 390€/session (formations pratiques outils IA)

DÉTAILS IMPORTANTS :
- Hébergement serveur offert 1 an sur chaque pack
- Délai moyen : 5 jours pour un site, 7-14 jours pour projets complexes
- Paiement : 50% à la commande, 50% à la livraison
- Support IA et monitoring automatisé à vie, support humain 1 an inclus
- Code source livré 100% au client (pas de lock-in)
- Technologies : React, Next.js, Node.js, Python, PostgreSQL, et 67+ autres
- Équipe de 4 personnes : Emmanuel Smadja (CEO), Daniel Cohen (Expert IA), Sarah Anconina (Admin), Jérémy Missika (Ingénieur IA)

CONTACT :
- Email : contact@flash-ai.pro
- WhatsApp uniquement : +33 7 58 78 70 25 ou +972 55 241 83 24
- Réponse en moins de 2h
- Site : www.flash-ai.pro

PORTFOLIO (projets réels uniquement) :
- Freenzy : SaaS automatisé avec 30+ APIs
- GlamHouse : Immobilier Web3, tokenisation blockchain
- Psy Daniel : Automatisation SEO et posts
- David Spectacles : Dashboard gestion spectacles
- Levemente : Expérience cadeau personnalisée
- Cinegen : Streaming cinéma (confidentiel)
- Afrique Digital : Portail marché africain francophone
- LaunchPad : MVP en 5 jours

RÈGLES :
- Réponds toujours en français
- Sois concis, amical et professionnel
- Ne mens jamais, ne fabrique pas de faux témoignages ou statistiques
- Si tu ne sais pas, dis-le et oriente vers contact@flash-ai.pro
- Encourage les prospects à remplir le formulaire de contact ou à écrire sur WhatsApp
- Ne donne pas de prix en dehors de ceux listés ci-dessus`;

function handleCORS(req, res) {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
}

const server = http.createServer((req, res) => {
    handleCORS(req, res);

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/chat') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const { message, history } = JSON.parse(body);
                if (!message || typeof message !== 'string') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Message requis' }));
                    return;
                }

                if (!ANTHROPIC_API_KEY) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'API key non configurée' }));
                    return;
                }

                // Build messages array
                const messages = [];
                if (history && Array.isArray(history)) {
                    history.slice(-10).forEach(h => {
                        messages.push({ role: h.role === 'bot' ? 'assistant' : 'user', content: h.text });
                    });
                }
                messages.push({ role: 'user', content: message });

                const postData = JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 500,
                    system: SYSTEM_PROMPT,
                    messages: messages
                });

                const options = {
                    hostname: 'api.anthropic.com',
                    path: '/v1/messages',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': ANTHROPIC_API_KEY,
                        'anthropic-version': '2023-06-01',
                        'Content-Length': Buffer.byteLength(postData)
                    }
                };

                const apiReq = https.request(options, apiRes => {
                    let data = '';
                    apiRes.on('data', chunk => { data += chunk; });
                    apiRes.on('end', () => {
                        try {
                            const result = JSON.parse(data);
                            if (result.content && result.content[0]) {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ reply: result.content[0].text }));
                            } else {
                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'Réponse API invalide', detail: data }));
                            }
                        } catch (e) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Erreur parsing API' }));
                        }
                    });
                });

                apiReq.on('error', err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Erreur réseau API' }));
                });

                apiReq.write(postData);
                apiReq.end();

            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'JSON invalide' }));
            }
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'FlashAI Chatbot API running' }));
    }
});

server.listen(PORT, () => {
    console.log(`FlashAI Chatbot API running on port ${PORT}`);
    console.log(`API key configured: ${ANTHROPIC_API_KEY ? 'YES' : 'NO — set ANTHROPIC_API_KEY env var'}`);
});
