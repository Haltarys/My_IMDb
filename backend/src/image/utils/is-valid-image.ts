export async function isValidImage(
  file: Express.Multer.File,
): Promise<boolean> {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
    return false;

  return true;
}
