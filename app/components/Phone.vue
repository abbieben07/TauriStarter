<template>
    <div class="form-floating">
        <input ref="phone" type="tel" v-model="value" class="tel h-100 form-control" v-bind="$attrs" @change="onPhoneChanged" />
        <label :for="$attrs.id">
            <slot />
        </label>
        <slot name="error" />
    </div>
</template>

<script lang="ts">
import intlTelInput, { Iti } from 'intl-tel-input'
import { Component, Model, Prop, Ref, Vue, toNative } from 'vue-facing-decorator'
import Errors from './Errors.vue'

@Component({
    components: {
        Errors,
    },
    inheritAttrs: false,
    emits: ['update:modelValue'],
})
class Phone extends Vue {
    declare $attrs: {
        id?: string
    }

    phone!: Iti

    //value = ''

    @Ref('phone')
    readonly input!: HTMLInputElement

    @Prop({ type: Object, default: () => { } })
    readonly options!: object

    @Prop({ type: Object, default: () => [] })
    readonly errors!: []

    @Model({ type: String })
    value!: string

    onPhoneChanged(event) {
        this.value = this.phone.getNumber(0) ?? event.target.value
    }

    mounted() {
        this.phone = intlTelInput(this.input, {
            initialCountry: 'ng',
            onlyCountries: ['ng'],
            geoIpLookup: (success, failure) => {
                fetch('https://ipapi.co/json')
                    .then((res) => res.json())
                    .then((data) => success(data.country_code))
                    .catch(() => failure())
            },
            loadUtils: () => import('intl-tel-input/utils'),
            ...this.options,
        })

        this.input.addEventListener('countrychange', (e) => this.onPhoneChanged(e))
        //this.input.addEventListener('change', (e) => this.value == this.phone.getNumber(0))

        document.querySelector('.iti')?.classList.add('bootstrap-tel')

        //@ts-ignore
        //this.phone.setNumber(this.valueAgent)
    }

    unmounted() {
        this.phone.destroy()
    }
}

export default toNative(Phone)
</script>

<style lang="scss">
$flagsImagePath: 'intl-tel-input/build/img/';
@import 'intl-tel-input/build/css/intlTelInput.css';

.bootstrap-tel {
    width: 100% !important;
    height: 58px !important;
}

.iti {
    width: 100%;
}

.iti__arrow {
    border: none;
}

.iti {
    width: 100%;
}

.iti__arrow {
    border: none;
}
</style>
