import {MimeTypes, PermissionDefaults} from '../../lib'

import {areaHorizontal, barCharSpec, gantChart} from './data/contentWithSpecsData.mjs'

export class RepositoryDataHelper {

  static create() {
    return new RepositoryDataHelper()
  }

   static getVariousResources = async () => {
    return [{
        parent: '/',
        name: 'Bar Char',
        preview: 'url/to/preview/here',
        mime: MimeTypes.VegaLite,
        permission: PermissionDefaults.Public,
        content: {spec: barCharSpec}
    },
      {
          parent: '/',
          name: 'Gant Chart',
          preview: 'url/to/preview/here',
          mime: MimeTypes.VegaLite,
          permission: PermissionDefaults.Public,
          content: {spec: gantChart}
      },
      {
          parent: '/',
          name: 'Area Horizontal',
          preview: 'url/to/preview/here',
          mime: MimeTypes.VegaLite,
          permission: PermissionDefaults.Public,
          content: {spec: areaHorizontal}
      }]
  }
}


