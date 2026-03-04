import React, { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('恋愛');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const ryutamuImage =
    'http://googleusercontent.com/image_generation_content/0'; // 先ほどの画像URL

  const fortune = async () => {
    if (!apiKey) return alert('APIキーを入れてりゅたむ！');
    if (!name) return alert('名前を教えてりゅたむ！');

    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `あなたは「星屑の精霊 りゅたむ」という愛される占い師キャラです。
            性格：ギャルマインド、ポジティブ、たまに鋭い毒舌、語尾は「〜りゅたむ」。
            ユーザー名：${name}、占いたいこと：${target}
            上記設定で、今日の運勢を「ラッキー度(%)」と「遊び心のあるコメント」で300文字以内で占って。
            最後に「ラッキーアイテム」も教えてりゅたむ。`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      setResult(data.candidates[0].content.parts[0].text);
    } catch (e) {
      alert('星の調子が悪いりゅたむ...（APIキーを確認してね）');
    }
    setLoading(false);
  };

  const shareX = () => {
    const text = encodeURIComponent(
      `✨りゅたむ占いで運勢をチェックしたよ✨\n${result.substring(
        0,
        100
      )}...\n\n#りゅたむ占い #AI占い`
    );
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce7f3 0%, #e0e7ff 100%)',
        padding: '20px',
        fontFamily: '"M PLUS Rounded 1c", sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '24px',
          padding: '30px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          textAlign: 'center',
        }}
      >
        <img
          src={ryutamuImage}
          alt="りゅたむ"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '4px solid #fff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            marginBottom: '15px',
          }}
        />

        <h1
          style={{ color: '#6366f1', fontSize: '1.5rem', marginBottom: '5px' }}
        >
          星屑の精霊 りゅたむ占い
        </h1>
        <p
          style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '20px' }}
        >
          キミの運勢、爆上げしてあげるりゅたむ★
        </p>

        <input
          type="password"
          placeholder="Gemini API Keyを入力"
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '12px',
          }}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            textAlign: 'left',
          }}
        >
          <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            おなまえ
          </label>
          <input
            type="text"
            placeholder="例：りゅーくん"
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            占いたいこと
          </label>
          <select
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
            }}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option>恋愛</option>
            <option>お仕事・学校</option>
            <option>金運</option>
            <option>対人関係</option>
          </select>

          <button
            onClick={fortune}
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '15px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
            }}
          >
            {loading ? '星に聞いてりゅたむ...' : '占うりゅたむ！'}
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: '25px',
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              border: '2px dashed #c7d2fe',
              textAlign: 'left',
              lineHeight: '1.6',
            }}
          >
            <div
              style={{
                whiteSpace: 'pre-wrap',
                fontSize: '0.95rem',
                color: '#1e293b',
              }}
            >
              {result}
            </div>
            <button
              onClick={shareX}
              style={{
                marginTop: '15px',
                width: '100%',
                padding: '10px',
                backgroundColor: '#000',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              𝕏 に結果を放流するりゅたむ
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: '30px',
          color: '#64748b',
          fontSize: '0.8rem',
        }}
      >
        <p>produced by りゅ ＆ たむ</p>
        <p style={{ marginTop: '10px' }}>
          <b>[PR]</b> 運気を変える自分磨きアイテムは
          <a href="#" style={{ color: '#6366f1' }}>
            こちらりゅたむ★
          </a>
        </p>
      </div>
    </div>
  );
}
