// let fileUrl = require('./ui-video-simple-john-hansen.sketch');
let fileUrl = require('./Fitness App.sketch');

export default {props: {blob: fetch(fileUrl).then(response => response.blob())}}