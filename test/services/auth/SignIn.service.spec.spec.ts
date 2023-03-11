import { verify } from 'jsonwebtoken'
import { auth } from '../../../src/config/auth'

import { IUsersRepository } from '../../../src/repositories/user/IUsersRepository'
import { UsersRepositoryInMemory } from '../../../src/repositories/user/UsersRepositoryInMemory'
import { SignInService } from '../../../src/service/auth/SignIn.service'

let usersRepository: IUsersRepository
let signInService: SignInService

describe('Sign in service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    signInService = new SignInService(usersRepository)
  })

  it('Should be able to sign in with a existent user', async () => {
    const auth_user = await signInService.execute({
      email: 'test@email.com',
      password: '12345678',
    })

    expect(auth_user.name).toBe('test')
    expect(auth_user.photo_url).toBe('url')

    const token = verify(auth_user.token, auth.token_secret)

    expect(token.sub).toBe('test-id')
  })

  it('Should not be able to sign in with a wrong email', async () => {
    let expected_error
    try {
      await signInService.execute({
        email: 'wrong@email.com',
        password: '12345678',
      })
    } catch (err: any) {
      expected_error = err
    }

    expect(expected_error.message).toBe('Invalid email or password')
  })

  it('Should not be able to sign in with a wrong email', async () => {
    let expected_error
    try {
      await signInService.execute({
        email: 'test@email.com',
        password: '12334567',
      })
    } catch (err: any) {
      expected_error = err
    }

    expect(expected_error.message).toBe('Invalid email or password')
  })
})
