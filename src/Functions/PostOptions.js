 import { postApiRequestCall } from "../backend/ApiRequests";
 
 /* post deletion */
    const deletePost = (postId, createdOn) => {
        let payload = {
            postId: postId,
            createdOn: createdOn
        };
        postApiRequestCall(user_post_delete_url, payload, function (response) {
            if (response.data === true) {
                console.log('Successfully deleted');
            }
        })
    };

    /* post edit */
    const editPost = (postId, createdOn, questionId, editedContent, userId) => {
        AWS.config = new AWS.Config();
        AWS.config.accessKeyId = "AKIAJCVUQBOPFUF54MJQ";
        AWS.config.secretAccessKey = "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";
        AWS.config.region = "us-east-2";
        let key = `${userId}/${questionId}/${postId}.txt`;
        let s3Bucket = new AWS.S3();
        let s3Obj = {
            Bucket: 'areyou-posts',
            Key: key,
            Body: editedContent,
            ACL: 'public-read',
            ContentType: 'text/plain; charset=us-ascii'
        };
        s3Bucket.putObject(s3Obj, function (err, data) {
            if (err) {
                console.log('Error message', err);
            } else {
                let payload = {
                    postId,
                    createdOn,
                    path: key
                };
                postApiRequestCall(user_post_edit_url, payload, function (response) {
                    if (response.data === true) {
                        console.log('updated successfully');
                    }
                })
            }
        });
    };