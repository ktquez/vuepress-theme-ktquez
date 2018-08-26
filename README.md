# vuepress-theme-ktquez
A blog theme for VuePress by Ktquez 🤘

> Vuepress does not yet have native support for blogs, but this theme has some practices and customizations to turn into a blog.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Translations](#translations-of-the-theme)
- [Newsletter](#newsletter)
- [Responsive images](#responsive-post-cover)
- [Structure](#structure-directores-suggestion)
- [Frontmatter](#frontmatter)
- [Override CSS](#override-css-stylus)
- [Accessibility](#the-best-pratice-of-accessibility-includes)
- [And more](#the-best-pratice-of-accessibility-includes)
- [Theme Starter (soon)](#vuepress-theme-ktquez-starter)
- [Tools](#tools)



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
      lang: 'pt-br'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        languages: {                              // Used in the drop down of languages
          label: 'English', 
          shortname: 'EN' 
         }, 
        translation: {},                          // Look for the "translations section" below
        logo: { 
          name: 'MY_LOGO_FILENAME', 
          ext: 'png', 
          alt: 'My description about logo' 
        },
        share: { 
          facebookCaption: 'MY_CAPTION_FB_SHARE', 
          twitterVia: 'MY_TWITTER_NICKNAME' 
        },
        newsletter: {
          provider: 'mailchimp',                  // Currently supports mailchimp
          action: 'link_form_action_mailchimp'
        },
        copy: '2018 © Ktquez play - <a href="https://vuepress.vuejs.org/" rel="noopener" target="_blank"> MADE WITH VUEPRESS </a>',
        footer: {
          nav1: {
            title: 'NAVIGATION 1',                // For internal links
            items: [
              {
                label: 'ABOUT',
                path: '/about/'
              },
              ...
            ]
          },
          nav2: {
            title: 'NAVIGATION 2',                 // For external links
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
            name: 'twitter',                        // Look for the "social icon section" below
            link: 'https://www.twitter.com/ktquez'
          },
          ...
        ]
      },
      '/pt/': ... // The same as the example above, but with information from that language
    },
    disqus: 'MY_DISQUS_SHORTNAME',
    url: 'https://my_doamin.com',
    cdn: '',                              // If there is a CDN, put the bucket link here.
    blackWhite: true,                     // Active toggle for Nocturne mode
    topNavigation: true,                  // Turn on the navigation menu above the header
    searchMaxSuggestions: 7,              // Maximum result per search
    responsive: {
      active: true,                       // Turn on responsive images on the cover of the post
      ext: 'png',
      breakpoints: [320, 427, 524, 680]   // Breakpoints used for picture media tag
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
    '/es/': {
      languages: { label: 'Spanish', shortname: 'ES' },
      translation: {
        back: 'Atrás',
        home: 'Home',
        author: 'Autor',
        ...
      }
    },
    '/fr/': {
      languages: { label: 'French', shortname: 'FR' },
      translation: {
        back: 'arrière',
        home: 'Page d\'accueil',
        author: 'auteur',
        ...
      }
    }
  }
}
```

For you to see all the `key: value` used in the theme, just access [this example](https://github.com/ktquez/vuepress-theme-ktquez/blob/master/plugins/Translation/locales/en.js)


## Newsletter

To make the newsletter form appear, simply add the action of your newsletter.  

```js
themeConfig: {
  locales: {
    ...
    '/': {
      ...
      newsletter: {
        provider: 'mailchimp',
        action: 'MY_ACTION_FOR_ENGLISH_USERS'
      },
    },
    '/pt/': {
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

With the example above, you need to insert the images with the final `,w_XXX`, for example:

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


# Structure directores (Suggestion)

In `src/`

```
index.md
about/
--- README.md
contact/
--- README.md
categories/
--- README.md
--- category1.md
--- category2.md
posts/
--- README.md
--- my-first-post.md
pt/
--- posts/
--- --- README.md
--- --- meu-primeiro-post.md
--- categorias
--- --- README.md
--- --- categoria1.md
--- --- categoria2.md
--- contato/
--- --- README.md
--- about/
--- --- README.md
es/
...
```

**There are `key: value` in [translations of routes](https://github.com/ktquez/vuepress-theme-ktquez/blob/master/plugins/Translation/locales/en.js#L46), if you do not have your language or want to rename, just add in translation translation**


# Frontmatter

## Home
```yaml
---
view: home
title: my title
description: my description
meta:
  - property: og:image
    content: https://my_domain.com/share/my-site-image-share.png
  - name: twitter:image
    content: https://my_domain.com/share/my-site-image-share.png
---
```


## Post

```yaml
---
view: post
layout: post
lang: pt-br             // Lang by locale of post (required)
author: ktquez          // Nickname author 
title: My First post
description: 
excerpt:
cover: true             // If true it displays the cover image of the post, if it has no image, leave it as false
coverAlt:               // cover alt text
demo:                   // If you have demo link, insert here, to display the demo demo button in post
categories:
  - vuejs                // slug of category
  - javascript
tags: 
  - tag1                // You may feel free to create tags, it will be used on the category page
  - tag2
  - tag3
created_at: 2018-08-22 11:00 
updated_at: 2018-08-22 11:00
meta:
  - property: og:image
    content: https://my_domain.com/images/posts/my-first-post.png
  - name: twitter:image
    content: https://my_domain/images/posts/my-first-post.png
---
```

**For more examples, just see the [posts of Ktquez play](https://github.com/ktquezplay/webapp/tree/master/src/en/posts)**


## Category

```yaml
---
view: category
lang: pt-br       // Lang by locale of post (required)
order: 1
top: true
title: Vue.js
description: 
excerpt: 
slug: vuejs       // Used in post yaml for the array of categories
---
```

## Author

```yaml
---
view: author
lang: pt-br                       // Lang by locale of post (required)
title: Articles by Alan Ktquez
description: 
name: Alan Ktquez
nickname: ktquez                  // Used in post yaml to indicate the author
role: Web developer
avatar: /authors/avatar_author.png
created_at: 2018-08-22
social:
  - name: twitter
    url: https://twitter.com/author
  - name: github
    url: https://github.com/author
  - name: site
    url: https://author_site.com
meta:
  - property: og:image
    content: https://my_domain.com/authors/avatar_author.png
  - name: twitter:image
    content: https://my_domain.com/authors/avatar_author.png
---
```

## Page

```yaml
---
view: page
title: 
description: 
excerpt: 
ctaContact: true    // Show call-to-action to contact page. If there is no contact page, set it to false
---
```

# Override CSS (Stylus)

To overwrite the theme variables to customize colors and etc, simply create a file in `.vuepress/override.styl`, por exemplo:

```stylus
$primaryColor = #AE4967
$accentColor = #35495E

$color1 = #41b883
$colorImageFallback = $accentColor

$firstFooterColor = #35495E
$secondFooterColor = #263647
```

**To see all the variables, [access this link](https://github.com/ktquez/vuepress-theme-ktquez/blob/master/styles/config.styl)**

# The best pratice of accessibility includes

The theme uses some plugins from the [Vue A11y project](https://github.com/vue-a11y)
- [Vue announcer](https://github.com/vue-a11y/vue-announcer);
- [Vue skip to](https://github.com/vue-a11y/vue-skip-to);

In addition to good practices such as:
- Nocturne mode
- Customization of alternative texts in images;
- Card posts with descriptive links using aria-labelledby;
- Among others


# And more

## Anaytics campaign in posts

All posts sharing icons links are included in analytics campaign parameters.  
`?utm_source=SOCIALNAMECLICKED&utm_medium=share&utm_campaign=single-post`

> With this you can analyze the interaction and shares of your posts.

## Fonts

The theme have as fonts:
- [Poppins](https://fonts.google.com/specimen/Poppins) - All site
- [Hack](https://sourcefoundry.org/hack/) - For code blocks

> To overwrite the fonts, simply use the `.vuepress/style.styl`. [Ver doc vuepress](https://vuepress.vuejs.org/default-theme-config/#migrate-your-styles-to-style-styl)

## Assets

You can copy some assets from the [public folder of the theme](https://github.com/ktquez/vuepress-theme-ktquez/tree/master/public), they server for you to configure some images as well as files to turn your blog into a PWA (for example the file [manifest.json](https://github.com/ktquez/vuepress-theme-ktquez/tree/master/public)).


## Ads

You can also insert ads in the blog, which are displayed in the sidebar of the home page and the right side of the post.
Ads are built through an array of objects that we can insert into each themeConfig locale, [example taken from my personal blog](https://github.com/ktquezplay/webapp/blob/master/src/.vuepress/config/locales/en/ads.js)

```js
themeConfig: {
  locales: {
    ...
    '/': {
      ...
      ads: [
        {
          text: 'Did you know that Udemy has more than 300 web development courses for only R $ 21.99?',
          link: 'http://bit.ly/desenvolvimento-web-udemy',
          image: {
            src: 'ads/web-development-portugues.png',
            alt: 'Illustration of a user studying online'
          },
          by: {
            text: 'udemy.com',
            link: 'http://bit.ly/all-courses-udemy'
          }
        }
      ],
    },
    '/es/': {
      ...
      ads: [
        {
          text: 'Você sabia que a Udemy tem mais de 300 cursos de desenvolvimento web por apenas R$ 21,99?',
          link: 'http://bit.ly/desenvolvimento-web-em-portugues-udemy',
          image: {
            src: '/web-development-portugues.png',
            alt: 'Ilustração de um usuário estudando online'
          },
          by: {
            text: 'udemy.com',
            link: 'http://bit.ly/all-courses-udemy'
          }
        }
      ]
    }
  }
  ...
}
```


# Vuepress theme ktquez starter

I know that the settings of the theme seem like a lot of work, so I'll leave here in the next few days a boilerplate for you to clone and modify little thing and be able to raise your blog quickly without much configuration.

**Soon link here**

## Tools
Tools that can help you:
- [Slugfy](https://blog.tersmitten.nl/slugify/) - Slug generation, for your links and filenames;
- [Responsive breakpoints](http://www.responsivebreakpoints.com/) - Responsive image breakpoints generator for cover images;
- [SEO Counter](http://www.codeorama.com/seo/counter/) - Is an online word and character counter with SEO rules for title and description;


## License

[MIT](https://github.com/ktquez/vuepress-theme-ktquez/blob/master/LICENSE)

## Contributing
- Check the open issues or open a new issue to start a discussion around your feature idea or the bug you found.
- Fork repository, make changes and send a pull request

If you want a faster communication, find me on [@ktquez](https://twitter.com/ktquez)

**Thank you**






