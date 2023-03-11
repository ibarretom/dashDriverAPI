import { DataSource } from 'typeorm'
import { randomUUID } from 'node:crypto'

import request from 'supertest'

import { AppDataSource } from '../../../../src/config/typeorm'

import { app } from '../../../../src/app'

let connection: DataSource

describe('Create users controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'test',
      email: 'email@test.com',
      password: 'password',
    })

    expect(response.body.id).toBeDefined()
    expect(response.status).toBe(201)
  })

  it('Should not be able to create a user witch email has already been taken', async () => {
    const response = await request(app).post('/users').send({
      name: 'test',
      email: 'email@test.com',
      password: 'password',
    })

    expect(response.body.message).toBe('Email has already been taken')
    expect(response.status).toBe(400)
  })
})
