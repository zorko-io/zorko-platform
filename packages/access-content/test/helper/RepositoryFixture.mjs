import {MimeTypes, PermissionDefaults} from '../../lib'
import {VegaSpecFixture} from './VegaSpecFixture'

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
        content: VegaSpecFixture.getBarChart()
    },
      {
          parent: '/',
          name: 'Gant Chart',
          preview: 'url/to/preview/here',
          mime: MimeTypes.VegaLite,
          permission: PermissionDefaults.Public,
          content: VegaSpecFixture.getGantChartInline()
      },
      {
          parent: '/',
          name: 'Area Horizontal',
          preview: 'url/to/preview/here',
          mime: MimeTypes.VegaLite,
          permission: PermissionDefaults.Public,
          content: VegaSpecFixture.getAreaHorizontal()
      },
      {
        parent: '/',
        name: 'Bar Binned',
        preview: 'url/to/preview/here',
        mime: MimeTypes.VegaLite,
        permission: PermissionDefaults.Public,
        content: VegaSpecFixture.getBarBinnedInline()
      },
      {
        parent: '/',
        name: 'Bar Color Disabled',
        preview: 'url/to/preview/here',
        mime: MimeTypes.VegaLiteTheme,
        permission: PermissionDefaults.Public,
        content: VegaSpecFixture.getBarColorDisabledInline()
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


