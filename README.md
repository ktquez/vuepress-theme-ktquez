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
        languages: {
          label: 'English',
          shortname: 'EN'
        },
        translation: {},
        logo: {
          name: 'ktquez-play-logo',
          ext: 'png',
          alt: 'Logo in 3 colors in play format'
        },
        share: {
          facebookCaption: 'Ktquez Play',
          twitterVia: 'ktquez',
        },
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
              }
            ]
          },
          nav2: {
            title: 'NAVIGATION 2', // For external links
            items: [
              {
                label: 'Slack Group',
                link: 'https://my_group.slack.com/'
              }
            ]
          }
        },
        social: [
          {
            name: 'twitter',
            link: 'https://www.twitter.com/ktquez'
          }
        ]
      },
      '/pt/': ... // The same as the example above, but with information from that language
    },
    disqus: 'ktquez',
    url: 'https://ktquez.com',
    cdn: '', // If there is a CDN, put the bucket link here.
    blackWhite: true, // Active toggle for Nocturne mode
    topNavigation: true, // Turn on the navigation menu above the header
    searchMaxSuggestions: 7, // Maximum result per search
    responsive: {
      active: true, // Ative as imagens responsivas na capa do post
      ext: 'png',
      breakpoints: [320, 427, 524, 680] // Breakpoints used for picture media tag
    },
    share: {
      facebook: {
        appId: '',  // Your facebook AppId
        version: 'v3.1'
      }
    },
    elevator: {
      duration: 4000,   // Duration of how long the page will reach the top by clicking on the back to top
      mainAudio: '/music/elevator.mp3', // Sounds of elevator.js
      endAudio: '/music/ding.mp3'
    }
  },
  configureWebpack () {
    return {
      resolve: {
        alias: {
          '@public': resolve('./public')
        }
      }
    }
  }
}

```

