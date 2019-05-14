<template>
  <router-link 
    v-if="$themeLocaleConfig.logo.name"
    :to="$localeConfig.path" 
    class="header-top-logo__link" 
    itemprop="url">
    <img 
      itemprop="logo"
      :src="$withBase(`/${$themeLocaleConfig.logo.name}.${$themeLocaleConfig.logo.ext}`)" 
      :srcset="$withBase(`/${$themeLocaleConfig.logo.name}.${$themeLocaleConfig.logo.ext}`) + ' 1x, ' + $withBase(`/${$themeLocaleConfig.logo.name}@2x.${$themeLocaleConfig.logo.ext}`) +  '2x'" 
      :alt="$themeLocaleConfig.logo.alt">
  </router-link>
  <div v-else>
    {{ $site.title }}
  </div>
</template>

<script>
export default {
  name: "Logo"
};
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl';
</style>