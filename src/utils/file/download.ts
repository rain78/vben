import { openWindow } from '..';
import { dataURLtoBlob, urlToBase64 } from './base64Conver';
import JSZip from 'jszip'
import FileSaver from 'file-saver'
/**
 * Download online pictures
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom);
  });
}

/**
 * Download pictures based on base64
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf);
  downloadByData(base64Buf, filename, mime, bom);
}

/**
 * Download according to the background interface file stream
 * @param {*} data
 * @param {*} filename
 * @param {*} mime
 * @param {*} bom
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });

  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}

/**
 * Download file according to file address
 * @param {*} sUrl
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName,
}: {
  url: string;
  target?: TargetContext;
  fileName?: string;
}): boolean {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!');
    return false;
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a');
    link.href = url;
    link.target = target;

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }

  openWindow(url, { target });
  return true;
}

export function downLoadSigleFile (file) {
  let num = file.url.lastIndexOf("/") + 1;
  let fileName = file.url.substring(num).split("?")[0];
  let fileSrc = '/upload/' + fileName;
  let name = fileName+'.'+file.suffix
  Promise.resolve().then(() => {
    return fetch(file.url+'?time='+(new Date().valueOf())).then(resp => resp.blob())
    // return fetch(fileSrc).then(resp => resp.blob())
  }).then((blob) => {
	  const url = URL.createObjectURL(blob);
	  const a = document.createElement("a");
	  a.download = name ;
	  a.href = url;
	  a.click();
	  a.remove();
	  URL.revokeObjectURL(url);
  })
}


export function downloadZip (files) {
  let zip = new JSZip();
  let folder = zip.folder('files');
  let filename='素材'+new Date()+'.zip'
  Promise.resolve().then(() => {
    return files.reduce((accumulator, item) => {
		let num = item.url.lastIndexOf("/") + 1;
		let fileName = item.url.substring(num).split("?")[0];
		let imgSrc = '/upload/' + fileName;
		let name = fileName+'.'+item.suffix
      return accumulator.then(() => fetch(item.url+'?time='+(new Date().valueOf()))//这里加上时间戳就可以
      // return accumulator.then(() => fetch(imgSrc)
                        .then(resp => resp.blob())
                        .then(blob => folder.file(name, blob)))
    }, Promise.resolve())
  }).then(() => {
    folder.generateAsync({type: "blob"}).then(content => FileSaver.saveAs(content, filename));
  })
}
