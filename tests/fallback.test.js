const request = require('supertest');
const express = require('express');
const { config, createAudioFromText } = require('../index.js');

// Mock the createAudioFromText function to simulate different scenarios
jest.mock('../index.js', () => {
  const originalModule = jest.requireActual('../index.js');
  return {
    ...originalModule,
    createAudioFromText: jest.fn(),
  };
});

describe('TTS Fallback Logic Tests', () => {
  let app;
  let mockCreateAudioFromText;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateAudioFromText = require('../index.js').createAudioFromText;
    
    // Create a simple Express app to test our API logic
    app = express();
    app.use(express.json());
    
    // Simplified version of our API endpoint for testing
    app.post('/api/test-fallback', async (req, res) => {
      try {
        const { text, voice } = req.body;
        const fallbackVoice = 'en_female_ht_f08_wonderful_world';
        let usedVoice = voice;

        try {
          // Try with original voice
          await mockCreateAudioFromText(text, 'test-file', voice);
        } catch (error) {
          // Check if this is an invalid speaker error
          if (error instanceof Error && error.message.includes('status_code: 4')) {
            try {
              // Try with fallback voice
              await mockCreateAudioFromText(text, 'test-file-fallback', fallbackVoice);
              usedVoice = fallbackVoice;
            } catch (fallbackError) {
              // If fallback also fails, return the exact error message
              throw fallbackError;
            }
          } else {
            // For other errors, rethrow as is
            throw error;
          }
        }

        res.json({ success: true, usedVoice });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  });

  test('Should use original voice when it is valid', async () => {
    // Mock successful generation with original voice
    mockCreateAudioFromText.mockResolvedValueOnce(undefined);

    const response = await request(app)
      .post('/api/test-fallback')
      .send({ text: 'Hello world', voice: 'en_male_wukong' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.usedVoice).toBe('en_male_wukong');
    expect(mockCreateAudioFromText).toHaveBeenCalledTimes(1);
    expect(mockCreateAudioFromText).toHaveBeenCalledWith('Hello world', 'test-file', 'en_male_wukong');
  });

  test('Should fallback to en_female_ht_f08_wonderful_world when original voice is invalid', async () => {
    // Mock failure with original voice (invalid speaker)
    mockCreateAudioFromText.mockRejectedValueOnce(new Error('Invalid speaker, please check the list of valid speaker values. status_code: 4'));
    // Mock success with fallback voice
    mockCreateAudioFromText.mockResolvedValueOnce(undefined);

    const response = await request(app)
      .post('/api/test-fallback')
      .send({ text: 'Hello world', voice: 'invalid_voice' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.usedVoice).toBe('en_female_ht_f08_wonderful_world');
    expect(mockCreateAudioFromText).toHaveBeenCalledTimes(2);
    expect(mockCreateAudioFromText).toHaveBeenNthCalledWith(1, 'Hello world', 'test-file', 'invalid_voice');
    expect(mockCreateAudioFromText).toHaveBeenNthCalledWith(2, 'Hello world', 'test-file-fallback', 'en_female_ht_f08_wonderful_world');
  });

  test('Should return exact backend error when both original and fallback voices fail', async () => {
    // Mock failure with original voice (invalid speaker)
    mockCreateAudioFromText.mockRejectedValueOnce(new Error('Invalid speaker, please check the list of valid speaker values. status_code: 4'));
    // Mock failure with fallback voice
    mockCreateAudioFromText.mockRejectedValueOnce(new Error('TikTok session id might be invalid or expired. status_code: 1'));

    const response = await request(app)
      .post('/api/test-fallback')
      .send({ text: 'Hello world', voice: 'invalid_voice' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('TikTok session id might be invalid or expired. status_code: 1');
    expect(mockCreateAudioFromText).toHaveBeenCalledTimes(2);
  });

  test('Should return exact backend error for non-speaker related errors without fallback', async () => {
    // Mock failure with original voice (non-speaker error)
    mockCreateAudioFromText.mockRejectedValueOnce(new Error('The provided text is too long. status_code: 2'));

    const response = await request(app)
      .post('/api/test-fallback')
      .send({ text: 'Very long text...', voice: 'en_male_wukong' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('The provided text is too long. status_code: 2');
    expect(mockCreateAudioFromText).toHaveBeenCalledTimes(1);
  });

  test('Should return exact backend error when fallback voice also has invalid speaker error', async () => {
    // Mock failure with original voice (invalid speaker)
    mockCreateAudioFromText.mockRejectedValueOnce(new Error('Invalid speaker, please check the list of valid speaker values. status_code: 4'));
    // Mock failure with fallback voice (also invalid speaker)
    mockCreateAudioFromText.mockRejectedValueOnce(new Error('Invalid speaker, please check the list of valid speaker values. status_code: 4'));

    const response = await request(app)
      .post('/api/test-fallback')
      .send({ text: 'Hello world', voice: 'invalid_voice' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Invalid speaker, please check the list of valid speaker values. status_code: 4');
    expect(mockCreateAudioFromText).toHaveBeenCalledTimes(2);
  });
});