// function upload(formData) {
//     const photos = formData.getAll('photos');
//     console.log(photos)
//     const promises = photos.map((x) => getImage(x)
//         .then(img => 
//             console.log(img)
//             (
//             {
//             id: img,
//             originalName: x.name,
//             fileName: x.name,
//             url: img
//         })));
//     return Promise.all(promises);
// }

import * as axios from 'axios';

const BASE_URL = 'http://localhost:3000';

function upload(formData) {
    const url = `${BASE_URL}/screen/add`;
    console.log(formData)
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field);
}

function getImage(file) {
    return new Promise((resolve, reject) => {
        const fReader = new FileReader();
        const img = document.createElement('img');

        fReader.onload = () => {
            img.src = fReader.result;
            resolve(getBase64Image(img));
        }

        fReader.readAsDataURL(file);
    })
}

function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL('image/png');

    return dataURL;
}

export { upload }