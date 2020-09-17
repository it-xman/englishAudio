var Minio = require('minio')

// Instantiate the minio client with the endpoint
// and access keys as shown below.
var minioClient = new Minio.Client({
    endPoint: 'atlantide.top',
    port: 9000,
    useSSL: true,
    accessKey: 'Ce7YgKFL73veLqEea',
    secretKey: 'Wt3h2MThePHD2D9n5RdVquLdTeHd14vwT'
});
// const path=require('path')
// // File that needs to be uploaded.
// var file = path.resolve('server/tmp/photos-europe.tar')
//
// // Make a bucket called europetrip.
// minioClient.makeBucket('ddddddasdass', 'us-east-1', function(err) {
//     if (err) return console.log(err)
//
//     // console.log('Bucket created successfully in "us-east-1".')
//
//     var metaData = {
//         'Content-Type': 'application/octet-stream',
//         'X-Amz-Meta-Testing': 1234,
//         'example': 5678
//     }
//     // Using fPutObject API upload your file to the bucket europetrip.
//     minioClient.fPutObject('ddddddasdass', 'photos-europe.tar', file, metaData, function(err, etag) {
//         if (err) return console.log(err)
//         console.log('File uploaded successfully.')
//         console.log(etag)
//     });
// });

// var size = 0
// minioClient.getObject('ddddddasdass', 'photos-europe.tar', function(err, dataStream) {
//     if (err) {
//         return console.log(err)
//     }
//     dataStream.on('data', function(chunk) {
//         size += chunk.length
//     })
//     dataStream.on('end', function() {
//         console.log('End. Total size = ' + size)
//     })
//     dataStream.on('error', function(err) {
//         console.log(err)
//     })
// })

var listener = minioClient.listenBucketNotification('ddddddasdass', 'photos/', '.jpg', ['s3:ObjectCreated:*'])
listener.on('notification', function(record) {
    // For example: 's3:ObjectCreated:Put event occurred (2016-08-23T18:26:07.214Z)'
    console.log('%s event occurred (%s)', record.eventName, record.eventTime)
    listener.stop()
})
