import { IUsersRepository } from '../../../src/repositories/user/IUsersRepository'
import { UsersRepositoryInMemory } from '../../../src/repositories/user/UsersRepositoryInMemory'
import { CreateUsersService } from '../../../src/service/users/CreateUsers.service'

let usersRepository: IUsersRepository
let createUsersService: CreateUsersService

describe('Create users service', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    createUsersService = new CreateUsersService(usersRepository)
  })

  it('Should be able to register a new user', async () => {
    const user = {
      name: 'user test',
      email: 'test@jest.com',
      password: 'password',
    }

    let createdUser
    let expectedError

    try {
      createdUser = await createUsersService.execute(user)
    } catch (err) {
      expectedError = err
    }

    expect(createdUser?.id).toBe('test-id-created')
    expect(expectedError).toBe(undefined)
  })

  it('Should not be able to register a user with email that has been already taken', async () => {
    const user = {
      name: 'user test',
      email: 'test@email.com',
      password: 'password',
    }

    let expectedError: any

    try {
      await createUsersService.execute(user)
    } catch (err) {
      expectedError = err
    }

    expect(expectedError.message).toBe('Email has already been taken')
  })
})
