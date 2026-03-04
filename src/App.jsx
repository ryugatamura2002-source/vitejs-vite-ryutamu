import React, { useState, useEffect } from 'react';

// アイコン（𝕏シェア用）
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

export default function App() {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('恋愛');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // ⚠️ 【重要】APIキーを設定済み
  const MY_API_KEY = 'AIzaSyBzSX7t49Z7mppzisMbu4MrfNcQ8RftJII'; 

  // キャラクター画像
  const ryutamuImage = "/ryutamu.png"; 

  // フォントを読み込むための設定
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const fortune = async () => {
    // 修正ポイント：チェック条件を「空かどうか」だけにしました
    if (!MY_API_KEY || MY_API_KEY === 'ここにAPIキーを貼る') {
      return alert('PMより指示：APIキーが正しく設定されていないりゅたむ！');
    }
    if (!name) return alert('お名前を教えてりゅたむ！');
    
    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${MY_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `あなたは「星屑の精霊 りゅたむ」という愛される占い師キャラです。
            性格：ギャルマインド、常にポジティブ、たまに核心を突く毒舌、語尾は「〜りゅたむ」。
            ユーザー名：${name}、占いたいカテゴリー：${target}
            上記設定で、今日の運勢を「ラッキー度(%)」と「遊び心のあるギャル語コメント」で占って。
            最後に「ラッキーアイテム」を1つ教えてりゅたむ。` }]
          }]
        })
      });
      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setResult(aiResponse);
  } catch (e) {
    // 具体的なエラー内容を画面に出しちゃうりゅたむ！
    setResult("エラーが出ちゃったりゅたむ： " + e.message);
    console.error(e);
  }
    setLoading(false);
  };

  const shareX = () => {
    const shareText = encodeURIComponent(`✨ 星屑の精霊 #りゅたむ占い ✨\n\n「${result.substring(0, 60)}...」\n\n今すぐ占う👇\n`);
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fce7f3 0%, #e0e7ff 100%)', padding: '20px', fontFamily: '"M PLUS Rounded 1c", sans-serif', color: '#1e293b' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '32px', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        
        <img 
          src={ryutamuImage} 
          alt="星屑の精霊 りゅたむ" 
          style={{ width: '100%', maxWidth: '280px', height: 'auto', borderRadius: '24px', marginBottom: '20px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', display: 'block', margin: '0 auto 20px' }} 
          onError={(e) => { e.target.src = "https://placehold.jp/24/6366f1/ffffff/200x200.png?text=りゅたむ"; }}
        />
        
        <h1 style={{ color: '#6366f1', fontSize: '1.6rem', fontWeight: '900', marginBottom: '8px' }}>りゅたむ占い★</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '30px' }}>キミの運勢、爆上げしてあげるりゅたむ！</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginLeft: '5px' }}>おなまえ</label>
            <input 
              type="text" placeholder="例：りゅたむ" 
              style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box', outline: 'none' }}
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginLeft: '5px' }}>占いたいこと</label>
            <select 
              style={{ width: '100%', padding: '14px', borderRadius: '16px', border: '2px solid #e2e8f0', backgroundColor: 'white', fontSize: '16px', boxSizing: 'border-box' }}
              value={target} onChange={(e) => setTarget(e.target.value)}
            >
              <option>恋愛</option><option>お仕事・学校</option><option>金運</option><option>対人関係</option>
            </select>
          </div>

          <button 
            onClick={fortune} disabled={loading}
            style={{ marginTop: '10px', padding: '20px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }}
          >
            {loading ? '星に聞いてりゅたむ...' : '占うりゅたむ！'}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: '30px', padding: '24px', backgroundColor: '#fff', borderRadius: '20px', border: '3px solid #e0e7ff', textAlign: 'left' }}>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '1rem', color: '#1e293b', lineHeight: '1.7' }}>{result}</div>
            <button 
              onClick={shareX}
              style={{ marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#000', color: 'white', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <XIcon /> 結果を𝕏に放流するりゅたむ
            </button>
          </div>
        )}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px', color: '#94a3b8', fontSize: '0.85rem' }}>
        <p>produced by りゅ ＆ たむ</p>
      </div>
    </div>
  );
}
