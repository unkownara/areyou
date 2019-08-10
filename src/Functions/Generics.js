import AWS from "aws-sdk";

export function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export function getRandomColor(char) {
    switch (char) {
        case 'a':
            return '#BECECD';
        case 'b':
            return '#DECBED';
        case 'c':
            return '#EFCBCB';
        case 'd':
            return '#DBBCBB';
        case 'e':
            return '#BCFEDF';
        case 'f':
            return '#FCBCBE';
        case 'g':
            return '#CEFFDD';
        case 'h':
            return '#DCCECF';
        case 'i':
            return '#CEBCBD';
        case 'j':
            return '#BECFFD';
        case 'k':
            return '#CCFCCD';
        case 'l':
            return '#CDDCCF';
        case 'm':
            return '#CDEDEB';
        case 'n':
            return '#EDCCDE';
        case 'o':
            return '#FDDDFC';
        case 'p':
            return '#CEEFEC';
        case 'q':
            return '#BCDFBD';
        case 'r':
            return '#CBEFFC';
        case 's':
            return '#EBBECC';
        case 't':
            return '#DEEEED';
        case 'u':
            return '#DBBDFC';
        case 'v':
            return '#FCBCBD';
        case 'w':
            return '#CFFCCC';
        case 'x':
            return '#FCDCCD';
        case 'y':
            return '#CBBECB';
        case 'z':
            return '#DFEFDD';
        default:
            break;
    }
}


export const GA_ID = 'UA-145111269-1';

export function getDate() {
    let nowDate = new Date();
    console.log(nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate())
    return nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
}

export function getDate1(date) {
    let dateString = new Date(parseInt(date));
    dateString = new Date(dateString).toUTCString();
    dateString = dateString.split(' ').slice(0, 4).join(' ');
    return dateString;
}
