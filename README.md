# vuepress-theme-ktquez
A blog theme for VuePress by Ktquez 🤘

> Vuepress does not yet have native support for blogs, but this theme has some practices and customizations to turn into a blog.

## Installation

```shell
npm install -S vuepress-theme-ktquez
```

## Configuration

The theme customization is done through the `.vuepress/config.js`  
For your reference, you can see the [config.js of my blog](https://github.com/ktquezplay/webapp/blob/master/src/.vuepress/config.js). 

```javascript
module.exports = {
  theme: 'ktquez',
  ...
  locales: {
    '/': {
      lang: 'en'
    },
    '/pt/': {
      lang: 'pt'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        languages: { label: 'English', shortname: 'EN' }, // Used in the drop down of languages
        translation: {}, // Look for the "translations section" below
        logo: { name: 'MY_LOGO_FILENAME', ext: 'png', alt: 'My description about logo' },
        share: { facebookCaption: 'MY_CAPTION_FB_SHARE', twitterVia: 'MY_TWITTER_NICKNAME' },
        newsletter: {
          provider: 'mailchimp',    // Currently supports mailchimp
          action: 'link_form_action_mailchimp'
        },
        copy: '2018 © Ktquez play - <a href="https://vuepress.vuejs.org/" rel="noopener" target="_blank"> MADE WITH VUEPRESS </a>',
        footer: {
          nav1: {
            title: 'NAVIGATION 1',    // For internal links
            items: [
              {
                label: 'ABOUT',
                path: '/about/'
              },
              ...
            ]
          },
          nav2: {
            title: 'NAVIGATION 2', // For external links
            items: [
              {
                label: 'Slack Group',
                link: 'https://my_group.slack.com/'
              },
              ...
            ]
          }
        },
        social: [ 
          {
            name: 'twitter',  // Look for the "social icon section" below
            link: 'https://www.twitter.com/ktquez'
          },
          ...
        ]
      },
      '/pt/': ... // The same as the example above, but with information from that language
    },
    disqus: 'MY_DISQUS_SHORTNAME',
    url: 'https://my_doamin.com',
    cdn: '',    // If there is a CDN, put the bucket link here.
    blackWhite: true, // Active toggle for Nocturne mode
    topNavigation: true, // Turn on the navigation menu above the header
    searchMaxSuggestions: 7, // Maximum result per search
    responsive: {
      active: true, // Turn on responsive images on the cover of the post
      ext: 'png',
      breakpoints: [320, 427, 524, 680] // Breakpoints used for picture media tag
    },
    share: {
      facebook: { appId: '', version: 'v3.1' }
    },
    elevator: { duration: 4000, mainAudio: '/music/elevator.mp3', endAudio: '/music/ding.mp3' }
  },
  configureWebpack () {
    return {
      resolve: {
        alias: {
          '@public': path.join(__dirname, './public')
        }
      }
    }
  }
}

```

## Translations of the theme

The texts that are in the theme are translated and currently the theme has included the translations for `EN` and` PT`, any other language you will use, just add the `key: value` in the translation property that the theme will do rest for you.

```js
themeConfig: {
  locales: {
    ...
    /es/: {
      languages: { label: 'Spanish', shortname: 'ES' },
      translation: {
        back: 'Atrás',
        home: 'Home',
        author: 'Autor',
        ...
      }
    },
    /fr/: {
      languages: { label: 'French', shortname: 'FR' },
      translation: {
        back: 'arrière',
        home: 'Page d'accueil',
        author: 'auteur',
        ...
      }
    }
  }
  ...
}
```

For you to see all the `key: value` used in the theme, just access [this example](https://github.com/ktquez/vuepress-theme-ktquez/blob/master/plugins/Translation/locales/en.js)


## Newsletter

To make the newsletter form appear, simply add the action of your newsletter.  

```js
themeConfig: {
  locales: {
    ...
    /: {
      ...
      newsletter: {
        provider: 'mailchimp',
        action: 'MY_ACTION_FOR_ENGLISH_USERS'
      },
    },
    /es/: {
      ...
      newsletter: {
        provider: 'mailchimp',
        action: '' // Does not display the form if you leave an empty string
      }
    }
  }
  ...
}
```

## Responsive post cover

To improve UX and performance, the blog supports responsive images through breakpoints.

```js
themeConfig: {
  ...
  responsive: {
    active: true, // Turn on responsive images on the cover of the post
    ext: 'png',
    breakpoints: [320, 427, 524, 680] // Breakpoints used for picture media tag
  },
  ...
}
```

With the example above, you need to insert the images with the final `, w_XXX`, for example:

If your post is: `/posts/my-first-post.md`  
Your images should be in `public/images/posts/` and with the following sizes:
- `public/images/posts/my-first-post,w_320.png`
- `public/images/posts/my-first-post,w_427.png`
- `public/images/posts/my-first-post,w_524.png`
- `public/images/posts/my-first-post,w_680.png`
- `public/images/posts/my-first-post.png` 

Because the images are defined by the post structure, for the images of another locale, for example `/pt/`, your images will be in the directory `public/images/pt/posts/`
- `public/images/pt/posts/my-first-post,w_320.png`
- `public/images/pt/posts/my-first-post,w_427.png`
- `public/images/pt/posts/my-first-post,w_524.png`
- `public/images/pt/posts/my-first-post,w_680.png`
- `public/images/pt/posts/my-first-post.png` 

> If you don't want to use responsive images, simply disable









