<template>
  <v-form ref="gitAccessForm" lazy-validation>
    <v-row align="center">
      <v-col cols="6">
        <span class="caption grey--text text--darken-1">{{ `Webhook (${vars.flow.webhook})` }}</span>
        <v-text-field
            class="pt-0"
            v-model="wrapper.webhook"
            append-icon="mdi-help-circle-outline"
            @click:append="onHelpClick('hook')"
            readonly
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-icon small :class="['ml-4', 'mt-2', wrapper.webhookStatus.color]">{{ wrapper.webhookStatus.icon }}</v-icon>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <span class="caption grey--text text--darken-1">{{ `Git URL (${vars.git.url})` }}</span>
        <v-text-field
            class="pt-0"
            v-model="wrapper.gitUrl"
            append-icon="mdi-help-circle-outline"
            append-outer-icon=""
            :rules="rules.gitUrl"
            @click:append="onHelpClick('url')"
            readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <span class="caption grey--text text--darken-1">{{ `Credential (${vars.git.credential})` }}</span>
        <v-text-field
            class="pt-0"
            v-model="wrapper.credential"
            append-icon="mdi-help-circle-outline"
            :rules="[rules.credential]"
            @click:append="onHelpClick('url')"
            readonly
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <git-test-btn :wrapper="wrapper" :onBeforeTest="onTestClick"></git-test-btn>
      </v-col>
    </v-row>
  </v-form>

</template>

<script>
  import vars from '@/util/vars'
  import GitTestBtn from '@/components/Flow/GitTestBtn'

  import { FlowWrapper } from '@/util/flows'
  import { gitUrlRules } from '@/util/rules'

  export default {
    name: 'OptionGitAccess',
    props: {
      flow: {
        required: true,
        type: Object
      }
    },
    components: {
      GitTestBtn
    },
    data () {
      return {
        vars: vars,

        rules: {
          gitUrl: gitUrlRules(this),
          credential: (value) => {
            const gitUrl = this.wrapper.gitUrl

            if (gitUrl.startsWith('http') || gitUrl.startsWith('https')) {
              return true
            }

            return !!value || this.$t('flow.hint.credential_name_required')
          }
        },
      }
    },
    computed: {
      wrapper () {
        return new FlowWrapper(this.flow)
      }
    },
    methods: {
      onTestClick () {
        return this.$refs.gitAccessForm.validate()
      },

      onHelpClick (type) {

      }
    }
  }
</script>

<style>
  .ssh-add-btn.v-btn--floating.v-btn--small {
    height: 22px !important;
    width: 22px !important;
  }
</style>
