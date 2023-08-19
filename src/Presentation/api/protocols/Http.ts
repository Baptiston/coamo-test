export interface HttpResponse {
  statusCode: number
  body?: any
}

export interface HttpRequest {
  body?: any
  params?: any
  socket?: {
    remotePort?: number
  }
  ip?: string
  headers?: {
    'user-agent'?: string
    authorization?: string
  }
  query?: any
}
