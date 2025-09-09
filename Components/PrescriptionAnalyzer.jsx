import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';

const PrescriptionAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPEG, PNG, etc.)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for Tesseract
        setError('File size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      setError(null);
      setAnalysisResult(null);
      setExtractedText('');
      setOcrProgress(0);
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const fakeEvent = { target: { files: [file] } };
        handleImageSelect(fakeEvent);
      } else {
        setError('Please drop a valid image file');
      }
    }
  };

  // Enhanced medicines patterns for Indian prescriptions
  const medicalTerms = {
    antibiotics: ['amoxicillin', 'azithromycin', 'ciprofloxacin', 'doxycycline', 'clindamycin', 'amoxyclav', 'cefixime'],
    painRelief: ['paracetamol', 'acetaminophen', 'ibuprofen', 'aspirin', 'diclofenac', 'nimesulide', 'tramadol'],
    gastro: ['omeprazole', 'pantoprazole', 'ranitidine', 'domperidone', 'ondansetron', 'esmoprazole'],
    diabetes: ['metformin', 'insulin', 'glimepiride', 'sitagliptin', 'empagliflozin', 'gliclazide'],
    hypertension: ['amlodipine', 'losartan', 'atenolol', 'telmisartan', 'ramipril', 'nifedipine'],
    vitamins: ['vitamin', 'calcium', 'iron', 'folic', 'b12', 'omega', 'multivitamin']
  };

  const parsePrescriptionText = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const lowerText = text.toLowerCase();
    
    // Extract patient name (multiple patterns)
    let patientName = 'Not found';
    const patientPatterns = [
      /(?:patient|name):\s*([^\n\r]+)/i,
      /mr\.?\s+([a-zA-Z\s]{2,30})/i,
      /mrs\.?\s+([a-zA-Z\s]{2,30})/i,
      /ms\.?\s+([a-zA-Z\s]{2,30})/i,
      /(?:^|\n)([A-Z][a-z]+\s+[A-Z][a-z]+)/m
    ];
    
    for (const pattern of patientPatterns) {
      const match = text.match(pattern);
      if (match) {
        patientName = match[1].trim();
        break;
      }
    }

    // Extract doctor name
    let doctorName = 'Not found';
    const doctorPatterns = [
      /(?:dr\.?|doctor)\s*([^\n\r]+)/i,
      /physician:\s*([^\n\r]+)/i,
      /consultant:\s*([^\n\r]+)/i
    ];
    
    for (const pattern of doctorPatterns) {
      const match = text.match(pattern);
      if (match) {
        doctorName = `Dr. ${match[1].trim()}`;
        break;
      }
    }

    // Extract date with multiple formats
    let date = 'Not found';
    const datePatterns = [
      /(\d{1,2}[-\/\.]\d{1,2}[-\/\.]\d{2,4})/,
      /(\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{2,4})/i,
      /(\d{1,2}[-\/\.]\d{1,2}[-\/\.]\d{2})/
    ];
    
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match) {
        date = match[1];
        break;
      }
    }
    
    if (date === 'Not found') {
      date = new Date().toLocaleDateString();
    }

    // Enhanced medicine extraction
    const medicines = [];
    const foundMedicines = new Set();
    
    // Multiple medicine patterns for different prescription formats
    const medicinePatterns = [
      // Tab Paracetamol 500mg
      /(?:tab\.?|tablet)\s*([a-zA-Z]+(?:\s+[a-zA-Z]+)*)\s*(\d+\s*(?:mg|g|ml))/gi,
      // Cap Amoxicillin 250mg
      /(?:cap\.?|capsule)\s*([a-zA-Z]+(?:\s+[a-zA-Z]+)*)\s*(\d+\s*(?:mg|g|ml))/gi,
      // Syrup Crocin 120ml
      /(?:syp\.?|syrup)\s*([a-zA-Z]+(?:\s+[a-zA-Z]+)*)\s*(\d+\s*(?:mg|ml))/gi,
      // Paracetamol 500mg (direct format)
      /([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)\s+(\d+\s*(?:mg|g|ml))/g,
      // Medicine name followed by dosage on same line
      /([a-zA-Z]{3,}(?:\s+[a-zA-Z]{3,})*)\s*[-:]?\s*(\d+\s*(?:mg|g|ml))/gi
    ];

    medicinePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const medicineName = match[1].trim();
        const dosage = match[2].trim();
        
        // Skip if medicine name is too short or contains unwanted words
        if (medicineName.length < 3 || 
            /^(tab|cap|syp|the|and|for|with|take|dose)$/i.test(medicineName)) {
          continue;
        }
        
        const fullName = `${medicineName} ${dosage}`;
        const normalizedName = fullName.toLowerCase();
        
        if (!foundMedicines.has(normalizedName)) {
          foundMedicines.add(normalizedName);
          
          // Get surrounding context for this medicine
          const startIndex = Math.max(0, match.index - 150);
          const endIndex = Math.min(text.length, match.index + 300);
          const contextText = text.substring(startIndex, endIndex);
          
          medicines.push({
            name: fullName,
            dosage: dosage,
            frequency: extractFrequency(contextText),
            duration: extractDuration(contextText),
            instructions: extractInstructions(contextText),
            category: categorizeMedicine(medicineName.toLowerCase())
          });
        }
      }
    });

    // Extract additional instructions
    const additionalInstructions = [];
    
    const instructionPatterns = [
      { pattern: /follow.{0,15}up|revisit|review/i, instruction: "Follow up with doctor as advised" },
      { pattern: /complete.{0,20}course|finish.{0,20}medicine/i, instruction: "Complete the full course of medication" },
      { pattern: /drink.{0,20}water|plenty.{0,20}fluid/i, instruction: "Drink plenty of water" },
      { pattern: /avoid.{0,20}alcohol/i, instruction: "Avoid alcohol consumption" },
      { pattern: /rest|sleep/i, instruction: "Take adequate rest" },
      { pattern: /empty.{0,10}stomach/i, instruction: "Some medicines to be taken on empty stomach" },
      { pattern: /with.{0,10}food|after.{0,10}food/i, instruction: "Take medicines with food as advised" }
    ];
    
    instructionPatterns.forEach(({ pattern, instruction }) => {
      if (pattern.test(text)) {
        additionalInstructions.push(instruction);
      }
    });

    return {
      patientName,
      doctorName,
      date,
      medicines,
      additionalInstructions,
      confidence: calculateParsingConfidence(medicines, patientName, doctorName, text)
    };
  };

  const extractFrequency = (text) => {
    const lowerText = text.toLowerCase();
    
    // Common frequency patterns in prescriptions
    const frequencies = [
      { pattern: /\b(?:three times|3\s*times|thrice|tid|t\.i\.d)\b/i, value: "3 times daily" },
      { pattern: /\b(?:twice|2\s*times|bid|b\.i\.d)\b/i, value: "2 times daily" },
      { pattern: /\b(?:once|1\s*time|od|o\.d|daily)\b/i, value: "Once daily" },
      { pattern: /\b(?:four times|4\s*times|qid|q\.i\.d)\b/i, value: "4 times daily" },
      { pattern: /\b(?:as needed|prn|p\.r\.n|sos|when required)\b/i, value: "As needed" },
      { pattern: /\b(?:every.*hour|hourly|q\d*h)\b/i, value: "Every few hours" },
      { pattern: /\b(?:morning and evening|morning & evening)\b/i, value: "2 times daily" },
      { pattern: /\b(?:bedtime|hs|h\.s|night)\b/i, value: "At bedtime" }
    ];
    
    for (const freq of frequencies) {
      if (freq.pattern.test(lowerText)) {
        return freq.value;
      }
    }
    
    return "As prescribed";
  };

  const extractDuration = (text) => {
    const durationPatterns = [
      /(\d+)\s*(?:days?|day)/i,
      /(\d+)\s*(?:weeks?|week)/i,
      /(\d+)\s*(?:months?|month)/i,
      /for\s*(\d+)\s*(?:days?|weeks?|months?)/i
    ];
    
    for (const pattern of durationPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    if (/continue/i.test(text)) return "Continue as advised";
    if (/complete|finish/i.test(text)) return "Complete course";
    
    return "As prescribed";
  };

  const extractInstructions = (text) => {
    const lowerText = text.toLowerCase();
    
    const instructions = [
      { pattern: /\b(?:with food|after food|after meal|pc|p\.c)\b/i, value: "Take with food" },
      { pattern: /\b(?:before food|before meal|empty stomach|ac|a\.c)\b/i, value: "Take before food" },
      { pattern: /\b(?:with water|with plenty of water)\b/i, value: "Take with water" },
      { pattern: /\b(?:at bedtime|before sleep|hs|h\.s)\b/i, value: "Take at bedtime" },
      { pattern: /\b(?:in morning|morning time)\b/i, value: "Take in morning" },
      { pattern: /\b(?:avoid alcohol)\b/i, value: "Avoid alcohol" },
      { pattern: /\b(?:chew|chewable)\b/i, value: "Chew before swallowing" },
      { pattern: /\b(?:dissolve|soluble)\b/i, value: "Dissolve in water" }
    ];
    
    for (const inst of instructions) {
      if (inst.pattern.test(lowerText)) {
        return inst.value;
      }
    }
    
    return "Follow doctor's instructions";
  };

  const categorizeMedicine = (medicineName) => {
    for (const [category, medicines] of Object.entries(medicalTerms)) {
      if (medicines.some(med => medicineName.includes(med))) {
        return category;
      }
    }
    return 'general';
  };

  const calculateParsingConfidence = (medicines, patientName, doctorName, text) => {
    let confidence = 40; // Base confidence
    
    // Medicine-based confidence
    if (medicines.length > 0) confidence += 25;
    if (medicines.length > 2) confidence += 15;
    if (medicines.length > 4) confidence += 10;
    
    // Information completeness
    if (patientName !== 'Not found') confidence += 10;
    if (doctorName !== 'Not found') confidence += 10;
    
    // Text quality indicators
    const textLength = text.length;
    if (textLength > 200) confidence += 5;
    if (textLength > 500) confidence += 5;
    
    // Medical terms presence
    const medicalWords = ['mg', 'tablet', 'capsule', 'syrup', 'dose', 'daily'];
    const foundMedicalWords = medicalWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    confidence += Math.min(15, foundMedicalWords * 3);
    
    return Math.min(95, confidence);
  };

  const analyzePrescription = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    setOcrProgress(0);

    try {
      // Use Tesseract.js for OCR
      const result = await Tesseract.recognize(
        selectedImage,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setOcrProgress(Math.round(m.progress * 100));
            }
          }
        }
      );

      const extractedTextContent = result.data.text;
      setExtractedText(extractedTextContent);

      // Parse the extracted text
      const parsedData = parsePrescriptionText(extractedTextContent);
      
      setAnalysisResult({
        ...parsedData,
        ocrConfidence: Math.round(result.data.confidence)
      });

    } catch (err) {
      setError(`Failed to analyze prescription: ${err.message}`);
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
      setOcrProgress(0);
    }
  };

  const clearAll = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setExtractedText('');
    setError(null);
    setOcrProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadResults = () => {
    if (!analysisResult) return;
    
    const content = `
PRESCRIPTION ANALYSIS REPORT
============================

Patient: ${analysisResult.patientName}
Doctor: ${analysisResult.doctorName}
Date: ${analysisResult.date}
Analysis Confidence: ${analysisResult.confidence}%

MEDICINES:
${analysisResult.medicines.map((med, index) => `
${index + 1}. ${med.name}
   Frequency: ${med.frequency}
   Duration: ${med.duration}
   Instructions: ${med.instructions}
   Category: ${med.category}
`).join('\n')}

ADDITIONAL INSTRUCTIONS:
${analysisResult.additionalInstructions.map((inst, index) => `${index + 1}. ${inst}`).join('\n')}

RAW EXTRACTED TEXT:
${extractedText}

Generated on: ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription_analysis_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1c1c1c',
      padding: '2rem',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: 'transparent',
            border: '2px solid #ff6f00',
            color: '#ff6f00',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ff6f00';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#ff6f00';
          }}
        >
          ← Back to Home
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#ff6f00',
          marginBottom: '0.5rem'
        }}>
          Free AI Prescription Analyzer
        </h1>
        <p style={{
          color: '#cccccc',
          fontSize: '1.1rem'
        }}>
          Upload your prescription image and get free OCR analysis using Tesseract.js
        </p>
        <div style={{
          backgroundColor: '#2a2a2a',
          padding: '0.8rem',
          borderRadius: '0.5rem',
          marginTop: '1rem',
          border: '1px solid #4caf50'
        }}>
          <p style={{ color: '#4caf50', fontSize: '0.9rem', margin: 0 }}>
            ✅ 100% Free • No API costs • Works offline • Student-friendly
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: analysisResult ? '1fr 1fr' : '1fr',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Upload Section */}
        <div>
          <div
            style={{
              border: selectedImage ? '2px solid #ff6f00' : '2px dashed #666',
              borderRadius: '1rem',
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: '#2a2a2a',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />

            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Prescription preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}
                />
                <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                  {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(1)} MB)
                </p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff6f00' }}>📄</div>
                <h3 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                  Upload Prescription Image
                </h3>
                <p style={{ color: '#cccccc', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Drag and drop your prescription image here, or click to browse
                </p>
                <p style={{ color: '#999', fontSize: '0.8rem' }}>
                  Supports JPEG, PNG • Max size: 10MB • Free OCR processing
                </p>
              </div>
            )}
          </div>

          {/* OCR Progress */}
          {isAnalyzing && ocrProgress > 0 && (
            <div style={{
              marginTop: '1rem',
              backgroundColor: '#2a2a2a',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}>
              <p style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Processing OCR: {ocrProgress}%
              </p>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#444',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${ocrProgress}%`,
                  height: '100%',
                  backgroundColor: '#ff6f00',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          )}

          {error && (
            <div style={{
              backgroundColor: '#ff4444',
              color: '#ffffff',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginTop: '1rem',
              fontSize: '0.9rem'
            }}>
              ❌ {error}
            </div>
          )}

          {/* Tips for better results */}
          <div style={{
            marginTop: '1rem',
            backgroundColor: '#2a2a2a',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #333'
          }}>
            <h4 style={{ color: '#ff8f00', marginBottom: '0.5rem', fontSize: '1rem' }}>
              💡 Tips for Better Results:
            </h4>
            <ul style={{ color: '#cccccc', fontSize: '0.8rem', marginLeft: '1rem' }}>
              <li>Use good lighting when taking photo</li>
              <li>Keep the image straight and focused</li>
              <li>Ensure text is clearly visible</li>
              <li>Higher resolution = better accuracy</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={analyzePrescription}
              disabled={!selectedImage || isAnalyzing}
              style={{
                backgroundColor: selectedImage ? '#ff6f00' : '#666',
                color: '#ffffff',
                border: 'none',
                padding: '0.8rem 2rem',
                borderRadius: '2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: selectedImage ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              {isAnalyzing ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Analyzing...
                </>
              ) : (
                <>🔍 Analyze with Free OCR</>
              )}
            </button>

            {(selectedImage || analysisResult) && (
              <button onClick={clearAll} style={{
                backgroundColor: 'transparent',
                color: '#ff6f00',
                border: '2px solid #ff6f00',
                padding: '0.8rem 2rem',
                borderRadius: '2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                🗑️ Clear All
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {analysisResult && (
          <div style={{
            backgroundColor: '#2a2a2a',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid #333'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <h2 style={{
                color: '#ff6f00',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                OCR Analysis Results
              </h2>
              <div style={{
                backgroundColor: '#4caf50',
                color: '#ffffff',
                padding: '0.3rem 0.8rem',
                borderRadius: '1rem',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {analysisResult.confidence}% Confidence
              </div>
            </div>

            {/* Patient & Doctor Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1rem',
              backgroundColor: '#333',
              borderRadius: '0.5rem'
            }}>
              <div>
                <p style={{ color: '#999', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Patient</p>
                <p style={{ color: '#ffffff', fontWeight: 'bold' }}>{analysisResult.patientName}</p>
              </div>
              <div>
                <p style={{ color: '#999', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Doctor</p>
                <p style={{ color: '#ffffff', fontWeight: 'bold' }}>{analysisResult.doctorName}</p>
              </div>
              <div>
                <p style={{ color: '#999', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Date</p>
                <p style={{ color: '#ffffff', fontWeight: 'bold' }}>{analysisResult.date}</p>
              </div>
              <div>
                <p style={{ color: '#999', fontSize: '0.8rem', marginBottom: '0.2rem' }}>OCR Quality</p>
                <p style={{ 
                  color: analysisResult.ocrConfidence > 70 ? '#4caf50' : '#ffa000', 
                  fontWeight: 'bold' 
                }}>
                  {analysisResult.ocrConfidence || 'N/A'}%
                </p>
              </div>
            </div>

            {/* Raw extracted text */}
            <div style={{
              backgroundColor: '#1c1c1c',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
              border: '1px solid #444'
            }}>
              <h4 style={{ color: '#ff8f00', marginBottom: '0.5rem' }}>📝 Extracted Text:</h4>
              <div style={{
                maxHeight: '120px',
                overflow: 'auto',
                backgroundColor: '#0d1117',
                padding: '0.8rem',
                borderRadius: '0.3rem',
                border: '1px solid #333'
              }}>
                <pre style={{
                  color: '#cccccc',
                  fontSize: '0.8rem',
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                  fontFamily: 'monospace'
                }}>
                  {extractedText || 'No text extracted'}
                </pre>
              </div>
            </div>

            {/* Medicines */}
            <h3 style={{
              color: '#ff8f00',
              fontSize: '1.2rem',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              💊 Extracted Medicines ({analysisResult.medicines.length})
            </h3>

            {analysisResult.medicines.length > 0 ? (
              analysisResult.medicines.map((medicine, index) => (
                <div key={index} style={{
                  backgroundColor: '#1c1c1c',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  border: '1px solid #444'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <h4 style={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      💊 {medicine.name}
                    </h4>
                    <span style={{
                      backgroundColor: getCategoryColor(medicine.category),
                      color: '#ffffff',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '1rem',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      {medicine.category}
                    </span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.8rem',
                    fontSize: '0.9rem'
                  }}>
                    <div>
                      <span style={{ color: '#999' }}>Frequency:</span>
                      <span style={{ color: '#ffffff', marginLeft: '0.5rem', fontWeight: '500' }}>
                        {medicine.frequency}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#999' }}>Duration:</span>
                      <span style={{ color: '#ffffff', marginLeft: '0.5rem', fontWeight: '500' }}>
                        {medicine.duration}
                      </span>
                    </div>
                  </div>
                  <p style={{
                    color: '#ffa000',
                    fontSize: '0.85rem',
                    marginTop: '0.8rem',
                    marginBottom: 0,
                    fontStyle: 'italic'
                  }}>
                    ℹ️ {medicine.instructions}
                  </p>
                </div>
              ))
            ) : (
              <div style={{
                backgroundColor: '#333',
                padding: '2rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
                color: '#999',
                border: '2px dashed #555'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ marginBottom: '0.5rem' }}>No medicines could be clearly identified</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#777' }}>
                  Try uploading a clearer image with better lighting and focus, or check if the text is handwritten clearly.
                </p>
              </div>
            )}

            {/* Additional Instructions */}
            {analysisResult.additionalInstructions && analysisResult.additionalInstructions.length > 0 && (
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#333',
                borderRadius: '0.5rem'
              }}>
                <h3 style={{
                  color: '#ff8f00',
                  fontSize: '1.1rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  📋 Additional Instructions
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                  {analysisResult.additionalInstructions.map((instruction, index) => (
                    <li key={index} style={{
                      color: '#cccccc',
                      marginBottom: '0.4rem',
                      fontSize: '0.9rem',
                      lineHeight: '1.4'
                    }}>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={downloadResults}
                style={{
                  backgroundColor: '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '1.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
              >
                📄 Download Report
              </button>
              <button 
                onClick={() => window.print()}
                style={{
                  backgroundColor: '#2196f3',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '1.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1976d2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2196f3'}
              >
                🖨️ Print
              </button>
            </div>

            {/* OCR Info */}
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '0.5rem',
              border: '1px solid #333'
            }}>
              <p style={{
                color: '#888',
                fontSize: '0.8rem',
                margin: 0,
                textAlign: 'center'
              }}>
                ⚡ Powered by Tesseract.js - Free, open-source OCR • 
                Processing done locally on your device for privacy
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );

  // Helper function to get category colors
  function getCategoryColor(category) {
    const colors = {
      antibiotics: '#f44336',
      painRelief: '#9c27b0',
      gastro: '#4caf50',
      diabetes: '#ff9800',
      hypertension: '#2196f3',
      vitamins: '#8bc34a',
      general: '#607d8b'
    };
    return colors[category] || colors.general;
  }
};

export default PrescriptionAnalyzer;