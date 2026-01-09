import { useState, useEffect } from 'react';
import './App.css';

const STYLE_PRESETS = {
  miggy: {
    name: 'Web3-native',
    description: 'witty, web3-native',
    rules: [
      'Use crypto/web3 slang naturally',
      'Add subtle humor and wit',
      'Reference memes or trends when relevant',
      'Keep it conversational and authentic',
      'Drop technical terms casually'
    ]
  },
  explainer: {
    name: 'Explainer',
    description: 'clear + educational',
    rules: [
      'Break down complex concepts simply',
      'Use analogies when helpful',
      'Structure: problem → solution → benefit',
      'Avoid jargon or explain it',
      'End with actionable takeaway'
    ]
  },
  'hot-take': {
    name: 'Hot take',
    description: 'spicy but not cringe',
    rules: [
      'Lead with a bold statement',
      'Back it up with reasoning',
      'Acknowledge counterarguments briefly',
      'Stay confident but not arrogant',
      'End with a call to think differently'
    ]
  }
};

function generateTweet(topic, style, variant) {
  const hooks = {
    miggy: [
      `Hot take: ${topic} is about to change everything.`,
      `Been thinking about ${topic} lately...`,
      `Okay hear me out on ${topic}:`
    ],
    explainer: [
      `Let's break down ${topic}:`,
      `Quick thread on ${topic}:`,
      `${topic} explained in simple terms:`
    ],
    'hot-take': [
      `Unpopular opinion: ${topic} is overhyped.`,
      `The ${topic} discourse is missing the point.`,
      `Everyone's wrong about ${topic}. Here's why:`
    ]
  };

  const bodies = {
    miggy: [
      `It's not just another protocol—it's the infrastructure layer we've been waiting for. The composability here is insane.`,
      `The UX improvements are subtle but game-changing. Once you see it, you can't unsee it.`,
      `This is what happens when builders focus on what users actually need, not what sounds cool in a pitch deck.`
    ],
    explainer: [
      `Think of it like a payment rail that works across any app. No more silos, no more friction. Just seamless value transfer.`,
      `The key innovation is how it handles state. Instead of each app managing its own ledger, everything syncs to a shared layer.`,
      `It solves the fragmentation problem by creating a universal standard. One protocol, infinite possibilities.`
    ],
    'hot-take': [
      `The hype is real, but the execution timeline is fantasy. We're years away from mainstream adoption, not months.`,
      `Most people praising it haven't actually used it. The theory is solid, but the reality needs work.`,
      `It's solving yesterday's problem. By the time it launches, the landscape will have shifted again.`
    ]
  };

  const closers = {
    miggy: [
      `This is the way.`,
      `gm, builders.`,
      `LFG.`
    ],
    explainer: [
      `TL;DR: It's simpler than you think.`,
      `The future is composable.`,
      `This is how we scale.`
    ],
    'hot-take': [
      `Fight me.`,
      `Change my mind.`,
      `Prove me wrong.`
    ]
  };

  const hook = hooks[style][variant % hooks[style].length];
  const body = bodies[style][variant % bodies[style].length];
  const closer = closers[style][variant % closers[style].length];

  let tweet = `${hook}\n\n${body}\n\n${closer}`;
  
  // Trim to ~280-300 chars if needed
  const maxLength = 280;
  if (tweet.length > maxLength) {
    tweet = tweet.substring(0, maxLength - 3) + '...';
  }

  return tweet;
}

function App() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('miggy');
  const [tweets, setTweets] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0a0a0a' : '#fafafa';
    document.body.style.transition = 'background-color 0.2s';
  }, [darkMode]);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    
    const generated = [
      generateTweet(topic, style, 0),
      generateTweet(topic, style, 1),
      generateTweet(topic, style, 2)
    ];
    setTweets(generated);
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const selectedPreset = STYLE_PRESETS[style];

  const colors = {
    bg: darkMode ? '#0a0a0a' : '#fafafa',
    surface: darkMode ? '#1a1a1a' : '#fff',
    text: darkMode ? '#fff' : '#000',
    textSecondary: darkMode ? '#999' : '#666',
    textTertiary: darkMode ? '#666' : '#999',
    border: darkMode ? '#333' : '#e5e5e5',
    button: darkMode ? '#fff' : '#000',
    buttonHover: darkMode ? '#e5e5e5' : '#333',
    buttonDisabled: darkMode ? '#333' : '#f5f5f5',
    buttonDisabledText: darkMode ? '#666' : '#999'
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: colors.bg,
      minHeight: '100vh',
      transition: 'background-color 0.2s'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: colors.text,
            letterSpacing: '-0.02em',
            transition: 'color 0.2s'
          }}>
            Vibe Tweet Generator
          </h1>
          <p style={{ 
            color: colors.textSecondary, 
            marginBottom: '3rem', 
            fontSize: '1rem',
            transition: 'color 0.2s'
          }}>
            Generate authentic tweets in your chosen style
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: colors.text,
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = colors.button;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = colors.border;
          }}
        >
          {darkMode ? '☀️' : '🌙'} {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: colors.text,
            fontSize: '0.875rem',
            letterSpacing: '0.01em',
            transition: 'color 0.2s'
          }}>
            Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="x402 payments"
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              boxSizing: 'border-box',
              backgroundColor: colors.surface,
              color: colors.text,
              transition: 'all 0.2s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = colors.button}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: colors.text,
            fontSize: '0.875rem',
            letterSpacing: '0.01em',
            transition: 'color 0.2s'
          }}>
            Style Preset
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              fontSize: '1rem',
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              boxSizing: 'border-box',
              backgroundColor: colors.surface,
              color: colors.text,
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = colors.button}
            onBlur={(e) => e.target.style.borderColor = colors.border}
          >
            <option value="miggy">Web3-native (witty, authentic)</option>
            <option value="explainer">Explainer (clear + educational)</option>
            <option value="hot-take">Hot take (spicy but not cringe)</option>
          </select>
        </div>

        <div style={{
          padding: '1.25rem',
          backgroundColor: colors.surface,
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          transition: 'all 0.2s'
        }}>
          <div style={{
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: colors.text,
            fontSize: '0.875rem',
            letterSpacing: '0.01em',
            transition: 'color 0.2s'
          }}>
            {selectedPreset.name} Rules
          </div>
          <ul style={{
            margin: 0,
            paddingLeft: '1.25rem',
            color: colors.textSecondary,
            fontSize: '0.875rem',
            lineHeight: '1.7',
            listStyleType: 'disc',
            transition: 'color 0.2s'
          }}>
            {selectedPreset.rules.map((rule, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem' }}>{rule}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim()}
          style={{
            padding: '0.875rem 1.5rem',
            fontSize: '0.9375rem',
            fontWeight: '600',
            color: topic.trim() 
              ? (darkMode ? '#000' : '#fff') 
              : colors.buttonDisabledText,
            backgroundColor: topic.trim() 
              ? colors.button 
              : colors.buttonDisabled,
            border: 'none',
            borderRadius: '6px',
            cursor: topic.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            letterSpacing: '0.01em'
          }}
          onMouseEnter={(e) => {
            if (topic.trim()) {
              e.target.style.backgroundColor = colors.buttonHover;
            }
          }}
          onMouseLeave={(e) => {
            if (topic.trim()) {
              e.target.style.backgroundColor = colors.button;
            }
          }}
        >
          Generate 3 tweets
        </button>
      </div>

      {tweets.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {tweets.map((tweet, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                boxShadow: darkMode 
                  ? '0 1px 2px rgba(0,0,0,0.3)' 
                  : '0 1px 2px rgba(0,0,0,0.04)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontWeight: '600',
                  color: colors.text,
                  fontSize: '0.875rem',
                  letterSpacing: '0.01em',
                  transition: 'color 0.2s'
                }}>
                  Option {index + 1}
                </div>
                <button
                  onClick={() => handleCopy(tweet, index)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    color: darkMode ? '#000' : '#fff',
                    backgroundColor: colors.button,
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.01em',
                    opacity: copiedIndex === index ? '0.8' : '1'
                  }}
                  onMouseEnter={(e) => {
                    if (copiedIndex !== index) {
                      e.target.style.backgroundColor = colors.buttonHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (copiedIndex !== index) {
                      e.target.style.backgroundColor = colors.button;
                    }
                  }}
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{
                color: colors.text,
                lineHeight: '1.7',
                whiteSpace: 'pre-line',
                fontSize: '0.9375rem',
                marginBottom: '0.75rem',
                transition: 'color 0.2s'
              }}>
                {tweet}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: colors.textTertiary,
                textAlign: 'right',
                fontFeatureSettings: '"tnum"',
                transition: 'color 0.2s'
              }}>
                {tweet.length} chars
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
