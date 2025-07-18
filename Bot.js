import { createClient } from 'bedrock-protocol';
import express from 'express';

const SERVER_HOST = 'Antas.aternos.me'; // Coloque seu IP do Aternos aqui
const SERVER_PORT = 56866; // Porta padrão do Bedrock
const BOT_USERNAME = 'BotAFK'; // Nome do bot
const VERSION = '1.21.93.1'; // Versão do servidor

function startBot() {
  console.log('🔌 Conectando ao servidor Bedrock...');

  const client = createClient({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_USERNAME,
    offline: true,
    version: VERSION
  });

  client.on('join', () => {
    console.log(`✅ Bot ${BOT_USERNAME} entrou no servidor!`);
  });

  client.on('disconnect', () => {
    console.log('❌ Bot desconectado! Tentando reconectar em 10s...');
    setTimeout(startBot, 10000);
  });

  setInterval(() => {
    // Envia mensagem para evitar kick por inatividade
    client.queue('text', {
      type: 'chat',
      needs_translation: false,
      source_name: BOT_USERNAME,
      message: 'Estou ativo!'
    });
    console.log('🤖 Mensagem enviada para manter bot ativo');
  }, 15000);
}

startBot();

// Mini servidor HTTP para UptimeRobot manter o container acordado
const app = express();
app.get('/', (req, res) => res.send('🤖 Bot Bedrock ativo!'));
app.listen(3000, () => console.log('🌐 Servidor HTTP rodando na porta 3000'));
