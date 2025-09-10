<template>
    <button type="button" class="btn" :class="isDeleted ? 'btn-warning' : 'btn-danger'" @click="onSubmit">
        <i :class="isDeleted ? 'fa fa-recycle' : 'fa fa-trash'"></i>
        <span class="ms-1">{{ isDeleted ? 'Restore' : 'Delete' }}</span>
    </button>
</template>

<script lang="ts">
import { useConfirm } from '@/vue/composables/useConfirm';
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator';

@Component({
    emits: ['deleted', 'restored'],
})
class DeleteButton extends Vue {
    @Prop({ type: Object, required: true })
    readonly model!: any;

    get isDeleted() {
        return !!this.model.deleted_at;
    }

    async onSubmit() {
        const { confirm } = useConfirm();

        const confirmed = await confirm({
            title: this.isDeleted ? 'Restore Confirmation' : 'Delete Confirmation',
            message: `Are you sure you want to ${this.isDeleted ? 'restore' : 'delete'} this item?`,
        });

        if (confirmed) {
            const url = `/${this.model.route_key}/${this.model.id}`;

            if (this.isDeleted) {
                await this.$http.patch(url);
                this.$emit('restored');
            } else {
                await this.$http.delete(url);
                this.$emit('deleted');
            }
        }
    }
}

export default toNative(DeleteButton);
</script>
