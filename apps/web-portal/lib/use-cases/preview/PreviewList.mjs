import {UseCase} from '@zorko-io/util-use-case'

// TODO: Provide implementation for PreviewList
// label: enhancement
export class PreviewList extends UseCase {
  async run(params) {
    return {
      total: 2,
      pagesLeft: 0,
      items: [
        {
          id: '9910f47d-0a9d-4ed2-9c46-a509a68695d2',
          title: 'Title One',
          previewUrl: '/preview/9910f47d-0a9d-4ed2-9c46-a509a68695d2',
          contentUrl: '/content/9910f47d-0a9d-4ed2-9c46-a509a68695d2',
          createdAt: '2020-12-03T18:30:29.304Z',
          author: {
            login: 'yzhbankov',
            avatarUrl: '/avatar/yzhbankov',
          },
        },
        {
          id: 'f3dd6d7e-640d-4be9-b91c-0a0d7cddcca9',
          title: 'Title Two',
          previewUrl: '/preview/f3dd6d7e-640d-4be9-b91c-0a0d7cddcca9',
          contentUrl: '/content/f3dd6d7e-640d-4be9-b91c-0a0d7cddcca9',
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
