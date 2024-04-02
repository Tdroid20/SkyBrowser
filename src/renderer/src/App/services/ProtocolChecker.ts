export class ProtocolChecker {
  async checkProtocol(domain: string) {
      try {
          const httpsResponse = await fetch(`https://${domain}`);
          if (httpsResponse.ok) {
              return 'https';
          }
      } catch (error) {
          console.error('Erro ao tentar acessar via HTTPS:', error);
      }

      try {
          const httpResponse = await fetch(`http://${domain}`);
          if (httpResponse.ok) {
              return 'http';
          }
      } catch (error) {
          console.error('Erro ao tentar acessar via HTTP:', error);
      }

      // Se ambos os métodos falharem, retorna um protocolo padrão (por exemplo, HTTPS)
      return 'https';
  }
}
