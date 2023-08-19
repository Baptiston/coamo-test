import { HttpResponse } from './HttpResponse'

export interface HttpPostParams {
  url: string
  body?: any
  headers?: Record<string, any>
}

export interface HttpPostClient<R = any> {
  post: (params: HttpPostParams) => Promise<HttpResponse<R>>
}
