import {UseCase} from '@zorko-io/util-use-case'

// TODO: Provide implementation for PreviewById
// label: enhancement
export class PreviewById extends UseCase {
  // eslint-disable-next-line no-unused-vars
  async run(params) {
    return {
      id: '9910f47d-0a9d-4ed2-9c46-a509a68695d2',
      title: 'Title One',
      previewUrl: '/api/v1/specs/2e3140e8-ed62-4843-929f-65becf347721',
      contentUrl: '/content/2e3140e8-ed62-4843-929f-65becf347721',
      createdAt: '2020-12-03T18:30:29.304Z',
      author: {
        login: 'yzhbankov',
        avatarUrl: '/avatar/yzhbankov',
      },
    }
  }
}
