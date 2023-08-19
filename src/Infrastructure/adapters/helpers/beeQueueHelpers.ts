import redisConfig from '@/Infrastructure/db/redisConfig'
import Queue from 'bee-queue'
import { QueueAdapter, SendToQueueData } from '@/Domain/shared/adapters/queueAdapter'

const options: Queue.QueueSettings = {
    activateDelayedJobs: true,
    redis: redisConfig
}

export class BeQueueAdapter implements QueueAdapter{

    private queue: Queue = null

    async sendToQueue(data: SendToQueueData) : Promise<void>{
        this.queue = new Queue(data.name, options)

        this.queue.createJob(data.data)
            .retries(data.retries)
            .backoff('fixed', data.delay)
            .save()
    }
    
    async setSchemaProcess(data: any) : Promise<void>{
        this.queue.process(async(job: Queue.Job<any>, done: Queue.DoneCallback<any>) => {
            try {
                const result = await data(job.data)
                done(null, result)
            } catch (e: any) {
                throw new Error(e)
            }
        })
    }
}