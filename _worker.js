export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // API認証エンドポイント
    if (url.pathname === '/api/verify' && request.method === 'POST') {
      try {
        const body = await request.json();
        const password = body.password;
        
        // 環境変数からパスワードとURLを取得
        const CORRECT_PASSWORD = env.PASSWORD || "your_password_here";
        const REDIRECT_URL = env.REDIRECT_URL || "https://youtube.com/live...";
        
        // パスワード検証
        if (password === CORRECT_PASSWORD) {
          return new Response(JSON.stringify({
            success: true,
            redirectUrl: REDIRECT_URL
          }), {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store'
            }
          });
        } else {
          return new Response(JSON.stringify({
            success: false
          }), {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store'
            }
          });
        }
      } catch (e) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid request'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // その他のリクエストは通常通り処理
    return env.ASSETS.fetch(request);
  }
};
