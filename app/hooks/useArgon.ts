import argon2 from 'argon2'

export const useArgon = () => {
  const hashPassword = async (password: string) => {
    try {
      return await argon2.hash(password, {
        type: argon2.argon2id, // Use Argon2id (recommended)
        memoryCost: 2 ** 16, // 64 MB
        timeCost: 5, // Number of iterations
        parallelism: 2 // Number of threads
      })
    } catch (error) {
      console.error('Error hashing password:', error)
      throw error
    }
  }

  return { hashPassword }
}
