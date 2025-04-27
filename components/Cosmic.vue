<script lang="ts">
import { createBucketClient } from '@cosmicjs/sdk'
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Cosmic extends Vue {
	cosmic!: any
	created() {
		this.cosmic = createBucketClient({
			bucketSlug: '',
			readKey: '',
		})
	}
}

export default toNative(Cosmic)
</script>
