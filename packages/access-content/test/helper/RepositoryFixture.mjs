import {MimeTypes, PermissionDefaults} from '../../lib'

import {areaHorizontal, barCharSpec, gantChart, barBinned, barColorDisabled} from './data/contentWithSpecsData.mjs'

export class RepositoryFixture {

  static create() {
    return new RepositoryFixture()
  }

  static getSomeResource() {
    return {
      name: 'Bar Char',
      preview: 'url/to/preview/here',
      mime: 'application/json+vega-lite',
      permission: PermissionDefaults.Public
    }

  }

   static getVariousResources = async () => {
    return [{
        parent: '/',
        name: 'Bar Char',
        preview: 'url/to/preview/here',
        mime: MimeTypes.VegaLite,
        permission: PermissionDefaults.Public,
        // TODO: 'access-content' skip spec nesting, just a content
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
      },
      {
        parent: '/',
        name: 'Bar Binned',
        preview: 'url/to/preview/here',
        mime: MimeTypes.VegaLite,
        permission: PermissionDefaults.Public,
        content: {spec: barBinned}
      },
      {
        parent: '/',
        name: 'Bar Color Disabled',
        preview: 'url/to/preview/here',
        mime: MimeTypes.VegaLiteTheme,
        permission: PermissionDefaults.Public,
        content: {spec: barColorDisabled}
      }
    ]
  }

  static getRepoPath() {
    return {
      repo : 'default',
      owner: 'joe',
      folder: '/'
    }
  }

  static getResourceFolderUri(path = '/') {
    return {
      repo : 'default',
      owner: 'joe',
      path
    }
  }

  static getResourceUri(path = '/Bar Char') {
    return {
      repo : 'default',
      owner: 'joe',
      path
    }
  }
}


