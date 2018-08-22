<template>
  <input 
    class="ui-input-field reset-input"
    :type="type" 
    :name="name" 
    :id="name"
    :required="required"
    :placeholder="placeholder"
    @input="$emit('update:value', $event.target.value)" />
</template>

<script>
  export default {
    name: 'InputField',

    props: {
      type: {
        type: String,
        default: 'text'
      },
      name: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        default: false
      },
      placeholder: String
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.ui-input-field.reset-input
  font-family: inherit
  font-size: $regularText
  padding: 10px 24px
  border-radius: 60px
  background-color: white
  color: $textColor

</style>