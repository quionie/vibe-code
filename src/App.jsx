import { useState } from 'react';
import './App.css';

const STYLE_PRESETS = {
  miggy: {
    name: 'Miggy',
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

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '0.5rem',
        color: '#1a1a1a'
      }}>
        Vibe Tweet Generator
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Generate authentic tweets in your chosen style
      </p>

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
            fontWeight: '600',
            color: '#333'
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
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#333'
          }}>
            Style Preset
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxSizing: 'border-box',
              backgroundColor: 'white'
            }}
          >
            <option value="miggy">Miggy (witty, web3-native)</option>
            <option value="explainer">Explainer (clear + educational)</option>
            <option value="hot-take">Hot take (spicy but not cringe)</option>
          </select>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#333'
          }}>
            {selectedPreset.name} Rules
          </div>
          <ul style={{
            margin: 0,
            paddingLeft: '1.25rem',
            color: '#555',
            fontSize: '0.9rem',
            lineHeight: '1.6'
          }}>
            {selectedPreset.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'white',
            backgroundColor: topic.trim() ? '#1a73e8' : '#ccc',
            border: 'none',
            borderRadius: '8px',
            cursor: topic.trim() ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (topic.trim()) {
              e.target.style.backgroundColor = '#1557b0';
            }
          }}
          onMouseLeave={(e) => {
            if (topic.trim()) {
              e.target.style.backgroundColor = '#1a73e8';
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
          gap: '1rem'
        }}>
          {tweets.map((tweet, index) => (
            <div
              key={index}
              style={{
                padding: '1.25rem',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Option {index + 1}
                </div>
                <button
                  onClick={() => handleCopy(tweet, index)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'white',
                    backgroundColor: copiedIndex === index ? '#34a853' : '#1a73e8',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{
                color: '#333',
                lineHeight: '1.6',
                whiteSpace: 'pre-line',
                fontSize: '0.95rem'
              }}>
                {tweet}
              </div>
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                color: '#999',
                textAlign: 'right'
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
