<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'
import { WebflowClient } from 'webflow-api'

@Component({})
class Craft extends Vue {
	client!: WebflowClient

	created() {
		this.client = new WebflowClient({
			accessToken: '',
		})
	}
}

export default toNative(Craft)
</script>
