'use client'

import signUp from '@/actions/auth/sign-up'
import { ArrowRight } from 'lucide-react'
import { FormEvent, useState } from 'react'

const SignUpForm = () => {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			const res = await fetch('http://localhost:5000/auth/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			})

			const data = await res.json()
			if (!data.error) {
				signUp(email)
				setError('')
			} else {
				setError(data.message)
			}
		} catch (err) {
			setError('An error occurred during sign-up. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form className='mx-auto mt-16 flex flex-col gap-5' onSubmit={handleSubmit}>
			<input
				type="email"
				minLength={5}
				placeholder="Enter your email:"
				className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
				value={email}
				onChange={({ target }) => setEmail(target.value)}
				required
			/>
			<button className="btn btn-outline">
				<span>Verify email</span>
				<ArrowRight size={19} className='ml-[-5px]' />
			</button>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	)
}

export default SignUpForm