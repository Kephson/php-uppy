import Uppy, {debugLogger} from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'
import ImageEditor from '@uppy/image-editor'
import Form from '@uppy/form'
import ScreenCapture from '@uppy/screen-capture'
import DropTarget from '@uppy/drop-target'
import Compressor from '@uppy/compressor'

/*
import "@uppy/core/dist/style.css"
import "@uppy/dashboard/dist/style.css"
import "@uppy/screen-capture/dist/style.css"
import "@uppy/image-editor/dist/style.css"
*/
const uppy = new Uppy({logger: debugLogger})
  // The main UI that shows files, progress and holds all plugins
  .use(Dashboard, {
    target: '.DashboardContainer',
    inline: true,
    height: 470,
    metaFields: [
      {id: 'name', name: 'Name', placeholder: 'file name'},
      {id: 'caption', name: 'Caption', placeholder: 'add description'},
    ],
    note: 'Images and video only, 2–3 files, up to 1 MB',
  })
  .use(XHRUpload, {
    endpoint: 'http://php-uppy.ddev.site/server.php',
    formData: true,
    fieldName: 'files[]',
  })
  .use(ScreenCapture, {target: Dashboard})
  .use(Form, {
    target: document.querySelector('form'),
    getMetaFromForm: true,
    addResultToForm: true,
    resultName: 'uppyResult',
    submitOnSuccess: true,
  })
  .use(ImageEditor, {target: Dashboard})
  // Allow dropping files on any element or the whole document
  .use(DropTarget, {target: document.body})
  // Optimize images
  .use(Compressor)

uppy.on('complete', result => {
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})
