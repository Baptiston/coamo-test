import { Request, Response } from 'express'
import { HttpRequest } from '@/Presentation/api/protocols/Http'
import { Controller } from '@/Presentation/api/protocols/Controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      ip: req.ip,
      body: req.body,
      headers: req.headers,
      socket: req.socket,
      params: req.params,
      query: req.query
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
