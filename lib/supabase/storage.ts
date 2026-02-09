import { supabase } from './client'

export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Blob
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
    
    if (error) {
      console.error('Upload error:', error)
      return null
    }
    
    return getPublicUrl(bucket, data.path)
  } catch (error) {
    console.error('Upload exception:', error)
    return null
  }
}

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path])
    
    if (error) {
      console.error('Delete error:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Delete exception:', error)
    return false
  }
}
