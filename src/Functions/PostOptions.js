import AWS from "aws-sdk";

import { postApiRequestCall } from "../backend/ApiRequests";
import { user_post_delete_url, user_post_edit_url } from '../backend/Apis';

/* post deletion */
export const deletePost = function(postId, createdOn, callback) {
    let payload = {
        postId: postId,
        createdOn: createdOn
    };
    postApiRequestCall(user_post_delete_url, payload, function (response) {
        if (response.data === true) {
            callback(true);
        } else {
            callback(false);
        }
    })
};

/* post edit */
export const editPost = function (postId, createdOn, questionId, editedContent, yesNoAnswer, userId, callback) {
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
            // console.log('Error message', err);
        } else {
            let payload = {
                postId,
                createdOn,
                path: key,
                yesOrNo: yesNoAnswer
            };
            postApiRequestCall(user_post_edit_url, payload, function (response) {
                if (response.data === true) {
                    callback(true);
                } else {
                    callback(false);
                }
            })
        }
    });
};