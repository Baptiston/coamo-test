import { HttpResponse } from '@/Presentation/api/protocols/Http'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})

export const notImplemented = (error: Error): HttpResponse => ({
  statusCode: 501,
  body: error
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const requestTimeout = (error: Error): HttpResponse => ({
  statusCode: 408,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const noContent = (): HttpResponse => ({
  statusCode: 204
})

export const created = (data?: any): HttpResponse => ({
  statusCode: 201,
  body: data ? {
    data
  } : undefined
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: {
    data
  }
})
