import canvas from 'canvas-api-wrapper'

canvas.subdomain= 'andela'
canvas.apiToken = '11758~C3Gi4G3yid8S9iuzSsoV0mJ4qCHVy1Z7KhW5SU3F4tOcHqyCzsuJlY1QtAhmtZ8M'
canvas.rateLimitBuffer = 300;

// How many to send synchronously at the same time, the higher this
// number, the more it will go over your rateLimitBuffer
canvas.callLimit = 30;
 
// How much the calls are staggered (milliseconds) especially at the
// beginning so that it doesn't send the callLimit all at the same time
canvas.minSendInterval = 10;
 
// After it goes under the rateLimitBuffer, how often (in milliseconds) 
// to check what the buffer is at now, this should be pretty high because
// there will be a lot of threads checking at the same time.
canvas.checkStatusInterval = 2000;

canvas.oncall = function(e){
    console.log(e)
}

export default canvas