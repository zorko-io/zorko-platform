import {UseCase} from '@zorko-io/util-use-case'

// TODO: Provide implementation for PreviewList
// label: enhancement
export class PreviewList extends UseCase {
  // eslint-disable-next-line no-unused-vars
  async run(params) {
    return {
      total: 2,
      pagesLeft: 0,
      items: [
        {
          id: '9910f47d-0a9d-4ed2-9c46-a509a68695d2',
          title: 'Title One',
          previewUrl: '/api/v1/specs/2e3140e8-ed62-4843-929f-65becf347721',
          contentUrl: '/content/2e3140e8-ed62-4843-929f-65becf347721',
          createdAt: '2020-12-03T18:30:29.304Z',
          author: {
            login: 'yzhbankov',
            avatarUrl: '/avatar/yzhbankov',
          },
        },
        {
          id: 'f3dd6d7e-640d-4be9-b91c-0a0d7cddcca9',
          title: 'Title Two',
          previewUrl: '/api/v1/specs/de034563-0c3d-4ace-8e85-739f1a5d3ea5',
          contentUrl: '/content/de034563-0c3d-4ace-8e85-739f1a5d3ea5',
          createdAt: '2020-12-03T18:30:29.304Z',
          author: {
            login: 'nesterone',
            avatarUrl: '/avatar/nesterone',
          },
        },
      ],
    }
  }
}
