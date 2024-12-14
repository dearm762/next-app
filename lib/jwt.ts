import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key'

export function generateAccessToken(user: { id: string; email: string }): string {
	return jwt.sign(
		{ id: user.id, email: user.email },
		JWT_SECRET,
		{ expiresIn: '5d' }
	)
}
