import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Import the existing TTS functionality
const { config, createAudioFromText } = require('../../../../index.js')

export async function POST(request: NextRequest) {
  try {
    const { text, voice } = await request.json()

    if (!text || !voice) {
      return NextResponse.json(
        { error: 'Text and voice are required' },
        { status: 400 }
      )
    }

    // Check if TikTok session ID is configured
    const sessionId = process.env.TIKTOK_SESSION_ID
    if (!sessionId) {
      return NextResponse.json(
        { error: 'TikTok session ID not configured. Please set TIKTOK_SESSION_ID environment variable.' },
        { status: 500 }
      )
    }

    // Configure the TTS with session ID
    config(sessionId)

    // Generate a unique filename
    const uniqueId = uuidv4()
    const filename = `tts-${uniqueId}`
    const tempDir = path.join(process.cwd(), 'tmp')
    
    // Ensure temp directory exists
    try {
      await fs.mkdir(tempDir, { recursive: true })
    } catch (err) {
      // Directory might already exist
    }

    const filePath = path.join(tempDir, filename)

    // Generate the audio file
    await createAudioFromText(text, filePath, voice)

    // Read the generated file
    const audioFilePath = `${filePath}.mp3`
    const audioBuffer = await fs.readFile(audioFilePath)

    // Clean up the temporary file
    try {
      await fs.unlink(audioFilePath)
    } catch (err) {
      console.warn('Failed to clean up temporary file:', err)
    }

    // Return the audio file
    return new NextResponse(audioBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="tiktok-tts-${voice}.mp3"`,
      },
    })

  } catch (error) {
    console.error('TTS generation error:', error)
    
    let errorMessage = 'Failed to generate audio'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}