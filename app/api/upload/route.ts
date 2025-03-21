import { NextResponse } from "next/server"
import { put } from '@vercel/blob'

export async function POST(request: Request) {
  try {
    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN is not configured. Please set up Vercel Blob storage.')
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file type (optional)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob
    const filename = `${Date.now()}-${file.name}`
    const { url } = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true // Add random suffix to prevent naming conflicts
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Error uploading file:", error)
    const message = error instanceof Error ? error.message : "Failed to upload file"
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
