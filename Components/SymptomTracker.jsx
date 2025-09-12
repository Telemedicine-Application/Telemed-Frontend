import React, { useState, useEffect } from 'react';
import { Plus, Calendar, TrendingUp, Brain, Save, Trash2, AlertCircle, Activity, Clock, Target, FileText } from 'lucide-react';

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    date: new Date().toISOString().split('T')[0],
    symptom: '',
    severity: 1,
    duration: '',
    triggers: '',
    notes: ''
  });
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const GEMINI_API_KEY = "AIzaSyDYJpFqdpQtCR0wLw4G_MCP1EK0dhyOfGs";

  const styles = {
    // Main Container
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif"
    },
    mainWrapper: {
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
    },
    
    // Header
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '12px',
      letterSpacing: '-0.02em'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '1.2rem',
      fontWeight: '400',
      margin: '0'
    },

    // Error Alert
    errorAlert: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#fff',
      padding: '16px 20px',
      borderRadius: '12px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      backdropFilter: 'blur(10px)'
    },

    // Grid Layout
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginBottom: '40px'
    },
    mobileGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '24px',
      marginBottom: '32px'
    },

    // Glass Card Effect
    glassCard: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(16px)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },

    // Card Headers
    cardHeader: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      color: '#ffffff',
      letterSpacing: '-0.01em'
    },

    // Form Elements
    formGrid: {
      display: 'grid',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '0.95rem',
      fontWeight: '500',
      marginBottom: '8px',
      color: 'rgba(255, 255, 255, 0.9)'
    },
    input: {
      padding: '14px 16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    inputFocus: {
      borderColor: 'rgba(255, 255, 255, 0.4)',
      boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.1)',
      outline: 'none'
    },
    textarea: {
      padding: '14px 16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      minHeight: '100px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      fontFamily: 'inherit'
    },

    // Range Slider
    rangeContainer: {
      marginTop: '8px'
    },
    rangeSlider: {
      width: '100%',
      height: '6px',
      borderRadius: '3px',
      background: 'rgba(255, 255, 255, 0.2)',
      outline: 'none',
      appearance: 'none'
    },
    rangeLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginTop: '8px'
    },
    severityValue: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#ffffff',
      background: 'rgba(255, 255, 255, 0.15)',
      padding: '4px 12px',
      borderRadius: '20px'
    },

    // Buttons
    primaryButton: {
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 24px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(79, 70, 229, 0.3)'
    },
    primaryButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)'
    },
    primaryButtonDisabled: {
      background: 'rgba(255, 255, 255, 0.1)',
      cursor: 'not-allowed',
      boxShadow: 'none',
      transform: 'none'
    },
    secondaryButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 24px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
      width: '100%'
    },

    // Stats Section
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '20px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '4px',
      lineHeight: '1'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.7)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    mostCommonCard: {
      background: 'rgba(139, 69, 19, 0.15)',
      borderRadius: '16px',
      padding: '20px',
      textAlign: 'center',
      border: '1px solid rgba(139, 69, 19, 0.3)'
    },
    mostCommonLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    mostCommonValue: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#ffffff'
    },

    // Analysis Section
    analysisBox: {
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '24px',
      maxHeight: '400px',
      overflowY: 'auto',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '20px'
    },
    analysisText: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.9)',
      whiteSpace: 'pre-wrap'
    },

    // Severity Badges
    severityBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    severityLow: {
      background: 'rgba(34, 197, 94, 0.2)',
      color: '#22c55e',
      border: '1px solid rgba(34, 197, 94, 0.3)'
    },
    severityMedium: {
      background: 'rgba(251, 191, 36, 0.2)',
      color: '#fbbf24',
      border: '1px solid rgba(251, 191, 36, 0.3)'
    },
    severityHigh: {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    },

    // History Section
    historySection: {
      marginTop: '40px'
    },
    historyList: {
      maxHeight: '500px',
      overflowY: 'auto',
      display: 'grid',
      gap: '16px'
    },
    symptomItem: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease'
    },
    symptomItemHover: {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
    },
    symptomHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    symptomTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '8px'
    },
    symptomInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    deleteButton: {
      background: 'rgba(239, 68, 68, 0.2)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ef4444',
      borderRadius: '10px',
      padding: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    deleteButtonHover: {
      background: 'rgba(239, 68, 68, 0.3)',
      transform: 'scale(1.1)'
    },
    symptomDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginTop: '16px'
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem'
    },
    detailIcon: {
      color: 'rgba(255, 255, 255, 0.6)'
    },
    symptomNotes: {
      marginTop: '16px',
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    notesLabel: {
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    notesText: {
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: '1.5'
    },

    // Empty State
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: 'rgba(255, 255, 255, 0.6)'
    },
    emptyIcon: {
      marginBottom: '16px',
      opacity: '0.5'
    },
    emptyTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '8px',
      color: 'rgba(255, 255, 255, 0.8)'
    },
    emptyText: {
      fontSize: '1rem',
      lineHeight: '1.5'
    },

    // Footer
    disclaimer: {
      marginTop: '40px',
      textAlign: 'center',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    disclaimerText: {
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.5'
    }
  };

  // Load symptoms from localStorage on component mount
  useEffect(() => {
    const savedSymptoms = localStorage.getItem('symptoms');
    if (savedSymptoms) {
      try {
        setSymptoms(JSON.parse(savedSymptoms));
      } catch (error) {
        console.error('Error parsing saved symptoms:', error);
      }
    }
  }, []);

  // Save symptoms to localStorage whenever symptoms change
  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  const addSymptom = () => {
    if (!currentSymptom.symptom.trim()) return;
    
    const newSymptom = {
      ...currentSymptom,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    setSymptoms(prev => [newSymptom, ...prev]);
    
    // Reset form
    setCurrentSymptom({
      date: new Date().toISOString().split('T')[0],
      symptom: '',
      severity: 1,
      duration: '',
      triggers: '',
      notes: ''
    });
  };

  const deleteSymptom = (id) => {
    setSymptoms(prev => prev.filter(s => s.id !== id));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) {
      setAnalysis('No symptoms recorded yet. Please add some symptoms to get analysis.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const symptomsText = symptoms.slice(0, 10).map(s => 
        `Date: ${s.date}, Symptom: ${s.symptom}, Severity: ${s.severity}/10, Duration: ${s.duration || 'Not specified'}, Triggers: ${s.triggers || 'None noted'}, Notes: ${s.notes || 'None'}`
      ).join('\n\n');

      const prompt = `As a healthcare AI assistant, please analyze these symptom records and provide insights about potential patterns, triggers, and general wellness recommendations. Please note this is for informational purposes only and not medical advice:

${symptomsText}

Please provide:
1. **Pattern Analysis**: What patterns do you notice in the symptoms?
2. **Trigger Identification**: What potential triggers can you identify?
3. **Wellness Recommendations**: General lifestyle suggestions that might help
4. **When to Consult**: When should the person consider seeing a healthcare provider?

Remember to emphasize that this analysis is not medical advice and professional medical consultation is recommended for persistent or concerning symptoms.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        setAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setError('Unable to analyze symptoms at this time. Please check your internet connection and try again.');
      setAnalysis('');
    }
    
    setLoading(false);
  };

  const getSeverityStyle = (severity) => {
    const severityNum = parseInt(severity);
    if (severityNum <= 3) return { ...styles.severityBadge, ...styles.severityLow };
    if (severityNum <= 6) return { ...styles.severityBadge, ...styles.severityMedium };
    return { ...styles.severityBadge, ...styles.severityHigh };
  };

  const getRecentTrends = () => {
    const last7Days = symptoms.filter(s => {
      const symptomDate = new Date(s.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return symptomDate >= weekAgo;
    });

    const avgSeverity = last7Days.length > 0 
      ? (last7Days.reduce((sum, s) => sum + parseInt(s.severity), 0) / last7Days.length).toFixed(1)
      : 'N/A';

    return {
      count: last7Days.length,
      avgSeverity,
      mostCommon: last7Days.reduce((acc, s) => {
        acc[s.symptom] = (acc[s.symptom] || 0) + 1;
        return acc;
      }, {})
    };
  };

  const trends = getRecentTrends();
  const mostCommonSymptom = Object.keys(trends.mostCommon).reduce((a, b) => 
    trends.mostCommon[a] > trends.mostCommon[b] ? a : b, ''
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.mainWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>AI Symptom Tracker</h1>
          <p style={styles.subtitle}>Professional health monitoring with intelligent insights</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={styles.errorAlert}>
            <AlertCircle style={{ marginRight: '12px' }} size={20} />
            {error}
          </div>
        )}

        {/* Main Content Grid */}
        <div style={isMobile ? styles.mobileGrid : styles.mainGrid}>
          {/* Add New Symptom Form */}
          <div style={styles.glassCard}>
            <h2 style={styles.cardHeader}>
              <Plus style={{ marginRight: '12px' }} size={24} />
              Log New Symptom
            </h2>
            
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date</label>
                <input
                  type="date"
                  value={currentSymptom.date}
                  onChange={(e) => setCurrentSymptom({...currentSymptom, date: e.target.value})}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Symptom</label>
                <input
                  type="text"
                  value={currentSymptom.symptom}
                  onChange={(e) => setCurrentSymptom({...currentSymptom, symptom: e.target.value})}
                  placeholder="e.g., Headache, Fatigue, Nausea, Joint Pain"
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Severity Level</label>
                <div style={styles.rangeContainer}>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentSymptom.severity}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, severity: e.target.value})}
                    style={styles.rangeSlider}
                  />
                  <div style={styles.rangeLabels}>
                    <span>Mild (1)</span>
                    <span style={styles.severityValue}>{currentSymptom.severity}</span>
                    <span>Severe (10)</span>
                  </div>
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  type="text"
                  value={currentSymptom.duration}
                  onChange={(e) => setCurrentSymptom({...currentSymptom, duration: e.target.value})}
                  placeholder="e.g., 2 hours, All day, 30 minutes, Ongoing"
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Possible Triggers</label>
                <input
                  type="text"
                  value={currentSymptom.triggers}
                  onChange={(e) => setCurrentSymptom({...currentSymptom, triggers: e.target.value})}
                  placeholder="e.g., Stress, Food, Weather, Exercise, Sleep"
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Additional Notes</label>
                <textarea
                  value={currentSymptom.notes}
                  onChange={(e) => setCurrentSymptom({...currentSymptom, notes: e.target.value})}
                  placeholder="Describe any additional details, context, or observations..."
                  style={styles.textarea}
                />
              </div>
              
              <button
                onClick={addSymptom}
                disabled={!currentSymptom.symptom.trim()}
                style={{
                  ...styles.primaryButton,
                  ...(currentSymptom.symptom.trim() ? {} : styles.primaryButtonDisabled)
                }}
              >
                <Save size={18} />
                Log Symptom
              </button>
            </div>
          </div>

          {/* Stats & Analysis Panel */}
          <div>
            {/* Weekly Trends */}
            <div style={styles.glassCard}>
              <h3 style={styles.cardHeader}>
                <TrendingUp style={{ marginRight: '12px' }} size={24} />
                Weekly Overview
              </h3>
              
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{trends.count}</div>
                  <div style={styles.statLabel}>Symptoms Logged</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{trends.avgSeverity}</div>
                  <div style={styles.statLabel}>Avg Severity</div>
                </div>
              </div>
              
              {mostCommonSymptom && (
                <div style={styles.mostCommonCard}>
                  <div style={styles.mostCommonLabel}>Most Common This Week</div>
                  <div style={styles.mostCommonValue}>{mostCommonSymptom}</div>
                </div>
              )}
            </div>

            {/* AI Analysis */}
            <div style={{ ...styles.glassCard, marginTop: '32px' }}>
              <h3 style={styles.cardHeader}>
                <Brain style={{ marginRight: '12px' }} size={24} />
                AI Health Insights
              </h3>
              
              <button
                onClick={analyzeSymptoms}
                disabled={loading || symptoms.length === 0}
                style={{
                  ...styles.secondaryButton,
                  ...(loading || symptoms.length === 0 ? styles.primaryButtonDisabled : {})
                }}
              >
                <Activity size={18} />
                {loading ? 'Analyzing Patterns...' : 'Generate AI Analysis'}
              </button>
              
              {analysis && (
                <div style={styles.analysisBox}>
                  <div style={styles.analysisText}>{analysis}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Symptom History */}
        <div style={{ ...styles.glassCard, ...styles.historySection }}>
          <h2 style={styles.cardHeader}>
            <Calendar style={{ marginRight: '12px' }} size={24} />
            Symptom History ({symptoms.length} entries)
          </h2>
          
          {symptoms.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <Activity size={48} />
              </div>
              <h3 style={styles.emptyTitle}>No symptoms recorded yet</h3>
              <p style={styles.emptyText}>
                Start tracking your health by logging your first symptom above.<br />
                Regular tracking helps identify patterns and triggers.
              </p>
            </div>
          ) : (
            <div style={styles.historyList}>
              {symptoms.map(symptom => (
                <div 
                  key={symptom.id} 
                  style={styles.symptomItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = styles.symptomItemHover.background;
                    e.currentTarget.style.transform = styles.symptomItemHover.transform;
                    e.currentTarget.style.boxShadow = styles.symptomItemHover.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = styles.symptomItem.background;
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.symptomHeader}>
                    <div>
                      <div style={styles.symptomTitle}>{symptom.symptom}</div>
                      <div style={styles.symptomInfo}>
                        <span style={getSeverityStyle(symptom.severity)}>
                          Severity: {symptom.severity}/10
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSymptom(symptom.id)}
                      style={styles.deleteButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = styles.deleteButtonHover.background;
                        e.currentTarget.style.transform = styles.deleteButtonHover.transform;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = styles.deleteButton.background;
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div style={styles.symptomDetails}>
                    <div style={styles.detailItem}>
                      <Calendar style={styles.detailIcon} size={16} />
                      <span><strong>Date:</strong> {new Date(symptom.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div style={styles.detailItem}>
                      <Clock style={styles.detailIcon} size={16} />
                      <span><strong>Duration:</strong> {symptom.duration || 'Not specified'}</span>
                    </div>
                    
                    <div style={styles.detailItem}>
                      <Target style={styles.detailIcon} size={16} />
                      <span><strong>Triggers:</strong> {symptom.triggers || 'None noted'}</span>
                    </div>
                  </div>
                  
                  {symptom.notes && (
                    <div style={styles.symptomNotes}>
                      <div style={styles.notesLabel}>
                        <FileText size={14} style={{ marginRight: '6px' }} />
                        Additional Notes
                      </div>
                      <div style={styles.notesText}>{symptom.notes}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Professional Disclaimer */}
        <div style={styles.disclaimer}>
          <div style={styles.disclaimerText}>
            <AlertCircle size={16} style={{ marginRight: '8px', display: 'inline' }} />
            <strong>Medical Disclaimer:</strong> This tool is designed for personal health tracking and informational purposes only. 
            The AI analysis provided is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always consult with qualified healthcare providers regarding any health concerns or before making medical decisions.
            <br /><br />
            <strong>Data Privacy:</strong> All your symptom data is stored locally in your browser and is not transmitted to any servers except for AI analysis requests.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;

