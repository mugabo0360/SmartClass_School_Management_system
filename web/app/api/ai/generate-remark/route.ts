// app/api/ai/generate-remark/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI - FREE tier: 60 requests/minute
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      studentName,
      subjectName,
      score,           // 1, 2, or 3 (CBC scores)
      competencyArea,  // "Knowledge", "Skills", "Values"
      term,
      level,           // "Primary", "Junior Secondary"
      additionalContext 
    } = body

    if (!studentName || !subjectName || !score) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Map CBC scores to descriptors
    const scoreDescriptors = {
      1: 'Beginning (Score 1) - The learner is at the beginning stage of acquiring this competency',
      2: 'Developing (Score 2) - The learner is progressing and developing this competency',
      3: 'Achieved (Score 3) - The learner has achieved/mastered this competency'
    }

    const scoreLevel = scoreDescriptors[score as 1|2|3]

    const prompt = `You are an expert educator writing CBC (Competency-Based Curriculum) report card remarks for a Ugandan school aligned with NCDC (National Curriculum Development Centre) guidelines.

STUDENT: ${studentName}
SUBJECT: ${subjectName}
LEVEL: ${level || 'Primary'}
TERM: ${term || 'Term 1'}
CBC SCORE: ${score}/3 - ${scoreLevel}
COMPETENCY AREA: ${competencyArea || 'General'}
${additionalContext ? `ADDITIONAL NOTES: ${additionalContext}` : ''}

Write a professional, encouraging, and specific descriptive remark for this student's report card. 

REQUIREMENTS:
- Write in third person (use student's name or "the learner")
- Be specific to the subject and competency level
- For Score 1: Be encouraging while honest about areas needing support
- For Score 2: Acknowledge progress and highlight areas to work on
- For Score 3: Celebrate achievement and encourage continued excellence
- Keep it between 2-4 sentences
- Use positive, professional language
- Reference specific skills or activities relevant to ${subjectName}
- Make it sound human, not generic
- This is for a Ugandan CBC curriculum report

Write ONLY the remark text, nothing else.`

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }) // Flash = FREE tier

    const result = await model.generateContent(prompt)
    const remark = result.response.text().trim()

    // Log usage for rate limiting tracking
    console.log(`AI remark generated for ${studentName} - ${subjectName} - Score ${score}`)

    return NextResponse.json({ 
      remark,
      score,
      studentName,
      subjectName,
      generated_at: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('AI remark generation error:', error)
    
    // Fallback remarks if AI fails
    const fallbackRemarks = {
      1: `${request.headers.get('x-student-name') || 'The learner'} is at the beginning stage of this subject and requires additional support and guidance to develop the required competencies.`,
      2: `${request.headers.get('x-student-name') || 'The learner'} is showing progress in this subject and is developing the required competencies with continued effort.`,
      3: `${request.headers.get('x-student-name') || 'The learner'} has demonstrated excellent achievement in this subject and has mastered the required competencies.`,
    }
    
    const body = await request.json().catch(() => ({}))
    const fallback = fallbackRemarks[body.score as 1|2|3] || fallbackRemarks[2]
    
    return NextResponse.json({ 
      remark: fallback,
      fallback: true,
      error: 'AI service temporarily unavailable, using standard remark'
    })
  }
}
